import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { QuotedText } from '@/app/components/ui/QuotedText';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface CardOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface CardSelectionChallengeProps {
  questionNumber?: number;
  questionText?: string | React.ReactNode;
  options?: CardOption[];
  correctFeedback?: string;
  incorrectFeedback?: string;
  explanationText?: string; // New unified explanation text
  questionTypeTag?: string;
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  hideCorrectness?: boolean; // New prop to hide green/red feedback
  singleColumn?: boolean; // Force single column layout
}

export function CardSelectionChallenge({ 
  questionNumber = 1, 
  questionText = "Klikni na kartu klienta, kterého má největší smysl oslovit s Nelisou jako hlavním řešením.",
  options,
  correctFeedback = "Přesně. Nelisa funguje nejlépe tam, kde je třeba aktivně oslovovat kandidáty na těžko obsaditelné pozice.",
  incorrectFeedback = "Tato firma má jiné potřeby. Zamysli se, kdy je Nelisa nejužitečnější.",
  explanationText, // New prop for unified explanation
  questionTypeTag = "VÝBĚR JEDNÉ ODPOVĚDI",
  onNext,
  onBack,
  onLogoClick,
  onSkip,
  onAnswerSubmit,
  hideCorrectness = false, // Default value for hideCorrectness
  singleColumn = false // Default value for singleColumn
}: CardSelectionChallengeProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const defaultCards: CardOption[] = [
    {
      id: 'A',
      label: 'A',
      text: 'Firma má přebytek reakcí, HR nestíhá selekci.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Firma nabírá těžko obsaditelné pozice, reakce z portálů jsou slabé.',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Firma nenabírá, jen mapuje trh.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Firma hledá brigádníky na krátké směny, vysoký počet reakcí nevadí.',
      isCorrect: false
    }
  ];

  const cards = options || defaultCards;

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleContinue = () => {
    if (!selectedCard) return;

    if (!showFeedback) {
      // Show feedback and record answer
      setShowFeedback(true);
      onAnswerSubmit?.(isCorrect, selectedCard);
    } else {
      // Move to next question
      onNext?.();
    }
  };

  const selectedOption = cards.find(card => card.id === selectedCard);
  const isCorrect = selectedOption?.isCorrect || false;

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Background Icons */}
      <QuestionBackgroundDecoration type="choice" />

      {/* Main Content */}
      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div 
          className="w-full"
          style={{ maxWidth: '920px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
                <CheckCircle className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>
                  {questionTypeTag}
                </span>
              </div>
            </div>

            {/* Question Text - MANDATORY: 24px SemiBold (600) with purple underline */}
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

            {/* Cards Grid */}
            <div className={`grid grid-cols-1 ${!singleColumn ? 'md:grid-cols-2' : ''} gap-4 mb-8`}>
              {cards.map((card) => {
                const isSelected = selectedCard === card.id;
                const showCorrect = !hideCorrectness && showFeedback && card.isCorrect;
                const showIncorrect = !hideCorrectness && showFeedback && isSelected && !card.isCorrect;
                const isNeutral = !hideCorrectness && showFeedback && !isSelected && !card.isCorrect;

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => !showFeedback && handleCardClick(card.id)}
                    disabled={showFeedback}
                    className={`
                      relative p-6 rounded-2xl border-2 text-left transition-all
                      ${!showFeedback && !isSelected ? 'bg-white border-gray-200 cursor-pointer' : ''}
                      ${!showFeedback && isSelected ? '' : ''}
                      ${showCorrect ? 'border-green-500' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-500' : ''}
                      ${isNeutral ? 'bg-white border-gray-200 opacity-50' : ''}
                      ${showFeedback && hideCorrectness ? 'cursor-default bg-white border-gray-200' : ''}
                      ${showFeedback && !hideCorrectness ? 'cursor-default' : ''}
                      ${!showFeedback ? 'cursor-pointer' : ''}
                    `}
                    style={
                      !showFeedback && isSelected
                        ? {
                            backgroundColor: 'var(--bg-soft)',
                            borderColor: 'var(--primary-brand)',
                            boxShadow: '0 0 0 3px var(--primary-disabled), 0 4px 12px rgba(174, 84, 255, 0.15), 0 2px 4px rgba(174, 84, 255, 0.1)'
                          }
                        : showCorrect
                        ? {
                            backgroundColor: 'rgba(34, 197, 94, 0.08)',
                            borderColor: '#22c55e',
                            borderWidth: '2px'
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
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#4B5563'
                        }}
                      >
                        {card.label}
                      </div>

                      <p className={`
                        text-base leading-relaxed flex-1
                        ${!showFeedback ? 'text-gray-700' : ''}
                        ${showCorrect ? 'text-green-900' : ''}
                        ${showIncorrect ? 'text-red-900' : ''}
                        ${isNeutral ? 'text-gray-500' : ''}
                        ${showFeedback && hideCorrectness ? 'text-gray-700' : ''}
                      `}
                        style={{ fontWeight: 400 }}
                      >
                        <QuotedText>{card.text}</QuotedText>
                      </p>

                      {/* Checkmark for correct answer */}
                      {showCorrect && !hideCorrectness && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {/* X mark for incorrect answer */}
                      {showIncorrect && !hideCorrectness && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
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
            {showFeedback && explanationText && (
              <ExplanationBlock>
                <p className="whitespace-pre-line">{explanationText}</p>
              </ExplanationBlock>
            )}
            {showFeedback && !explanationText && isCorrect && (
              <ExplanationBlock>
                <p>{correctFeedback}</p>
              </ExplanationBlock>
            )}
            {showFeedback && !explanationText && !isCorrect && (
              <ExplanationBlock>
                <p>{incorrectFeedback}</p>
              </ExplanationBlock>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                >
                  Zpět na příběh
                </Button>
                {!showFeedback && onSkip && (
                  <Button
                    variant="ghost"
                    onClick={onSkip}
                    className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                  >
                    Přeskočit úkol
                  </Button>
                )}
              </div>
              {showFeedback && <div></div>}

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedCard}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg group"
                  style={
                    selectedCard
                      ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedCard) {
                      e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCard) {
                      e.currentTarget.style.backgroundColor = '#AE54FF';
                    }
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {showFeedback ? 'Pokračovat' : 'Zkontrolovat'}
                    <ChevronRight className="w-5 h-5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                  </span>
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