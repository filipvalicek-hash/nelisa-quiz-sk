import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { QuizTopNavigation } from '@/app/components/QuizTopNavigation';

interface CheckpointScreenProps {
  onContinue: () => void;
  onLogoClick?: () => void;
}

export function CheckpointScreen({ onContinue, onLogoClick }: CheckpointScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <QuizTopNavigation onLogoClick={onLogoClick} />

      {/* Centered Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-16 px-8">
        <motion.div
          className="w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-blue-600" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Časť dokončená
          </motion.h1>

          {/* Supporting Text */}
          <motion.div
            className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <p className="mb-3">
              Máte za sebou ďalšiu časť scenára.
            </p>
            <p>
              Pokračujeme k ďalším situáciám z praxe.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <QuizButton onClick={onContinue}>
              Pokračovať
            </QuizButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}