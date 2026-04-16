import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ChevronRight, CheckCircle2, Check, X } from 'lucide-react';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { QuotedText } from '@/app/components/ui/QuotedText';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface Screen13Props {
  onBackToStory: () => void;
  onSkipTask: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export function Screen13({ onBackToStory, onSkipTask, onNext, onLogoClick, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen13Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialSelection ?? null);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);

  const options: Option[] = [
    {
      id: 'A',
      text: '„Ako dnes rozmýšľate nad tým, aby bol text ponuky zaujímavý aj pre ľudí, ktorí prácu aktívne nehľadajú?"',
      isCorrect: true
    },
    {
      id: 'B',
      text: '„Máte skúsenosť s tým, že by sa vám na ponuku ozvali ľudia, ktorí pôvodne zmenu práce vôbec neriešili?"',
      isCorrect: true
    },
    {
      id: 'C',
      text: '„Kto u vás texty finálne schvaľuje?"',
      isCorrect: false
    },
    {
      id: 'D',
      text: '„Ako dlho vám obvykle trvá text pripraviť?"',
      isCorrect: false
    }
  ];

  const handleOptionClick = (optionId: string) => {
    if (isConfirmed) return;

    setSelectedOption(optionId);
    onStoreSelection?.(optionId);
  };

  const handleCheck = () => {
    if (!selectedOption || isConfirmed) return;
    setIsConfirmed(true);
    const selected = options.find(o => o.id === selectedOption);
    if (selected) onAnswerSubmit?.(selected.isCorrect, selected.text);
  };

  const getOptionStyle = (option: Option) => {
    const isSelected = selectedOption === option.id;

    if (!isConfirmed) {
      // Before confirmation
      if (isSelected) {
        return {
          backgroundColor: 'rgba(174, 84, 255, 0.08)',
          borderColor: '#AE54FF',
          borderWidth: '2px',
        };
      }
      return {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
        borderWidth: '2px',
      };
    }

    // After confirmation
    if (isSelected) {
      if (option.isCorrect) {
        // Correct answer - MASTER REFERENCE from Question 3
        return {
          backgroundColor: '#ecfdf5', // bg-green-50 equivalent
          borderColor: '#22c55e', // border-green-500 equivalent  
          borderWidth: '2px',
        };
      } else {
        // Wrong answer
        return {
          backgroundColor: '#FEE2E2',
          borderColor: '#EF4444',
          borderWidth: '2px',
        };
      }
    }

    // Not selected
    return {
      backgroundColor: 'white',
      borderColor: '#E5E7EB',
      borderWidth: '2px',
      opacity: 0.5,
    };
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '44px' }}>
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
                <CheckCircle2 className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                  VÝBER ODPOVEDE
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h1 
              className="text-gray-900 mb-4" 
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                lineHeight: '130%'
              }}
            >
              Vyber otázku/y, ktoré by si v túto chvíľu položil/a, aby si si overil/a, či súčasný spôsob písania inzerátov dokáže osloviť aj <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 700 }}>pasívnych kandidátov</span>.
            </h1>

            {/* Options Grid */}
            <div className="mb-8 grid grid-cols-1 gap-4">
              {options.map((option) => {
                const isSelected = selectedOption === option.id;
                const style = getOptionStyle(option);

                return (
                  <motion.div
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className="p-6 rounded-2xl border transition-all cursor-pointer relative"
                    style={style}
                    whileHover={!isConfirmed ? { scale: 1.01 } : {}}
                    whileTap={!isConfirmed ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start gap-3">
                      {/* Letter Badge */}
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#4B5563'
                        }}
                      >
                        {option.id}
                      </div>

                      {/* Option Text */}
                      <p 
                        className="text-base leading-relaxed flex-1"
                        style={{
                          color: isConfirmed && isSelected
                            ? (option.isCorrect ? '#065F46' : '#991B1B')
                            : '#1F2937',
                          fontWeight: 400
                        }}
                      >
                        <QuotedText>{option.text}</QuotedText>
                      </p>

                      {/* Result Icon - MASTER REFERENCE from Question 3 */}
                      {isConfirmed && isSelected && (
                        <div className="flex-shrink-0">
                          {option.isCorrect ? (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          ) : (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Explanation Section - Shows after confirmation */}
            {isConfirmed && (
              <ExplanationBlock>
                <p>
                  Copy nie je prepísaný popis pozície, ale výkonový nástroj, ktorý rozhoduje o tom, či relevantný človek urobí ďalší krok. Pri kampaniach to platí dvojnásobne: klient do nich investuje nemalé čiastky a bez správneho a kvalitného copy sa kampaň typicky „nechytí" – rozpočet sa môže pretočiť na zobrazenia a prekliky, ale nepríde dosť kvalitných reakcií.
                </p>
                <p>
                  To sa nedá urobiť bez kontextu, pretože každá cieľovka má iné motivácie, obavy a jazyk. Navyše pasívny kandidát sa správa inak ako aktívny: prácu aktívne nehľadá, takže ho potrebuješ zaujať rýchlo, „chytiť za srdce" a nadchnúť pre myšlienku zmeny ešte skôr, než začne riešiť detaily.
                </p>
                <p>
                  Preto je správny postup ten, ktorý zbiera podklady a dopytuje sa – kvalita vstupných informácií od klienta často ovplyvní výsledok kampane viac než samotné „pekné vety".
                </p>
              </ExplanationBlock>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {!isConfirmed && (
                  <Button
                    variant="ghost"
                    onClick={onBackToStory}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Späť na príbeh
                  </Button>
                )}
                {!isConfirmed && (
                  <Button
                    variant="ghost"
                    onClick={onSkipTask}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Preskočiť úlohu
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {!isConfirmed && (
                  <Button
                    onClick={handleCheck}
                    disabled={!selectedOption}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
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
                )}
                {isConfirmed && (
                  <Button
                    onClick={onNext}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                    style={{ backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                    }}
                  >
                    Pokračovať
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
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