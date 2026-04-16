import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, X, RefreshCw, PenLine, GripVertical } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface FillInBlankChallengeProps {
  questionNumber?: number;
  questionText: string | React.ReactNode;
  sentenceParts: {
    before: string[];
    after: string[];
  };
  blanks: {
    id: string;
    correctWord: string;
    position: number;
  }[];
  wordOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  partialFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  incorrectFeedback: {
    emoji: string;
    message: string;
    encouragement: string;
  };
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
}

interface DraggableWordProps {
  word: { id: string; text: string };
  isUsed: boolean;
  disabled: boolean;
}

function DraggableWord({ word, isUsed, disabled }: DraggableWordProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: word.id,
    data: { wordId: word.id, wordText: word.text },
    disabled: isUsed || disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 rounded-2xl border-2 bg-white border-gray-200 text-center transition-all select-none flex items-center justify-center gap-2"
      style={{
        visibility: isDragging ? 'hidden' : 'visible',
        opacity: isUsed ? 0.3 : 1,
        cursor: isUsed || disabled ? 'not-allowed' : 'grab',
        pointerEvents: isUsed || disabled ? 'none' : 'auto',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
      }}
      {...attributes}
      {...listeners}
    >
      <Type className="w-4 h-4 text-gray-400" />
      <p className="text-gray-700 text-base" style={{ fontWeight: 400 }}>{word.text}</p>
    </div>
  );
}

// Komponenta pre drag overlay - tag ktory sa pohybuje s kurzorom
function DragOverlayContent({ text }: { text: string }) {
  return (
    <motion.div
      className="p-5 rounded-2xl border-3 text-center cursor-grabbing select-none flex items-center justify-center gap-3"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      style={{
        borderWidth: '3px',
        borderColor: '#ff7400',
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 40px rgba(255, 116, 0, 0.35), 0 12px 24px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(255, 116, 0, 0.15)',
        minWidth: '180px',
        transform: 'rotate(-2deg)',
      }}
    >
      <Type className="w-5 h-5" style={{ color: '#ff7400' }} strokeWidth={2.5} />
      <p className="text-lg font-bold" style={{ color: '#ff7400' }}>{text}</p>
    </motion.div>
  );
}

interface DropSlotProps {
  blankId: string;
  filledWord: string | null;
  correctWord: string;
  onRemove: (blankId: string) => void;
  isOver: boolean;
  showResult: boolean;
}

