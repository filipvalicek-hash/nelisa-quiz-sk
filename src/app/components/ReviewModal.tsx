import { X, ChevronDown, Check, XCircle as XIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionData {
  questionNumber: number;
  questionText: string;
  questionType?: 'multiple-choice' | 'matching' | 'yes-no' | 'fill-in-blank' | 'ordering';
  options?: AnswerOption[]; // For multiple choice questions
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

interface ReviewModalProps {
  questionNumber: number;
  totalQuestions: number;
  onClose: () => void;
  onNavigate?: (questionNumber: number) => void;
  questionsData?: QuestionData[];
}

// This is a mock data structure - in production, this would come from your quiz state
const getQuestionData = (questionNum: number) => {
  // Mock data for demonstration - replace with actual quiz data
  const mockQuestions = [
    {
      id: 1,
      question: "Ktorá z nasledujúcich situácií je najlepšia pre nasadenie Nelisy?",
      options: [
        { id: 'A', text: 'Firma má prebytok reakcií, HR nestíha selekciu.', isCorrect: false },
        { id: 'B', text: 'Firma nabíra ťažko obsaditeľné pozície, reakcie z portálov sú slabé.', isCorrect: true },
        { id: 'C', text: 'Firma nenabíra, len mapuje trh.', isCorrect: false },
        { id: 'D', text: 'Firma hľadá brigádnikov na krátke zmeny.', isCorrect: false }
      ],
      userAnswer: 'B',
      explanation: "Nelisa funguje najlepšie tam, kde je potrebné aktívne oslovovať kandidátov na ťažko obsaditeľné pozície a klasické portály nedodávajú dostatok kvalitných reakcií."
    },
    // Add more questions here...
  ];

  return mockQuestions[0]; // Return appropriate question based on questionNum
};

export function ReviewModal({ questionNumber, totalQuestions, onClose, onNavigate, questionsData }: ReviewModalProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const toggleExpanded = (qNum: number) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(qNum)) {
        newSet.delete(qNum);
      } else {
        newSet.add(qNum);
      }
      return newSet;
    });
  };

  // Generate all 23 questions for display
  const allQuestions = Array.from({ length: totalQuestions }, (_, i) => {
    if (questionsData && questionsData.length > i) {
      return {
        questionNumber: i + 1,
        questionText: questionsData[i].questionText,
        selectedAnswer: questionsData[i].selectedAnswer,
        correctAnswer: questionsData[i].correctAnswer,
        isCorrect: questionsData[i].isCorrect,
        explanation: questionsData[i].explanation,
        options: questionsData[i].options || []
      };
    } else {
      return {
        ...getQuestionData(i + 1),
        questionNumber: i + 1
      };
    }
  });

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1F2F5C 0%, #192550 50%, #0F1A3A 100%)',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        <div className="min-h-screen px-4 py-8">
          {/* Header */}
          <motion.div 
            className="max-w-5xl mx-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="rounded-2xl p-6 flex items-center justify-between"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: '#192550' }}>
                  Prehľad odpovedí
                </h2>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Celkom {totalQuestions} úloh
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-10 h-10 p-0 rounded-xl hover:bg-gray-100"
              >
                <X className="w-5 h-5" style={{ color: '#192550' }} />
              </Button>
            </div>
          </motion.div>

          {/* Questions List */}
          <div className="max-w-5xl mx-auto space-y-4 pb-8">
            {allQuestions.map((q, index) => {
              const isExpanded = expandedQuestions.has(q.questionNumber);
              const correctAnswer = q.correctAnswer;
              const userSelectedCorrect = q.selectedAnswer === correctAnswer;

              return (
                <motion.div
                  key={q.questionNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Question Header */}
                  <div 
                    className="px-6 py-4 flex items-center justify-between"
                    style={{
                      borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
                      background: 'linear-gradient(to right, rgba(248, 250, 252, 0.5), rgba(241, 245, 249, 0.5))'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                        style={{
                          backgroundColor: '#F1F5F9',
                          color: '#192550'
                        }}
                      >
                        {q.questionNumber}
                      </div>
                      <span className="font-semibold text-sm" style={{ color: '#192550' }}>
                        ÚLOHA {q.questionNumber}
                      </span>
                    </div>
                    
                    {/* Status Badge */}
                    <div 
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{
                        backgroundColor: userSelectedCorrect 
                          ? 'rgba(34, 197, 94, 0.1)' 
                          : 'rgba(239, 68, 68, 0.1)',
                        color: userSelectedCorrect ? '#059669' : '#DC2626'
                      }}
                    >
                      {userSelectedCorrect ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Správne</span>
                        </>
                      ) : (
                        <>
                          <XIcon className="w-4 h-4" />
                          <span>Nesprávne</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="px-6 py-5">
                    {/* Question Text */}
                    <h3 
                      className="text-lg font-semibold mb-4 leading-snug"
                      style={{ color: '#192550' }}
                    >
                      {q.questionText}
                    </h3>

                    {/* Answer Options */}
                    {q.options && q.options.length > 0 ? (
                      <div className="space-y-3 mb-5">
                        {q.options.map((option) => {
                          const isUserAnswer = option.id === q.selectedAnswer;
                          const isCorrectAnswer = option.isCorrect;
                          const showAsCorrect = isUserAnswer && isCorrectAnswer;
                          const showAsWrong = isUserAnswer && !isCorrectAnswer;
                          const showAsRightAnswer = !isUserAnswer && isCorrectAnswer;
                          const isNeutral = !isUserAnswer && !isCorrectAnswer;

                          return (
                            <div
                              key={option.id}
                              className="rounded-xl p-4"
                              style={{
                                backgroundColor: showAsCorrect
                                  ? 'rgba(34, 197, 94, 0.08)'
                                  : showAsWrong
                                  ? 'rgba(239, 68, 68, 0.08)'
                                  : showAsRightAnswer
                                  ? 'rgba(34, 197, 94, 0.08)'
                                  : '#F8FAFC',
                                border: showAsCorrect
                                  ? '2px solid rgba(34, 197, 94, 0.3)'
                                  : showAsWrong
                                  ? '2px solid rgba(239, 68, 68, 0.3)'
                                  : showAsRightAnswer
                                  ? '2px solid rgba(34, 197, 94, 0.3)'
                                  : '1px solid #E2E8F0'
                              }}
                            >
                              <div className="flex items-start gap-3">
                                {/* Option Label */}
                                <div 
                                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                                  style={{
                                    backgroundColor: showAsCorrect || showAsRightAnswer
                                      ? '#22C55E'
                                      : showAsWrong
                                      ? '#EF4444'
                                      : '#E2E8F0',
                                    color: showAsCorrect || showAsRightAnswer || showAsWrong
                                      ? 'white'
                                      : '#64748B'
                                  }}
                                >
                                  {option.id}
                                </div>

                                {/* Option Text */}
                                <div className="flex-1">
                                  <p 
                                    className="text-sm leading-relaxed mb-2"
                                    style={{ 
                                      color: showAsCorrect || showAsRightAnswer
                                        ? '#065F46'
                                        : showAsWrong
                                        ? '#991B1B'
                                        : '#475569',
                                      fontWeight: (isUserAnswer || isCorrectAnswer) ? 500 : 400
                                    }}
                                  >
                                    {option.text}
                                  </p>
                                  
                                  {/* Labels */}
                                  {showAsCorrect && (
                                    <div 
                                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold"
                                      style={{
                                        backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                        color: '#059669'
                                      }}
                                    >
                                      <Check className="w-3 h-3" />
                                      Vaša odpoveď (správna)
                                    </div>
                                  )}
                                  {showAsWrong && (
                                    <div 
                                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold"
                                      style={{
                                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                        color: '#DC2626'
                                      }}
                                    >
                                      <XIcon className="w-3 h-3" />
                                      Vaša odpoveď
                                    </div>
                                  )}
                                  {showAsRightAnswer && (
                                    <div 
                                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold"
                                      style={{
                                        backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                        color: '#059669'
                                      }}
                                    >
                                      <Check className="w-3 h-3" />
                                      Správna odpoveď
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3 mb-5">
                        <div className="rounded-xl p-4" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-semibold mb-2" style={{ color: '#475569' }}>
                                Vaša odpoveď:
                              </p>
                              <p 
                                className="text-sm leading-relaxed mb-3 px-3 py-2 rounded-lg"
                                style={{ 
                                  backgroundColor: userSelectedCorrect ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                                  color: userSelectedCorrect ? '#065F46' : '#991B1B',
                                  border: userSelectedCorrect ? '2px solid rgba(34, 197, 94, 0.3)' : '2px solid rgba(239, 68, 68, 0.3)'
                                }}
                              >
                                {q.selectedAnswer}
                              </p>
                              {!userSelectedCorrect && (
                                <>
                                  <p className="text-sm font-semibold mb-2 mt-4" style={{ color: '#475569' }}>
                                    Správna odpoveď:
                                  </p>
                                  <p 
                                    className="text-sm leading-relaxed px-3 py-2 rounded-lg"
                                    style={{ 
                                      backgroundColor: 'rgba(34, 197, 94, 0.08)',
                                      color: '#065F46',
                                      border: '2px solid rgba(34, 197, 94, 0.3)'
                                    }}
                                  >
                                    {q.correctAnswer}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Divider */}
                    <div 
                      className="h-px mb-4"
                      style={{ backgroundColor: 'rgba(226, 232, 240, 0.6)' }}
                    />

                    {/* Expandable Explanation */}
                    <div>
                      <button
                        onClick={() => toggleExpanded(q.questionNumber)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:bg-gray-50"
                        style={{
                          backgroundColor: isExpanded ? 'rgba(248, 250, 252, 0.8)' : 'transparent'
                        }}
                      >
                        <span 
                          className="font-semibold text-sm"
                          style={{ color: '#192550' }}
                        >
                          {isExpanded ? 'Skryť vysvetlenie' : 'Zobraziť vysvetlenie'}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown 
                            className="w-5 h-5" 
                            style={{ color: '#FF7558' }}
                          />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div 
                              className="mt-3 p-4 rounded-xl"
                              style={{
                                backgroundColor: 'rgba(25, 37, 80, 0.03)',
                                borderLeft: '3px solid #FF7558'
                              }}
                            >
                              <p 
                                className="text-sm leading-relaxed"
                                style={{ color: '#475569' }}
                              >
                                {q.explanation}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Close Button */}
          <motion.div 
            className="max-w-5xl mx-auto pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div 
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
              }}
            >
              <Button
                onClick={onClose}
                className="h-12 px-8 rounded-xl font-semibold text-base transition-all"
                style={{ 
                  backgroundColor: '#FF7558',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(255, 117, 88, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF6346';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 117, 88, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF7558';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 117, 88, 0.3)';
                }}
              >
                Zavrieť prehľad
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}