import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Check, CheckCircle, XCircle, ListChecks, MessageCircle } from 'lucide-react';

interface AnswerOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface StoryWithQuestionProps {
  questionNumber?: number;
  storyText: React.ReactNode;
  questionText: string;
  options: AnswerOption[];
  correctFeedback: string;
  incorrectFeedback: string;
  onNext?: () => void;
  onLogoClick?: () => void;
}

export function StoryWithQuestion({ 
  questionNumber = 2,
  storyText,
  questionText,
  options,
  correctFeedback,
  incorrectFeedback,
  onNext,
  onLogoClick 
}: StoryWithQuestionProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleCardClick = (cardId: string) => {
    if (isConfirmed) return;
    setSelectedCard(cardId);
  };

  const handleConfirm = () => {
    if (!selectedCard) return;
    
    const selectedOption = options.find(c => c.id === selectedCard);
    if (selectedOption) {
      setFeedback(selectedOption.isCorrect ? 'correct' : 'incorrect');
      setIsConfirmed(true);
      
      // Auto-advance after 2 seconds on correct answer
      if (selectedOption.isCorrect) {
        setTimeout(() => {
          onNext?.();
        }, 2000);
      }
    }
  };

  const handleTryAgain = () => {
    setSelectedCard(null);
    setIsConfirmed(false);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}

      {/* Main Content - Centered */}
      <div className="flex items-start justify-center min-h-[calc(100vh-64px)] py-12 px-8">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Story Section - Compact */}
          <motion.div 
            className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 mb-8"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* PŘÍBĚH Tag - Unified style */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border"
              style={{ 
                backgroundColor: '#F3E8FF', 
                borderColor: '#E9D5FF',
                cursor: 'default'
              }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: '#6B21A8' }} strokeWidth={2} />
              <span className="text-sm font-bold uppercase tracking-wide" style={{ color: '#6B21A8' }}>
                PŘÍBĚH
              </span>
            </div>

            {/* Story Text - Compact */}
            <div className="text-slate-700 text-sm leading-relaxed">
              {storyText}
            </div>
          </motion.div>

          {/* Question Panel */}
          <div 
            className="bg-white rounded-3xl p-12 relative"
            style={{
              boxShadow: `
                0 0 0 1px rgba(0, 0, 0, 0.02),
                0 2px 4px rgba(0, 0, 0, 0.03),
                0 8px 16px rgba(0, 0, 0, 0.06),
                0 24px 48px rgba(0, 0, 0, 0.08)
              `
            }}
          >
            {/* Question Header */}
            <div className="mb-10">
              {/* Type Tag - Blue */}
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border-2 border-blue-300 mb-6">
                <ListChecks className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold text-blue-800 tracking-wider">
                  VÝBĚR ODPOVĚDI
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {questionText}
              </h3>
            </div>

            {/* Answer Cards Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {options.map((option) => {
                const isSelected = selectedCard === option.id;
                const isCorrectCard = option.isCorrect;
                const showCorrect = isConfirmed && isCorrectCard;
                const showIncorrect = isConfirmed && isSelected && !isCorrectCard;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleCardClick(option.id)}
                    disabled={isConfirmed}
                    className={`
                      relative p-6 rounded-2xl border-2 text-left transition-all
                      ${isSelected && !isConfirmed ? 'bg-blue-50 border-blue-500 shadow-lg' : ''}
                      ${!isSelected && !isConfirmed ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md' : ''}
                      ${showCorrect ? 'bg-green-50 border-green-500 shadow-lg' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-400' : ''}
                      ${isConfirmed && !showCorrect && !showIncorrect ? 'bg-white border-gray-200 opacity-50' : ''}
                      ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    whileHover={!isConfirmed ? { scale: 1.02 } : {}}
                    whileTap={!isConfirmed ? { scale: 0.98 } : {}}
                  >
                    {/* Card Label and Text */}
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                        ${isSelected && !isConfirmed ? 'bg-blue-600 text-white' : ''}
                        ${!isSelected && !isConfirmed ? 'bg-gray-100 text-gray-600' : ''}
                        ${showCorrect ? 'bg-green-600 text-white' : ''}
                        ${showIncorrect ? 'bg-red-500 text-white' : ''}
                      `}>
                        {option.label}
                      </div>

                      {/* Card Text */}
                      <p className="text-gray-700 text-base leading-relaxed flex-1">
                        {option.text}
                      </p>

                      {/* Status Icon */}
                      {showCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </motion.div>
                      )}
                      {showIncorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <XCircle className="w-6 h-6 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Message */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-6 p-5 rounded-xl border-2 ${
                    feedback === 'correct' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-orange-50 border-orange-200'
                  }`}
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    {feedback === 'correct' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-semibold mb-1 ${
                        feedback === 'correct' ? 'text-green-900' : 'text-orange-900'
                      }`}>
                        {feedback === 'correct' ? 'Správně!' : 'Zkus to znovu'}
                      </p>
                      <p className={`text-sm ${
                        feedback === 'correct' ? 'text-green-800' : 'text-orange-800'
                      }`}>
                        {feedback === 'correct' ? correctFeedback : incorrectFeedback}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isConfirmed && (
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedCard}
                  className={`
                    flex-1 py-6 rounded-xl font-semibold text-base transition-all
                    ${selectedCard
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Zkontrolovat
                  <Check className="w-5 h-5 ml-2" />
                </Button>
              )}
              {isConfirmed && (feedback === 'incorrect' || feedback === 'correct') && (
                <>
                  <Button
                    onClick={handleTryAgain}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-xl"
                  >
                    Zkusit znovu
                  </Button>
                  <Button
                    onClick={onNext}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-6 rounded-xl"
                  >
                    Pokračovat
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Progress Badge */}
          <div className="flex justify-center mt-8">
            <div className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
              {questionNumber} / 12
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}