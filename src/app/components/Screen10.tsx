import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { ChevronRight, PenLine, GripVertical, Type, Check, X } from 'lucide-react';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { HintRow_DragToFill } from '@/app/components/HintRow_DragToFill';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';

interface Screen10Props {
  onBackToStory: () => void;
  onSkipTask: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
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
      className="p-4 rounded-2xl border bg-white text-center transition-all select-none flex items-center justify-center gap-2"
      style={{
        visibility: isDragging ? 'hidden' : 'visible',
        opacity: isUsed ? 0.3 : 1,
        cursor: isUsed || disabled ? 'not-allowed' : 'grab',
        pointerEvents: isUsed || disabled ? 'none' : 'auto',
        borderColor: '#E5E7EB',
        backgroundColor: '#FAFAFA',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      }}
      {...attributes}
      {...listeners}
    >
      <span className="w-4 h-4 text-gray-400 flex items-center justify-center" style={{ fontSize: '16px' }}>⠿</span>
      <p className="text-gray-700 text-base" style={{ fontWeight: 400 }}>{word.text}</p>
    </div>
  );
}

function DragOverlayContent({ text }: { text: string }) {
  return (
    <motion.div
      className="p-5 rounded-2xl border-3 text-center cursor-grabbing select-none flex items-center justify-center gap-3"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      style={{
        borderWidth: '3px',
        borderColor: '#AE54FF',
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 40px rgba(174, 84, 255, 0.35), 0 12px 24px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(174, 84, 255, 0.15)',
        minWidth: '180px',
        transform: 'rotate(-2deg)',
      }}
    >
      <span className="w-5 h-5 flex items-center justify-center" style={{ color: '#AE54FF', fontSize: '20px', fontWeight: 'bold' }}>⠿</span>
      <p className="text-lg font-bold" style={{ color: '#AE54FF' }}>{text}</p>
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

  const isCorrect = filledWord === correctWord;

  return (
    <span
      ref={setNodeRef}
      className="inline-flex items-center justify-center mx-2 min-w-[180px] transition-all"
      style={{
        verticalAlign: 'middle'
      }}
    >
      {filledWord ? (
        <span
          onClick={showResult ? undefined : () => onRemove(blankId)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
          style={{
            backgroundColor: showResult
              ? (isCorrect ? '#D1FAE5' : '#FEE2E2')
              : 'rgba(174, 84, 255, 0.05)',
            border: showResult 
              ? `1.5px solid ${isCorrect ? '#10B981' : '#EF4444'}`
              : '1.5px solid #C4A1F0',
            color: showResult
              ? (isCorrect ? '#065F46' : '#991B1B')
              : '#9333EA',
            cursor: showResult ? 'default' : 'pointer',
            fontWeight: 400,
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
            borderColor: isOver ? '#AE54FF' : '#D1D5DB',
            backgroundColor: isOver ? 'rgba(174, 84, 255, 0.08)' : 'rgba(156, 163, 175, 0.05)',
            color: '#9CA3AF',
            minWidth: '180px',
            transform: isOver ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {isOver ? '↓ Pusť zde' : '________'}
        </span>
      )}
    </span>
  );
}

export function Screen10({ onBackToStory, onSkipTask, onNext, onLogoClick, onAnswerSubmit }: Screen10Props) {
  const [filledBlanks, setFilledBlanks] = useState<Record<string, { wordId: string; wordText: string }>>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overBlankId, setOverBlankId] = useState<string | null>(null);

  const wordOptions = [
    { id: 'opt1', text: 'Adminu Nelisy' },
    { id: 'opt2', text: 'Teamio nebo jiného ATS' },
    { id: 'opt3', text: 'Meta Business Manageru' },
    { id: 'opt4', text: 'CRM systému' },
    { id: 'opt5', text: 'Google Ads účtu' },
    { id: 'opt6', text: 'Firemního profilu na LinkedInu' }
  ];

  const blanks = [
    { id: 'blank1', correctWord: 'Adminu Nelisy' },
    { id: 'blank2', correctWord: 'Teamio nebo jiného ATS' }
  ];

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
    if (isConfirmed) return;
    
    setFilledBlanks((prev) => {
      const newFilled = { ...prev };
      delete newFilled[blankId];
      return newFilled;
    });
  };

  const usedWordIds = new Set(Object.values(filledBlanks).map(item => item.wordId));

  const handleCheck = () => {
    if (!allFilled || isConfirmed) return;
    setIsConfirmed(true);
    const allCorrect = blanks.every(blank => filledBlanks[blank.id]?.wordText === blank.correctWord);
    const filledLabel = blanks.map(b => filledBlanks[b.id]?.wordText ?? '?').join(', ');
    onAnswerSubmit?.(allCorrect, filledLabel);
  };

  const allFilled = blanks.every(blank => filledBlanks[blank.id]);
  const activeWord = wordOptions.find(w => w.id === activeId);

  const blank1Correct = filledBlanks['blank1']?.wordText === 'Adminu Nelisy';
  const blank2Correct = filledBlanks['blank2']?.wordText === 'Teamio nebo jiného ATS';

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
      sensors={sensors}
    >
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Main Content */}
        <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '44px' }}>
          <motion.div
            className="w-full"
            style={{ maxWidth: '920px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Challenge Card */}
            <div 
              className="bg-white rounded-3xl p-8 relative"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              {/* Question Type Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <PenLine className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                  <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                    DOPLŇ SLOVA
                  </span>
                </div>
              </div>

              {/* Question Text - MANDATORY: 24px SemiBold with purple underline */}
              <h3 
                className="text-gray-900 mb-4 leading-tight" 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 600, 
                  lineHeight: '130%', 
                  letterSpacing: 0
                }}
              >
                Doplň do věty <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px', fontWeight: 600 }}>správné možnosti</span>:
              </h3>

              {/* Drag-to-fill hint */}
              <HintRow_DragToFill />

              {/* Sentence with Drop Zones */}
              <div className="mb-8 p-10 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                <div className="text-gray-900" style={{ fontSize: '16px', lineHeight: '155%' }}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span>„Pozici a podklady nastavíme v</span>
                    
                    <DropSlot
                      blankId="blank1"
                      filledWord={filledBlanks['blank1']?.wordText || null}
                      correctWord="Adminu Nelisy"
                      onRemove={handleRemove}
                      isOver={overBlankId === 'blank1'}
                      showResult={isConfirmed}
                    />

                    <span>, ale reakce kandidátů chodí do</span>

                    <DropSlot
                      blankId="blank2"
                      filledWord={filledBlanks['blank2']?.wordText || null}
                      correctWord="Teamio nebo jiného ATS"
                      onRemove={handleRemove}
                      isOver={overBlankId === 'blank2'}
                      showResult={isConfirmed}
                    />

                    <span>."</span>
                  </div>
                </div>
              </div>

              {/* Draggable Word Options */}
              {!isConfirmed && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Možnosti:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {wordOptions.map((word) => (
                      <DraggableWord
                        key={word.id}
                        word={word}
                        isUsed={usedWordIds.has(word.id)}
                        disabled={isConfirmed}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Explanation Section - Shows after confirmation */}
              {isConfirmed && (
                <ExplanationBlock>
                  <p>
                    Tahle námitka je často o strachu z práce navíc. Správná odpověď musí uklidnit, že recruiter nedělá marketing a nepotřebuje další know-how. Jeho role je zadat pozici a připojit službu, zatímco optimalizaci kampaně řídí Nelisa.
                  </p>
                  <p>
                    Klient tím získá výsledek bez toho, aby do týmu přidával další kompetenci nebo další kapacitu.
                  </p>
                </ExplanationBlock>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={onBackToStory}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Zpět na příběh
                  </Button>
                  {!isConfirmed && onSkipTask && (
                    <Button
                      variant="ghost"
                      onClick={onSkipTask}
                      className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                    >
                      Přeskočit úkol
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-3">{!isConfirmed && (
                    <QuizButton
                      onClick={handleCheck}
                      disabled={!allFilled}
                    >
                      Zkontrolovat
                    </QuizButton>
                  )}
                  {isConfirmed && (
                    <QuizButton
                      onClick={onNext}
                    >
                      Pokračovat
                    </QuizButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DragOverlay - zobrazuje tag, který se pohybuje s kurzorem */}
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