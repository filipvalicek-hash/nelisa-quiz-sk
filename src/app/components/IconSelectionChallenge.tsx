import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { CorrectFeedback } from '@/app/components/CorrectFeedback';
import { ChevronRight, XCircle, ListChecks } from 'lucide-react';

interface IconOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  isCorrect: boolean;
}

interface IconSelectionChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  options: IconOption[];
  correctFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  questionTypeTag?: string;
  onNext?: () => void;
  onLogoClick?: () => void;
  onBack?: () => void;
}

export function IconSelectionChallenge({ 
  questionNumber,
  questionText,
  options,
  correctFeedback,
  incorrectFeedback,
  questionTypeTag = 'VÝBĚR IKONY',
  onNext,
  onLogoClick,
  onBack
}: IconSelectionChallengeProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleIconClick = (iconId: string) => {
    setSelectedIcon(iconId);
  };

  const handleContinue = () => {
    if (!selectedIcon) return;
    setShowFeedback(true);
    if (options.find(option => option.id === selectedIcon)?.isCorrect) {
      onNext?.();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}
      {/* REMOVED: ProgressSection - now global in App.tsx */}

      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="bg-white rounded-3xl p-8 relative"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(255, 116, 0, 0.08)', borderColor: 'rgba(255, 116, 0, 0.2)' }}>
                <Target className="w-4 h-4" style={{ color: '#ff7400' }} />
                <span className="text-xs font-bold tracking-wider" style={{ color: '#ff7400' }}>
                  JEDNA VOLBA
                </span>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {questionText}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {options.map((option) => {
                const isSelected = selectedIcon === option.id;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleIconClick(option.id)}
                    className={`
                      p-6 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-3
                      ${isSelected ? '' : 'bg-white border-gray-200'}
                    `}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'var(--bg-soft)',
                            borderColor: 'var(--primary-brand)',
                            boxShadow: '0 0 0 3px var(--primary-disabled), 0 4px 12px rgba(174, 84, 255, 0.15)'
                          }
                        : undefined
                    }
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'var(--card-border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-soft)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div style={{ color: isSelected ? 'var(--primary-brand)' : '#4b5563' }}>
                      {option.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {option.label}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
              >
                Vrátit se na přehled
              </Button>

              <div className="flex items-center gap-3">
                {/* Pokračovat Button - ALWAYS VISIBLE */}
                <Button
                  onClick={handleContinue}
                  disabled={!selectedIcon}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedIcon
                      ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedIcon) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedIcon) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                    }
                  }}
                >
                  {showFeedback ? 'Přejít na další úkol' : 'Pokračovat'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}