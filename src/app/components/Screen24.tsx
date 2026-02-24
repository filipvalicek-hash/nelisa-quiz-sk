import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { ChevronRight, Check, X, MessageSquare, ArrowLeft } from 'lucide-react';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';

interface Option {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Screen24Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen24({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen24Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const options: Option[] = [
    {
      id: 'A',
      label: 'A',
      text: 'Cena a rozpočtové varianty – aby finance měly hned jasno, kolik řešení stojí a v jakých mantinelech se rozhoduje.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Hlavní užitek kampaní – jaký konkrétní náborový problém Nelisa řeší, proč portály samy nestačí a co klient získá navíc (zásah mimo aktivní kandidáty, menší konkurence).',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Zařazení Nelisy do ekosystému Alma Career – vysvětlení, že jde o součást širšího portfolia a dlouhodobého partnerství, ne o izolovaný nástroj.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Technický popis fungování kampaní a kanálů – aby si marketing mohl interně posoudit, jak se kampaně nasazují a optimalizují.',
      isCorrect: false
    }
  ];

  const selectedOptionData = options.find(opt => opt.id === selectedOption);

  const handleConfirm = () => {
    if (!selectedOption) return;
    setIsConfirmed(true);
    const selected = options.find(o => o.id === selectedOption);
    if (selected) onAnswerSubmit?.(selected.isCorrect, selected.text);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <QuestionBackgroundDecoration type="choice" />

      <div className="flex items-center justify-center px-8 pb-16 relative z-10" style={{ marginTop: '32px' }}>
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
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
            <div>
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border mb-6" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <MessageSquare className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                  <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                    VÝBĚR ODPOVĚDI
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
                  Vyber, na co se máš ve follow-upu zaměřit jako na hlavní osu sdělení, aby interní diskuze u klienta měla šanci dojít k rozhodnutí.
                </h3>
              </div>

              <div className="space-y-4 mb-10">
                {options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const showCorrectness = isConfirmed;
                  const isCorrectOption = option.isCorrect;
                  const showAsCorrect = showCorrectness && isSelected && isCorrectOption;
                  const showAsIncorrect = showCorrectness && isSelected && !isCorrectOption;

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => !isConfirmed && setSelectedOption(option.id)}
                      disabled={isConfirmed}
                      whileHover={!isConfirmed ? { scale: 1.01, y: -2 } : {}}
                      whileTap={!isConfirmed ? { scale: 0.99 } : {}}
                      className={`
                        w-full p-6 rounded-2xl text-left transition-all border-2 relative
                        ${isSelected && !isConfirmed ? 'bg-blue-50 border-blue-500' : ''}
                        ${!isSelected && !isConfirmed ? 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/20' : ''}
                        ${showAsCorrect ? 'bg-green-50 border-green-500' : ''}
                        ${showAsIncorrect ? 'bg-red-50 border-red-500' : ''}
                        ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                      `}
                      style={
                        isSelected && !isConfirmed
                          ? {
                              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2), 0 2px 6px rgba(59, 130, 246, 0.15)'
                            }
                          : {}
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className={`
                            w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0
                            ${isSelected && !isConfirmed ? 'bg-blue-600 text-white' : ''}
                            ${!isSelected && !isConfirmed ? 'bg-gray-100 text-gray-600' : ''}
                            ${showAsCorrect ? 'bg-green-600 text-white' : ''}
                            ${showAsIncorrect ? 'bg-red-600 text-white' : ''}
                          `}
                        >
                          {option.label}
                        </div>
                        <span className="text-gray-900 text-base leading-relaxed flex-1" style={{ fontWeight: 400 }}>
                          {option.text}
                        </span>

                        {showCorrectness && isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`
                              w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                              ${isCorrectOption ? 'bg-green-500' : 'bg-red-500'}
                            `}
                          >
                            {isCorrectOption ? (
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            ) : (
                              <X className="w-4 h-4 text-white" strokeWidth={3} />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Standard Explanation Block - Always shows after confirmation */}
              {isConfirmed && (
                <ExplanationBlock>
                  <p>
                    Na konci klient často nemá problém s produktem, ale s tím, že neví, co teď konkrétně udělat. Dobré shrnutí a jasný další krok zvyšují šanci, že se schvalování a start opravdu stane. Když klient odchází bez "next steps", schůzka často vyšumí a rozhodnutí se odkládá. V průběhu kampaně je důležité s klientem průběžně kampaň vyhodnocovat, což může vést k úspěšné retenci.
                  </p>
                </ExplanationBlock>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                  {!isConfirmed && (
                    <>
                      <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zpět na příběh
                      </Button>
                      {onSkip && (
                        <Button
                          variant="ghost"
                          onClick={onSkip}
                          className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                        >
                          Přeskočit úkol
                        </Button>
                      )}
                    </>
                  )}
                </div>
                {isConfirmed && <div></div>}

                <div className="flex items-center gap-3">
                  {!isConfirmed ? (
                    <Button
                      onClick={handleConfirm}
                      disabled={!selectedOption}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={
                        selectedOption
                          ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                          : { borderRadius: '12px' }
                      }
                      onMouseEnter={(e) => {
                        if (selectedOption) {
                          e.currentTarget.style.backgroundColor = '#9333EA';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOption) {
                          e.currentTarget.style.backgroundColor = '#AE54FF';
                        }
                      }}
                    >
                      Zkontrolovat
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={onNext}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                      style={{ backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#9333EA';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#AE54FF';
                      }}
                    >
                      Pokračovat
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
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