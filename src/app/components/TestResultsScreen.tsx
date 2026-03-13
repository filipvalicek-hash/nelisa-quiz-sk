import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { CertificateModal } from '@/app/components/CertificateModal';
import { Award, CheckCircle, XCircle, Trophy, Target, Eye, ChevronRight, FileCheck, Check, X, AlertTriangle, ArrowRight } from 'lucide-react';
import logoImage from 'figma:asset/df61b6f2193a78afb780969de31b920fd241cf00.png';

interface QuestionData {
  questionNumber: number;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

interface TestResultsScreenProps {
  userName: string;
  userEmail: string;
  questionResults: boolean[]; // Array of boolean values (true = correct, false = incorrect)
  skippedQuestions?: number[]; // Array of skipped question numbers
  onRetry?: () => void;
  questionsData?: QuestionData[]; // Optional detailed question data for review
  selectedAnswers?: Record<number, string>; // Actual answers submitted by the user (keyed by 1-based question number)
  onModuleClick?: () => void;
  retryMode?: boolean; // Whether this is a retry attempt
  retryQuestions?: number[]; // Question numbers that were retried in this round
}

export function TestResultsScreen({
  userName,
  userEmail,
  questionResults,
  skippedQuestions = [],
  onRetry,
  questionsData,
  selectedAnswers = {},
  onModuleClick,
  retryMode = false,
  retryQuestions = [],
}: TestResultsScreenProps) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  // Calculate total correct answers
  const correctCount = questionResults.filter(result => result).length;
  const totalQuestions = questionResults.length;
  const hasSkippedQuestions = skippedQuestions.length > 0;
  const percentage = (correctCount / totalQuestions) * 100;

  // Trigger progress animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Auto-show certificate when 100% is reached
  useEffect(() => {
    if (percentage === 100) {
      const timer = setTimeout(() => {
        setShowCertificate(true);
      }, 2800); // wait for animations to finish
      return () => clearTimeout(timer);
    }
  }, [percentage]);

  // Determine success message based on score
  const getSuccessMessage = () => {
    if (percentage === 100) {
      return 'Milá kolegyně, milý kolego, gratulujeme k úspěšnému splnění certifikace od Nelisy. Díky tomu máš v ruce jasný rámec, jak Nelisu vysvětlovat, prodávat a nastavovat očekávání na reálných schůzkách s klienty.';
    } else {
      return 'Milá kolegyně, milý kolego, díky, že ses do certifikace pustil/a. Vidíme, že část principů máš zvládnutou, ale u některých témat Ti to ještě u klienta „ujet" (hlavně v argumentaci a očekáváních). To je v pohodě. Certifikace slouží i jako trénink.';
    }
  };

  const getScoreSubtext = () => {
    if (percentage === 100) {
      return null; // No additional text needed for perfect score
    } else {
      return 'Pro úspěšné dokončení je potřeba mít správně všechny otázky, máš ale neomezený počet pokusů na splnění.';
    }
  };

  // Get performance level based on score
  const getPerformanceLevel = () => {
    if (percentage === 100) return 'excellent';
    if (percentage >= 90) return 'great';
    if (percentage >= 70) return 'good';
    return 'practice';
  };

  const performanceLevel = getPerformanceLevel();

