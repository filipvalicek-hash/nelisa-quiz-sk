import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface MinimalSidebarProps {
  onBack: () => void;
  clientTrust: number;
  fitConfidence: number;
  engagement: number;
  contextIcon: React.ReactNode;
  contextEmoji?: string;
  contextLabel?: string;
  questionNumber: number;
}

export function MinimalSidebar({ 
  onBack, 
  clientTrust, 
  fitConfidence, 
  engagement,
  contextIcon,
  contextEmoji,
  contextLabel = "KONTEXT",
  questionNumber
}: MinimalSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="p-6 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 gap-2 -ml-2 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět
        </Button>
      </div>

      {/* Context Section */}
      <div className="flex-1 p-6 space-y-8">
        {/* Context Label */}
        <div className="inline-block">
          <span className="text-xs font-bold text-gray-500 tracking-wider">
            {contextLabel}
          </span>
        </div>

        {/* Visual Context with enhanced depth */}
        <motion.div 
          className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-10 flex items-center justify-center"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center space-y-2">
            {contextEmoji ? (
              <div className="text-7xl">{contextEmoji}</div>
            ) : (
              contextIcon
            )}
          </div>
        </motion.div>

        {/* Progress Info */}
        <div className="pt-8 border-t border-gray-200">
          <div className="text-xs font-bold text-gray-500 tracking-wider mb-4">
            PRŮBĚH
          </div>
          
          {/* Horizontal Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-semibold">Otázka {questionNumber}</span>
              <span className="text-gray-400 font-medium">/ 12</span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(questionNumber / 12) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}