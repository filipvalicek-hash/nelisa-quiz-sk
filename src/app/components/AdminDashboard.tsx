import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Users, ChevronDown, ChevronUp, Check, X, Minus, Trash2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { getAllSessions, clearAllSessions, type QuizSession } from '@/app/utils/quizStorage';
import { supabase } from '@/app/utils/supabaseClient';

interface AdminDashboardProps {
  onLogout: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('cs-CZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function ScoreBadge({ correct, total }: { correct: number; total: number }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {correct}/{total} ({pct}%)
    </span>
  );
}

function SessionRow({ session }: { session: QuizSession }) {
  const [open, setOpen] = useState(false);
  const duration = session.completedAt
    ? Math.round((new Date(session.completedAt).getTime() - new Date(session.startedAt).getTime()) / 60000)
    : null;

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden mb-3">
      {/* Header row */}
      <button
        className="w-full flex items-center gap-4 px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{session.userName}</p>
          <p className="text-xs text-gray-500 truncate">{session.userEmail}</p>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs text-gray-400 shrink-0">
          <span>{formatDate(session.startedAt)}</span>
          {duration !== null && <span>{duration} min</span>}
        </div>
        <div className="shrink-0">
          {session.completedAt
            ? <ScoreBadge correct={session.totalCorrect} total={session.totalQuestions} />
            : <span className="text-xs text-amber-500 font-medium px-3 py-1 bg-amber-50 rounded-full">Nedokončeno</span>
          }
        </div>
        <div className="shrink-0 text-gray-400">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded answers */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 space-y-2">
              {session.answers.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Žádné zaznamenané odpovědi.</p>
              ) : (
                session.answers.map((ans, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="shrink-0 mt-0.5">
                      {ans.skipped
                        ? <Minus className="w-4 h-4 text-gray-400" />
                        : ans.isCorrect
                          ? <Check className="w-4 h-4 text-green-500" />
                          : <X className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">Otázka {ans.questionNumber}</p>
                      <p className="text-sm text-gray-800 mb-1 line-clamp-2">{ans.questionText}</p>
                      {!ans.skipped && (
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs">
                          <span className={ans.isCorrect ? 'text-green-600' : 'text-red-500'}>
                            Odpověď: <strong>{ans.selectedAnswer}</strong>
                          </span>
                          {!ans.isCorrect && (
                            <span className="text-gray-500">Správně: <strong>{ans.correctAnswer}</strong></span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-gray-400 hidden sm:block">{formatDate(ans.answeredAt)}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSessions();
      setSessions(data);
    } catch (err) {
      setError('Nepodařilo se načíst data. Zkontrolujte připojení.');
      console.error('[AdminDashboard] load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { refresh(); }, [refresh]);

  // Real-time subscription — re-fetch whenever any session or answer changes
  useEffect(() => {
    const channel = supabase
      .channel('admin-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_sessions' }, () => refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_answers' }, () => refresh())
      .subscribe(status => setLive(status === 'SUBSCRIBED'));

    return () => { supabase.removeChannel(channel); };
  }, [refresh]);

  const handleClear = async () => {
    if (window.confirm('Opravdu smazat všechna data? Tato akce je nevratná.')) {
      try {
        await clearAllSessions();
        await refresh();
      } catch (err) {
        alert('Smazání se nezdařilo. Zkuste to znovu.');
        console.error('[AdminDashboard] clear error', err);
      }
    }
  };

  const completed = sessions.filter(s => s.completedAt);
  const avgScore = completed.length > 0
    ? Math.round(completed.reduce((acc, s) => acc + (s.totalQuestions > 0 ? s.totalCorrect / s.totalQuestions : 0), 0) / completed.length * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(174,84,255,0.1)' }}>
            <Users className="w-4 h-4" style={{ color: '#AE54FF' }} />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nelisa Admin
            </h1>
            <p className="text-xs text-gray-400">Přehled certifikací</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <span
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
            style={live
              ? { backgroundColor: 'rgba(34,197,94,0.1)', color: '#16a34a' }
              : { backgroundColor: 'rgba(156,163,175,0.1)', color: '#9ca3af' }}
            title={live ? 'Připojeno – data se aktualizují v reálném čase' : 'Čekání na připojení…'}
          >
            {live ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {live ? 'Live' : 'Offline'}
          </span>
          <button onClick={refresh} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" title="Obnovit">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleClear} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Smazat vše">
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Odhlásit
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Celkem pokusů', value: sessions.length },
            { label: 'Dokončeno', value: completed.length },
            { label: 'Průměrné skóre', value: completed.length ? `${avgScore}%` : '–' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Sessions list */}
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Účastníci</h2>

        {error && (
          <div className="text-center py-8 text-red-500 bg-red-50 rounded-2xl mb-4 px-4">
            <p className="text-sm font-medium">{error}</p>
            <button onClick={refresh} className="mt-2 text-xs underline hover:no-underline">Zkusit znovu</button>
          </div>
        )}

        {loading && sessions.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin opacity-40" />
            <p className="text-sm">Načítání dat…</p>
          </div>
        ) : !error && sessions.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Zatím žádní účastníci.</p>
          </div>
        ) : (
          sessions.map(session => <SessionRow key={session.id} session={session} />)
        )}
      </main>
    </div>
  );
}

