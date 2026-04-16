import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { QuizTopNavigation } from '@/app/components/QuizTopNavigation';
import { Download, Share2, Award, Sparkles } from 'lucide-react';

interface CertificateScreenProps {
  userName?: string;
  courseName?: string;
  onDownload?: () => void;
  onClose?: () => void;
}

export function CertificateScreen({
  userName = "Vaše meno",
  courseName = "HR Poradenská Simulácia",
  onDownload,
  onClose
}: CertificateScreenProps) {
  const currentDate = new Date().toLocaleDateString('sk-SK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white">
      <QuizTopNavigation />

      {/* Celebration particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 5)}%`,
              top: `${20 + Math.random() * 60}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {i % 2 === 0 ? (
              <Sparkles className="w-4 h-4" style={{ color: '#c4b5fd' }} />
            ) : (
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c4b5fd' }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8 relative z-20">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              🎉 Gratulujem!
            </h1>
            <p className="text-lg text-gray-600">
              Získali ste svoj certifikát o dokončení
            </p>
          </motion.div>

          {/* Certificate Card */}
          <motion.div
            id="certificate"
            className="bg-white rounded-3xl p-16 relative overflow-hidden"
            style={{
              boxShadow: `
                0 0 0 1px rgba(0, 0, 0, 0.02),
                0 8px 16px rgba(0, 0, 0, 0.08),
                0 24px 48px rgba(0, 0, 0, 0.12),
                0 48px 96px rgba(0, 0, 0, 0.08)
              `
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: '#AE54FF' }} />
            <div className="absolute bottom-0 left-0 w-full h-2" style={{ backgroundColor: '#AE54FF' }} />
            
            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-24 h-24 opacity-10">
              <div className="w-full h-full border-t-4 border-l-4 rounded-tl-3xl" style={{ borderColor: '#c4b5fd' }} />
            </div>
            <div className="absolute top-8 right-8 w-24 h-24 opacity-10">
              <div className="w-full h-full border-t-4 border-r-4 border-indigo-400 rounded-tr-3xl" />
            </div>
            <div className="absolute bottom-8 left-8 w-24 h-24 opacity-10">
              <div className="w-full h-full border-b-4 border-l-4 border-purple-400 rounded-bl-3xl" />
            </div>
            <div className="absolute bottom-8 right-8 w-24 h-24 opacity-10">
              <div className="w-full h-full border-b-4 border-r-4 rounded-br-3xl" style={{ borderColor: '#c4b5fd' }} />
            </div>

            {/* Background pattern - removed gradients */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: '#c4b5fd' }} />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-400 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Logo/Badge */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.5 }}
              >
                <div className="relative">
                  <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: '#AE54FF' }}>
                    <Award className="w-14 h-14 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Certificate Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm font-bold text-gray-500 tracking-widest mb-6">
                  NELISA LEARNING
                </div>
                
                <h2 className="text-5xl font-bold mb-8" style={{ color: '#AE54FF' }}>
                  Certifikát o absolvovaní
                </h2>

                <div className="max-w-2xl mx-auto mb-10">
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Tento certifikát potvrdzuje, že
                  </p>
                  
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="text-5xl font-bold text-gray-900 mb-3">
                      {userName}
                    </div>
                    <div className="h-1 w-64 mx-auto" style={{ backgroundColor: '#c4b5fd' }} />
                  </motion.div>

                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    úspešne dokončil/a
                  </p>
                  
                  <p className="text-2xl font-bold text-gray-900 mb-8">
                    {courseName}
                  </p>

                  <p className="text-gray-600 text-lg mb-10">
                    s perfektným skóre, preukazujúcim komplexné porozumenie konceptom HR poradenstva a stratégiám konzultácií klientov.
                  </p>
                </div>

                {/* Date and Signatures */}
                <motion.div
                  className="flex items-end justify-between max-w-3xl mx-auto pt-12 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="text-left">
                    <div className="text-sm text-gray-500 mb-2">Dátum dokončenia</div>
                    <div className="text-lg font-semibold text-gray-900">{currentDate}</div>
                  </div>

                  <div className="text-center">
                    <div className="mb-2">
                      <div className="h-0.5 w-48 bg-gray-300 mb-2" />
                    </div>
                    <div className="text-sm text-gray-500">Oprávnený podpis</div>
                    <div className="text-base font-semibold text-gray-700 mt-1">
                      Nelisa Learning Platform
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <Award className="w-5 h-5" style={{ color: '#AE54FF' }} />
                      <span className="text-lg font-bold" style={{ color: '#AE54FF' }}>100%</span>
                    </div>
                    <div className="text-sm text-gray-500">Dosiahnuté skóre</div>
                  </div>
                </motion.div>

                {/* Certificate ID */}
                <motion.div
                  className="mt-10 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-xs text-gray-400 tracking-wider">
                    Certificate ID: NELISA-{new Date().getFullYear()}-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              onClick={onDownload}
              style={{ backgroundColor: '#AE54FF', color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9A3EF0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#AE54FF'}
              className="font-semibold gap-3 px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-6 h-6" />
              Stiahnuť certifikát
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 font-semibold gap-2 px-8 py-6 text-base rounded-xl transition-all"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#AE54FF';
                e.currentTarget.style.color = '#8231D6';
                e.currentTarget.style.backgroundColor = '#f3e8ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <Share2 className="w-5 h-5" />
              Zdieľať
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 font-medium px-6"
              >
                Zavrieť
              </Button>
            )}
          </motion.div>

          {/* Share Note */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <p className="text-sm text-gray-500">
              🎓 Zdieľajte svoj úspech na LinkedIne alebo ho pridajte do svojho profesijného portfólia
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}