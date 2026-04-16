import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { CorrectFeedback } from '@/app/components/CorrectFeedback';
import { ChevronRight, XCircle, Grid3x3, CheckCircle, Users, Target, TrendingUp, Presentation, Check, X } from 'lucide-react';

interface TileOption {
  id: string;
  label?: string; // Optional label for A, B, C, D display
  text: string;
  isCorrect: boolean;
}

interface TileSelectionChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  options: TileOption[];
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
  onLogoClick?: () => void;
  onBack?: () => void;
}

export function TileSelectionChallenge({ 
  questionNumber,
  questionText,
  options,
  correctFeedback,
  incorrectFeedback,
  questionTypeTag = 'VYBER UKAZKY',
  tagColor = {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-800',
    accent: 'bg-green-500'
  },
  onNext,
  onLogoClick,
  onBack
}: TileSelectionChallengeProps) {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleTileClick = (tileId: string) => {
    setSelectedTile(tileId);
  };

  const handleContinue = () => {
    if (!selectedTile) return;
    
    if (!showFeedback) {
      // Show feedback
      setShowFeedback(true);
    } else {
      // Move to next question
      onNext?.();
    }
  };

  const selectedOption = options.find(opt => opt.id === selectedTile);
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
            <div className="mb-5">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border`} style={{ backgroundColor: 'rgba(255, 116, 0, 0.08)', borderColor: 'rgba(255, 116, 0, 0.2)' }}>
                <Presentation className={`w-4 h-4`} style={{ color: '#ff7400' }} />
                <span className={`text-xs font-bold tracking-wider`} style={{ color: '#ff7400' }}>
                  JEDNA VOLBA
                </span>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {questionText}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {options.map((option) => {
                const isSelected = selectedTile === option.id;
                const showCorrect = showFeedback && option.isCorrect;
                const showIncorrect = showFeedback && isSelected && !option.isCorrect;
                const isNeutral = showFeedback && !isSelected && !option.isCorrect;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => !showFeedback && handleTileClick(option.id)}
                    disabled={showFeedback}
                    className={`
                      p-6 rounded-2xl border-2 text-left transition-all
                      ${!showFeedback && !isSelected ? 'bg-white border-gray-200 cursor-pointer' : ''}
                      ${showCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-300' : ''}
                      ${isNeutral ? 'bg-white border-gray-200 opacity-50' : ''}
                      ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    style={
                      !showFeedback && isSelected
                        ? {
                            backgroundColor: 'var(--bg-soft)',
                            borderColor: 'var(--primary-brand)',
                            boxShadow: '0 0 0 3px var(--primary-disabled), 0 4px 12px rgba(174, 84, 255, 0.15)'
                          }
                        : undefined
                    }
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
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      {option.label && (
                        <div 
                          className={`
                            w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                            ${!showFeedback && isSelected ? 'bg-purple-600 text-white' : ''}
                            ${!showFeedback && !isSelected ? 'bg-gray-100 text-gray-600' : ''}
                            ${showCorrect ? 'bg-green-500 text-white' : ''}
                            ${showIncorrect ? 'bg-red-400 text-white' : ''}
                            ${isNeutral ? 'bg-gray-100 text-gray-600' : ''}
                          `}
                        >
                          {option.label}
                        </div>
                      )}
                      <p className={`
                        text-base leading-relaxed flex-1
                        ${!showFeedback ? 'text-gray-700' : ''}
                        ${showCorrect ? 'text-green-900 font-semibold' : ''}
                        ${showIncorrect ? 'text-red-900' : ''}
                        ${isNeutral ? 'text-gray-500' : ''}
                      `}>
                        {option.text}
                      </p>

                      {/* Checkmark for correct answer */}
                      {showCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {/* X mark for incorrect answer */}
                      {showIncorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Section */}
            {showFeedback && (
              <motion.div 
                className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
                style={{
                  backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
                  borderColor: isCorrect ? '#22C55E' : '#EF4444'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isCorrect ? (
                  <CheckCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#22C55E' }} />
                ) : (
                  <XCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#EF4444' }} />
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-1" style={{ color: isCorrect ? '#166534' : '#991B1B' }}>
                    {isCorrect ? correctFeedback.message : incorrectFeedback.message}
                  </h4>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {isCorrect ? correctFeedback.encouragement : incorrectFeedback.encouragement}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              {!showFeedback && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                >
                  Spat
                </Button>
              )}
              {showFeedback && <div></div>}

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedTile}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedTile
                      ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedTile) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTile) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                    }
                  }}
                >
                  {showFeedback ? 'Pokracovat' : 'Pokracovat'}
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