  return (
    <>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-4xl px-6 py-12">
          {/* Premium Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.25), 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 1px rgba(255, 255, 255, 0.5) inset',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Introductory Text Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: '#192550' }}
              >
                Výsledek testu
              </h2>
              {percentage === 100 ? (
                <p
                  className="text-lg leading-relaxed max-w-2xl mx-auto"
                  style={{ color: '#475569' }}
                >
                  {getSuccessMessage()}
                </p>
              ) : (
                <p
                  className="text-lg leading-relaxed max-w-2xl mx-auto"
                  style={{ color: '#475569' }}
                >
                  {getSuccessMessage()}
                  {getScoreSubtext() && (
                    <><br /><br /><span style={{ color: '#94A3B8', fontSize: '0.95em' }}>{getScoreSubtext()}</span></>
                  )}
                </p>
              )}
            </motion.div>

            {/* Circular Progress Ring */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative" style={{ width: '200px', height: '200px' }}>
                {/* Background Circle */}
                <svg className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }} width="200" height="200">
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                  />
                  {/* Animated Progress Circle */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="#FF7558"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 85}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                    animate={{ 
                      strokeDashoffset: animateProgress ? (2 * Math.PI * 85) * (1 - percentage / 100) : 2 * Math.PI * 85
                    }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 117, 88, 0.4))'
                    }}
                  />
                </svg>

                {/* Center Content - Percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{
                      fontSize: '56px',
                      fontWeight: 800,
                      color: '#192550',
                      lineHeight: 1
                    }}
                  >
                    {Math.round(percentage)}%
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1 }}
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#64748B',
                      marginTop: '8px'
                    }}
                  >
                    {correctCount} / {totalQuestions}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Performance Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-center mb-8"
            >
              <h2
                className="text-3xl font-bold"
                style={{
                  color: '#192550',
                  textShadow: performanceLevel === 'excellent' ? '0 0 20px rgba(255, 117, 88, 0.3)' : 'none'
                }}
              >
                {percentage === 100 ? 'Výborně!' : percentage >= 90 ? 'Skvělá práce!' : percentage >= 70 ? 'Dobrý výkon!' : 'Zkus to znovu!'}
              </h2>
            </motion.div>

            {/* Wrong Answers Review Section */}
            {questionsData && (() => {
              // In retry mode: show only questions that were retried AND still wrong
              // In normal mode: show all wrong questions
              const wrongInThisRound = retryMode
                ? questionsData.filter(q => retryQuestions.includes(q.questionNumber) && !questionResults[q.questionNumber - 1])
                : questionsData.filter((_, i) => !questionResults[i]);
              return wrongInThisRound.length > 0;
            })() && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2.15 }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: '1px solid #FEE2E2', backgroundColor: '#FFFBFB' }}
                >
                  <div
                    className="px-5 py-3 flex items-center gap-2"
                    style={{ backgroundColor: '#FEF2F2', borderBottom: '1px solid #FEE2E2' }}
                  >
                    <XCircle className="w-4 h-4" style={{ color: '#DC2626' }} />
                    <h3 className="text-base font-bold" style={{ color: '#991B1B' }}>Přehled výsledků</h3>
                    <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                      {(() => {
                        const cnt = retryMode
                          ? questionsData.filter(q => retryQuestions.includes(q.questionNumber) && !questionResults[q.questionNumber - 1]).length
                          : questionsData.filter((_, i) => !questionResults[i]).length;
                        return `${cnt} ${cnt === 1 ? 'otázka' : cnt < 5 ? 'otázky' : 'otázek'}`;
                      })()}
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#FEE2E2' }}>
                    {(retryMode
                      ? questionsData.filter(q => retryQuestions.includes(q.questionNumber) && !questionResults[q.questionNumber - 1])
                      : questionsData.filter((_, i) => !questionResults[i])
                    )
                      .map((q, animIdx) => {
                        const userAnswer = selectedAnswers[q.questionNumber];
                        return (
                          <motion.div
                            key={q.questionNumber}
                            className="p-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 2.2 + animIdx * 0.06 }}
                          >
                            {/* Question header */}
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
                              >
                                {q.questionNumber}
                              </div>
                              <p className="text-sm font-semibold leading-snug" style={{ color: '#192550' }}>
                                {q.questionText}
                              </p>
                            </div>

                            {/* User answer */}
                            {userAnswer && (
                              <div
                                className="flex items-start gap-2 mb-2 px-3 py-2 rounded-lg"
                                style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
                              >
                                <X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#DC2626' }} />
                                <div>
                                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#DC2626' }}>Tvoje odpověď</span>
                                  <p className="text-sm mt-0.5 leading-relaxed" style={{ color: '#7F1D1D', whiteSpace: 'pre-wrap' }}>{userAnswer}</p>
                                </div>
                              </div>
                            )}

                            {/* Correct answer */}
                            <div
                              className="flex items-start gap-2 mb-3 px-3 py-2 rounded-lg"
                              style={{ backgroundColor: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
                            >
                              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#059669' }} />
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#059669' }}>Správná odpověď</span>
                                <p className="text-sm mt-0.5 leading-relaxed" style={{ color: '#064E3B', whiteSpace: 'pre-wrap' }}>{q.correctAnswer}</p>
                              </div>
                            </div>

                            {/* Explanation */}
                            {q.explanation && (
                              <div
                                className="flex items-start gap-2 px-3 py-2 rounded-lg"
                                style={{ backgroundColor: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.12)' }}
                              >
                                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6366F1' }} />
                                <div>
                                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6366F1' }}>Vysvětlení</span>
                                  <p className="text-sm mt-0.5 leading-relaxed" style={{ color: '#3730A3', whiteSpace: 'pre-wrap' }}>{q.explanation}</p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.2 }}
            >
              {correctCount === totalQuestions ? (
                <Button
                  onClick={() => setShowCertificate(true)}
                  className="h-[56px] px-8 rounded-xl font-semibold text-base transition-all group"
                  style={{ 
                    backgroundColor: '#FF7558',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(255, 117, 88, 0.3)',
                    minWidth: '280px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF6346';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 117, 88, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF7558';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 117, 88, 0.3)';
                  }}
                >
                  <FileCheck className="w-5 h-5 mr-2" />
                  Získat certifikát
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <>
                  {onRetry && (
                    <Button
                      onClick={onRetry}
                      className="h-[56px] px-8 rounded-xl font-semibold text-base transition-all group"
                      style={{ 
                        backgroundColor: '#FF7558',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(255, 117, 88, 0.3)',
                        minWidth: '280px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FF6346';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 117, 88, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FF7558';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 117, 88, 0.3)';
                      }}
                    >
                      Zopakovat test
                      <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </>
              )}
            </motion.div>

            {/* Bottom Info Text */}
            <motion.div
              className="mt-8 p-5 rounded-xl text-center"
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.1)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.4 }}
            >
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                Tady máš na jednom místě všechny zdroje, ke kterým se můžeš kdykoliv vrátit, když si nebudeš jistý/á (prezentace, ukázky formátů, desatero, FAQ a další).
                A pokud chceš jít ještě víc do hloubky, čeká na Tebe navazující test zaměřený na fungování Meta kampaní.
              </p>
            </motion.div>
          </motion.div>

          {/* Detailed Review Section - HIDDEN - Content moved to ReviewModal via Eye icon */}
          {/* This section's content is now shown only in the ReviewModal when user clicks eye icon */}
          {false && questionsData && questionsData.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.6 }}
            >
              {/* Section Header */}
              <div className="mb-8">
                <h3 
                  className="text-2xl font-bold text-center mb-2"
                  style={{ color: '#192550' }}
                >
                  Detailní přehled všech otázek
                </h3>
                <p className="text-center text-sm" style={{ color: '#64748B' }}>
                  Zkontroluj si své odpovědi a vysvětlení ke všem úkolům
                </p>
              </div>

              {/* Multi-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {questionsData.map((question, index) => (
                  <motion.div
                    key={question.questionNumber}
                    className="relative"
                    style={{
                      background: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
                      border: question.isCorrect
                        ? '2px solid rgba(16, 185, 129, 0.3)'
                        : '2px solid rgba(239, 68, 68, 0.3)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.8 + index * 0.05 }}
                  >
                    {/* Question Number Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: question.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: question.isCorrect ? '#059669' : '#DC2626'
                        }}
                      >
                        OTÁZKA {question.questionNumber}
                      </div>
                      {question.isCorrect ? (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#10B981' }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#EF4444' }}
                        >
                          <X className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className="mb-4">
                      <p
                        className="text-sm leading-relaxed font-semibold"
                        style={{ color: '#192550' }}
                      >
                        {question.questionText}
                      </p>
                    </div>

                    {/* Selected Answer */}
                    <div className="mb-3">
                      <div className="text-xs font-bold mb-1" style={{ color: '#64748B' }}>
                        TVOJE ODPOVĚĎ:
                      </div>
                      <div
                        className="p-3 rounded-lg border-2"
                        style={{ 
                          backgroundColor: question.isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                          borderColor: question.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                        }}
                      >
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: '#192550' }}
                        >
                          {question.selectedAnswer}
                        </p>
                      </div>
                    </div>

                    {/* Correct Answer (if different) */}
                    {!question.isCorrect && (
                      <div className="mb-3">
                        <div className="text-xs font-bold mb-1" style={{ color: '#64748B' }}>
                          SPRÁVNÁ ODPOVĚĎ:
                        </div>
                        <div
                          className="p-3 rounded-lg border-2"
                          style={{ 
                            backgroundColor: 'rgba(16, 185, 129, 0.05)',
                            borderColor: 'rgba(16, 185, 129, 0.2)'
                          }}
                        >
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: '#192550' }}
                          >
                            {question.correctAnswer}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div>
                      <div className="text-xs font-bold mb-1" style={{ color: '#64748B' }}>
                        VYSVĚTLENÍ:
                      </div>
                      <div
                        className="p-3 rounded-lg"
                        style={{ 
                          backgroundColor: 'rgba(99, 102, 241, 0.05)',
                          border: '1px solid rgba(99, 102, 241, 0.1)'
                        }}
                      >
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: '#475569' }}
                        >
                          {question.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}>
                      <div
                        className="inline-flex items-center gap-1.5 text-xs font-bold"
                        style={{ color: question.isCorrect ? '#059669' : '#DC2626' }}
                      >
                        {question.isCorrect ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Správně
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Nesprávně
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Resources Section - Odkazy na materiály */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3 }}
          >
            <div 
              className="relative"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '48px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Section Title */}
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ 
                  color: '#192550',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Odkazy na materiály
              </h3>

              {/* Intro Text */}
              <p 
                className="text-base leading-relaxed mb-8"
                style={{ 
                  color: '#475569',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Chceš si projít argumenty detailněji nebo mít podklady po ruce při obchodních jednáních? Níže najdeš všechny důležité materiály na jednom místě.
              </p>

              {/* Links List */}
              <div className="space-y-4"
                style={{
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {/* Link 1 */}
                <a
                  href="https://nelisa.com/cs-cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#AE54FF';
                    e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span className="text-xl flex-shrink-0">🌐</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1" style={{ color: '#192550' }}>
                      Oficiální web Nelisy
                    </div>
                    <div className="text-sm" style={{ color: '#AE54FF' }}>
                      https://nelisa.com/cs-cz
                    </div>
                  </div>
                </a>

                {/* Link 2 */}
                <a
                  href="https://nelisacom.notion.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#AE54FF';
                    e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span className="text-xl flex-shrink-0">📘</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1" style={{ color: '#192550' }}>
                      Obchodní podklady a prezentace
                    </div>
                    <div className="text-sm" style={{ color: '#AE54FF' }}>
                      https://nelisacom.notion.site/
                    </div>
                  </div>
                </a>

                {/* Link 3 */}
                <a
                  href="https://www.notion.so/almacareer/Nelisa-30cabb65fca54aa2ba430a46f553e613?v=a9e613d01b0b48c1af929ac9aed078c5&source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#AE54FF';
                    e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span className="text-xl flex-shrink-0">🧠</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1" style={{ color: '#192550' }}>
                      Interní knowledge base
                    </div>
                    <div className="text-sm" style={{ color: '#AE54FF' }}>
                      https://www.notion.so/almacareer/Nelisa-30cabb65fca54aa2ba430a46f553e613
                    </div>
                  </div>
                </a>

                {/* Link 4 */}
                <a
                  href="https://nelisa-obchodni-pomocnik.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#AE54FF';
                    e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span className="text-xl flex-shrink-0">🤝</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1" style={{ color: '#192550' }}>
                      Obchodní pomocník
                    </div>
                    <div className="text-sm" style={{ color: '#AE54FF' }}>
                      https://nelisa-obchodni-pomocnik.netlify.app/
                    </div>
                  </div>
                </a>

                {/* Link 5 */}
                <a
                  href="https://www.notion.so/almacareer/Cen-k-2026-2836f3e88bc280aa8dc2d07fed941bc9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#AE54FF';
                    e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span className="text-xl flex-shrink-0">💰</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1" style={{ color: '#192550' }}>
                      Ceník 2026
                    </div>
                    <div className="text-sm" style={{ color: '#AE54FF' }}>
                      https://www.notion.so/almacareer/Cen-k-2026-2836f3e88bc280aa8dc2d07fed941bc9
                    </div>
                  </div>
                </a>
              </div>

              {/* Module CTA Button */}
              {onModuleClick && (
                <div className="mt-10 pt-8" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <p className="text-sm mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
                    Chceš lépe pochopit, jak fungují reklamy na sociálních sítích?
                  </p>
                  <button
                    onClick={onModuleClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #AE54FF 0%, #8B35D6 100%)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '10px 22px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(174,84,255,0.35)',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    📱 Jak fungují reklamy na soc. sítích
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Confetti Animation for 90%+ scores */}
        {percentage >= 90 && (
          <>
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute"
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: ['#FF7558', '#192550', '#FCD34D', '#60A5FA'][i % 4],
                  borderRadius: i % 2 === 0 ? '50%' : '0',
                  left: '50%',
                  top: '20%',
                  zIndex: 100
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  rotate: 0
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 600,
                  y: Math.random() * 600 + 200,
                  opacity: 0,
                  rotate: Math.random() * 720
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5 + 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          userName={userName}
          userEmail={userEmail}
          correctAnswers={correctCount}
          totalQuestions={totalQuestions}
          onClose={() => setShowCertificate(false)}
        />
      )}


    </>
  );
}