import { LucideIcon } from 'lucide-react';

interface QuestionTypeTagProps {
  text: string;
  icon: LucideIcon;
}

export function QuestionTypeTag({ text, icon: Icon }: QuestionTypeTagProps) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" 
      style={{ 
        backgroundColor: 'rgba(174, 84, 255, 0.08)', 
        borderColor: 'rgba(174, 84, 255, 0.2)' 
      }}
    >
      <Icon className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
      <span 
        className="text-xs tracking-wider uppercase" 
        style={{ 
          color: '#AE54FF', 
          fontWeight: 600, 
          fontFamily: 'Poppins, sans-serif' 
        }}
      >
        {text}
      </span>
    </div>
  );
}
