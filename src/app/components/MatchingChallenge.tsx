import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check, X, ArrowRight, ListChecks, Link2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { CorrectFeedback } from '@/app/components/CorrectFeedback';
import { IncorrectFeedback } from '@/app/components/IncorrectFeedback';
import { motion, AnimatePresence } from 'motion/react';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface MatchingChallengeProps {
  questionNumber: number;
  questionText: React.ReactNode;
  leftColumnTitle: string;
  rightColumnTitle: string;
  leftItems: Array<{
    id: string;
    text: string;
  }>;
  rightItems: Array<{
    id: string;
    text: string;
    icon?: React.ReactNode;
  }>;
  correctPairs: Record<string, string>;
  correctFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  partialFeedback?: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback?: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  onNext: () => void;
  onBack: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  singleAttempt?: boolean; // NEW: Enable single-attempt mode
  initialConfirmed?: boolean;
  initialSelection?: Array<{ leftId: string; rightId: string }>;
  onStoreSelection?: (selection: Array<{ leftId: string; rightId: string }>) => void;
}

interface Pairing {
  leftId: string;
  rightId: string;
}

// Define color palette for pairings — neutral gray while pairing, green/red only after confirm
const PAIRING_COLORS = [
  { bg: '#F3F4F6', border: '#9CA3AF', line: '#9CA3AF' },
  { bg: '#F3F4F6', border: '#9CA3AF', line: '#9CA3AF' },
  { bg: '#F3F4F6', border: '#9CA3AF', line: '#9CA3AF' },
];

