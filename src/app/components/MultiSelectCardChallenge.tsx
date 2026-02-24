import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, X, CheckSquare, CheckCircle, Users, Target, TrendingUp, XCircle, ListChecks } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { QuotedText } from '@/app/components/ui/QuotedText';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface CardOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MultiSelectCardChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  options: CardOption[];
  correctFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  explanationText: string;
  questionTypeTag?: string;
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
}

export function MultiSelectCardChallenge({ 
  questionNumber,
  questionText,
  options,
  correctFeedback,
  incorrectFeedback,
  explanationText,
  questionTypeTag = "VÍCE ODPOVĚDÍ",
  onNext,
  onBack,
  onLogoClick,
  onSkip
}: MultiSelectCardChallengeProps) {
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCardClick = (cardId: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  const checkAnswer = () => {
    const correctIds = options.filter(opt => opt.isCorrect).map(opt => opt.id);
    const selectedIds = Array.from(selectedCards);
    
    const correctlySelected = selectedIds.filter(id => correctIds.includes(id)).length;
    const incorrectlySelected = selectedIds.filter(id => !correctIds.includes(id)).length;
    
    if (correctlySelected === correctIds.length && incorrectlySelected === 0) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  };

  const handleContinue = () => {
    if (selectedCards.size === 0) return;
    
    if (!showFeedback) {
      // Show feedback
      setShowFeedback(true);
    } else {
      // Move to next question
      onNext?.();
    }
  };

  const feedbackResult = showFeedback ? checkAnswer() : null;
  const feedback = feedbackResult === 'correct' ? correctFeedback : 
                   incorrectFeedback;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}
      {/* REMOVED: ProgressSection - now global in App.tsx */}

      {/* Decorative Background Icons - Light, playful, floating */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '20%', left: '12%', opacity: 0.03, zIndex: 0 }}
        animate={{
          y: [-8, 8, -8],
          x: [0, 5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <CheckCircle className="w-4 h-4" stroke="#22C55E" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '50%', left: '8%', opacity: 0.035, zIndex: 0 }}
        animate={{
          y: [10, -10, 10],
          x: [0, -6, 0]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Users className="w-5 h-5" stroke="#FB923C" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '25%', right: '10%', opacity: 0.03, zIndex: 0 }}
        animate={{
          y: [-6, 10, -6],
          x: [0, -5, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Target className="w-4 h-4" stroke="#AE54FF" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '15%', right: '12%', opacity: 0.035, zIndex: 0 }}
        animate={{
          y: [8, -8, 8],
          x: [0, 6, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <TrendingUp className="w-5 h-5" stroke="#3B82F6" strokeWidth={1.5} />
      </motion.div>

      {/* Main Content */}
      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Challenge Card */}
          <div 
            className="bg-white rounded-3xl p-8 relative"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(174, 84, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Question Type Label */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                <ListChecks className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>
                  {questionTypeTag}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {questionText}
            </h3>

            {/* Cards Grid - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {options.map((card) => {
                const isSelected = selectedCards.has(card.id);
                const showCorrect = showFeedback && isSelected && card.isCorrect;
                const showIncorrect = showFeedback && isSelected && !card.isCorrect;
                const showRevealed = showFeedback && !isSelected && card.isCorrect;
                const isNeutral = showFeedback && !isSelected && !card.isCorrect;
                const showAsIncorrectlySelected = showFeedback && !isSelected && !card.isCorrect;

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => !showFeedback && handleCardClick(card.id)}
                    disabled={showFeedback}
                    className={`
                      relative p-6 rounded-2xl border-2 text-left
                      ${!showFeedback && !isSelected ? 'bg-white border-gray-200 cursor-pointer' : ''}
                      ${showCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-500' : ''}
                      ${showRevealed ? 'bg-green-50/50 border-green-300' : ''}
                      ${isNeutral ? 'bg-white border-gray-200 opacity-50' : ''}
                      ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    style={{
                      ...((!showFeedback && isSelected)
                        ? {
                            backgroundColor: 'var(--bg-soft)',
                            borderColor: 'var(--primary-brand)',
                            boxShadow: '0 0 0 3px var(--primary-disabled), 0 4px 12px rgba(174, 84, 255, 0.15), 0 2px 4px rgba(174, 84, 255, 0.1)'
                          }
                        : {}),
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && !showFeedback) {
                        e.currentTarget.style.borderColor = 'var(--card-border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-soft)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !showFeedback) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                    whileHover={!showFeedback ? { scale: 1.012, y: -3 } : {}}
                    whileTap={!showFeedback ? { scale: 0.988 } : {}}>
                    <div className="flex items-start gap-3">
                      <p className={`
                        text-base leading-relaxed flex-1
                        ${!showFeedback && isSelected ? 'text-gray-900' : ''}
                        ${!showFeedback && !isSelected ? 'text-gray-700' : ''}
                        ${showCorrect || showRevealed ? 'text-gray-900' : ''}
                        ${showIncorrect ? 'text-red-900' : ''}
                        ${isNeutral ? 'text-gray-500' : ''}
                      `}
                        style={{
                          transition: 'color 0.2s ease-in-out',
                          fontWeight: 400
                        }}
                      >
                        {card.text}
                      </p>

                      {/* Status Icon - Inline */}
                      {showCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {/* Checkmark for revealed correct answer (not selected) */}
                      {showRevealed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {/* X mark for incorrectly selected answer */}
                      {showIncorrect && (
                        <motion.div
                          initial={{ scale: 0, rotate: 90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
                        >
                          <X className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Section */}
            {showFeedback && feedback && (
              <>
                {feedbackResult === 'correct' ? (
                  <CorrectFeedback text={`${feedback.message} ${feedback.encouragement}`} />
                ) : (
                  <motion.div 
                    className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
                    style={{
                      backgroundColor: '#FEF2F2',
                      borderColor: '#EF4444'
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <XCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#EF4444' }} />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-1" style={{ 
                        color: '#991B1B' 
                      }}>
                        {feedback.message}
                      </h4>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {feedback.encouragement}
                      </p>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              {!showFeedback && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                >
                  Zpět
                </Button>
              )}
              {showFeedback && <div></div>}

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  disabled={selectedCards.length === 0}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedCards.length > 0
                      ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedCards.length > 0) {
                      e.currentTarget.style.backgroundColor = '#9333EA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCards.length > 0) {
                      e.currentTarget.style.backgroundColor = '#AE54FF';
                    }
                  }}
                >
                  {showFeedback ? 'Pokračovat' : 'Zkontrolovat'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Logo Navigation */}
      <FooterLogoNavigation onLogoClick={onLogoClick} />
    </div>
  );
}