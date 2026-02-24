import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ChevronRight, ListChecks, Check, X } from 'lucide-react';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { CorrectFeedback } from '@/app/components/CorrectFeedback';
import { QuotedText } from '@/app/components/ui/QuotedText';

interface ChecklistOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ChecklistChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  options: ChecklistOption[];
  correctFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  partialFeedback?: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  explanationText?: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function ChecklistChallenge({
  questionNumber,
  questionText,
  options,
  correctFeedback,
  partialFeedback,
  incorrectFeedback,
  explanationText,
  onNext,
  onBack,
  onAnswerSubmit,
  onLogoClick,
  onSkip
}: ChecklistChallengeProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleToggle = (optionId: string) => {
    if (isConfirmed) return;
    
    const newSelected = new Set(selectedIds);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedIds(newSelected);
  };

  const checkAnswer = () => {
    const correctIds = options.filter(opt => opt.isCorrect).map(opt => opt.id);
    const selectedArray = Array.from(selectedIds);
    
    const correctlySelected = selectedArray.filter(id => correctIds.includes(id)).length;
    const incorrectlySelected = selectedArray.filter(id => !correctIds.includes(id)).length;
    
    if (correctlySelected === correctIds.length && incorrectlySelected === 0) {
      return 'correct';
    } else if (correctlySelected > 0 && incorrectlySelected === 0) {
      return 'partial';
    } else {
      return 'incorrect';
    }
  };

  const handleContinue = () => {
    if (selectedIds.size === 0) return;

    if (!isConfirmed) {
      setIsConfirmed(true);
      const result = checkAnswer();
      const selectedLabels = options
        .filter(o => selectedIds.has(o.id))
        .map(o => o.text)
        .join(', ');
      onAnswerSubmit?.(result === 'correct', selectedLabels);
    } else {
      onNext?.();
    }
  };

  const feedbackResult = isConfirmed ? checkAnswer() : null;
  const feedback = feedbackResult === 'correct' ? correctFeedback : 
                   feedbackResult === 'partial' ? partialFeedback : 
                   incorrectFeedback;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div
          className="w-full"
          style={{ maxWidth: '920px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle Background Card Layer */}
          <div
            className="rounded-3xl"
            style={{
              backgroundColor: '#F8F9FA',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.03)'
            }}
          >
            {/* Challenge Card */}
            <div 
              className="bg-white rounded-3xl p-8 relative"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              {/* Question Type Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <ListChecks className="w-4 h-4" style={{ color: '#AE54FF' }} />
                  <span className="text-xs font-semibold tracking-wider" style={{ color: '#AE54FF' }}>
                    VÍCE ODPOVĚDÍ
                  </span>
                </div>
              </div>

              {/* Question Text - MANDATORY: 24px SemiBold with purple underline */}
              <h3 
                className="text-gray-900 mb-4 leading-tight" 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 600, 
                  lineHeight: '130%', 
                  letterSpacing: 0
                }}
              >
                {questionText}
              </h3>

              {/* Checklist Options */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {options.map((option) => {
                  const isSelected = selectedIds.has(option.id);
                  const showResult = isConfirmed;
                  const isCorrectAnswer = option.isCorrect;
                  const isCorrectSelection = showResult && isSelected && isCorrectAnswer;
                  const isIncorrectSelection = showResult && isSelected && !isCorrectAnswer;
                  const isMissedCorrect = showResult && !isSelected && isCorrectAnswer;

                  return (
                    <motion.div
                      key={option.id}
                      onClick={() => handleToggle(option.id)}
                      className="relative rounded-xl border-2 cursor-pointer select-none transition-all duration-150"
                      style={{
                        backgroundColor: isCorrectSelection ? '#D1FAE5' :
                                        isIncorrectSelection ? '#FEE2E2' :
                                        isMissedCorrect ? '#D1FAE5' :
                                        isSelected ? '#FAF5FF' :
                                        '#FAFAFA',
                        borderColor: isCorrectSelection ? '#10B981' :
                                    isIncorrectSelection ? '#EF4444' :
                                    isMissedCorrect ? '#10B981' :
                                    isSelected ? '#E9D5FF' :
                                    '#E5E7EB',
                        cursor: isConfirmed ? 'default' : 'pointer',
                        pointerEvents: isConfirmed ? 'none' : 'auto',
                      }}
                      whileHover={!isConfirmed ? { 
                        backgroundColor: isSelected ? '#F5F3FF' : '#F9FAFB',
                        borderColor: isSelected ? '#DDD6FE' : '#D1D5DB'
                      } : {}}
                      whileTap={!isConfirmed ? { scale: 0.995 } : {}}
                    >
                      <div className="flex items-center gap-4 p-6">
                        {/* Checkbox */}
                        <div 
                          className="flex-shrink-0 flex items-center justify-center rounded transition-all duration-150"
                          style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: isCorrectSelection ? '#10B981' :
                                            isIncorrectSelection ? '#EF4444' :
                                            isMissedCorrect ? '#10B981' :
                                            isSelected ? '#7C3AED' :
                                            'transparent',
                            border: isCorrectSelection || isIncorrectSelection || isMissedCorrect || isSelected ? 'none' : '2px solid #7C3AED',
                          }}
                        >
                          {isSelected && !isConfirmed && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                          {isCorrectSelection && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                          {isIncorrectSelection && (
                            <X className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                          {isMissedCorrect && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>

                        {/* Text Label */}
                        <p 
                          className="flex-1 text-base leading-relaxed"
                          style={{
                            color: isCorrectSelection ? '#065F46' :
                                  isIncorrectSelection ? '#991B1B' :
                                  isMissedCorrect ? '#065F46' :
                                  isSelected ? '#1F2937' :
                                  '#374151',
                            fontWeight: 400
                          }}
                        >
                          <QuotedText>{option.text}</QuotedText>
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Feedback Section */}
              {isConfirmed && feedbackResult === 'correct' && (
                <CorrectFeedback text={`${correctFeedback.message} ${correctFeedback.encouragement}`} />
              )}
              
              {/* Explanation Block - shown for all results after confirmation */}
              {isConfirmed && explanationText && (
                <ExplanationBlock>
                  {explanationText}
                </ExplanationBlock>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Zpět na příběh
                  </Button>
                  {!isConfirmed && onSkip && (
                    <Button
                      variant="ghost"
                      onClick={onSkip}
                      className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                    >
                      Přeskočit úkol
                    </Button>
                  )}
                </div>
                {isConfirmed && <div></div>}

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleContinue}
                    disabled={selectedIds.size === 0}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg group"
                    style={
                      selectedIds.size > 0
                        ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                        : { borderRadius: '12px' }
                    }
                    onMouseEnter={(e) => {
                      if (selectedIds.size > 0) {
                        e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIds.size > 0) {
                        e.currentTarget.style.backgroundColor = '#AE54FF';
                      }
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isConfirmed ? 'Pokračovat' : 'Zkontrolovat'}
                      <ChevronRight className="w-5 h-5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}