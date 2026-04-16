import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { QuizTopNavigation } from '@/app/components/QuizTopNavigation';
import { Trophy, Star, RotateCcw, FileText, Award, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface QuizCompletionScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
  onGetCertificate: () => void;
}

export function QuizCompletionScreen({
  correctAnswers,
  totalQuestions,
  onRetry,
  onGetCertificate
}: QuizCompletionScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const isPerfectScore = correctAnswers === totalQuestions;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Animate score counter
  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = correctAnswers / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedScore(Math.min(Math.floor(increment * currentStep), correctAnswers));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        if (isPerfectScore) {
          setShowConfetti(true);
        }
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [correctAnswers, isPerfectScore]);

  const getHeadline = () => {
    if (isPerfectScore) return "Perfektný výsledok!";
    return "Výsledok testu";
  };

  const getMessage = () => {
    if (isPerfectScore) return "Gratulujeme! Zvládli ste všetky koncepty. Získavate certifikát!";
    return "Milá kolegyňa, milý kolega,\nďakujeme, že si sa do certifikácie pustil/a.\nVidíme, že časť princípov máš zvládnutú, ale pri niektorých témach Ti to ešte môže u klienta „ujsť" (hlavne v argumentácii a očakávaniach). To je v poriadku. Certifikácia slúži aj ako tréning.";
  };

  const getStarRating = () => {
    if (isPerfectScore) return 3;
    if (percentage >= 80) return 2;
    if (percentage >= 60) return 1;
    return 0;
  };

  const starRating = getStarRating();

  return (
    <div className="min-h-screen bg-white">
      <QuizTopNavigation />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'][i % 5],
                left: `${Math.random() * 100}%`,
                top: '-10%'
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
                x: (Math.random() - 0.5) * 200
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Result Card */}
          <motion.div
            className={`relative bg-white rounded-3xl p-12 text-center ${
              isPerfectScore ? 'border-4 border-blue-400' : 'border border-gray-200'
            }`}
            style={{
              boxShadow: isPerfectScore
                ? `0 0 0 1px rgba(59, 130, 246, 0.1),
                   0 8px 16px rgba(59, 130, 246, 0.2),
                   0 24px 48px rgba(59, 130, 246, 0.15)`
                : `0 0 0 1px rgba(0, 0, 0, 0.02),
                   0 2px 4px rgba(0, 0, 0, 0.03),
                   0 8px 16px rgba(0, 0, 0, 0.06),
                   0 24px 48px rgba(0, 0, 0, 0.08)`
            }}
          >
            {/* Glow effect for perfect score */}
            {isPerfectScore && (
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20"
                animate={{
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              >
                {isPerfectScore ? (
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Award className="w-12 h-12 text-blue-600" />
                  </div>
                )}
              </motion.div>

              {/* Headline */}
              <motion.h1
                className={`text-5xl font-bold mb-4 ${
                  isPerfectScore
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                    : 'text-gray-900'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {getHeadline()}
              </motion.h1>

              {/* Message */}
              <motion.p
                className="text-gray-600 text-lg mb-8 max-w-lg mx-auto"
                style={{ whiteSpace: 'pre-line', textAlign: 'left' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {getMessage()}
              </motion.p>

              {/* Score Display */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-sm font-bold text-gray-500 tracking-wider mb-3">
                  VÁŠ VÝSLEDOK
                </div>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    className={`text-7xl font-bold ${
                      isPerfectScore ? 'text-blue-600' : 'text-gray-900'
                    }`}
                    key={animatedScore}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {animatedScore}
                  </motion.div>
                  <div className="text-4xl text-gray-400 font-light">/</div>
                  <div className="text-4xl text-gray-600 font-semibold">
                    {totalQuestions}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: i < starRating ? 1 : 0.2,
                        scale: i < starRating ? 1 : 0.8
                      }}
                      transition={{ delay: 0.6 + i * 0.1, type: "spring", bounce: 0.5 }}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          i < starRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Percentage Badge */}
                <motion.div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg ${
                    isPerfectScore
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : percentage >= 80
                      ? 'bg-blue-100 text-blue-800'
                      : percentage >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {percentage}% dokončené
                </motion.div>

                {/* Additional text for unsuccessful scenario */}
                {!isPerfectScore && (
                  <motion.p
                    className="text-gray-600 text-base mt-6 max-w-md mx-auto"
                    style={{ textAlign: 'left' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    Pre úspešné dokončenie je potrebné mať správne všetky otázky, máš ale neobmedzený počet pokusov na splnenie.
                  </motion.p>
                )}
              </motion.div>

              {/* Level Badge (Gamification) */}
              {isPerfectScore && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-base shadow-lg">
                    <Award className="w-5 h-5" />
                    HR Poradca — Úroveň 1 Certifikované
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex items-center justify-center gap-4 pt-6 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {isPerfectScore ? (
                  <>
                    <Button
                      onClick={onGetCertificate}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold gap-3 px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Award className="w-6 h-6" />
                      Získať certifikát
                    </Button>
                    <Button
                      onClick={onRetry}
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold gap-2 px-8 py-6 text-base rounded-xl transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Skúsiť znova
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={onRetry}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold gap-3 px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <RotateCcw className="w-6 h-6" />
                      Zopakovať test
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold gap-2 px-8 py-6 text-base rounded-xl transition-all"
                    >
                      <FileText className="w-5 h-5" />
                      Zobraziť vysvetlenie k chybám
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Text for unsuccessful scenario */}
          {!isPerfectScore && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Tu máš na jednom mieste všetky zdroje, ku ktorým sa môžeš kedykoľvek vrátiť, keď si nebudeš istý/á (prezentácie, ukážky formátov, desatoro, FAQ a ďalšie).
                A ak chceš ísť ešte viac do hĺbky, čaká na Teba nadväzujúci test zameraný na fungovanie Meta kampaní.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}