import { useState } from 'react';
import { ChevronRight, CheckSquare, Check, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { QuotedText } from '@/app/components/ui/QuotedText';
import { motion, AnimatePresence } from 'motion/react';

interface Screen18Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export function Screen18({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen18Props) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [isConfirmed, setIsConfirmed] = useState(false);

  const options: Option[] = [
    {
      id: '1',
      text: '„Nadstandard navrhujeme jen, když má jasný cíl; není to \'zkusíme\', ale řízené rozšíření zásahu k publiku, které základ nemusí pokrýt."',
      isCorrect: true
    },
    {
      id: '2',
      text: '„Nebojte, tohle funguje každému."',
      isCorrect: false
    },
    {
      id: '3',
      text: '„Když to nevyjde, zkusíme něco jiného."',
      isCorrect: false
    },
    {
      id: '4',
      text: '„Nejde o to dělat víc věcí, ale udělat přesně to, co odpovídá cíli pozice."',
      isCorrect: true
    }
  ];

  const handleOptionClick = (optionId: string) => {
    if (isConfirmed) return;

    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleConfirm = () => {
    if (selectedOptions.size === 0) return;
    setIsConfirmed(true);
    const selectedIds = Array.from(selectedOptions);
    const allSelectedCorrect = selectedIds.every(id => options.find(o => o.id === id)?.isCorrect);
    const noCorrectMissed = options.filter(o => o.isCorrect).every(o => selectedOptions.has(o.id));
    const allCorrect = allSelectedCorrect && noCorrectMissed;
    const selectedLabels = selectedIds.map(id => options.find(o => o.id === id)?.text ?? id).join(', ');
    onAnswerSubmit?.(allCorrect, selectedLabels);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Decoration */}
      <QuestionBackgroundDecoration type="multi-select" />
      
      {/* Main Content - Centered Single Panel */}
      <div className="flex items-center justify-center px-8 pb-16 relative z-10" style={{ marginTop: '44px' }}>
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* White Question Panel with Soft Shadows */}
          <div 
            className="bg-white rounded-3xl p-12 relative shadow-card-enhanced-responsive"
          >
            {/* Content */}
            <div>
              {/* Panel Header with Purple Accents */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl border-2 border-purple-300 mb-6">
                  <CheckSquare className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-bold tracking-wider text-purple-700">
                    MULTI-VÝBĚR
                  </span>
                </div>
                <h3 
                  className="text-gray-900 mb-4 leading-tight" 
                  style={{ 
                    fontSize: '24px', 
                    fontWeight: 600, 
                    lineHeight: '130%', 
                    letterSpacing: 0
                  }}
                >
                  Stručně klientovi vysvětli, jak se u Nelisy s <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 600 }}>nadstandardem pracuje</span>, aby bylo jasné:
                </h3>
                <ul className="text-lg text-gray-700 mb-4 ml-6 space-y-1">
                  <li>• proč se volí,</li>
                  <li>• co má přinést,</li>
                  <li>• jak se pozná, zda splnil svůj účel.</li>
                </ul>
                <p className="text-lg text-gray-600">
                  Vyber odpovědi, které by v takovém vysvětlení měly zaznít.
                </p>
              </div>

              {/* Options Grid */}
              <div className="space-y-3 mb-10">
                {options.map((option) => {
                  const isSelected = selectedOptions.has(option.id);
                  const isCorrectAnswer = option.isCorrect;
                  
                  // After confirmation, determine the visual state
                  const showAsCorrect = isConfirmed && isCorrectAnswer; // All correct answers turn green
                  const showAsIncorrect = isConfirmed && isSelected && !isCorrectAnswer; // Selected incorrect answers turn red
                  const showAsNeutral = isConfirmed && !isSelected && !isCorrectAnswer; // Unselected incorrect answers stay grey
                  
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      disabled={isConfirmed}
                      whileHover={!isConfirmed ? { scale: 1.008, y: -2 } : {}}
                      whileTap={!isConfirmed ? { scale: 0.995 } : {}}
                      className={`
                        w-full p-6 rounded-2xl text-left border-2 transition-all
                        ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                        ${isSelected && !isConfirmed ? 'bg-purple-50 border-purple-500' : ''}
                        ${!isSelected && !isConfirmed ? 'bg-white border-gray-200 hover:border-purple-400 hover:bg-purple-50/30' : ''}
                        ${showAsCorrect ? 'bg-green-50 border-green-500' : ''}
                        ${showAsIncorrect ? 'bg-red-50 border-red-500' : ''}
                      `}
                      style={
                        isSelected && !isConfirmed
                          ? {
                              boxShadow: '0 0 0 3px rgba(174, 84, 255, 0.15), 0 4px 12px rgba(174, 84, 255, 0.1)'
                            }
                          : {}
                      }
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {!isConfirmed && isSelected && (
                            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
                              <CheckSquare className="w-4 h-4 text-white" fill="white" />
                            </div>
                          )}
                          {!isConfirmed && !isSelected && (
                            <div className="w-6 h-6 rounded-md border-2 border-gray-300 bg-white" />
                          )}
                          {showAsCorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          {showAsIncorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                            >
                              <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          {showAsNeutral && (
                            <div className="w-6 h-6 rounded-md border-2 border-gray-300 bg-white opacity-50" />
                          )}
                        </div>
                        
                        {/* Option Text */}
                        <span 
                          className={`text-base leading-relaxed flex-1 ${showAsCorrect ? 'text-green-900' : showAsIncorrect ? 'text-red-900' : showAsNeutral ? 'text-gray-500' : 'text-gray-900'}`}
                          style={{ fontWeight: 400 }}
                        >
                          <QuotedText>{option.text}</QuotedText>
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation Section - Shows after confirmation */}
              <AnimatePresence>
                {isConfirmed && (
                  <ExplanationBlock>
                    <p>
                      Klient se bojí, že platí za pokus. Proto musí být nadstandard vysvětlený jako řízená volba s logikou, co tím získáme a jak poznáme úspěch. Když obchodník neumí říct proč, zní to jako drahá hračka. Když umí popsat přínos a měřítko, klient vnímá nadstandard jako chytrou investici.
                    </p>
                  </ExplanationBlock>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                    disabled={isConfirmed}
                  >
                    Zpět na příběh
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {!isConfirmed && (
                    <Button
                      onClick={handleConfirm}
                      disabled={selectedOptions.size === 0}
                      style={
                        selectedOptions.size > 0
                          ? { backgroundColor: '#AE54FF', color: '#FFFFFF', borderRadius: '12px' }
                          : { borderRadius: '12px' }
                      }
                      onMouseEnter={(e) => {
                        if (selectedOptions.size > 0) {
                          e.currentTarget.style.backgroundColor = '#9842E6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOptions.size > 0) {
                          e.currentTarget.style.backgroundColor = '#AE54FF';
                        }
                      }}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                    >
                      Zkontrolovat
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                  {isConfirmed && (
                    <QuizButton onClick={onNext}>
                      Pokračovat
                    </QuizButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}