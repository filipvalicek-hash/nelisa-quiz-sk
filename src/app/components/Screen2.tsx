import { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronRight, TrendingUp, ArrowUp, ArrowRight, ArrowDown, Check, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { motion, AnimatePresence } from 'motion/react';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface Screen2Props {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

interface SituationCard {
  id: string;
  label: string;
  text: string;
  correctPriority: 'HIGH' | 'MID' | 'LOW';
}

export function Screen2({ onBack, onNext, onSkip, onLogoClick, onAnswerSubmit }: Screen2Props) {
  const [assignments, setAssignments] = useState<Record<string, 'HIGH' | 'MID' | 'LOW' | null>>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSecondBatch, setShowSecondBatch] = useState(false);

  const situations: SituationCard[] = [
    {
      id: 'A',
      label: 'A',
      text: 'Výrobní firma, 180 zaměstnanců. Jedna HR generalistka řeší nábor, onboarding i administrativu. Ví, že by měla pracovat s pasivními kandidáty, ale nemá na to čas ani know-how.',
      correctPriority: 'HIGH'
    },
    {
      id: 'B',
      label: 'B',
      text: 'Startup o 15 lidech. Hledá jednoho seniorního specialistu ročně. Portály nefungují, potřebují oslovit pasivní kandidáty.',
      correctPriority: 'HIGH'
    },
    {
      id: 'C',
      label: 'C',
      text: 'Velká firma s HR týmem, spolupracuje s agenturami, má vlastní interní kampaně a chce „zkusit něco navíc".',
      correctPriority: 'MID'
    },
    {
      id: 'D',
      label: 'D',
      text: 'Firma aktuálně nenabírá, ale chce si dlouhodobě budovat databázi kandidátů a employer brand.',
      correctPriority: 'MID'
    },
    {
      id: 'E',
      label: 'E',
      text: 'Klient říká: „My nejsme velká firma jako Lidl nebo PPF, to pro nás nebude."',
      correctPriority: 'HIGH'
    },
    {
      id: 'F',
      label: 'F',
      text: 'Firma obsazuje jednu juniorní pozici ročně, portály jí fungují a nechce měnit zavedený postup.',
      correctPriority: 'LOW'
    }
  ];

  const firstBatch = situations.slice(0, 3);
  const secondBatch = situations.slice(3, 6);
  const visibleSituations = showSecondBatch ? situations : firstBatch;

  // Auto-reveal second batch when first 3 are all answered
  useEffect(() => {
    if (!showSecondBatch) {
      const firstThreeAnswered = firstBatch.every(card => assignments[card.id]);
      if (firstThreeAnswered) {
        setShowSecondBatch(true);
      }
    }
  }, [assignments, firstBatch, showSecondBatch]);

  const allAssigned = useMemo(() => 
    situations.every(card => assignments[card.id]), 
    [situations, assignments]
  );

  const assignedCount = useMemo(() => 
    situations.filter(card => assignments[card.id]).length,
    [situations, assignments]
  );

  const handlePrioritySelect = useCallback((cardId: string, priority: 'HIGH' | 'MID' | 'LOW') => {
    if (isConfirmed) return;
    
    setAssignments(prev => ({ ...prev, [cardId]: priority }));
  }, [isConfirmed]);

  const handleConfirm = useCallback(() => {
    if (!allAssigned) return;

    setIsConfirmed(true);
    const allCorrect = situations.every(card => assignments[card.id] === card.correctPriority);
    const assignmentLabel = situations.map(card => `${card.label}→${assignments[card.id] ?? '?'}`).join(', ');
    onAnswerSubmit?.(allCorrect, assignmentLabel);
  }, [allAssigned, situations, assignments, onAnswerSubmit]);

  const getPriorityColor = (priority: 'HIGH' | 'MID' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return {
          bg: '#faf5ff',
          border: '#a855f7',
          text: '#7e22ce',
          icon: '#9c27b0'
        };
      case 'MID':
        return {
          bg: '#faf5ff',
          border: '#a855f7',
          text: '#7e22ce',
          icon: '#9c27b0'
        };
      case 'LOW':
        return {
          bg: '#faf5ff',
          border: '#a855f7',
          text: '#7e22ce',
          icon: '#9c27b0'
        };
    }
  };

  const getPriorityIcon = (priority: 'HIGH' | 'MID' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return <ArrowUp className="w-4 h-4" />;
      case 'MID':
        return <ArrowRight className="w-4 h-4" />;
      case 'LOW':
        return <ArrowDown className="w-4 h-4" />;
    }
  };

  const getPriorityLabel = (priority: 'HIGH' | 'MID' | 'LOW') => {
    return priority;
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Background Icons */}
      <QuestionBackgroundDecoration type="choice" />

      {/* Main Content */}
      <div className="flex items-start justify-center px-4 md:px-8 pb-12" style={{ marginTop: '44px' }}>
        <motion.div 
          className="w-full"
          style={{ maxWidth: '920px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Challenge Card */}
          <div 
            className="bg-white rounded-3xl relative"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
              padding: '48px 56px'
            }}
          >
            {/* Question Type Label */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                  ÚKOL · PŘIŘAZOVÁNÍ
                </span>
              </div>
            </div>

            {/* Progress Label */}
            <div className="mb-3">
              <span className="text-sm font-semibold text-gray-600">
                {assignedCount}/6 tvrzení
              </span>
            </div>

            {/* Question Text - MANDATORY: 24px SemiBold with purple underline */}
            <h3 
              className="text-gray-900 mb-4" 
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                lineHeight: '1.58', 
                letterSpacing: 0
              }}
            >
              Přiřaď ke každé situaci úroveň <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 600 }}>obchodní příležitosti</span>: HIGH / MID / LOW
            </h3>

            {/* Priority Legend */}
            <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-100">
              {(['HIGH', 'MID', 'LOW'] as const).map(priority => {
                const colors = getPriorityColor(priority);
                return (
                  <div 
                    key={priority}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border-2"
                    style={{ 
                      backgroundColor: colors.bg,
                      borderColor: colors.border
                    }}
                  >
                    <div style={{ color: colors.icon }}>
                      {getPriorityIcon(priority)}
                    </div>
                    <span className="text-sm font-bold" style={{ color: colors.text }}>
                      {getPriorityLabel(priority)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Situations Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {visibleSituations.map((card, index) => {
                const assignedPriority = assignments[card.id];
                const isCorrect = isConfirmed && assignedPriority === card.correctPriority;
                const isIncorrect = isConfirmed && assignedPriority && assignedPriority !== card.correctPriority;
                const isFromSecondBatch = index >= 3;

                return (
                  <motion.div
                    key={card.id}
                    className={`
                      relative p-5 rounded-2xl border-2 transition-all
                      ${!isConfirmed ? 'bg-white border-gray-200' : ''}
                      ${isCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${isIncorrect ? 'bg-red-50 border-red-400' : ''}
                    `}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: isFromSecondBatch ? (index - 3) * 0.1 : index * 0.05 
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 bg-purple-100 text-purple-700">
                        {card.label}
                      </div>
                      <p className="text-base flex-1 text-gray-800" style={{ fontWeight: 400, lineHeight: '1.58' }}>
                        {card.text}
                      </p>
                    </div>

                    {/* Priority Buttons */}
                    <div className="flex flex-wrap gap-2 pl-11">
                      {(['HIGH', 'MID', 'LOW'] as const).map(priority => {
                        const colors = getPriorityColor(priority);
                        const isSelected = assignedPriority === priority;
                        const isCorrectAnswer = card.correctPriority === priority;
                        
                        return (
                          <button
                            key={priority}
                            onClick={() => !isConfirmed && handlePrioritySelect(card.id, priority)}
                            disabled={isConfirmed}
                            className={`
                              flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all relative
                              ${!isConfirmed && !isSelected ? 'bg-white border-gray-200 hover:border-gray-300' : ''}
                              ${!isConfirmed && isSelected ? 'border-purple-500' : ''}
                              ${isConfirmed && isCorrectAnswer && isSelected ? 'bg-green-50 border-green-500' : ''}
                              ${isConfirmed && !isCorrectAnswer && isSelected ? 'bg-red-50 border-red-400' : ''}
                              ${isConfirmed && isCorrectAnswer && !isSelected ? 'bg-green-50 border-green-400 ring-2 ring-green-200' : ''}
                              ${isConfirmed && !isCorrectAnswer && !isSelected ? 'opacity-30' : ''}
                              ${isConfirmed ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            style={
                              !isConfirmed && isSelected
                                ? { 
                                    backgroundColor: colors.bg,
                                    borderColor: colors.border,
                                    color: colors.text
                                  }
                                : !isConfirmed
                                ? { color: colors.text }
                                : isConfirmed && isCorrectAnswer
                                ? { color: '#166534' }
                                : isConfirmed && isSelected && !isCorrectAnswer
                                ? { color: '#991b1b' }
                                : undefined
                            }
                          >
                            <div style={{ 
                              color: isConfirmed && isCorrectAnswer 
                                ? '#22c55e' 
                                : isConfirmed && isSelected && !isCorrectAnswer
                                ? '#ef4444'
                                : colors.icon 
                            }}>
                              {getPriorityIcon(priority)}
                            </div>
                            <span>{getPriorityLabel(priority)}</span>
                            
                            {/* Green check for correct answer */}
                            {isConfirmed && isCorrectAnswer && isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                              >
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                            
                            {/* Red X for incorrect answer */}
                            {isConfirmed && !isCorrectAnswer && isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                              >
                                <X className="w-3 h-3 text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Show correct answer hint when user is wrong */}
                    {isConfirmed && isIncorrect && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pl-11 text-sm text-green-700 font-medium"
                      >
                        Správná odpověď: {card.correctPriority}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Explanation Section */}
            <AnimatePresence>
              {isConfirmed && (
                <ExplanationBlock>
                  <p>
                    Nejde o velikost firmy, ale o situaci HR. Největší přínos má Nelisa tam, kde HR nestíhá, je na vše sama a potřebuje kompletní řešení bez další práce navíc.
                  </p>
                </ExplanationBlock>
              )}
            </AnimatePresence>

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

              <div className="flex items-center gap-3">
                {!isConfirmed && (
                  <QuizButton
                    onClick={handleConfirm}
                    disabled={!allAssigned}
                  >
                    Zkontrolovat
                  </QuizButton>
                )}
                {isConfirmed && (
                  <QuizButton
                    onClick={onNext}
                  >
                    Pokračovat
                  </QuizButton>
                )}
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