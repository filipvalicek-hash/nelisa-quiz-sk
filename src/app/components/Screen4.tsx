import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { ChevronRight, Check, XCircle, CheckCircle } from 'lucide-react';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface Screen4Props {
  onBackToStory: () => void;
  onSkipTask: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

interface DialogueOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

export function Screen4({ onBackToStory, onSkipTask, onNext, onLogoClick, onAnswerSubmit }: Screen4Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const options: DialogueOption[] = [
    {
      id: 'A',
      label: 'A',
      text: 'Portály dnes už moc nefungují, proto je lepší jet kampaně.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Inzerát funguje hlavně na lidi, kteří práci aktivně hledají. Kampaně k tomu přidávají zásah i na kandidáty, kteří teď nehledají, ale mohou být otevření změně.',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Kampaně jsou vždy levnější než portály.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Tohle je špatný inzerát, musíte ho přepsat.',
      isCorrect: false
    }
  ];

  const handleOptionClick = (optionId: string) => {
    if (isConfirmed) return;
    
    // Just select, don't confirm yet
    setSelectedOption(optionId);
  };

  const handleCheck = () => {
    if (!selectedOption) return;

    const selected = options.find(o => o.id === selectedOption);
    if (selected) {
      setIsCorrect(selected.isCorrect);
      setIsConfirmed(true);
      onAnswerSubmit?.(selected.isCorrect, selected.text);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="flex items-start justify-center px-8" style={{ marginTop: '44px', paddingBottom: '60px' }}>
        <motion.div
          className="w-full"
          style={{ maxWidth: '920px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle Background Card Layer */}
          <div
            className="rounded-3xl"
            style={{
              backgroundColor: '#F8F9FA',
              padding: '32px'
            }}
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
                  <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                    VÝBĚR ODPOVĚDI
                  </span>
                </div>
              </div>

              {/* Question Text - MANDATORY: 24px SemiBold with purple underline */}
              <h3 
                className="text-gray-900" 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 600, 
                  lineHeight: '1.58', 
                  letterSpacing: 0,
                  marginBottom: '28px'
                }}
              >
                Vyber nejlepší reakci, která <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 600 }}>respektuje portály</span> a zároveň <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 600 }}>vysvětlí přidanou hodnotu kampaní</span>.
              </h3>

              {/* Options Grid - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
                              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.2), 0 2px 6px rgba(139, 92, 246, 0.2)'
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
                        
                        {/* Text Content - MANDATORY: Regular (400) weight */}
                        <div className="flex-1">
                          <p 
                            className={`
                              text-base
                              ${isSelected && !isConfirmed ? 'text-gray-900' : 'text-gray-700'}
                              ${showCorrect ? 'text-green-900' : ''}
                              ${showIncorrect ? 'text-red-900' : ''}
                            `}
                            style={{ fontWeight: 400, lineHeight: '1.58' }}
                          >
                            {option.text}
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
                  <ExplanationBlock>
                    <p>
                      Klient často porovnává cenu kampaně s inzercí, protože obě věci „vypadají jako nábor". Rozdíl je v mechanismu i rozsahu: u inzerátu typicky platíš za 1 místo na job boardu a čekáš, kdo přijde.
                    </p>
                    <p>
                      Kampaň je naopak aktivní distribuce napříč zhruba 16 kanály a průběžné řízení doručování na výkon.
                    </p>
                    <p>
                      Proto to nejde srovnávat 1:1 – klient nekupuje jen „prostor" nebo nástroj na CVčka, ale řízenou HR marketingovou kampaň (se sekundárním efektem na employer branding) včetně optimalizace.
                    </p>
                  </ExplanationBlock>
                )}
              </AnimatePresence>

              {/* Action Buttons - Moved inside card like Screen3 */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={onBackToStory}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Zpět na příběh
                  </Button>
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
                    <QuizButton
                      onClick={handleCheck}
                      disabled={!selectedOption}
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
          </div>
        </motion.div>
      </div>
      {/* Footer Logo Navigation */}
      <FooterLogoNavigation onLogoClick={onLogoClick} />
    </div>
  );
}