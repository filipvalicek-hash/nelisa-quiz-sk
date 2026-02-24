import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

interface ExplanationBlockProps {
  children: React.ReactNode;
}

export function ExplanationBlock({ children }: ExplanationBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 p-6 rounded-2xl border-2"
      style={{
        backgroundColor: '#f8fafc',
        borderColor: '#cbd5e1'
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" 
          style={{ backgroundColor: '#e0e7ff' }}
        >
          <Lightbulb className="w-5 h-5" style={{ color: '#4f46e5' }} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2 text-lg">Vysvětlení</h4>
          <div className="text-gray-700 space-y-3" style={{ lineHeight: '1.58' }}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}