function DropSlot({ blankId, filledWord, correctWord, onRemove, isOver, showResult }: DropSlotProps) {
  const { setNodeRef } = useDroppable({
    id: blankId,
  });

  // Zistit, ci je odpoved spravna
  const isCorrect = filledWord === correctWord;
  
  // Po zobrazeni vysledku - ak je odpoved nespravna, zobrazit nespravnu aj spravnu
  // Ak je spravna alebo prazdna, zobrazit spravnu
  const shouldShowIncorrect = showResult && filledWord && !isCorrect;

  return (
    <span
      ref={setNodeRef}
      className="inline-flex items-center justify-center mx-2 min-w-[120px] transition-all"
      style={{
        verticalAlign: 'middle'
      }}
    >
      {filledWord ? (
        <span
          onClick={showResult ? undefined : () => onRemove(blankId)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-medium transition-all"
          style={{
            backgroundColor: showResult
              ? (isCorrect ? '#D1FAE5' : '#FEE2E2')
              : '#fff7ed',
            borderColor: showResult
              ? (isCorrect ? '#10B981' : '#EF4444')
              : '#ff7400',
            color: showResult
              ? (isCorrect ? '#065F46' : '#991B1B')
              : '#ff7400',
            boxShadow: showResult
              ? (isCorrect ? '0 2px 4px rgba(16, 185, 129, 0.2)' : '0 2px 4px rgba(239, 68, 68, 0.2)')
              : '0 2px 4px rgba(255, 116, 0, 0.1)',
            cursor: showResult ? 'default' : 'pointer',
          }}
        >
          {showResult && (
            isCorrect ? (
              <Check className="w-4 h-4" style={{ color: '#10B981' }} strokeWidth={2.5} />
            ) : (
              <X className="w-4 h-4" style={{ color: '#EF4444' }} strokeWidth={2.5} />
            )
          )}
          {filledWord}
        </span>
      ) : (
        <span
          className="inline-flex items-center justify-center px-4 py-2 border-2 border-dashed text-center font-medium transition-all rounded-lg"
          style={{
            borderColor: isOver ? '#ff7400' : '#D1D5DB',
            backgroundColor: isOver ? 'rgba(255, 116, 0, 0.08)' : 'rgba(156, 163, 175, 0.05)',
            color: '#9CA3AF',
            minWidth: '140px',
            transform: isOver ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {isOver ? '↓ Pusti sem' : '______'}
        </span>
      )}
    </span>
  );
}

export function FillInBlankChallenge({
  questionNumber = 1,
  questionText,
  sentenceParts,
  blanks,
  wordOptions,
  correctFeedback,
  partialFeedback,
  incorrectFeedback,
  onNext,
  onBack,
  onLogoClick,
  onSkip
}: FillInBlankChallengeProps) {
  const [filledBlanks, setFilledBlanks] = useState<Record<string, { wordId: string; wordText: string }>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'partial' | 'incorrect' | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overBlankId, setOverBlankId] = useState<string | null>(null);

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: any) => {
    const { over } = event;
    setOverBlankId(over?.id || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setOverBlankId(null);
    
    if (!over) {
      return;
    }
    
    const wordId = active.id as string;
    const blankId = over.id as string;
    const wordText = active.data.current?.wordText as string;
    
    if (wordText && blankId) {
      setFilledBlanks((prev) => ({ ...prev, [blankId]: { wordId, wordText } }));
    }
  };

  const handleRemove = (blankId: string) => {
    if (showFeedback) return; // Po zobrazeni feedbacku nemozno upravovat
    
    setFilledBlanks((prev) => {
      const newFilled = { ...prev };
      delete newFilled[blankId];
      return newFilled;
    });
  };

  const usedWordIds = new Set(Object.values(filledBlanks).map(item => item.wordId));

  const checkAnswer = () => {
    let correctCount = 0;
    let totalBlanks = blanks.length;
    
    blanks.forEach((blank) => {
      const filled = filledBlanks[blank.id];
      if (filled && filled.wordText === blank.correctWord) {
        correctCount++;
      }
    });

    if (correctCount === totalBlanks) {
      return 'correct';
    } else if (correctCount > 0) {
      return 'partial';
    } else {
      return 'incorrect';
    }
  };

  const handleContinue = () => {
    // Skontrolovat, ci su vyplnene vsetky sloty
    const allFilled = blanks.every(blank => filledBlanks[blank.id]);
    
    if (!allFilled) return;
    
    if (!showFeedback) {
      const result = checkAnswer();
      setFeedbackType(result as 'correct' | 'partial' | 'incorrect');
      setShowFeedback(true);
    } else {
      onNext?.();
    }
  };

  const activeWord = wordOptions.find(w => w.id === activeId);

  // Zistit, ci su vyplnene vsetky sloty
  const allFilled = blanks.every(blank => filledBlanks[blank.id]);

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
      sensors={sensors}
    >
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Decorative Background Icons */}
        <QuestionBackgroundDecoration type="drag" />

        <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
          <motion.div 
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div 
              className="bg-white rounded-3xl p-8 relative shadow-card-responsive"
            >
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <PenLine className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                  <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                    DOPLN SLOVA
                  </span>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {questionText}
              </h3>

              {/* Instrukcie pre pouzivatela */}
              {!showFeedback && (
                <div className="mb-5 flex items-center gap-2 text-gray-600">
                  <GripVertical className="w-4 h-4" style={{ color: '#ff7400' }} />
                  <p className="text-sm font-medium">
                    Pretiahni slova mysou na spravne miesto.
                  </p>
                </div>
              )}

              {/* Sentence with Drop Slots */}
              <div className="mb-8 p-6 rounded-2xl border-2 border-gray-200 bg-white">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {sentenceParts.before[0]}
                  {blanks.map((blank, idx) => (
                    <span key={blank.id}>
                      <DropSlot
                        blankId={blank.id}
                        filledWord={filledBlanks[blank.id]?.wordText || null}
                        correctWord={blank.correctWord}
                        onRemove={handleRemove}
                        isOver={overBlankId === blank.id}
                        showResult={showFeedback}
                      />
                      {sentenceParts.before[idx + 1] || sentenceParts.after[idx]}
                    </span>
                  ))}
                </p>
              </div>

              {/* Draggable Word Options */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {wordOptions.map((word) => (
                  <DraggableWord
                    key={word.id}
                    word={word}
                    isUsed={usedWordIds.has(word.id)}
                    disabled={showFeedback}
                  />
                ))}
              </div>

              {/* Feedback Section */}
              {showFeedback && feedbackType === 'correct' && (
                <CorrectFeedback text={`${correctFeedback.message} ${correctFeedback.encouragement}`} />
              )}
              {showFeedback && feedbackType === 'partial' && (
                <IncorrectFeedback text={`${partialFeedback.message} ${partialFeedback.encouragement}`} />
              )}
              {showFeedback && feedbackType === 'incorrect' && (
                <IncorrectFeedback text={`${incorrectFeedback.message} ${incorrectFeedback.encouragement}`} />
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Spat na pribeh
                  </Button>
                  {!showFeedback && onSkip && (
                    <Button
                      variant="ghost"
                      onClick={onSkip}
                      className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                    >
                      Preskocit otazku
                    </Button>
                  )}
                </div>
                {showFeedback && <div></div>}

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleContinue}
                    disabled={!allFilled}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                    style={
                      allFilled
                        ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                        : { borderRadius: '12px' }
                    }
                    onMouseEnter={(e) => {
                      if (allFilled) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (allFilled) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                      }
                    }}
                  >
                    {showFeedback ? 'Prejst na dalsiu ulohu' : 'Pokracovat'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DragOverlay - zobrazuje tag, ktory sa pohybuje s kurzorom */}
        <DragOverlay dropAnimation={null}>
          {activeId && activeWord ? (
            <DragOverlayContent text={activeWord.text} />
          ) : null}
        </DragOverlay>

        {/* Footer Logo Navigation */}
        <FooterLogoNavigation onLogoClick={onLogoClick} />
      </div>
    </DndContext>
  );
}