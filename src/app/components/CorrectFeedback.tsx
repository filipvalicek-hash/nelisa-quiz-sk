import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface CorrectFeedbackProps {
  /** 
   * The feedback text - must start with "Přesně tak."
   * The first sentence (ending with period) will be bolded automatically
   */
  text: string;
}

export function CorrectFeedback({ text }: CorrectFeedbackProps) {
  // Split the text to make "Přesně tak." bold
  const parts = text.split(/(\. )/);
  const firstSentence = parts[0] + (parts[1] || '');
  const remainingText = parts.slice(2).join('');

  // Handle multiline text (preserve line breaks)
  const renderText = (content: string) => {
    return content.split('\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <><br /><br /></>}
      </span>
    ));
  };

  return (
    <motion.div 
      className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
      style={{
        backgroundColor: '#F0FDF4', // Soft green background (light tint)
        borderColor: '#22C55E' // Green border
      }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.35,
        ease: [0.34, 1.56, 0.64, 1] // Spring-like easing
      }}
    >
      {/* Green checkmark icon on the left */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.1
        }}
      >
        <CheckCircle 
          className="w-7 h-7 flex-shrink-0 mt-0.5" 
          style={{ color: '#22C55E' }} 
          strokeWidth={2.5}
        />
      </motion.div>
      
      {/* Text content */}
      <div className="flex-1">
        <p className="text-gray-800 text-base leading-relaxed">
          {renderText(text)}
        </p>
      </div>
    </motion.div>
  );
}