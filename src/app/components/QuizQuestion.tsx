import { useState } from 'react';
import { ArrowLeft, Check, Target, TrendingUp, TrendingDown, Minus, Users, MessageCircle, Lightbulb, AlertTriangle, Zap, Clock, Home } from 'lucide-react';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { QuizCard, QuizCardContent } from '@/app/components/ui/quiz-card';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { motion, AnimatePresence } from 'motion/react';

interface QuizQuestionProps {
  questionNumber: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onStateUpdate?: (delta: { trust: number; fit: number; engagement: number }) => void;
}

type DecisionOutcome = 'builds-trust' | 'creates-uncertainty' | 'misses-signal' | null;

interface DecisionFeedback {
  outcome: DecisionOutcome;
  message: string;
  explanation: string;
  stateChange: { trust: number; fit: number; engagement: number };
}

export function QuizQuestion({ questionNumber, onNext, onPrevious, onStateUpdate }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<DecisionFeedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const decisions = [
    {
      text: 'Switch entirely to passive recruitment campaigns',
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      outcome: 'misses-signal' as DecisionOutcome,
      message: 'Client seems confused',
      explanation: 'Nelisa is about active recruitment, not passive job posting. This recommendation misses the core value proposition.',
      stateChange: { trust: -15, fit: -10, engagement: -5 }
    },
    {
      text: 'Automate contract generation for new hires',
      icon: <Clock className="w-5 h-5 text-gray-500" />,
      outcome: 'misses-signal' as DecisionOutcome,
      message: 'Client raises concerns',
      explanation: 'Nelisa focuses on recruitment phase, not post-hire processes. This creates confusion about the tool\'s scope.',
      stateChange: { trust: -10, fit: -15, engagement: 0 }
    },
    {
      text: 'Show them how to proactively reach out to candidates',
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      outcome: 'builds-trust' as DecisionOutcome,
      message: 'Client gains confidence',
      explanation: 'Perfect. You\'ve identified their pain point (passive responses) and positioned Nelisa\'s active outreach as the solution.',
      stateChange: { trust: 15, fit: 20, engagement: 10 }
    },
    {
      text: 'Set up interview scheduling features first',
      icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
      outcome: 'creates-uncertainty' as DecisionOutcome,
      message: 'Client hesitates',
      explanation: 'While scheduling is a feature, leading with it doesn\'t address their main frustration with passive responses.',
      stateChange: { trust: 0, fit: -5, engagement: 5 }
    }
  ];

  const handleConfirm = () => {
    if (!selectedAnswer) return;

    const decision = decisions.find(d => d.text === selectedAnswer);
    if (!decision) return;

    setFeedback({
      outcome: decision.outcome,
      message: decision.message,
      explanation: decision.explanation,
      stateChange: decision.stateChange
    });
    setShowFeedback(true);

    // Update game state
    onStateUpdate?.(decision.stateChange);

    // Auto-advance only on "builds-trust"
    if (decision.outcome === 'builds-trust') {
      setTimeout(() => {
        setShowFeedback(false);
        onNext?.();
      }, 2500);
    }
  };

  const getOutcomeIcon = (outcome: DecisionOutcome) => {
    switch (outcome) {
      case 'builds-trust':
        return <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0" />;
      case 'creates-uncertainty':
        return <Minus className="w-6 h-6 text-yellow-600 flex-shrink-0" />;
      case 'misses-signal':
        return <TrendingDown className="w-6 h-6 text-red-600 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const getOutcomeColor = (outcome: DecisionOutcome) => {
    switch (outcome) {
      case 'builds-trust':
        return 'bg-green-50 border-green-200';
      case 'creates-uncertainty':
        return 'bg-yellow-50 border-yellow-200';
      case 'misses-signal':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getOutcomeTextColor = (outcome: DecisionOutcome) => {
    switch (outcome) {
      case 'builds-trust':
        return 'text-green-900';
      case 'creates-uncertainty':
        return 'text-yellow-900';
      case 'misses-signal':
        return 'text-red-900';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Decoration */}
      <QuestionBackgroundDecoration type="choice" />
      
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}

      {/* Main Content - Centered Single Panel */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-16 px-8 relative z-10">
        <motion.div
          className="w-full max-w-3xl"
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
              {/* Panel Header with Blue Accents */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border-2 border-blue-300 mb-6">
                  <Target className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-blue-800 tracking-wider">
                    VÝBĚR ODPOVĚDI
                  </span>
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-4 leading-tight">
                  How will you guide this client?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  They're frustrated with passive job posting results and need direction.
                </p>
              </div>

              {/* Decision Options - White Cards with Borders */}
              <div className="space-y-3">
                {decisions.map((decision, index) => {
                  const isSelected = selectedAnswer === decision.text;
                  const isThisOutcome = showFeedback && feedback?.outcome === decision.outcome && isSelected;

                  return (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => {
                        if (!showFeedback) {
                          setSelectedAnswer(decision.text);
                          setFeedback(null);
                        }
                      }}
                      disabled={showFeedback}
                      whileHover={!showFeedback ? { scale: 1.01, y: -2 } : {}}
                      whileTap={!showFeedback ? { scale: 0.99 } : {}}
                      className={`
                        w-full bg-white rounded-2xl p-6 transition-all duration-200 text-left border-2
                        ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                        ${isSelected && !showFeedback ? 'border-blue-500 shadow-lg bg-blue-50/30' : ''}
                        ${!isSelected && !showFeedback ? 'border-gray-200 hover:border-blue-300 hover:shadow-md' : ''}
                        ${isThisOutcome && feedback?.outcome === 'builds-trust' ? 'bg-green-50 border-green-400 shadow-lg' : ''}
                        ${isThisOutcome && feedback?.outcome === 'creates-uncertainty' ? 'bg-yellow-50 border-yellow-400 shadow-lg' : ''}
                        ${isThisOutcome && feedback?.outcome === 'misses-signal' ? 'bg-red-50 border-red-400 shadow-lg' : ''}
                      `}
                      style={
                        isSelected && !showFeedback
                          ? {
                              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15), 0 2px 4px rgba(59, 130, 246, 0.1)'
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          {decision.icon}
                        </div>
                        
                        {/* Text */}
                        <div className="flex-1">
                          <p className="text-base text-gray-900 font-semibold leading-relaxed">
                            {decision.text}
                          </p>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && !showFeedback && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Outcome Feedback */}
              <AnimatePresence>
                {showFeedback && feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-6 rounded-2xl border-2 ${getOutcomeColor(feedback.outcome)}`}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {getOutcomeIcon(feedback.outcome)}
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${getOutcomeTextColor(feedback.outcome)}`}>
                          {feedback.message}
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm ${getOutcomeTextColor(feedback.outcome)} leading-relaxed`}>
                      {feedback.explanation}
                    </p>
                    
                    {/* State Changes */}
                    <div className="mt-4 pt-4 border-t border-current/10 flex gap-4 text-xs font-semibold">
                      {feedback.stateChange.trust !== 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>Trust {feedback.stateChange.trust > 0 ? '+' : ''}{feedback.stateChange.trust}</span>
                        </div>
                      )}
                      {feedback.stateChange.fit !== 0 && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Fit {feedback.stateChange.fit > 0 ? '+' : ''}{feedback.stateChange.fit}</span>
                        </div>
                      )}
                      {feedback.stateChange.engagement !== 0 && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Engagement {feedback.stateChange.engagement > 0 ? '+' : ''}{feedback.stateChange.engagement}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
                <QuizButton
                  variant="ghost"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </QuizButton>

                {showFeedback && feedback?.outcome !== 'builds-trust' ? (
                  <QuizButton
                    onClick={() => {
                      setSelectedAnswer('');
                      setShowFeedback(false);
                      setFeedback(null);
                    }}
                  >
                    Reconsider Strategy
                  </QuizButton>
                ) : (
                  <QuizButton
                    onClick={handleConfirm}
                    disabled={!selectedAnswer || showFeedback}
                  >
                    Confirm Answer
                    <Check className="w-5 h-5" />
                  </QuizButton>
                )}
              </div>
            </div>
          </div>

          {/* Progress Indicator Below Panel */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-medium text-gray-700">Question {questionNumber}</span>
            <span>/</span>
            <span>12</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}