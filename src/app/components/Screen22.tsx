import { useState } from 'react';
import { Check, Shuffle, ArrowLeft, Quote, X, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { motion, AnimatePresence } from 'motion/react';

interface Screen22Props {
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  initialConfirmed?: boolean;
  initialSelection?: Array<{ leftId: string; rightId: string }>;
  onStoreSelection?: (sel: Array<{ leftId: string; rightId: string }>) => void;
}

interface MatchItem {
  id: string;
  text: string;
}

interface Pairing {
  leftId: string;
  rightId: string;
}

export function Screen22({ onNext, onBack, onLogoClick, onSkip, initialConfirmed = false, initialSelection, onStoreSelection }: Screen22Props) {
  // Define matching pairs (correct answers)
  const correctPairs: Record<string, string> = {
    'namitka1': 'arg-a',
    'namitka2': 'arg-b',
    'namitka3': 'arg-c',
    'namitka4': 'arg-d',
    'namitka5': 'arg-e',
    'namitka6': 'arg-f'
  };

  const leftItems: MatchItem[] = [
    { id: 'namitka1', text: '„Oproti bežnej inzercii je to príliš drahé"' },
    { id: 'namitka2', text: '„Aktuálne nemáme náborovú potrebu"' },
    { id: 'namitka3', text: '„Inzerciu cez sociálne siete riešime s agentúrou alebo interne"' },
    { id: 'namitka4', text: '„Je to ďalší systém navyše, už teraz ich máme príliš veľa / To bude príliš zložité"' },
    { id: 'namitka5', text: '„Už sme to skúšali a nefungovalo to"' },
    { id: 'namitka6', text: '„Stačí nám inzerovať cez jobboardy"' }
  ];

  // Shuffle right items for randomization
  const rightItemsOriginal: MatchItem[] = [
    { 
      id: 'arg-a',
      text: 'Kampane bežia na viacerých kanáloch a oslovujú aj cca 70 % pasívnych kandidátov (nielen 30 % aktívnych). V cene sú navyše služby ako firemný profil, tvorba bannerov a štatistiky, takže šetríte čas aj peniaze – ideálne to poďme overiť pilotne na jednej role a potom sa rozhodnúť.' 
    },
    { 
      id: 'arg-b',
      text: 'Práve teraz je najlepšia chvíľa riešiť nábor s predstihom: môžete si vybudovať databázu kandidátov, podporiť employer branding a kampaň pripraviť tak, aby sa dala spustiť vo chvíli, keď potreba reálne vznikne.' 
    },
    { 
      id: 'arg-c',
      text: 'Nelisa je hotové hiringové riešenie so špecializovaným know-how, ktoré sa rýchlo optimalizuje podľa dát. Oproti internej alebo agentúrnej správe šetrí čas a vo výsledku aj náklady.' 
    },
    { 
      id: 'arg-d',
      text: 'Proces je jednoduchý: od založenia profilu vieme spustiť kampaň do 3 pracovných dní a vďaka integráciám chodia kandidáti priamo do ATS, takže najlepšie je si to vyskúšať v praxi.' 
    },
    { 
      id: 'arg-e',
      text: 'Pri týchto kampaniach typicky rozhoduje cielenie, región, samotná ponuka (vrátane mzdy) alebo text inzerátu. Bol problém v počte reakcií? Kampaň bežala interne, cez agentúru, alebo cez Nelisu?' 
    },
    { 
      id: 'arg-f',
      text: 'Najlepšie funguje kombinácia: jobboardy pokryjú aktívnych kandidátov, kampane doplnia pasívny trh (cca 70 %), kde býva často aj vyššia kvalita uchádzačov.' 
    }
  ];

  // Shuffle function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const [rightItems] = useState<MatchItem[]>(() => shuffleArray(rightItemsOriginal));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [pairings, setPairings] = useState<Pairing[]>(initialSelection ?? []);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);
  const [feedback, setFeedback] = useState<'correct' | 'partial' | null>(() => {
    if (!initialConfirmed || !initialSelection || initialSelection.length === 0) return null;
    const correctCount = initialSelection.filter(p => correctPairs[p.leftId] === p.rightId).length;
    return correctCount === initialSelection.length ? 'correct' : 'partial';
  });

  // Orange color theme for objection handling
  const PRIMARY_COLOR = {
    tag: 'bg-orange-50 border-orange-300',
    tagText: 'text-orange-800',
    tagIcon: 'text-orange-700',
    active: 'bg-orange-50 border-orange-500',
    activeShadow: 'rgba(255, 116, 0, 0.2)',
    correct: 'bg-green-50 border-green-500',
    correctIcon: 'bg-green-500',
    incorrect: 'bg-gray-50 border-gray-300',
    hover: 'hover:border-orange-300 hover:bg-orange-50/20'
  };

  // Click handlers
  const handleLeftClick = (id: string) => {
    if (isConfirmed) return;
    
    setSelectedLeft(id);
    
    // If right is already selected, create pairing
    if (selectedRight) {
      createPairing(id, selectedRight);
      setSelectedRight(null);
    }
  };

  const handleRightClick = (id: string) => {
    if (isConfirmed) return;
    
    setSelectedRight(id);
    
    // If left is already selected, create pairing
    if (selectedLeft) {
      createPairing(selectedLeft, id);
      setSelectedLeft(null);
    }
  };

  const createPairing = (leftId: string, rightId: string) => {
    // Remove any existing pairings with these items
    const newPairings = pairings.filter(p => p.leftId !== leftId && p.rightId !== rightId);
    
    // Add new pairing
    newPairings.push({ leftId, rightId });
    
    setPairings(newPairings);
    onStoreSelection?.(newPairings);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const getPairingForLeft = (leftId: string): Pairing | undefined => {
    return pairings.find(p => p.leftId === leftId);
  };

  const getPairingForRight = (rightId: string): Pairing | undefined => {
    return pairings.find(p => p.rightId === rightId);
  };

  const isLeftPaired = (leftId: string): boolean => {
    return pairings.some(p => p.leftId === leftId);
  };

  const isRightPaired = (rightId: string): boolean => {
    return pairings.some(p => p.rightId === rightId);
  };

  const isPairCorrect = (pairing: Pairing): boolean => {
    return correctPairs[pairing.leftId] === pairing.rightId;
  };

  const handleConfirm = () => {
    if (pairings.length !== leftItems.length) return;

    const correctCount = pairings.filter(p => isPairCorrect(p)).length;
    const allCorrect = correctCount === pairings.length;

    setFeedback(allCorrect ? 'correct' : 'partial');
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setPairings([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsConfirmed(false);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Decoration */}
      <QuestionBackgroundDecoration type="choice" />
      
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}
      {/* REMOVED: ProgressSection - now global in App.tsx */}

      {/* Main Content - Centered Single Panel */}
      <div className="flex items-center justify-center px-8 pb-16 relative z-10" style={{ marginTop: '32px' }}>
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* White Question Panel with Soft Shadows */}
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
            {/* Content */}
            <div>
              {/* Panel Header with Purple Accents */}
              <div className="mb-10">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border mb-6`} style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <Shuffle className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                  <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                    PRIRADENIE
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
                  Priraď <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správnu argumentáciu</span> ku každej námietke
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                </p>
              </div>

              {/* Matching Grid */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                {/* Left Column - Objections */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-gray-500 tracking-wider mb-3">
                    NÁMIETKY
                  </div>
                  {leftItems.map((item) => {
                    const isPaired = isLeftPaired(item.id);
                    const isSelected = selectedLeft === item.id;
                    const pairing = getPairingForLeft(item.id);
                    const isCorrect = pairing && isConfirmed ? isPairCorrect(pairing) : null;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleLeftClick(item.id)}
                        disabled={isConfirmed}
                        whileHover={!isConfirmed && !isPaired ? { scale: 1.01, y: -1 } : {}}
                        whileTap={!isConfirmed && !isPaired ? { scale: 0.99 } : {}}
                        className={`
                          w-full p-5 rounded-2xl text-left transition-all border-2
                          ${isSelected && !isConfirmed ? `${PRIMARY_COLOR.active}` : ''}
                          ${!isSelected && !isConfirmed && !isPaired ? `bg-white border-gray-200 ${PRIMARY_COLOR.hover}` : ''}
                          ${isPaired && !isConfirmed && !isSelected ? 'bg-gray-50/50 border-gray-300' : ''}
                          ${isConfirmed && isCorrect === true ? PRIMARY_COLOR.correct : ''}
                          ${isConfirmed && isCorrect === false ? PRIMARY_COLOR.incorrect : ''}
                          ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                        `}
                        style={
                          isSelected && !isConfirmed
                            ? {
                                boxShadow: `0 4px 16px ${PRIMARY_COLOR.activeShadow}, 0 2px 6px ${PRIMARY_COLOR.activeShadow}`,
                                fontWeight: 400
                              }
                            : { fontWeight: 400 }
                        }
                      >
                        <div className="flex items-start gap-3">
                          {/* Quote icon - EXACT values from Question 21 */}
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
                          <span className="text-gray-900 text-base leading-relaxed" style={{ flex: 1, fontWeight: 400 }}>{item.text}</span>
                          
                          {/* Correct answer icon - Standard size */}
                          {isPaired && isConfirmed && isCorrect === true && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                            >
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          
                          {/* Incorrect answer icon - Standard size */}
                          {isPaired && isConfirmed && isCorrect === false && (
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

                {/* Right Column - Arguments */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-gray-500 tracking-wider mb-3">
                    ARGUMENTÁCIA
                  </div>
                  {rightItems.map((item) => {
                    const isPaired = isRightPaired(item.id);
                    const isSelected = selectedRight === item.id;
                    const pairing = getPairingForRight(item.id);
                    const isCorrect = pairing && isConfirmed ? isPairCorrect(pairing) : null;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleRightClick(item.id)}
                        disabled={isConfirmed}
                        whileHover={!isConfirmed && !isPaired ? { scale: 1.01, y: -1 } : {}}
                        whileTap={!isConfirmed && !isPaired ? { scale: 0.99 } : {}}
                        className={`
                          w-full p-5 rounded-2xl text-left transition-all border-2
                          ${isSelected && !isConfirmed ? `${PRIMARY_COLOR.active}` : ''}
                          ${!isSelected && !isConfirmed && !isPaired ? `bg-white border-gray-200 ${PRIMARY_COLOR.hover}` : ''}
                          ${isPaired && !isConfirmed && !isSelected ? 'bg-gray-50/50 border-gray-300' : ''}
                          ${isConfirmed && isCorrect === true ? PRIMARY_COLOR.correct : ''}
                          ${isConfirmed && isCorrect === false ? PRIMARY_COLOR.incorrect : ''}
                          ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                        `}
                        style={
                          isSelected && !isConfirmed
                            ? {
                                boxShadow: `0 4px 16px ${PRIMARY_COLOR.activeShadow}, 0 2px 6px ${PRIMARY_COLOR.activeShadow}`,
                                fontWeight: 400
                              }
                            : { fontWeight: 400 }
                        }
                      >
                        <div className="flex items-start gap-3">
                          {/* Quote icon - EXACT values from Question 21 */}
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
                          <span className="text-gray-900 text-base leading-relaxed" style={{ flex: 1, fontWeight: 400 }}>{item.text}</span>
                          
                          {/* Correct answer icon - Standard size */}
                          {isPaired && isConfirmed && isCorrect === true && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          
                          {/* Incorrect answer icon - Standard size */}
                          {isPaired && isConfirmed && isCorrect === false && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback - Only after confirmation */}
              <AnimatePresence>
                {isConfirmed && feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mb-8 p-6 rounded-2xl border-2 ${
                      feedback === 'correct' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-orange-50 border-orange-200'
                    }`}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feedback === 'correct' ? 'bg-green-500' : 'bg-orange-400'
                      }`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className={`font-bold text-lg ${
                          feedback === 'correct' ? 'text-green-900' : 'text-orange-900'
                        }`}>
                          {feedback === 'correct' 
                            ? 'Perfektné! Zvládol/zvládla si to.'
                            : 'Niektoré páry nesedia'
                          }
                        </p>
                        <p className={`text-sm mt-1 ${
                          feedback === 'correct' ? 'text-green-800' : 'text-orange-700'
                        }`}>
                          {feedback === 'correct'
                            ? 'Vieš reagovať na námietky prirodzene, vecne a s konkrétnymi dátami. Na schôdzke to bude znať – klient uvidí, že to myslíš vážne a nevymýšľaš si. To je rozdiel medzi „ďalší predavač" a „poradca, ktorému verím".'
                            : 'Skontroluj svoje odpovede – niektoré spojenia nezodpovedajú situácii klienta. Nabudúce si vždy pripomeň: Akú obavu klient reálne má? A čo potrebuje počuť, aby sa rozhodol skúsiť to?'
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
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
                  {!isConfirmed && (
                    <Button
                      onClick={handleReset}
                      disabled={pairings.length === 0}
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-900 font-medium disabled:opacity-30"
                    >
                      Začať odznova
                    </Button>
                  )}

                  {!isConfirmed ? (
                    <Button
                      onClick={handleConfirm}
                      disabled={pairings.length !== leftItems.length}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={
                        pairings.length === leftItems.length
                          ? { backgroundColor: '#AE54FF', color: 'white', borderRadius: '12px' }
                          : { borderRadius: '12px' }
                      }
                      onMouseEnter={(e) => {
                        if (pairings.length === leftItems.length) {
                          e.currentTarget.style.backgroundColor = '#9333EA';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pairings.length === leftItems.length) {
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