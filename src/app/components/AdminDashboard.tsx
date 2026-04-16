import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Users, ChevronDown, ChevronUp, Check, X, Minus, Trash2, RefreshCw, Wifi, WifiOff, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { getAllSessions, clearAllSessions, type QuizSession } from '@/app/utils/quizStorage';
import { supabase } from '@/app/utils/supabaseClient';

interface AdminDashboardProps {
  onLogout: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('sk-SK', {
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
            : <span className="text-xs text-amber-500 font-medium px-3 py-1 bg-amber-50 rounded-full">Nedokončené</span>
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
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
              {session.answers.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Žiadne zaznamenané odpovede.</p>
              ) : (() => {
                // Group answers by attempt_number
                const byAttempt = new Map<number, typeof session.answers>();
                session.answers.forEach(ans => {
                  const attempt = ans.attemptNumber ?? 1;
                  if (!byAttempt.has(attempt)) byAttempt.set(attempt, []);
                  byAttempt.get(attempt)!.push(ans);
                });
                const attempts = Array.from(byAttempt.entries()).sort(([a], [b]) => a - b);

                return attempts.map(([attemptNum, answers]) => (
                  <div key={attemptNum} className="mb-4 last:mb-0">
                    {/* Attempt header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: attemptNum === 1 ? '#EEF2FF' : '#FFF7ED',
                          color: attemptNum === 1 ? '#4F46E5' : '#C2410C'
                        }}
                      >
                        {attemptNum === 1 ? '1. pokus' : `${attemptNum}. pokus (oprava)`}
                      </span>
                      <span className="text-xs text-gray-400">
                        {answers.filter(a => a.isCorrect).length}/{answers.length} správne
                      </span>
                    </div>
                    {/* Answers in this attempt */}
                    <div className="space-y-1">
                      {answers
                        .slice()
                        .sort((a, b) => a.questionNumber - b.questionNumber)
                        .map((ans, i) => (
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
                                    Odpoveď: <strong>{ans.selectedAnswer}</strong>
                                  </span>
                                  {!ans.isCorrect && (
                                    <span className="text-gray-500">Správne: <strong>{ans.correctAnswer}</strong></span>
                                  )}
                                </div>
                              )}
                            </div>
                            <span className="shrink-0 text-xs text-gray-400 hidden sm:block">{formatDate(ans.answeredAt)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Report Tab ──────────────────────────────────────────────────────────────

interface QuestionStat {
  questionNumber: number;
  questionText: string;
  totalAttempts: number;
  correct: number;
  wrong: number;
  skipped: number;
  retries: number;
  errorRate: number; // 0–1, excludes skipped
  mostCommonWrong: string | null;
}

function buildQuestionStats(sessions: QuizSession[]): QuestionStat[] {
  const completed = sessions.filter(s => s.completedAt);
  const map = new Map<number, {
    questionText: string;
    correct: number; wrong: number; skipped: number; retries: number;
    wrongAnswers: string[];
  }>();

  for (const session of completed) {
    for (const ans of session.answers) {
      if (ans.attemptNumber > 1) {
        // count as retry on the question
        const entry = map.get(ans.questionNumber);
        if (entry) entry.retries++;
        continue;
      }
      if (!map.has(ans.questionNumber)) {
        map.set(ans.questionNumber, {
          questionText: ans.questionText,
          correct: 0, wrong: 0, skipped: 0, retries: 0, wrongAnswers: [],
        });
      }
      const entry = map.get(ans.questionNumber)!;
      if (ans.skipped) entry.skipped++;
      else if (ans.isCorrect) entry.correct++;
      else { entry.wrong++; entry.wrongAnswers.push(ans.selectedAnswer); }
    }
  }

  return Array.from(map.entries()).map(([qNum, e]) => {
    const answered = e.correct + e.wrong;
    const errorRate = answered > 0 ? e.wrong / answered : 0;

    // most frequent wrong answer
    const freq = new Map<string, number>();
    for (const a of e.wrongAnswers) freq.set(a, (freq.get(a) ?? 0) + 1);
    let mostCommonWrong: string | null = null;
    let maxFreq = 0;
    freq.forEach((count, ans) => { if (count > maxFreq) { maxFreq = count; mostCommonWrong = ans; } });

    return {
      questionNumber: qNum,
      questionText: e.questionText,
      totalAttempts: e.correct + e.wrong + e.skipped,
      correct: e.correct,
      wrong: e.wrong,
      skipped: e.skipped,
      retries: e.retries,
      errorRate,
      mostCommonWrong,
    };
  });
}

function QuestionCard({ stat, rank, variant }: { stat: QuestionStat; rank: number; variant: 'bad' | 'good' }) {
  const answered = stat.correct + stat.wrong;
  const correctPct = answered > 0 ? Math.round((stat.correct / answered) * 100) : 0;
  const errorPct = Math.round(stat.errorRate * 100);

  const badColor = '#ef4444';
  const goodColor = '#22c55e';
  const accentColor = variant === 'bad' ? badColor : goodColor;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4">
      {/* Rank */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
        style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
      >
        #{rank}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 mb-0.5">Otázka {stat.questionNumber}</p>
        <p className="text-sm font-medium text-gray-800 mb-3 line-clamp-2">{stat.questionText}</p>
        <div className="flex flex-wrap gap-3">
          {variant === 'bad' ? (
            <>
              <Pill color={badColor} label="Chybovosť" value={`${errorPct}%`} />
              <Pill color="#f59e0b" label="Opakovanie" value={stat.retries > 0 ? `${stat.retries}×` : '0×'} />
              {stat.skipped > 0 && <Pill color="#94a3b8" label="Preskočené" value={`${stat.skipped}×`} />}
              {stat.mostCommonWrong && (
                <Pill color="#9ca3af" label="Najčastejšia chyba" value={`„${stat.mostCommonWrong}"`} />
              )}
            </>
          ) : (
            <>
              <Pill color={goodColor} label="Správne" value={`${correctPct}%`} />
              <Pill color="#94a3b8" label="Odpovedí" value={`${answered}`} />
              {stat.retries === 0 && <Pill color="#22c55e" label="Bez opakovania" value="✓" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Pill({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium"
      style={{ backgroundColor: `${color}14`, color }}>
      <span className="text-gray-400 font-normal">{label}:</span> {value}
    </span>
  );
}

function ReportTab({ sessions }: { sessions: QuizSession[] }) {
  const completed = sessions.filter(s => s.completedAt);
  if (completed.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <BarChart2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">Zatiaľ žiadne dokončené testovanie.</p>
      </div>
    );
  }

  const stats = buildQuestionStats(sessions);
  if (stats.length === 0) {
    return <div className="text-center py-16 text-gray-400 text-sm">Nedostatok dát na analýzu.</div>;
  }

  const byError = [...stats].sort((a, b) => b.errorRate - a.errorRate || b.retries - a.retries);
  const byCorrect = [...stats].sort((a, b) => {
    const aCorrectPct = (a.correct + a.wrong) > 0 ? a.correct / (a.correct + a.wrong) : 0;
    const bCorrectPct = (b.correct + b.wrong) > 0 ? b.correct / (b.correct + b.wrong) : 0;
    return bCorrectPct - aCorrectPct || a.retries - b.retries;
  });

  const top5Bad = byError.slice(0, 5);
  const top5Good = byCorrect.slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Meta */}
      <p className="text-xs text-gray-400">
        Analýza z <strong className="text-gray-600">{completed.length}</strong> dokončených testov · {stats.length} otázok
      </p>

      {/* Problematic */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Top 5 najhorších otázok</h3>
        </div>
        <div className="space-y-3">
          {top5Bad.map((stat, i) => (
            <QuestionCard key={stat.questionNumber} stat={stat} rank={i + 1} variant="bad" />
          ))}
        </div>
      </section>

      {/* Easy */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Top 5 najlepších otázok</h3>
        </div>
        <div className="space-y-3">
          {top5Good.map((stat, i) => (
            <QuestionCard key={stat.questionNumber} stat={stat} rank={i + 1} variant="good" />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const [activeTab, setActiveTab] = useState<'sessions' | 'report'>('sessions');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSessions();
      setSessions(data);
    } catch (err) {
      setError('Nepodarilo sa načítať dáta. Skontrolujte pripojenie.');
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
    if (window.confirm('Naozaj zmazať všetky dáta? Táto akcia je nevratná.')) {
      try {
        await clearAllSessions();
        await refresh();
      } catch (err) {
        alert('Zmazanie sa nepodarilo. Skúste to znova.');
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
            <p className="text-xs text-gray-400">Prehľad certifikácií</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <span
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
            style={live
              ? { backgroundColor: 'rgba(34,197,94,0.1)', color: '#16a34a' }
              : { backgroundColor: 'rgba(156,163,175,0.1)', color: '#9ca3af' }}
            title={live ? 'Pripojené – dáta sa aktualizujú v reálnom čase' : 'Čakanie na pripojenie…'}
          >
            {live ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {live ? 'Live' : 'Offline'}
          </span>
          <button onClick={refresh} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" title="Obnoviť">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleClear} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Zmazať všetko">
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Odhlásiť
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Celkom pokusov', value: sessions.length },
            { label: 'Dokončené', value: completed.length },
            { label: 'Priemerné skóre', value: completed.length ? `${avgScore}%` : '–' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {([
            { id: 'sessions', label: 'Účastníci', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'report',   label: 'Report',     icon: <BarChart2 className="w-3.5 h-3.5" /> },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={activeTab === tab.id
                ? { backgroundColor: 'white', color: '#111827', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                : { color: '#6b7280' }}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'sessions' ? (
          <>
            {error && (
              <div className="text-center py-8 text-red-500 bg-red-50 rounded-2xl mb-4 px-4">
                <p className="text-sm font-medium">{error}</p>
                <button onClick={refresh} className="mt-2 text-xs underline hover:no-underline">Skúsiť znova</button>
              </div>
            )}
            {loading && sessions.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin opacity-40" />
                <p className="text-sm">Načítavanie dát…</p>
              </div>
            ) : !error && sessions.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Zatiaľ žiadni účastníci.</p>
              </div>
            ) : (
              sessions.map(session => <SessionRow key={session.id} session={session} />)
            )}
          </>
        ) : (
          <ReportTab sessions={sessions} />
        )}
      </main>
    </div>
  );
}

