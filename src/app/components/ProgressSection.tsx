import { motion } from 'motion/react';

interface ProgressSectionProps {
  currentQuestion: number;
  totalQuestions?: number;
  screenType?: 'story' | 'task';
  onNavigate?: (questionNumber: number) => void;
  answeredQuestions?: Set<number>;
  /** In retry mode: set of question numbers already answered correctly (shown grayed out) */
  correctQuestions?: Set<number>;
}

export function ProgressSection({ currentQuestion, totalQuestions = 20, screenType = 'task', onNavigate, answeredQuestions, correctQuestions }: ProgressSectionProps) {
  const label = screenType === 'story' ? 'PRÍBEH' : 'ÚLOHA';
  
  // Calculate progress percentage for the background line
  const progressPercentage = ((currentQuestion - 1) / (totalQuestions - 1)) * 100;

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-8 pt-6 pb-5">
        {/* Step Counter */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {label} • {currentQuestion} / {totalQuestions}
          </span>
        </div>

        {/* Step-based Progress Indicator */}
        <div className="relative">
          {/* Subtle background container - thin light-purple bar */}
          <div 
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 rounded-full"
            style={{ 
              backgroundColor: 'rgba(174, 84, 255, 0.08)',
              height: '3px',
              zIndex: 0
            }}
          />
          
          {/* Background connecting line (inactive state) */}
          <div 
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
            style={{ 
              backgroundColor: 'rgba(174, 84, 255, 0.15)',
              height: '1.5px',
              zIndex: 1
            }}
          />
          
          {/* Filled progress line with smooth animation */}
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2"
            style={{ 
              backgroundColor: 'var(--progress-fill)',
              height: '1.5px',
              zIndex: 2
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />

          {/* Step circles */}
          <div className="relative flex items-center justify-between" style={{ zIndex: 3 }}>
            {Array.from({ length: totalQuestions }, (_, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentQuestion;
              const isCurrent = stepNumber === currentQuestion;
              const isFuture = stepNumber > currentQuestion;
              const isAnswered = answeredQuestions?.has(stepNumber);
              const isAlreadyCorrect = correctQuestions?.has(stepNumber); // grayed in retry mode
              const isClickable = !!onNavigate && !isAlreadyCorrect;

              // In retry mode, already-correct dots are grayed out and non-interactive
              const dotColor = isAlreadyCorrect
                ? 'rgba(180, 180, 180, 0.5)'
                : isCompleted || isCurrent
                  ? 'var(--progress-fill)'
                  : 'transparent';
              const dotBorder = isAlreadyCorrect
                ? '1.5px solid rgba(180, 180, 180, 0.3)'
                : isFuture
                  ? '1.5px solid rgba(174, 84, 255, 0.25)'
                  : 'none';

              return (
                <div
                  key={stepNumber}
                  className="relative flex items-center justify-center"
                  style={{ cursor: isClickable ? 'pointer' : 'default', opacity: isAlreadyCorrect ? 0.45 : 1 }}
                  onClick={() => isClickable && onNavigate?.(stepNumber)}
                  title={isAlreadyCorrect ? `Otázka ${stepNumber} — správne zodpovedaná` : isClickable ? `Prejsť na otázku ${stepNumber}` : undefined}
                >
                  {/* Invisible larger hit area for easier clicking */}
                  {isClickable && (
                    <div className="absolute inset-0" style={{ margin: '-8px', zIndex: 11 }} />
                  )}
                  {/* Circle */}
                  <motion.div
                    className="rounded-full"
                    style={{
                      width: isCurrent ? '11.5px' : '6px',
                      height: isCurrent ? '11.5px' : '6px',
                      backgroundColor: dotColor,
                      border: dotBorder,
                      boxShadow: isCurrent && !isAlreadyCorrect
                        ? '0 0 0 4px rgba(174, 84, 255, 0.12), 0 1px 3px rgba(174, 84, 255, 0.3)'
                        : 'none',
                      position: 'relative',
                      zIndex: 10
                    }}
                    whileHover={isClickable ? { scale: 1.5 } : {}}
                    animate={isCurrent && !isAlreadyCorrect ? {
                      scale: [1, 1.08, 1]
                    } : {}}
                    transition={{
                      scale: {
                        duration: isCurrent ? 2 : 0.15,
                        repeat: isCurrent ? Infinity : 0,
                        ease: "easeInOut"
                      },
                      width: { duration: 0.3, ease: 'easeInOut' },
                      height: { duration: 0.3, ease: 'easeInOut' },
                      backgroundColor: { duration: 0.3, ease: 'easeInOut' }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Subtle divider line under progress bar */}
      <div 
        style={{ 
          height: '1px',
          backgroundColor: '#EDEAF6',
          opacity: 0.6
        }}
      />
    </div>
  );
}