import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { CorrectFeedback } from '@/app/components/CorrectFeedback';
import { ChevronRight, List, XCircle, GripVertical } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface SequenceItem {
  id: string;
  text: string;
  correctOrder: number;
}

interface SequenceChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  items?: SequenceItem[];
  sentences?: string[];
  correctOrder?: number[];
  correctFeedback: string | {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback: string | {
    emoji: string;
    message: string;
    encouragement: string;
  };
  questionTypeTag?: string;
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

const DraggableItem = ({ item, index, moveItem }: { item: SequenceItem; index: number; moveItem: (dragIndex: number, hoverIndex: number) => void }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'item',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <motion.div
      ref={(node) => drag(drop(node)) as any}
      className={`p-5 rounded-2xl border-2 bg-white cursor-move ${isDragging ? 'opacity-50' : ''}`}
      style={{
        borderColor: 'var(--card-border)',
        boxShadow: isDragging ? '0 8px 16px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease-in-out'
      }}
      whileHover={{ scale: 1.015, y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        </motion.div>
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ 
            backgroundColor: 'var(--primary-brand)', 
            color: 'white',
            transition: 'transform 0.2s ease-in-out'
          }}
        >
          {index + 1}
        </div>
        <p className="text-gray-700 text-base leading-relaxed flex-1">
          {item.text}
        </p>
      </div>
    </motion.div>
  );
};

export function SequenceChallenge({ 
  questionNumber,
  questionText,
  items,
  sentences,
  correctOrder,
  correctFeedback,
  incorrectFeedback,
  questionTypeTag = 'SEŘAZENÍ',
  onNext,
  onBack,
  onLogoClick
}: SequenceChallengeProps) {
  // Convert sentences to items if needed
  const initialItems = items || (sentences && correctOrder ? sentences.map((text, idx) => ({
    id: `item-${idx}`,
    text,
    correctOrder: correctOrder[idx]
  })) : []);

  const [orderedItems, setOrderedItems] = useState<SequenceItem[]>([...initialItems]);
  const [showFeedback, setShowFeedback] = useState(false);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...orderedItems];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setOrderedItems(newItems);
  };

  const checkAnswer = () => {
    // Check if current order matches correct order
    if (correctOrder) {
      // Using correctOrder array (Screen20 format)
      return orderedItems.every((item, idx) => {
        const originalIndex = parseInt(item.id.split('-')[1]);
        return originalIndex === correctOrder[idx];
      });
    } else {
      // Using items with correctOrder property
      return orderedItems.every((item, idx) => item.correctOrder === idx);
    }
  };

  const handleContinue = () => {
    if (!showFeedback) {
      // Show feedback
      setShowFeedback(true);
    } else {
      // Move to next question
      onNext?.();
    }
  };

  const isCorrect = showFeedback ? checkAnswer() : false;

  // Handle both string and object feedback formats
  const getFeedbackMessage = (feedback: string | { emoji: string; message: string; encouragement: string }) => {
    if (typeof feedback === 'string') {
      return feedback;
    }
    return feedback.message;
  };

  const getFeedbackEncouragement = (feedback: string | { emoji: string; message: string; encouragement: string }) => {
    if (typeof feedback === 'string') {
      return '';
    }
    return feedback.encouragement;
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(174, 84, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(255, 116, 0, 0.08)', borderColor: 'rgba(255, 116, 0, 0.2)' }}>
                  <List className="w-4 h-4" style={{ color: '#ff7400' }} />
                  <span className="text-xs font-bold tracking-wider" style={{ color: '#ff7400' }}>
                    JEDNA VOLBA
                  </span>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {questionText}
              </h3>

              <div className="space-y-3 mb-8">
                {orderedItems.map((item, index) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                  />
                ))}
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <>
                  {isCorrect ? (
                    <CorrectFeedback 
                      text={
                        typeof correctFeedback === 'string' 
                          ? correctFeedback 
                          : `${correctFeedback.message} ${correctFeedback.encouragement}`
                      } 
                    />
                  ) : (
                    <motion.div 
                      className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
                      style={{
                        backgroundColor: '#FEF2F2',
                        borderColor: '#EF4444'
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <XCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#EF4444' }} />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-1" style={{ color: '#991B1B' }}>
                          {getFeedbackMessage(incorrectFeedback)}
                        </h4>
                        {getFeedbackEncouragement(incorrectFeedback) && (
                          <p className="text-gray-700 text-base leading-relaxed">
                            {getFeedbackEncouragement(incorrectFeedback)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              )}

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
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                    style={{ backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
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
    </DndProvider>
  );
}