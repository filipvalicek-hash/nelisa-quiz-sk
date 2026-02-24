import { Quote } from 'lucide-react';

interface QuotedTextProps {
  children: string;
  className?: string;
}

/**
 * Renders text with a small quote icon before quoted segments.
 * Only adds icon if text starts with „ quotation mark.
 */
export function QuotedText({ children, className = '' }: QuotedTextProps) {
  const hasQuote = children.trim().startsWith('„');
  
  if (!hasQuote) {
    return <span className={className}>{children}</span>;
  }
  
  return (
    <span className={`inline-flex items-start ${className}`} style={{ gap: '8px' }}>
      <Quote 
        className="flex-shrink-0" 
        style={{ 
          width: '16px',
          height: '16px',
          color: '#AE54FF',
          marginTop: '3px'
        }} 
        strokeWidth={2.5}
      />
      <span style={{ flex: 1 }}>{children}</span>
    </span>
  );
}