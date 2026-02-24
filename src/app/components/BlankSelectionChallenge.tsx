import { useState } from 'react';
import { ChevronRight, Check, X, PenLine } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { motion, AnimatePresence } from 'motion/react';

interface BlankOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Blank {
  id: string;
  options: BlankOption[];
  correctAnswer: string;
}

interface BlankSelectionChallengeProps {
  questionNumber?: number;
  questionText: string | React.ReactNode;
  blanks: Blank[];
  explanationText?: string;
  questionTypeTag?: string;
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
}

export function BlankSelectionChallenge({
  questionNumber = 1,
  questionText,
  blanks,
  explanationText,
  questionTypeTag = "ÚKOL · DOPLŇ VĚTY",
  onNext,
  onBack,
  onLogoClick,
  onSkip
}: BlankSelectionChallengeProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (blankId: string, optionText: string) => {
    if (showFeedback) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [blankId]: optionText
    }));
  };

  const handleContinue = () => {
    const allFilled = blanks.every(blank => selectedOptions[blank.id]);
    
    if (!allFilled) return;
    
    if (!showFeedback) {
      setShowFeedback(true);
    } else {
      onNext?.();
    }
  };

  const allFilled = blanks.every(blank => selectedOptions[blank.id]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Background */}
      <QuestionBackgroundDecoration type="choice" />

      {/* Main Content */}
      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-10">
            {/* Question Type Tag */}
            <div className="inline-block mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-wide"
                style={{
                  backgroundColor: 'rgba(174, 84, 255, 0.08)',
                  color: '#AE54FF'
                }}
              >
                {questionTypeTag}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
              {questionText}
            </h3>

            {/* Blanks Section */}
            <div className="space-y-8 mb-8">
              {blanks.map((blank, index) => {
                const selectedOption = selectedOptions[blank.id];
                const isCorrect = selectedOption === blank.correctAnswer;

                return (
                  <div key={blank.id}>
                    {/* Blank Label */}
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="inline-block px-4 py-2 rounded-lg border-2 font-semibold text-lg min-w-[200px] text-center"
                        style={{
                          borderColor: showFeedback
                            ? (isCorrect ? '#22c55e' : '#ef4444')
                            : (selectedOption ? '#AE54FF' : '#e5e7eb'),
                          backgroundColor: showFeedback
                            ? (isCorrect ? '#f0fdf4' : '#fef2f2')
                            : (selectedOption ? '#f8f4ff' : '#ffffff'),
                          color: showFeedback
                            ? (isCorrect ? '#16a34a' : '#dc2626')
                            : (selectedOption ? '#AE54FF' : '#9ca3af')
                        }}
                      >
                        {selectedOption || '________'}
                      </span>
                      {showFeedback && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          {isCorrect ? (
                            <Check className="w-6 h-6 text-green-600" strokeWidth={3} />
                          ) : (
                            <X className="w-6 h-6 text-red-600" strokeWidth={3} />
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {blank.options.map((option) => {
                        const isSelected = selectedOptions[blank.id] === option.text;
                        const showAsCorrect = showFeedback && isSelected && isCorrect;
                        const showAsIncorrect = showFeedback && isSelected && !isCorrect;

                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionClick(blank.id, option.text)}
                            disabled={showFeedback}
                            className="px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left flex items-center justify-between gap-2"
                            style={{
                              borderColor: showAsCorrect
                                ? '#22c55e'
                                : showAsIncorrect
                                ? '#ef4444'
                                : isSelected
                                ? '#AE54FF'
                                : '#e5e7eb',
                              backgroundColor: showAsCorrect
                                ? '#f0fdf4'
                                : showAsIncorrect
                                ? '#fef2f2'
                                : isSelected
                                ? '#f8f4ff'
                                : '#ffffff',
                              color: showAsCorrect
                                ? '#16a34a'
                                : showAsIncorrect
                                ? '#dc2626'
                                : isSelected
                                ? '#AE54FF'
                                : '#374151',
                              cursor: showFeedback ? 'not-allowed' : 'pointer',
                              opacity: showFeedback && !isSelected ? 0.4 : 1
                            }}
                          >
                            <span>{option.text}</span>
                            {showAsCorrect && (
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                              </div>
                            )}
                            {showAsIncorrect && (
                              <X className="w-4 h-4 text-red-600 flex-shrink-0" strokeWidth={3} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation Block */}
            <AnimatePresence>
              {showFeedback && explanationText && (
                <ExplanationBlock>
                  <p>{explanationText}</p>
                </ExplanationBlock>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
              >
                Vrátit se na přehled
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedOption}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedOption
                      ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedOption) {
                      e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedOption) {
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
    </div>
  );
}