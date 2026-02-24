type QuestionType = 'choice' | 'matching' | 'drag' | 'story' | 'default';

interface QuestionBackgroundDecorationProps {
  type?: QuestionType;
}

export function QuestionBackgroundDecoration({ type = 'default' }: QuestionBackgroundDecorationProps) {
  // Clean, consistent background for all questions
  // No purple tints, no gradients, no overlays
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Clean white background - consistent across all questions */}
      <div className="absolute inset-0 bg-white" />
    </div>
  );
}
