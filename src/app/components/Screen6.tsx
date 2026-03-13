import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, XCircle, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';
import { QuestionTypeTag } from '@/app/components/QuestionTypeTag';
import { QuotedText } from '@/app/components/ui/QuotedText';

interface Screen6Props {
  onBackToStory: () => void;
  onSkipTask: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

interface DialogueOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

export function Screen6({ onBackToStory, onSkipTask, onNext, onLogoClick, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen6Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialSelection ?? null);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);

  const options: DialogueOption[] = [
    {
      id: 'A',
      label: 'A',
      text: '„V ceně kampaně platíte za to, že nabídku aktivně doručíme napříč kanály a průběžně řídíme výkon. Součástí jsou i průběžné statistiky, konzultace a grafické zpracování bannerů, takže na to nemusíte mít vlastní marketingovou kapacitu."',
      isCorrect: true
    },
    {
      id: 'B',
      label: 'B',
      text: '„Cena je vyšší, protože v tom máte i dopad na značku - firma je víc vidět a kandidáti si vás začnou pamatovat. To je dneska klíčové."',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„Je to o rozsahu: nejdete jen na jedno místo, ale do více prostředí, kde lidé reálně tráví čas. Část ceny je prostě \'mediální prostor\' a část je práce systému, který hledá nejlepší kombinaci."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Je to dražší, protože to funguje i bez práce na vaší straně - vy jen zadáte pozici a my to celé odřídíme. Proto je to víc než inzerát."',
      isCorrect: false
    }
  ];

  const isCorrect = selectedOption ? (options.find(o => o.id === selectedOption)?.isCorrect ?? false) : false;

  const handleOptionClick = (optionId: string) => {
    if (isConfirmed) return;
    setSelectedOption(optionId);
    onStoreSelection?.(optionId);
  };

  const handleCheck = () => {
    if (!selectedOption || isConfirmed) return;

    const selected = options.find(o => o.id === selectedOption);
    if (selected) {
      setIsConfirmed(true);
      onAnswerSubmit?.(selected.isCorrect, selected.text);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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
              <QuestionTypeTag text="VÝBĚR ODPOVĚDI" icon={CheckCircle} />
            </div>

            {/* Question Text - MANDATORY: 24px SemiBold with purple underline */}
            <h3 
              style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                lineHeight: '130%', 
                letterSpacing: 0
              }}
            >
              Vyber <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nejlepší reakci</span>.
            </h3>

            {/* Options Grid - Single Column Layout */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrectOption = option.isCorrect;
                const showCorrect = isConfirmed && isCorrectOption;
                const showIncorrect = isConfirmed && isSelected && !isCorrectOption;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    disabled={isConfirmed}
                    whileHover={!isConfirmed ? { scale: 1.005, y: -1 } : {}}
                    whileTap={!isConfirmed ? { scale: 0.995 } : {}}
                    className={`
                      w-full relative p-6 rounded-2xl text-left transition-all border-2
                      ${isSelected && !isConfirmed ? 'bg-purple-50 border-purple-500' : ''}
                      ${!isSelected && !isConfirmed ? 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50/20' : ''}
                      ${showCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-500' : ''}
                      ${isConfirmed && !showCorrect && !showIncorrect ? 'bg-white border-gray-200 opacity-50' : ''}
                      ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    style={
                      isSelected && !isConfirmed
                        ? {
                            boxShadow: '0 4px 16px rgba(174, 84, 255, 0.15), 0 2px 6px rgba(174, 84, 255, 0.1)'
                          }
                        : undefined
                    }
                  >
                    {/* Option Layout */}
                    <div className="flex items-start gap-4">
                      {/* Label Badge */}
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                        ${isSelected && !isConfirmed ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}
                        ${showCorrect ? 'bg-green-500 text-white' : ''}
                        ${showIncorrect ? 'bg-red-400 text-white' : ''}
                      `}>
                        {option.label}
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <p className={`
                          leading-relaxed text-base
                          ${isSelected && !isConfirmed ? 'text-gray-900' : 'text-gray-700'}
                          ${showCorrect ? 'text-green-900' : ''}
                          ${showIncorrect ? 'text-red-900' : ''}
                        `} style={{ fontWeight: 400 }}>
                          <QuotedText>{option.text}</QuotedText>
                        </p>
                      </div>

                      {/* Checkmark for correct answer */}
                      {showCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                      {/* X mark for incorrect answer */}
                      {showIncorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
                        >
                          <XCircle className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation Section - Shows for ALL answers */}
            <AnimatePresence>
              {isConfirmed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-6 rounded-2xl border-2"
                  style={{
                    backgroundColor: '#f8fafc',
                    borderColor: '#cbd5e1'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e0e7ff' }}>
                      <span className="text-xl">💡</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Vysvětlení</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Klient nekupuje jen „zobrazení", ale službu jako celek: aktivní doručení kampaně a řízení výkonu, plus konkrétní servis kolem (statistiky, konzultace, grafika a bannery), který má u Nelisy standardně zahrnutý.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-3">
                        Employer branding, více kanálů i rozšíření zásahu mimo portály jsou pravdivé benefity, ale samy o sobě nevysvětlují, co všechno klient v ceně reálně dostává.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-3">
                        Copywriting je navíc samostatná služba (není automaticky „vždy v ceně").
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {!isConfirmed && (
                  <Button
                    variant="ghost"
                    onClick={onBackToStory}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Zpět na příběh
                  </Button>
                )}
                {!isConfirmed && (
                  <Button
                    variant="ghost"
                    onClick={onSkipTask}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Přeskočit úkol
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {!isConfirmed && (
                  <Button
                    onClick={handleCheck}
                    disabled={!selectedOption}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }}
                    onMouseEnter={(e) => {
                      if (selectedOption) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
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
                    style={{ backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
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