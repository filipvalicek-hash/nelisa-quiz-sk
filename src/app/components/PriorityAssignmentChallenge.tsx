import { useState, useMemo, useCallback } from 'react';
import { ChevronRight, TrendingUp, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { motion, AnimatePresence } from 'motion/react';

interface SituationCard {
  id: string;
  label: string;
  text: string;
  correctPriority: 'HIGH' | 'MID' | 'LOW';
}

interface PriorityAssignmentChallengeProps {
  questionNumber?: number;
  questionText?: string | React.ReactNode;
  situations?: SituationCard[];
  correctFeedback?: string;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
}

export function PriorityAssignmentChallenge({ 
  questionNumber = 1, 
  questionText = "Přiřaď ke každé situaci úroveň obchodní příležitosti:",
  situations,
  correctFeedback = "Výborně! Správně jsi identifikoval/a priority pro jednotlivé obchodní příležitosti.",
  onNext,
  onBack,
  onSkip,
  onLogoClick 
}: PriorityAssignmentChallengeProps) {
  const [assignments, setAssignments] = useState<Record<string, 'HIGH' | 'MID' | 'LOW' | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const defaultSituations: SituationCard[] = [
    {
      id: 'A',
      label: 'A',
      text: 'Výrobní firma, 180 zaměstnanců. Jedna HR generalistka řeší nábor, onboarding i administrativu.',
      correctPriority: 'HIGH'
    },
    {
      id: 'B',
      label: 'B',
      text: 'Startup o 15 lidech. Hledá jednoho seniorního specialistu ročně.',
      correctPriority: 'HIGH'
    },
    {
      id: 'C',
      label: 'C',
      text: 'Velká firma s HR týmem, spolupracuje s agenturami.',
      correctPriority: 'MID'
    },
    {
      id: 'D',
      label: 'D',
      text: 'Firma aktuálně nenabírá, ale chce si dlouhodobě budovat databázi kandidátů.',
      correctPriority: 'MID'
    },
    {
      id: 'E',
      label: 'E',
      text: 'Klient říká: „My nejsme velká firma jako Lidl nebo PPF.\"',
      correctPriority: 'HIGH'
    },
    {
      id: 'F',
      label: 'F',
      text: 'Firma obsazuje jednu juniorní pozici ročně, portály jí fungují.',
      correctPriority: 'LOW'
    }
  ];

  const cards = situations || defaultSituations;

  // Split cards into two groups for two-step flow
  const step1Cards = useMemo(() => cards.filter(card => ['A', 'B', 'C'].includes(card.id)), [cards]);
  const step2Cards = useMemo(() => cards.filter(card => ['D', 'E', 'F'].includes(card.id)), [cards]);
  
  // Only render cards for current step (optimize: don't render step 2 until needed)
  const currentCards = useMemo(() => {
    if (showFeedback) return cards;
    return currentStep === 1 ? step1Cards : step2Cards;
  }, [showFeedback, currentStep, cards, step1Cards, step2Cards]);

  // Memoize counts (only recalculate when assignments change)
  const answeredCount = useMemo(() => 
    Object.values(assignments).filter(val => val !== null).length, 
    [assignments]
  );

  const allAssigned = useMemo(() => 
    cards.every(card => assignments[card.id]), 
    [cards, assignments]
  );

  const handlePrioritySelect = useCallback((cardId: string, priority: 'HIGH' | 'MID' | 'LOW') => {
    if (showFeedback) return;
    
    setAssignments(prev => {
      const newAssignments = { ...prev, [cardId]: priority };
      
      // Auto-advance to step 2 when step 1 is complete (delayed to next tick)
      if (currentStep === 1) {
        const step1Done = step1Cards.every(card => newAssignments[card.id]);
        if (step1Done) {
          setTimeout(() => setCurrentStep(2), 300);
        }
      }
      
      return newAssignments;
    });
  }, [showFeedback, currentStep, step1Cards]);

  const handleContinue = useCallback(() => {
    if (!allAssigned && !showFeedback) return;
    
    if (!showFeedback) {
      setShowFeedback(true);
    } else {
      onNext?.();
    }
  }, [allAssigned, showFeedback, onNext]);

  const getPriorityColor = (priority: 'HIGH' | 'MID' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return {
          bg: '#dcfce7',
          border: '#86efac',
          text: '#166534',
          icon: '#22c55e'
        };
      case 'MID':
        return {
          bg: '#fef3c7',
          border: '#fcd34d',
          text: '#92400e',
          icon: '#f59e0b'
        };
      case 'LOW':
        return {
          bg: '#fee2e2',
          border: '#fca5a5',
          text: '#991b1b',
          icon: '#ef4444'
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
    switch (priority) {
      case 'HIGH':
        return 'HIGH';
      case 'MID':
        return 'MID';
      case 'LOW':
        return 'LOW';
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Background Icons */}
      <QuestionBackgroundDecoration type="choice" />

      {/* Main Content */}
      <div className="flex items-start justify-center px-4 md:px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div 
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Challenge Card */}
          <div 
            className="bg-white rounded-3xl p-6 md:p-8 relative shadow-card-responsive"
          >
            {/* Question Type Label */}
            <div className="mb-5 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#AE54FF' }} />
                <span className="text-xs font-semibold tracking-wider" style={{ color: '#AE54FF' }}>
                  PŘIŘAZOVÁNÍ
                </span>
              </div>
              
              {/* Step Indicator */}
              {!showFeedback && (
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep === 1 ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
                  }`}>
                    1
                  </div>
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep === 2 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    2
                  </div>
                </div>
              )}
            </div>

            {/* Question Text */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {questionText}
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
              
              {/* Progress Indicator */}
              {!showFeedback && (
                <div className="ml-auto flex items-center gap-2 px-3 py-2">
                  <span className="text-sm font-semibold text-gray-600">
                    {answeredCount} / {cards.length} vyplněno
                  </span>
                </div>
              )}
            </div>

            {/* Situations Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {currentCards.map((card) => {
                const assignedPriority = assignments[card.id];
                const isCorrectAssignment = showFeedback && assignedPriority === card.correctPriority;
                const isIncorrectAssignment = showFeedback && assignedPriority && assignedPriority !== card.correctPriority;

                return (
                  <motion.div
                    key={card.id}
                    className={`
                      relative p-5 rounded-2xl border-2 transition-all
                      ${!showFeedback ? 'bg-white border-gray-200' : ''}
                      ${isCorrectAssignment ? 'bg-green-50 border-green-400' : ''}
                      ${isIncorrectAssignment ? 'bg-orange-50 border-orange-300' : ''}
                    `}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: parseInt(card.id.charCodeAt(0).toString()) * 0.05 }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#4B5563'
                        }}
                      >
                        {card.label}
                      </div>
                      <p className="text-base leading-relaxed flex-1 text-gray-800" style={{ fontWeight: 400 }}>
                        {card.text}
                      </p>
                    </div>

                    {/* Priority Buttons */}
                    <div className="flex flex-wrap gap-2 pl-11">
                      {(['HIGH', 'MID', 'LOW'] as const).map(priority => {
                        const colors = getPriorityColor(priority);
                        const isSelected = assignedPriority === priority;
                        const isCorrectAnswer = showFeedback && card.correctPriority === priority;
                        
                        return (
                          <button
                            key={priority}
                            onClick={() => !showFeedback && handlePrioritySelect(card.id, priority)}
                            disabled={showFeedback}
                            className={`
                              flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all
                              ${!showFeedback && !isSelected ? 'bg-white border-gray-200 hover:border-gray-300' : ''}
                              ${!showFeedback && isSelected ? 'border-purple-500' : ''}
                              ${showFeedback && isCorrectAnswer ? 'bg-green-100 border-green-500' : ''}
                              ${showFeedback && !isCorrectAnswer && isSelected ? 'bg-red-100 border-red-400 opacity-60' : ''}
                              ${showFeedback && !isSelected && !isCorrectAnswer ? 'opacity-30' : ''}
                              ${showFeedback ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
                            `}
                            style={
                              !showFeedback && isSelected
                                ? { 
                                    backgroundColor: colors.bg,
                                    borderColor: colors.border,
                                    color: colors.text
                                  }
                                : !showFeedback
                                ? { color: colors.text }
                                : undefined
                            }
                          >
                            <div style={{ color: showFeedback && isCorrectAnswer ? '#22c55e' : colors.icon }}>
                              {getPriorityIcon(priority)}
                            </div>
                            <span>{getPriorityLabel(priority)}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Show correct answer if user was wrong - REMOVED per requirements */}
                  </motion.div>
                );
              })}
            </div>

            {/* Feedback Section */}
            {showFeedback && (
              <ExplanationBlock>
                <p>{correctFeedback}</p>
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
                {!showFeedback && onSkip && (
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
                <Button
                  onClick={handleContinue}
                  disabled={!allAssigned}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    allAssigned
                      ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (allAssigned) {
                      e.currentTarget.style.backgroundColor = '#9333EA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (allAssigned) {
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