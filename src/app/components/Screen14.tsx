import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Link2, Check, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { motion, AnimatePresence } from 'motion/react';

interface Screen14Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: Array<{ leftId: string; rightId: string }>;
  onStoreSelection?: (sel: Array<{ leftId: string; rightId: string }>) => void;
}

interface Pairing {
  leftId: string;
  rightId: string;
}

// Define color palette for pairings
const PAIRING_COLORS = [
  { bg: '#FFFFFF', border: '#D1D5DB', line: '#9CA3AF' }, // Neutral grey
  { bg: '#FFFFFF', border: '#D1D5DB', line: '#9CA3AF' }, // Neutral grey
  { bg: '#FFFFFF', border: '#D1D5DB', line: '#9CA3AF' }, // Neutral grey
];

export function Screen14({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen14Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [pairings, setPairings] = useState<Pairing[]>(initialSelection ?? []);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);

  // Refs for position calculation
  const leftRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [linePositions, setLinePositions] = useState<Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    path: string;
  }>>([]);
  const rafRef = useRef<number | null>(null);

  const leftItems = [
    { id: '1', text: '1. Pasívny kandidát sa pri ponuke zastaví, ale nevie, prečo by mal reagovať.' },
    { id: '2', text: '2. Text znie ako interný HR popis, nie ako správa pre človeka „vonku".' },
    { id: '3', text: '3. Firma chce, aby ponuka pôsobila zrozumiteľne a dôveryhodne aj mimo portálov.' }
  ];

  const rightItems = [
    { id: 'A', text: 'A) Copywriting prekladá HR jazyk do reči cieľovej skupiny.' },
    { id: 'B', text: 'B) Copywriting pomáha vysvetliť zmysel role a firmy skôr, než sa riešia detaily.' },
    { id: 'C', text: 'C) Copywriting zvyšuje dôveru a ochotu reagovať u ľudí, ktorí pôvodne zmenu práce neriešili.' }
  ];

  // Correct mapping: 1→B alebo C, 2→A, 3→C alebo B
  const correctPairs: Record<string, string[]> = {
    '1': ['B', 'C'], // Copywriting pomáha vysvetliť zmysel role ALEBO zvyšuje dôveru
    '2': ['A'],      // Copywriting prekladá HR jazyk
    '3': ['C', 'B']  // Copywriting zvyšuje dôveru ALEBO pomáha vysvetliť zmysel role
  };

  // Calculate line positions when pairings change
  useEffect(() => {
    const calculateLines = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smoother updates
      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const newLines = pairings.map((pairing, index) => {
          const leftEl = leftRefs.current[pairing.leftId];
          const rightEl = rightRefs.current[pairing.rightId];
          
          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          const color = PAIRING_COLORS[index % PAIRING_COLORS.length];

          // Start point: stred pravého okraja ľavej karty
          const x1 = leftRect.right - containerRect.left;
          const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
          
          // End point: stred ľavého okraja pravej karty
          const x2 = rightRect.left - containerRect.left;
          const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

          // Calculate distance and control points for smooth S-curve
          const distance = x2 - x1;
          const controlPointOffset = distance * 0.5;
          
          // Create smooth S-curve path
          const path = `M ${x1} ${y1} C ${x1 + controlPointOffset} ${y1}, ${x2 - controlPointOffset} ${y2}, ${x2} ${y2}`;

          return {
            x1,
            y1,
            x2,
            y2,
            color: color.line,
            path
          };
        }).filter(line => line !== null) as Array<{
          x1: number;
          y1: number;
          x2: number;
          y2: number;
          color: string;
          path: string;
        }>;

        setLinePositions(newLines);
      });
    };

    // Initial calculation with immediate render
    calculateLines();
    
    // Recalculate on resize with debouncing
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(calculateLines, 50);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver for better layout change detection
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateLines();
      });
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [pairings]);

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

  const getPairingColor = (leftId: string, rightId: string) => {
    const pairingIndex = pairings.findIndex(p => p.leftId === leftId || p.rightId === rightId);
    if (pairingIndex === -1) return null;
    return PAIRING_COLORS[pairingIndex % PAIRING_COLORS.length];
  };

  // Check if a pairing is correct (supports multiple correct answers)
  const isPairingCorrect = (leftId: string, rightId: string): boolean => {
    return correctPairs[leftId]?.includes(rightId) ?? false;
  };

  const handleConfirm = () => {
    if (pairings.length !== leftItems.length) return;

    setIsConfirmed(true);
    const allCorrect = pairings.every(p => isPairingCorrect(p.leftId, p.rightId));
    const pairingLabel = pairings.map(p => `${p.leftId}→${p.rightId}`).join(', ');
    onAnswerSubmit?.(allCorrect, pairingLabel);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Decoration */}
      <QuestionBackgroundDecoration type="matching" />
      
      {/* Main Content - Centered Single Panel */}
      <div className="flex items-center justify-center px-8 pb-16 relative z-10" style={{ marginTop: '44px' }}>
        <motion.div
          className="w-full max-w-5xl"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border mb-6" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <Link2 className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
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
                  V čom je <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>copywriting prínosný</span>? Spáruj situáciu klienta s argumentom.
                </h3>
              </div>

              {/* Matching Grid with Lines */}
              <div className="matching-container relative mb-10" ref={containerRef}>
                {/* SVG for connection lines */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 1, overflow: 'visible' }}
                >
                  {linePositions.map((line, index) => (
                    <g key={`connection-${index}`}>
                      {/* Shadow/glow effect for better visibility */}
                      <motion.path
                        d={line.path}
                        stroke={line.color}
                        strokeWidth="7"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.15"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                      {/* Main connection line */}
                      <motion.path
                        d={line.path}
                        stroke={line.color}
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))' }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Column Headers */}
                <div className="grid grid-cols-2 gap-8 mb-4" style={{ position: 'relative', zIndex: 2 }}>
                  <div className="text-xs font-bold text-gray-500 tracking-wider">
                    ČO KLIENT RIEŠI
                  </div>
                  <div className="text-xs font-bold text-gray-500 tracking-wider">
                    RIEŠENIE COPYWRITINGU
                  </div>
                </div>

                {/* Matching Grid - Each Row Contains One Pair */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {leftItems.map((leftItem, index) => {
                    const rightItem = rightItems[index];
                    
                    const leftItemPaired = isLeftPaired(leftItem.id);
                    const isLeftSelected = selectedLeft === leftItem.id;
                    const leftPairing = getPairingForLeft(leftItem.id);
                    const leftPairingColor = leftPairing ? getPairingColor(leftPairing.leftId, leftPairing.rightId) : null;

                    const rightItemPaired = isRightPaired(rightItem.id);
                    const isRightSelected = selectedRight === rightItem.id;
                    const rightPairing = getPairingForRight(rightItem.id);
                    const rightPairingColor = rightPairing ? getPairingColor(rightPairing.leftId, rightPairing.rightId) : null;

                    // Check correctness for left card
                    const leftIsCorrect = isConfirmed && leftPairing && isPairingCorrect(leftPairing.leftId, leftPairing.rightId);
                    const leftIsIncorrect = isConfirmed && leftPairing && !isPairingCorrect(leftPairing.leftId, leftPairing.rightId);

                    // Check correctness for right card
                    const rightIsCorrect = isConfirmed && rightPairing && isPairingCorrect(rightPairing.leftId, rightPairing.rightId);
                    const rightIsIncorrect = isConfirmed && rightPairing && !isPairingCorrect(rightPairing.leftId, rightPairing.rightId);

                    return (
                      <div 
                        key={`row-${index}`} 
                        className="grid grid-cols-2 gap-8 mb-4"
                        style={{ 
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          alignItems: 'stretch'
                        }}
                      >
                        {/* Left Card */}
                        <motion.button
                          ref={(el) => {
                            leftRefs.current[leftItem.id] = el;
                          }}
                          onClick={() => handleLeftClick(leftItem.id)}
                          disabled={isConfirmed}
                          whileHover={!isConfirmed ? { scale: 1.012, y: -3 } : {}}
                          whileTap={!isConfirmed ? { scale: 0.988 } : {}}
                          className={`
                            w-full p-5 rounded-2xl text-left border-2 flex items-start gap-3
                            ${isLeftSelected && !isConfirmed ? 'bg-purple-50/50 border-purple-500 shadow-md' : ''}
                            ${!isLeftSelected && !isConfirmed && !leftItemPaired ? 'bg-white border-gray-200 hover:border-purple-400 hover:bg-purple-50/30' : ''}
                            ${leftIsCorrect ? 'bg-green-50 border-green-500' : ''}
                            ${leftIsIncorrect ? 'bg-red-50 border-red-300' : ''}
                            ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          style={
                            leftIsCorrect || leftIsIncorrect
                              ? { minHeight: '80px', borderWidth: '2px' }
                              : leftItemPaired && leftPairingColor && !isConfirmed
                              ? {
                                  backgroundColor: leftPairingColor.bg,
                                  borderColor: leftPairingColor.border,
                                  borderWidth: '3px',
                                  minHeight: '80px'
                                }
                              : isLeftSelected && !isConfirmed
                              ? {
                                  boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.2), 0 4px 12px rgba(147, 51, 234, 0.15), 0 2px 4px rgba(147, 51, 234, 0.1)',
                                  minHeight: '80px'
                                }
                              : isConfirmed && leftPairingColor
                              ? {
                                  backgroundColor: leftPairingColor.bg,
                                  borderColor: leftPairingColor.border,
                                  borderWidth: '3px',
                                  minHeight: '80px'
                                }
                              : { minHeight: '80px' }
                          }
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                              style={{
                                backgroundColor: '#F3F4F6',
                                color: '#4B5563'
                              }}
                            >
                              {leftItem.id}
                            </div>
                            <span className={`leading-relaxed flex-1 ${leftIsCorrect ? 'text-green-900' : leftIsIncorrect ? 'text-red-900' : 'text-gray-900'}`} style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Poppins, sans-serif', lineHeight: '1.35' }}>
                              {leftItem.text.replace(/^\d+\.\s*/, '')}
                            </span>
                          </div>
                          
                          {/* Check icon for correct */}
                          {leftIsCorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                            >
                              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          
                          {/* X icon for incorrect */}
                          {leftIsIncorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </motion.button>

                        {/* Right Card */}
                        <motion.button
                          ref={(el) => {
                            rightRefs.current[rightItem.id] = el;
                          }}
                          onClick={() => handleRightClick(rightItem.id)}
                          disabled={isConfirmed}
                          whileHover={!isConfirmed ? { scale: 1.01, y: -2 } : {}}
                          whileTap={!isConfirmed ? { scale: 0.99 } : {}}
                          className={`
                            w-full p-5 rounded-2xl text-left transition-all border-2 flex items-start gap-3
                            ${isRightSelected && !isConfirmed ? 'bg-purple-50/50 border-purple-500 shadow-lg' : ''}
                            ${!isRightSelected && !isConfirmed && !rightItemPaired ? 'bg-white border-gray-200 hover:border-purple-400 hover:bg-purple-50/30' : ''}
                            ${rightIsCorrect ? 'bg-green-50 border-green-500' : ''}
                            ${rightIsIncorrect ? 'bg-red-50 border-red-300' : ''}
                            ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          style={
                            rightIsCorrect || rightIsIncorrect
                              ? { minHeight: '80px', borderWidth: '2px' }
                              : rightItemPaired && rightPairingColor && !isConfirmed
                              ? {
                                  backgroundColor: rightPairingColor.bg,
                                  borderColor: rightPairingColor.border,
                                  borderWidth: '3px',
                                  minHeight: '80px'
                                }
                              : isRightSelected && !isConfirmed
                              ? {
                                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.15), 0 2px 4px rgba(147, 51, 234, 0.1)',
                                  minHeight: '80px'
                                }
                              : isConfirmed && rightPairingColor
                              ? {
                                  backgroundColor: rightPairingColor.bg,
                                  borderColor: rightPairingColor.border,
                                  borderWidth: '3px',
                                  minHeight: '80px'
                                }
                              : { minHeight: '80px' }
                          }
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                              style={{
                                backgroundColor: '#F3F4F6',
                                color: '#4B5563'
                              }}
                            >
                              {rightItem.id}
                            </div>
                            <span className={`leading-relaxed flex-1 ${rightIsCorrect ? 'text-green-900' : rightIsIncorrect ? 'text-red-900' : 'text-gray-900'}`} style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Poppins, sans-serif', lineHeight: '1.35' }}>
                              {rightItem.text.replace(/^[A-Z]\)\s*/, '')}
                            </span>
                          </div>
                          
                          {/* Check icon for correct */}
                          {rightIsCorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                            >
                              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          
                          {/* X icon for incorrect */}
                          {rightIsIncorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation Section - Shows after confirmation */}
              <AnimatePresence>
                {isConfirmed && (
                  <ExplanationBlock>
                    <p>
                      Keď klient vníma copy ako kozmetiku, nebude doň investovať. Hodnota copy je v tom, že zvyšuje relevanciu, zrozumiteľnosť a dôveru, a tým zdvíha konverziu.
                    </p>
                    <p>
                      Pri kampaniach, ktoré oslovujú aj pasívnejšie publikum, je obsah často rozhodujúci. Preto sa copy predáva ako výkonová súčasť kampane, nie ako grafická úprava.
                    </p>
                  </ExplanationBlock>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  {!isConfirmed && (
                    <Button
                      variant="ghost"
                      onClick={onBack}
                      className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                    >
                      Späť na príbeh
                    </Button>
                  )}
                  {!isConfirmed && onSkip && (
                    <Button
                      variant="ghost"
                      onClick={onSkip}
                      className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                    >
                      Preskočiť úlohu
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {!isConfirmed && (
                    <Button
                      onClick={handleConfirm}
                      disabled={pairings.length !== leftItems.length}
                      style={
                        pairings.length === leftItems.length
                          ? { backgroundColor: '#AE54FF', color: '#FFFFFF', borderRadius: '12px' }
                          : { borderRadius: '12px' }
                      }
                      onMouseEnter={(e) => {
                        if (pairings.length === leftItems.length) {
                          e.currentTarget.style.backgroundColor = '#9842E6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pairings.length === leftItems.length) {
                          e.currentTarget.style.backgroundColor = '#AE54FF';
                        }
                      }}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                    >
                      Skontrolovať
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                  {isConfirmed && (
                    <Button
                      onClick={onNext}
                      style={{
                        backgroundColor: '#AE54FF',
                        color: 'white',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#9333EA';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#AE54FF';
                      }}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
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