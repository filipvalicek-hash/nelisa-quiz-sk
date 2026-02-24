import { useState } from 'react';
import { ChevronRight, Type } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface SentenceBuilderChallengeProps {
  questionNumber: number;
  questionText: string | React.ReactNode;
  wordOptions: {
    id: string;
    text: string;
  }[];
  correctSentence: string[];
  onNext?: () => void;
  onLogoClick?: () => void;
  onBack?: () => void;
}

export function SentenceBuilderChallenge({
  questionNumber,
  questionText,
  wordOptions,
  correctSentence,
  onNext,
  onLogoClick,
  onBack
}: SentenceBuilderChallengeProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleWordClick = (wordId: string) => {
    if (!selectedWords.includes(wordId)) {
      setSelectedWords([...selectedWords, wordId]);
    }
  };

  const handleWordRemove = (index: number) => {
    const newWords = [...selectedWords];
    newWords.splice(index, 1);
    setSelectedWords(newWords);
  };

  const handleContinue = () => {
    if (selectedWords.length === 0) return;
    setShowFeedback(true);
    if (selectedWords.map(id => wordOptions.find(w => w.id === id)?.text).join(' ') === correctSentence.join(' ')) {
      onNext?.();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}
      {/* REMOVED: ProgressSection - now global in App.tsx */}

      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="bg-white rounded-3xl p-8 relative"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(255, 116, 0, 0.08)', borderColor: 'rgba(255, 116, 0, 0.2)' }}>
                <Type className="w-4 h-4" style={{ color: '#ff7400' }} />
                <span className="text-xs font-bold tracking-wider" style={{ color: '#ff7400' }}>
                  JEDNA VOLBA
                </span>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {questionText}
            </h3>

            {/* Sentence Builder Area */}
            <div className="mb-8 p-6 rounded-2xl border-2 border-dashed border-gray-300 bg-white min-h-[100px]">
              <div className="flex flex-wrap gap-2">
                {selectedWords.length === 0 ? (
                  <p className="text-gray-400 text-base">Klikni na slova níže pro sestavení věty...</p>
                ) : (
                  selectedWords.map((wordId, index) => {
                    const word = wordOptions.find(w => w.id === wordId);
                    return (
                      <button
                        key={`${wordId}-${index}`}
                        onClick={() => handleWordRemove(index)}
                        className="px-4 py-2 rounded-lg border-2 text-base font-medium transition-all"
                        style={{
                          backgroundColor: 'var(--bg-soft)',
                          borderColor: 'var(--primary-brand)',
                          color: 'var(--primary-brand)'
                        }}
                      >
                        {word?.text}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Word Options */}
            <div className="flex flex-wrap gap-3 mb-8">
              {wordOptions.map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleWordClick(word.id)}
                  className="px-5 py-3 rounded-2xl border-2 bg-white border-gray-200 text-base font-medium transition-all hover:border-gray-300"
                  disabled={selectedWords.includes(word.id)}
                  style={
                    selectedWords.includes(word.id)
                      ? { opacity: 0.3, cursor: 'not-allowed' }
                      : undefined
                  }
                >
                  {word.text}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
              >
                Vrátit se na přehled
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  disabled={selectedWords.length === 0}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedWords.length > 0
                      ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedWords.length > 0) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedWords.length > 0) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                    }
                  }}
                >
                  {showFeedback ? 'Přejít na další úkol' : 'Pokračovat'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}