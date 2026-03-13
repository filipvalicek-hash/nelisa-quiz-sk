import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { ChevronRight, FolderOpen, GripVertical } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface MaterialCard {
  id: string;
  label: string;
  text: string;
  correctCategory: string;
  /** If set, any of these category IDs is accepted as correct (in addition to correctCategory). */
  correctCategories?: string[];
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
}

interface CategoryDragDropChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  categories: Category[];
  materials: MaterialCard[];
  correctFeedback: string;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: Record<string, string>;
  onStoreSelection?: (selection: Record<string, string>) => void;
}

const DraggableMaterial = ({
  material,
  isInCategory,
  status,
  locked,
  correctCategoryTitle
}: {
  material: MaterialCard;
  isInCategory: boolean;
  status: 'correct' | 'incorrect' | 'normal';
  locked?: boolean;
  correctCategoryTitle?: string;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'material',
    item: { id: material.id },
    canDrag: !locked,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={!locked ? drag : null}
      className={`p-4 rounded-xl border-2 bg-white transition-all ${
        locked ? 'cursor-not-allowed' : 'cursor-move'
      } ${isDragging ? 'opacity-50' : ''} ${
        status === 'correct' ? 'border-green-500 bg-green-50' : 
        status === 'incorrect' ? 'border-red-400 bg-red-50' : 
        'border-gray-200'
      }`}
      style={{
        boxShadow: isDragging ? '0 8px 16px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
      }}
      whileHover={{ scale: 1.015, y: -3 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-3">
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
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        </motion.div>
        <div 
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 bg-purple-100 text-purple-700"
          style={{ fontWeight: 600 }}
        >
          {material.label}
        </div>
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '1.3' }}>
            {material.text}
          </p>
          {status === 'incorrect' && correctCategoryTitle && (
            <p className="mt-1.5 text-xs font-semibold" style={{ color: '#DC2626' }}>
              → Správně patří do: {correctCategoryTitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DropZone = ({
  category,
  materials,
  onDrop,
  checked,
  allMaterials,
  allCategories,
  locked
}: {
  category: Category;
  materials: string[];
  onDrop: (categoryId: string, materialId: string) => void;
  checked: boolean;
  allMaterials: MaterialCard[];
  allCategories: Category[];
  locked?: boolean;
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'material',
    drop: (item: { id: string }) => {
      if (!locked) {
        onDrop(category.id, item.id);
      }
    },
    canDrop: () => !locked,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getMaterialById = (id: string) => allMaterials.find(m => m.id === id);

  const isMaterialCorrectInCategory = (material: MaterialCard, catId: string): boolean => {
    if (material.correctCategories) {
      return material.correctCategories.includes(catId);
    }
    return material.correctCategory === catId;
  };

  const getCardStatus = (materialId: string): 'correct' | 'incorrect' | 'normal' => {
    if (!checked) return 'normal';
    const material = getMaterialById(materialId);
    if (!material) return 'normal';
    return isMaterialCorrectInCategory(material, category.id) ? 'correct' : 'incorrect';
  };

  const getCorrectCategoryTitle = (materialId: string): string | undefined => {
    const material = getMaterialById(materialId);
    if (!material) return undefined;
    const correctCatId = material.correctCategory;
    return allCategories.find(c => c.id === correctCatId)?.title;
  };

  return (
    <div
      ref={!locked ? drop : null}
      className={`p-5 rounded-2xl border-2 min-h-[220px] transition-all ${
        isOver && !locked ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <h4 className="font-bold text-gray-900 mb-2 text-base uppercase">{category.title}</h4>
      <p className="text-sm text-gray-600 mb-4">{category.subtitle}</p>
      <div className="space-y-2">
        {materials.map(materialId => {
          const material = getMaterialById(materialId);
          if (!material) return null;
          const status = getCardStatus(materialId);

          return (
            <DraggableMaterial
              key={materialId}
              material={material}
              isInCategory={true}
              status={status}
              locked={locked}
              correctCategoryTitle={status === 'incorrect' ? getCorrectCategoryTitle(materialId) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export function CategoryDragDropChallenge({
  questionNumber,
  questionText,
  categories,
  materials,
  correctFeedback,
  onNext,
  onBack,
  onSkip,
  onLogoClick,
  onAnswerSubmit,
  initialConfirmed = false,
  initialSelection,
  onStoreSelection,
}: CategoryDragDropChallengeProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>(initialSelection ?? {});
  const [checked, setChecked] = useState(initialConfirmed);

  const handleDrop = (categoryId: string, materialId: string) => {
    if (checked) return; // Lock after checking
    const newAssignments = { ...assignments, [materialId]: categoryId };
    setAssignments(newAssignments);
    onStoreSelection?.(newAssignments);
  };

  const allAssigned = materials.every(material => assignments[material.id]);

  const isMaterialCorrect = (m: { id: string; correctCategory: string; correctCategories?: string[] }) => {
    const assigned = assignments[m.id];
    if (!assigned) return false;
    if (m.correctCategories) return m.correctCategories.includes(assigned);
    return assigned === m.correctCategory;
  };

  const handleContinue = () => {
    if (!checked) {
      // First click: Check answer
      if (!allAssigned) return;
      setChecked(true);
      const allCorrect = materials.every(m => isMaterialCorrect(m));
      const assignmentLabel = materials.map(m => `${m.label}→${assignments[m.id] ?? '?'}`).join(', ');
      onAnswerSubmit?.(allCorrect, assignmentLabel);
    } else {
      // Second click: Move to next question
      onNext?.();
    }
  };

  const unassignedMaterials = materials.filter(m => !assignments[m.id]);

  const isAllCorrect = materials.every(m => isMaterialCorrect(m));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white">
        <div className="flex items-start justify-center px-4 md:px-8 pb-12" style={{ marginTop: '44px' }}>
          <motion.div 
            className="w-full"
            style={{ maxWidth: '920px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Challenge Card */}
            <div 
              className="bg-white rounded-3xl relative"
              style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                padding: '48px 56px'
              }}
            >
              {/* Question Type Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                  <FolderOpen className="w-4 h-4" style={{ color: '#AE54FF' }} />
                  <span className="text-xs font-semibold tracking-wider" style={{ color: '#AE54FF' }}>
                    ÚKOL · PŘIŘAZOVÁNÍ
                  </span>
                </div>
              </div>

              {/* Main Question Title - MANDATORY: 24px SemiBold with purple underline */}
              <h3 
                className="mb-8"
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 600,
                  lineHeight: '130%',
                  letterSpacing: 0
                }}
              >
                {questionText}
              </h3>

              {/* Categories - 3 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {categories.map(category => {
                  const categoryMaterials = Object.entries(assignments)
                    .filter(([_, catId]) => catId === category.id)
                    .map(([materialId]) => materialId);
                  
                  return (
                    <DropZone
                      key={category.id}
                      category={category}
                      materials={categoryMaterials}
                      onDrop={handleDrop}
                      checked={checked}
                      allMaterials={materials}
                      allCategories={categories}
                      locked={checked}
                    />
                  );
                })}
              </div>

              {/* Unassigned Materials Pool */}
              {unassignedMaterials.length > 0 && !checked && (
                <div className="mb-8">
                  <h4 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wide">📦 Materiály k přiřazení</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unassignedMaterials.map(material => (
                      <DraggableMaterial 
                        key={material.id} 
                        material={material}
                        isInCategory={false}
                        status="normal"
                        locked={checked}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Section - Unified ExplanationBlock */}
              {checked && (
                <ExplanationBlock>
                  <p>{correctFeedback}</p>
                </ExplanationBlock>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                  >
                    Zpět na příběh
                  </Button>
                  {!checked && onSkip && (
                    <Button
                      variant="ghost"
                      onClick={onSkip}
                      className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                    >
                      Přeskočit otázku
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleContinue}
                    disabled={!allAssigned && !checked}
                    className="w-full md:w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                    style={
                      (allAssigned || checked)
                        ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                        : { borderRadius: '12px' }
                    }
                    onMouseEnter={(e) => {
                      if (allAssigned || checked) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (allAssigned || checked) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                      }
                    }}
                  >
                    {checked ? 'Pokračovat' : 'Zkontrolovat'}
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