import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { motion, AnimatePresence } from 'motion/react';

interface CardOption {
  id: string;
  label: string;
  text: string;
}

interface AutoAdvanceSelectionChallengeProps {
  questionNumber?: number;
  questionText?: string | React.ReactNode;
  options: CardOption[];
  explanationText: string;
  questionTypeTag?: string;
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  autoAdvanceDelay?: number; // in milliseconds, default 1350ms
}

export function AutoAdvanceSelectionChallenge({ 
  questionNumber = 1, 
  questionText,
  options,
  explanationText,
  questionTypeTag = "VYBER ODPOVEDE",
  onNext,
  onBack,
  onLogoClick,
  autoAdvanceDelay = 1350
}: AutoAdvanceSelectionChallengeProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (selectedCard) return; // Prevent changing selection
    setSelectedCard(cardId);
    
    // Show explanation immediately
    setTimeout(() => {
      setShowExplanation(true);
    }, 100);
    
    // Auto-advance after delay
    setTimeout(() => {
      onNext?.();
    }, autoAdvanceDelay);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Background Icons */}
      <QuestionBackgroundDecoration type="choice" />

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
            className="bg-white rounded-3xl p-8 relative shadow-card-responsive"
          >
            {/* Question Type Label */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                <CheckCircle className="w-4 h-4" style={{ color: '#AE54FF' }} />
                <span className="text-xs font-semibold tracking-wider" style={{ color: '#AE54FF' }}>
                  {questionTypeTag}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-gray-900 mb-3 leading-tight" style={{ fontSize: '22px', fontWeight: 600 }}>
              {questionText}
            </h3>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {options.map((card) => {
                const isSelected = selectedCard === card.id;

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={!!selectedCard}
                    className={`
                      relative p-6 rounded-2xl border-2 text-left transition-all
                      ${!selectedCard ? 'bg-white border-gray-200 cursor-pointer' : ''}
                      ${selectedCard && !isSelected ? 'bg-white border-gray-200 opacity-50 cursor-default' : ''}
                      ${isSelected ? 'cursor-default' : ''}
                    `}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'rgba(174, 84, 255, 0.04)',
                            borderColor: '#AE54FF',
                            boxShadow: '0 0 0 3px rgba(174, 84, 255, 0.1), 0 4px 12px rgba(174, 84, 255, 0.15)'
                          }
                        : undefined
                    }
                    onMouseEnter={(e) => {
                      if (!selectedCard) {
                        e.currentTarget.style.borderColor = 'rgba(174, 84, 255, 0.3)';
                        e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedCard) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                    whileHover={!selectedCard ? { scale: 1.01, y: -2 } : {}}
                    whileTap={!selectedCard ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all
                          ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}
                        `}
                      >
                        {card.label}
                      </div>

                      <p className={`
                        text-base leading-relaxed flex-1 transition-all
                        ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}
                      `}>
                        {card.text}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Unified Explanation - shown for all answers */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-6 rounded-2xl shadow-sm"
                  style={{
                    backgroundColor: 'rgba(174, 84, 255, 0.04)',
                    border: '1px solid rgba(174, 84, 255, 0.12)'
                  }}
                >
                  <p className="text-[15px] leading-relaxed text-gray-700">
                    {explanationText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  disabled={showExplanation}
                >
                  Spat na pribeh
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}