import { GripVertical } from 'lucide-react';

/**
 * HintRow_DragToFill Component
 * 
 * Reusable hint instruction for drag-to-fill (Doplňovačka) question types.
 * Used in Questions 5, 10, and 12.
 * 
 * Displays a 9-dot grip icon with instruction text:
 * "Přetáhni slova myší na správné místo."
 */
export function HintRow_DragToFill() {
  return (
    <div className="mb-5 flex items-center gap-3 text-gray-600">
      <GripVertical 
        className="w-[18px] h-[18px]" 
        style={{ color: '#9CA3AF' }} 
        strokeWidth={2}
      />
      <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Přetáhni slova myší na správné místo.
      </p>
    </div>
  );
}
