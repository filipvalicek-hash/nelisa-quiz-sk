import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Link2, Check, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { motion, AnimatePresence } from 'motion/react';

interface Screen17Props {
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
  { bg: '#FFFFFF', border: '#E5E7EB', line: '#9CA3AF' }, // Neutral grey
  { bg: '#FFFFFF', border: '#E5E7EB', line: '#9CA3AF' }, // Neutral grey
  { bg: '#FFFFFF', border: '#E5E7EB', line: '#9CA3AF' }, // Neutral grey
];

export function Screen17({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen17Props) {
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
    { id: '1', text: 'Seniórni špecialisti, expertné role, dôraz na profesijný kontext.' },
    { id: '2', text: 'Širšie publikum, kombinácia brandu a výkonu naprieč kanálmi. Typicky môže osloviť napríklad používateľov YouTube.' },
    { id: '3', text: 'Používatelia, ktorí hľadajú inšpiráciu a objavujú nové nápady, prirodzene skôr viac kreatívne orientovaní ľudia, ktorých táto reklama zasiahne.' }
  ];

  const rightItems = [
    { id: 'A', text: 'Google Demand Gen', icon: 'google' },
    { id: 'B', text: 'Pinterest reklama', icon: 'pinterest' },
    { id: 'C', text: 'LinkedIn Channels a banner', icon: 'linkedin' }
  ];

  // Correct mapping: 1→C, 2→A, 3→B (stored internally, not shown to user)
  const correctPairs: Record<string, string> = {
    '1': 'C', // LinkedIn Channels
    '2': 'A', // Google Demand Gen
    '3': 'B'  // Pinterest reklama
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

  // Check if a pairing is correct
  const isPairingCorrect = (leftId: string, rightId: string): boolean => {
    return correctPairs[leftId] === rightId;
  };

  const handleConfirm = () => {
    if (pairings.length !== leftItems.length) return;

    setIsConfirmed(true);
    const allCorrect = pairings.every(p => isPairingCorrect(p.leftId, p.rightId));
    const pairingLabel = pairings.map(p => `${p.leftId}→${p.rightId}`).join(', ');
    onAnswerSubmit?.(allCorrect, pairingLabel);
  };

  // Platform icon component
  const PlatformIcon = ({ icon }: { icon: string }) => {
    if (icon === 'google') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      );
    }
    if (icon === 'pinterest') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" fill="#E60023"/>
        </svg>
      );
    }
    if (icon === 'linkedin') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>
        </svg>
      );
    }
    return null;
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
                  Priraď situáciu k <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 600 }}>správnemu formátu</span>.
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
                    SITUÁCIA
                  </div>
                  <div className="text-xs font-bold text-gray-500 tracking-wider">
                    FORMÁTY
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
                          <span className={`leading-relaxed flex-1 ${leftIsCorrect ? 'text-green-900' : leftIsIncorrect ? 'text-red-900' : 'text-gray-900'}`} style={{ fontSize: '17px', fontWeight: 400, lineHeight: '1.4' }}>
                            {leftItem.text}
                          </span>
                          
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
                          <PlatformIcon icon={rightItem.icon} />
                          <span className={`leading-relaxed flex-1 ${rightIsCorrect ? 'text-green-900' : rightIsIncorrect ? 'text-red-900' : 'text-gray-900'}`} style={{ fontSize: '17px', fontWeight: 400, lineHeight: '1.4' }}>
                            {rightItem.text}
                          </span>
                          
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
                      Formát sa vyberá podľa toho, čo má kampaň urobiť. Iný formát pomáha rýchlo priviesť reakcie, iný posilniť značku, iný zasiahnuť špecifické publikum. Preto správna odpoveď vždy viaže formát na cieľ, nie na osobné preferencie. Klient si z toho má odniesť, že voľba formátu je riadené rozhodnutie, nie náhoda.
                    </p>
                  </ExplanationBlock>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-2">
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
                      className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
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
                    <QuizButton onClick={onNext}>
                      Pokračovať
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