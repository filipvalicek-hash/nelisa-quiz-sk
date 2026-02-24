import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ChevronRight, CircleDot, Check, CheckCircle, XCircle, Users, Target, TrendingUp } from 'lucide-react';

interface RolePlayOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface RolePlayChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  options: RolePlayOption[];
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
  questionTypeTag?: string;
  tagColor?: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function RolePlayChallenge({ 
  questionNumber,
  questionText,
  options,
  correctFeedback,
  incorrectFeedback,
  questionTypeTag = 'ROLE-PLAY',
  tagColor = {
    bg: '#F7F5FF',
    border: 'var(--card-border)',
    text: 'var(--primary-active)',
    accent: 'var(--primary-brand)'
  },
  onNext,
  onBack,
  onLogoClick
}: RolePlayChallengeProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (isConfirmed) return;
    setSelectedCard(cardId);
  };

  const handleConfirm = () => {
    if (!selectedCard) return;
    setIsConfirmed(true);
  };

  const handleNext = () => {
    onNext?.();
  };

  const selectedOption = options.find(opt => opt.id === selectedCard);
  const isCorrect = selectedOption?.isCorrect || false;

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
          <div 
            className="bg-white rounded-3xl p-8 relative"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Question Type Label */}
            <div className="mb-5">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}
              >
                <CircleDot className="w-4 h-4" style={{ color: '#AE54FF' }} />
                <span className="text-xs font-semibold tracking-wider" style={{ color: '#AE54FF' }}>
                  JEDNA ODPOVĚĎ
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {questionText}
            </h3>

            {/* Options - Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {options.map((option) => {
                const isSelected = selectedCard === option.id;
                const isCorrectOption = option.isCorrect;
                const showCorrect = isConfirmed && isCorrectOption;
                const showIncorrect = isConfirmed && isSelected && !isCorrectOption;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleCardClick(option.id)}
                    disabled={isConfirmed}
                    className={`
                      relative p-6 rounded-2xl border-2 text-left transition-all
                      ${isSelected && !isConfirmed ? 'bg-purple-50 border-purple-500' : ''}
                      ${!isSelected && !isConfirmed ? 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50/20' : ''}
                      ${showCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-500' : ''}
                      ${isConfirmed && !showCorrect && !showIncorrect ? 'bg-white border-gray-200 opacity-50' : ''}
                      ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    style={
                      isSelected && !isConfirmed
                        ? {
                            boxShadow: '0 4px 16px rgba(174, 84, 255, 0.15), 0 2px 6px rgba(174, 84, 255, 0.1)'
                          }
                        : undefined
                    }
                    whileHover={!isConfirmed ? { scale: 1.01, y: -2 } : {}}
                    whileTap={!isConfirmed ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                          ${isSelected && !isConfirmed ? 'bg-purple-500 text-white' : ''}
                          ${!isSelected && !isConfirmed ? 'bg-gray-100 text-gray-600' : ''}
                          ${showCorrect ? 'bg-green-500 text-white' : ''}
                          ${showIncorrect ? 'bg-red-400 text-white' : ''}
                          ${isConfirmed && !showCorrect && !showIncorrect ? 'bg-gray-100 text-gray-400' : ''}
                        `}
                      >
                        {option.label}
                      </div>
                      <p className={`
                        text-base leading-relaxed flex-1
                        ${isSelected && !isConfirmed ? 'text-gray-900' : 'text-gray-700'}
                        ${showCorrect ? 'text-green-900' : ''}
                        ${showIncorrect ? 'text-red-900' : ''}
                        ${isConfirmed && !showCorrect && !showIncorrect ? 'text-gray-400' : ''}
                      `}  style={{ fontWeight: 400 }}>
                        {option.text}
                      </p>
                      {/* Checkmark for correct answer */}
                      {showCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {/* X mark for incorrect answer */}
                      {showIncorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
                        >
                          <XCircle className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Section */}
            {isConfirmed && isCorrect && (
              <motion.div 
                className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
                style={{
                  backgroundColor: '#F0FDF4',
                  borderColor: '#22C55E'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#22C55E' }} />
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-1" style={{ color: '#166534' }}>
                    {correctFeedback.message}
                  </h4>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {correctFeedback.encouragement}
                  </p>
                </div>
              </motion.div>
            )}
            {isConfirmed && !isCorrect && (
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
                    {incorrectFeedback.message}
                  </h4>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {incorrectFeedback.encouragement}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              {!isConfirmed && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                >
                  Zpět
                </Button>
              )}
              {isConfirmed && <div></div>}

              <div className="flex items-center gap-3">
                <Button
                  onClick={isConfirmed ? handleNext : handleConfirm}
                  disabled={!selectedCard}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedCard
                      ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedCard) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCard) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                    }
                  }}
                >
                  {isConfirmed ? 'Pokračovat' : 'Potvrdit'}
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