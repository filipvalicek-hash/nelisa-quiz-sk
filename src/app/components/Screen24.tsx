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
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen24({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen24Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialSelection ?? null);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);

  const options: Option[] = [
    {
      id: 'A',
      label: 'A',
      text: 'Cena a rozpočtové varianty – aby financie mali hneď jasno, koľko riešenie stojí a v akých mantineloch sa rozhoduje.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Hlavný úžitok kampaní – aký konkrétny náborový problém Nelisa rieši, prečo portály samé nestačia a čo klient získa navyše (zásah mimo aktívnych kandidátov, menšia konkurencia).',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Zaradenie Nelisy do ekosystému Alma Career – vysvetlenie, že ide o súčasť širšieho portfólia a dlhodobého partnerstva, nie o izolovaný nástroj.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Technický popis fungovania kampaní a kanálov – aby si marketing mohol interne posúdiť, ako sa kampane nasadzujú a optimalizujú.',
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
                    VÝBER JEDNEJ ODPOVEDE
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
                  Vyber, na čo sa máš vo follow-upe zamerať ako na hlavnú os oznámenia, aby interná diskusia u klienta mala šancu dospieť k rozhodnutiu.
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Situácia sa môže riešiť podľa potreby HR klienta, ale zaujíma nás hlavná os.
                </p>
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
                      onClick={() => { if (!isConfirmed) { setSelectedOption(option.id); onStoreSelection?.(option.id); } }}
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
                    Na konci klient často nemá problém s produktom, ale s tým, že nevie, čo teraz konkrétne urobiť. Dobré zhrnutie a jasný ďalší krok zvyšujú šancu, že sa schvaľovanie a štart naozaj stanú. Keď klient odchádza bez "next steps", stretnutie často vyšumí a rozhodnutie sa odkladá. V priebehu kampane je dôležité s klientom priebežne kampaň vyhodnocovať, čo môže viesť k úspešnej retencii.
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
                        Späť na príbeh
                      </Button>
                      {onSkip && (
                        <Button
                          variant="ghost"
                          onClick={onSkip}
                          className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                        >
                          Preskočiť úlohu
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
                      Skontrolovať
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
                      Pokračovať
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