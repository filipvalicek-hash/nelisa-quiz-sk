import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { ChevronRight, Check, X, MessageSquare, Quote } from 'lucide-react';
import { QuotedText } from '@/app/components/ui/QuotedText';

interface Option {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Screen23Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen23({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen23Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialSelection ?? null);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);

  const options: Option[] = [
    {
      id: 'A',
      label: 'A',
      text: '„Portály řeší lidi, kteří práci aktivně hledají. Kampaně pomáhají oslovit i ty, kteří aktivně nehledají, ale o změně uvažují. Fungují výhradně jako doplněk na sociálních sítích."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Portály jsou dnes základ a kampaně jsou jejich modernější náhrada."',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„Pokud vám portály fungují, dává smysl je zachovat a Nelisu využít tam, kde samotná inzerce nestačí."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Portály pracují s existující poptávkou. Kampaně pomáhají tu poptávku aktivně vytvářet a rozšiřovat mimo portály."',
      isCorrect: true
    }
  ];

  const questionText = 'Klient říká: „Hele, my ty portály máme docela vychytané. Zatím nám fungují." Vyber odpověď, která nejlépe vysvětluje, kde Nelisa doplní portály.';

  const explanationText = `Klient nechce slyšet, že jeho současné řešení je špatně. Když začneš shazovat portály, vyvoláš odpor a obrannou reakci. Správný přístup je portály respektovat a vysvětlit doplnění. Kampaně rozšiřují zásah mimo existující poptávku, a tím přivádí jiné publikum i jiné reakce. Díky tomu se klient cítí pochopený a zároveň vidí důvod, proč přidat další vrstvu.`;

  const handleCheck = () => {
    if (selectedOption) {
      setIsConfirmed(true);
      const selected = options.find(o => o.id === selectedOption);
      if (selected) onAnswerSubmit?.(selected.isCorrect, selected.text);
    }
  };

  const getOptionStatus = (optionId: string): 'correct' | 'incorrect' | 'neutral' | 'normal' => {
    if (!isConfirmed) return 'normal';
    
    const option = options.find(o => o.id === optionId);
    if (!option) return 'normal';

    if (option.isCorrect) return 'correct';
    if (optionId === selectedOption) return 'incorrect';
    return 'neutral';
  };

  const selectedOptionData = options.find(o => o.id === selectedOption);
  const isCorrect = selectedOptionData?.isCorrect || false;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-start justify-center px-4 md:px-8 pb-12" style={{ marginTop: '44px' }}>
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="bg-white rounded-3xl p-6 md:p-8 relative shadow-card-responsive"
          >
            {/* Question Type Label */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                <MessageSquare className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                  VÝBĚR JEDNÉ ODPOVĚDI
                </span>
              </div>
            </div>

            {/* Main Question Title - MANDATORY: 24px SemiBold with purple underline */}
            <h3 
              className="text-gray-900 mb-6 leading-tight" 
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                lineHeight: '130%', 
                letterSpacing: 0
              }}
            >
              Vyber odpověď, která nejlépe vysvětlí, jak <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Nelisa doplní portály</span>.
            </h3>

            {/* Context paragraph */}
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {questionText}
            </p>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {options.map((option) => {
                const status = getOptionStatus(option.id);
                const isSelected = selectedOption === option.id;
                
                return (
                  <motion.div
                    key={option.id}
                    onClick={() => {
                      if (!isConfirmed) {
                        setSelectedOption(option.id);
                        onStoreSelection?.(option.id);
                      }
                    }}
                    className={`
                      p-5 rounded-2xl border-2 cursor-pointer transition-all
                      ${!isConfirmed ? 'hover:border-purple-300 hover:shadow-md' : ''}
                      ${status === 'correct' ? 'border-green-500 bg-green-50' : ''}
                      ${status === 'incorrect' ? 'border-red-400 bg-red-50' : ''}
                      ${status === 'neutral' ? 'border-gray-200 bg-gray-50 opacity-50' : ''}
                      ${status === 'normal' && isSelected ? 'border-purple-500 bg-purple-50' : ''}
                      ${status === 'normal' && !isSelected ? 'border-gray-200 bg-white' : ''}
                    `}
                    whileHover={!isConfirmed ? { scale: 1.01 } : {}}
                    whileTap={!isConfirmed ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div 
                          className={`
                            w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                            ${status === 'correct' ? 'bg-green-500 text-white' : ''}
                            ${status === 'incorrect' ? 'bg-red-400 text-white' : ''}
                            ${status === 'neutral' ? 'bg-gray-300 text-gray-600' : ''}
                            ${status === 'normal' && isSelected ? 'bg-purple-500 text-white' : ''}
                            ${status === 'normal' && !isSelected ? 'bg-gray-100 text-gray-700' : ''}
                          `}
                        >
                          {option.label}
                        </div>
                        {/* Quote icon - EXACT values from Question 22 */}
                        <Quote 
                          className="flex-shrink-0" 
                          style={{ 
                            width: '16px',
                            height: '16px',
                            color: '#AE54FF',
                            marginTop: '3px'
                          }} 
                          strokeWidth={2.5}
                        />
                        <p className="text-gray-700 leading-relaxed flex-1" style={{ fontWeight: 400 }}>
                          {option.text}
                        </p>
                      </div>
                      {isConfirmed && status === 'correct' && (
                        <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                      )}
                      {isConfirmed && status === 'incorrect' && (
                        <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Explanation Block */}
            {isConfirmed && (
              <ExplanationBlock>
                <p>
                  {explanationText}
                </p>
              </ExplanationBlock>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                {!isConfirmed && (
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Zpět na příběh
                  </Button>
                )}
                {!isConfirmed && onSkip && (
                  <Button
                    variant="ghost"
                    onClick={onSkip}
                    className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                  >
                    Přeskočit otázku
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
                    Zkontrolovat
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
                {isConfirmed && (
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
        </motion.div>
      </div>
    </div>
  );
}