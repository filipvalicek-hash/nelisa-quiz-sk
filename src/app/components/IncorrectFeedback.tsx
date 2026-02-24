import { motion } from 'motion/react';
import { XCircle } from 'lucide-react';

interface IncorrectFeedbackProps {
  /** 
   * The feedback text - should explain why the answer is not optimal
   * The first sentence will be bolded automatically
   */
  text: string;
}

export function IncorrectFeedback({ text }: IncorrectFeedbackProps) {
  // Split the text to make first sentence bold
  const parts = text.split(/(\.[\s]+)/);
  const firstSentence = parts[0] + (parts[1] || '');
  const remainingText = parts.slice(2).join('');

  return (
    <motion.div 
      className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
      style={{
        backgroundColor: '#FEF2F2', // Soft red background (light tint)
        borderColor: '#EF4444' // Red border
      }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.35,
        ease: [0.34, 1.56, 0.64, 1] // Spring-like easing
      }}
    >
      {/* Red X icon on the left */}
      <motion.div
        initial={{ scale: 0, rotate: 90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.1
        }}
      >
        <XCircle 
          className="w-7 h-7 flex-shrink-0 mt-0.5" 
          style={{ color: '#EF4444' }} 
          strokeWidth={2.5}
        />
      </motion.div>
      
      {/* Text content */}
      <div className="flex-1">
        <p className="text-gray-800 text-base leading-relaxed">
          <span className="font-bold">{firstSentence}</span>
          {remainingText && <> {remainingText}</>}
        </p>
      </div>
    </motion.div>
  );
}