export function MatchingChallenge({
  questionNumber,
  questionText,
  leftColumnTitle,
  rightColumnTitle,
  leftItems,
  rightItems,
  correctPairs,
  correctFeedback,
  partialFeedback,
  incorrectFeedback,
  onNext,
  onBack,
  onLogoClick,
  onAnswerSubmit,
  singleAttempt,
  initialConfirmed = false,
  initialSelection,
  onStoreSelection,
}: MatchingChallengeProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [pairings, setPairings] = useState<Pairing[]>(initialSelection ?? []);
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);
  const [feedback, setFeedback] = useState<'correct' | 'partial' | 'incorrect' | null>(() => {
    if (!initialConfirmed || !initialSelection || initialSelection.length === 0) return null;
    const correctCount = initialSelection.filter(p => correctPairs[p.leftId] === p.rightId).length;
    const allCorrect = correctCount === initialSelection.length;
    if (allCorrect) return 'correct';
    if (correctCount > 0 && partialFeedback) return 'partial';
    return 'incorrect';
  });

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

          // Start point: stred praveho okraja lavej karty
          const x1 = leftRect.right - containerRect.left;
          const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
          
          // End point: stred laveho okraja pravej karty
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

    // Toggle deselect if already selected
    if (selectedLeft === id) {
      setSelectedLeft(null);
      return;
    }

    // If right is already pending, try to pair or disconnect
    if (selectedRight) {
      const existingPairing = pairings.find(p => p.leftId === id && p.rightId === selectedRight);
      if (existingPairing) {
        // Same combo clicked again → disconnect
        setPairings(prev => prev.filter(p => !(p.leftId === id && p.rightId === selectedRight)));
      } else {
        createPairing(id, selectedRight);
      }
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    setSelectedLeft(id);
  };

  const handleRightClick = (id: string) => {
    if (isConfirmed) return;

    // Toggle deselect if already selected
    if (selectedRight === id) {
      setSelectedRight(null);
      return;
    }

    // If left is already pending, try to pair or disconnect
    if (selectedLeft) {
      const existingPairing = pairings.find(p => p.leftId === selectedLeft && p.rightId === id);
      if (existingPairing) {
        // Same combo clicked again → disconnect
        setPairings(prev => prev.filter(p => !(p.leftId === selectedLeft && p.rightId === id)));
      } else {
        createPairing(selectedLeft, id);
      }
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    setSelectedRight(id);
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

  const getPairingColor = (leftId: string, rightId: string) => {
    const pairingIndex = pairings.findIndex(p => p.leftId === leftId || p.rightId === rightId);
    if (pairingIndex === -1) return null;
    return PAIRING_COLORS[pairingIndex % PAIRING_COLORS.length];
  };

  const handleConfirm = () => {
    if (pairings.length !== leftItems.length) return;

    const correctCount = pairings.filter(p => isPairCorrect(p)).length;
    const allCorrect = correctCount === pairings.length;

    if (allCorrect) {
      setFeedback('correct');
    } else if (correctCount > 0 && partialFeedback) {
      setFeedback('partial');
    } else {
      setFeedback('incorrect');
    }

    setIsConfirmed(true);

    const pairingLabel = pairings.map(p => `${p.leftId}→${p.rightId}`).join(', ');
    onAnswerSubmit?.(allCorrect, pairingLabel);
  };

  const handleReset = () => {
    setPairings([]);
    onStoreSelection?.([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsConfirmed(false);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Decoration */}
      <QuestionBackgroundDecoration type="matching" />
      
      {/* Main Content - Centered Single Panel */}
      <div className="flex items-center justify-center px-8 pb-16 relative z-10" style={{ marginTop: '60px' }}>
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
                <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {questionText}
                </h3>
                
                {/* Color Line Under Title */}
                <div className="w-full h-1 mb-7 rounded-full" style={{ backgroundColor: '#AE54FF' }}></div>
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
                    {leftColumnTitle}
                  </div>
                  <div className="text-xs font-bold text-gray-500 tracking-wider">
                    {rightColumnTitle}
                  </div>
                </div>

                {/* Matching Grid - Each Row Contains One Pair */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {leftItems.map((leftItem, index) => {
                    const rightItem = rightItems[index];
                    
                    const leftItemPaired = isLeftPaired(leftItem.id);
                    const isLeftSelected = selectedLeft === leftItem.id;
                    const leftPairing = getPairingForLeft(leftItem.id);
                    const isLeftCorrect = leftPairing && isConfirmed ? isPairCorrect(leftPairing) : null;
                    const leftPairingColor = leftPairing ? getPairingColor(leftPairing.leftId, leftPairing.rightId) : null;

                    const rightItemPaired = isRightPaired(rightItem.id);
                    const isRightSelected = selectedRight === rightItem.id;
                    const rightPairing = getPairingForRight(rightItem.id);
                    const isRightCorrect = rightPairing && isConfirmed ? isPairCorrect(rightPairing) : null;
                    const rightPairingColor = rightPairing ? getPairingColor(rightPairing.leftId, rightPairing.rightId) : null;

                    return (
                      <div 
                        key={`row-${index}`} 
                        className="grid grid-cols-2 gap-8 mb-4"
                        style={{ 
                          display: 'grid',
                          gridTemplateColumns: '40% 60%',
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
                            ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          style={
                            leftItemPaired && leftPairingColor && !isConfirmed
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
                              : isConfirmed && isLeftCorrect === true && leftPairingColor
                              ? {
                                  backgroundColor: '#D1FAE5',
                                  borderColor: '#10B981',
                                  borderWidth: '3px',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                  minHeight: '80px'
                                }
                              : isConfirmed && isLeftCorrect === false
                              ? {
                                  backgroundColor: '#FEE2E2',
                                  borderColor: '#EF4444',
                                  borderWidth: '3px',
                                  minHeight: '80px'
                                }
                              : { minHeight: '80px' }
                          }
                        >
                          <span className={`text-sm leading-relaxed flex-1 ${
                            isConfirmed && isLeftCorrect === true ? 'text-green-900' :
                            isConfirmed && isLeftCorrect === false ? 'text-red-900' :
                            'text-gray-900'
                          }`} style={{ fontWeight: 400 }}>{leftItem.text}</span>
                          {/* Check icon for correct pair */}
                          {isConfirmed && isLeftCorrect === true && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                            >
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          {/* X icon for incorrect pair */}
                          {isConfirmed && isLeftCorrect === false && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0"
                            >
                              <X className="w-5 h-5 text-red-600" strokeWidth={3} />
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
                            ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          style={
                            rightItemPaired && rightPairingColor && !isConfirmed
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
                              : isConfirmed && isRightCorrect === true && rightPairingColor
                              ? {
                                  backgroundColor: '#D1FAE5',
                                  borderColor: '#10B981',
                                  borderWidth: '3px',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                  minHeight: '80px'
                                }
                              : isConfirmed && isRightCorrect === false
                              ? {
                                  backgroundColor: '#FEE2E2',
                                  borderColor: '#EF4444',
                                  borderWidth: '3px',
                                  minHeight: '80px'
                                }
                              : { minHeight: '80px' }
                          }
                        >
                          {rightItem.icon && <div className="flex-shrink-0">{rightItem.icon}</div>}
                          <span className={`text-sm leading-relaxed flex-1 whitespace-pre-wrap ${
                            isConfirmed && isRightCorrect === true ? 'text-green-900' :
                            isConfirmed && isRightCorrect === false ? 'text-red-900' :
                            'text-gray-900'
                          }`} style={{ fontWeight: 400 }}>{rightItem.text}</span>
                          {/* Check icon for correct pair */}
                          {isConfirmed && isRightCorrect === true && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                            >
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                          {/* X icon for incorrect pair */}
                          {isConfirmed && isRightCorrect === false && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0"
                            >
                              <X className="w-5 h-5 text-red-600" strokeWidth={3} />
                            </motion.div>
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {isConfirmed && feedback === 'correct' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
                    style={{
                      backgroundColor: '#F0FDF4',
                      borderColor: '#22C55E'
                    }}
                  >
                    <Check 
                      className="w-6 h-6 flex-shrink-0 mt-0.5" 
                      style={{ color: '#22C55E' }} 
                      strokeWidth={2}
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 text-base leading-relaxed">
                        <span className="font-bold">{correctFeedback.message}</span> {correctFeedback.encouragement}
                      </p>
                    </div>
                  </motion.div>
                )}

                {isConfirmed && feedback === 'partial' && partialFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-8 p-6 rounded-2xl border-2 bg-yellow-50 border-yellow-200"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{partialFeedback.emoji}</div>
                      <div>
                        <p className="font-bold text-lg text-yellow-900 mb-2">
                          {partialFeedback.message}
                        </p>
                        <p className="text-sm text-yellow-800 leading-relaxed">
                          {partialFeedback.encouragement}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isConfirmed && feedback === 'incorrect' && incorrectFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
                    style={{
                      backgroundColor: '#FEF2F2',
                      borderColor: '#EF4444'
                    }}
                  >
                    <X 
                      className="w-6 h-6 flex-shrink-0 mt-0.5" 
                      style={{ color: '#EF4444' }} 
                      strokeWidth={2}
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 text-base leading-relaxed">
                        <span className="font-bold">{incorrectFeedback.message}</span> {incorrectFeedback.encouragement}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                {!isConfirmed && (
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Spat
                  </Button>
                )}
                {isConfirmed && <div></div>}

                <div className="flex items-center gap-3">
                  {!isConfirmed ? (
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
                      Potvrdit
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (singleAttempt || initialConfirmed) ? (
                    // Single-attempt mode: Always proceed to next regardless of correct/incorrect
                    <Button
                      onClick={onNext}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: '#AE54FF', color: '#FFFFFF', borderRadius: '12px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#9842E6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#AE54FF';
                      }}
                    >
                      Pokracovat
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : feedback === 'correct' ? (
                    <Button
                      onClick={onNext}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: '#AE54FF', color: '#FFFFFF', borderRadius: '12px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#9842E6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#AE54FF';
                      }}
                    >
                      Pokracovat
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleReset}
                      className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: '#6B7280', color: '#FFFFFF', borderRadius: '12px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4B5563';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#6B7280';
                      }}
                    >
                      Skusit znova
                    </Button>
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