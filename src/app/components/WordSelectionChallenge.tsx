import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { CorrectFeedback } from '@/app/components/CorrectFeedback';
import { ChevronRight, XCircle, FileText, CheckCircle, Users, Target, TrendingUp, Check, X } from 'lucide-react';

interface WordSelectionChallengeProps {
  questionNumber?: number;
  questionText: string | React.ReactNode;
  sentenceParts: {
    before: string[];
    after: string[];
  };
  blanks: {
    id: string;
    correctWord: string;
    position: number;
  }[];
  wordOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  partialFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function WordSelectionChallenge({
  questionNumber = 1,
  questionText,
  sentenceParts,
  blanks,
  wordOptions,
  correctFeedback,
  partialFeedback,
  incorrectFeedback,
  onNext,
  onBack,
  onLogoClick
}: WordSelectionChallengeProps) {
  const [selectedWords, setSelectedWords] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleWordClick = (blankId: string, wordText: string) => {
    if (showFeedback) return; // Don't allow changes after feedback
    
    setSelectedWords(prev => ({
      ...prev,
      [blankId]: wordText
    }));
  };

  const checkAnswer = () => {
    let correctCount = 0;
    let totalBlanks = blanks.length;
    
    blanks.forEach((blank) => {
      const selected = selectedWords[blank.id];
      if (selected === blank.correctWord) {
        correctCount++;
      }
    });

    if (correctCount === totalBlanks) {
      return 'correct';
    } else if (correctCount > 0) {
      return 'partial';
    } else {
      return 'incorrect';
    }
  };

  const handleContinue = () => {
    // Check if all blanks are filled
    const allFilled = blanks.every(blank => selectedWords[blank.id]);
    if (!allFilled) return;
    
    if (!showFeedback) {
      const result = checkAnswer();
      setIsCorrect(result === 'correct');
      setShowFeedback(true);
    } else {
      onNext?.();
    }
  };

  const renderBlankWithOptions = (blank: { id: string; correctWord: string; position: number }) => {
    const selectedWord = selectedWords[blank.id];
    const isCorrect = selectedWord === blank.correctWord;
    
    return (
      <div key={blank.id} className="inline-flex flex-wrap items-center gap-2 mx-2">
        <span
          className="inline-block px-3 py-1 border-b-2 border-dashed min-w-[100px] text-center font-medium"
          style={{
            borderColor: selectedWord ? '#ff7400' : '#9CA3AF',
            color: selectedWord ? '#ff7400' : '#9CA3AF'
          }}
        >
          {selectedWord || '______'}
        </span>
        <div className="inline-flex gap-2">
          {wordOptions.map((word) => {
            const isSelectedForThisBlank = selectedWords[blank.id] === word.text;
            const showAsCorrect = showFeedback && isSelectedForThisBlank && isCorrect;
            const showAsIncorrect = showFeedback && isSelectedForThisBlank && !isCorrect;
            
            return (
              <button
                key={word.id}
                onClick={() => handleWordClick(blank.id, word.text)}
                disabled={showFeedback}
                className={`
                  px-3 py-1 rounded-lg border-2 text-sm font-medium transition-all inline-flex items-center gap-1.5
                  ${showAsCorrect ? 'border-green-500 bg-green-50 text-green-700' : ''}
                  ${showAsIncorrect ? 'border-red-500 bg-red-50 text-red-700' : ''}
                  ${!showFeedback && isSelectedForThisBlank ? 'border-orange-500 bg-orange-50 text-orange-700' : ''}
                  ${!showFeedback && !isSelectedForThisBlank ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300' : ''}
                `}
                style={{
                  cursor: showFeedback ? 'not-allowed' : 'pointer',
                  opacity: showFeedback && !isSelectedForThisBlank ? 0.4 : 1
                }}
              >
                {/* Check icon for correct */}
                {showAsCorrect && (
                  <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                )}
                {/* X icon for incorrect */}
                {showAsIncorrect && (
                  <X className="w-3.5 h-3.5 text-red-600" strokeWidth={3} />
                )}
                {word.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative Background Icons */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '15%', left: '8%', opacity: 0.04, zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <FileText className="w-20 h-20 text-orange-600" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '45%', left: '5%', opacity: 0.05, zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <Users className="w-16 h-16 text-orange-600" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '20%', right: '6%', opacity: 0.04, zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <Target className="w-18 h-18 text-orange-600" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '10%', right: '8%', opacity: 0.05, zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        <TrendingUp className="w-16 h-16 text-orange-600" strokeWidth={1.5} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* REMOVED: QuizTopNavigation - now global in App.tsx */}
        <div className="px-8 py-8">
          {/* REMOVED: ProgressSection - now global in App.tsx */}

          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-sm">
              {/* Type Badge */}
              <div className="inline-block mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                  style={{ backgroundColor: '#fff7ed', color: '#ff7400' }}
                >
                  VIAC MOZNOSTI
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {questionText}
              </h3>

              {/* Sentence with Inline Word Options */}
              <div className="mb-8 p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <div className="text-gray-700 text-lg leading-relaxed">
                  {sentenceParts.before[0]}
                  {blanks.map((blank, idx) => (
                    <span key={blank.id}>
                      {renderBlankWithOptions(blank)}
                      {sentenceParts.before[idx + 1] || sentenceParts.after[idx]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <>
                  {isCorrect ? (
                    <CorrectFeedback text={`${correctFeedback.message} ${correctFeedback.encouragement}`} />
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
                        <h4 className="text-lg font-bold mb-1" style={{ color: '#991B1B' }}>
                          {checkAnswer() === 'partial' ? partialFeedback.message : incorrectFeedback.message}
                        </h4>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {checkAnswer() === 'partial' ? partialFeedback.encouragement : incorrectFeedback.encouragement}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                >
                  Vratit sa na prehlad
                </Button>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleContinue}
                    disabled={!blanks.every(blank => selectedWords[blank.id])}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                    style={
                      blanks.every(blank => selectedWords[blank.id])
                        ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                        : { borderRadius: '12px' }
                    }
                    onMouseEnter={(e) => {
                      if (blanks.every(blank => selectedWords[blank.id])) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (blanks.every(blank => selectedWords[blank.id])) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                      }
                    }}
                  >
                    {showFeedback ? 'Prejst na dalsiu ulohu' : 'Pokracovat'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}