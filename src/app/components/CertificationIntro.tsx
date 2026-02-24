import { Trophy, Target, CheckCircle, Award, RefreshCw, Lightbulb, Users, Shield } from 'lucide-react';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { GameAtmosphereBackground } from '@/app/components/GameAtmosphereBackground';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/df61b6f2193a78afb780969de31b920fd241cf00.png';
import { useState, useEffect } from 'react';

interface CertificationIntroProps {
  onStart: () => void;
}

export function CertificationIntro({ onStart }: CertificationIntroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: CheckCircle,
      text: 'Pro úspěšné splnění certifikace je potřeba zodpovědět všechny otázky správně.'
    },
    {
      icon: RefreshCw,
      text: 'Počet pokusů není omezený – certifikaci můžeš projít tolikrát, kolikrát budeš potřebovat.'
    },
    {
      icon: Lightbulb,
      text: 'Každá otázka obsahuje vysvětlení, takže i pokud se netrefíš napoprvé, slouží test zároveň jako learning.'
    },
    {
      icon: Users,
      text: 'Odpovídej tak, jak bys reagoval/a při reálné schůzce s klientem, ne podle učebnice.'
    },
    {
      icon: Shield,
      text: 'Cílem není rychlost ani stres, ale pochopení principů a jistota v argumentech. Držíme Ti palce!'
    }
  ];

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <div className="space-y-4">
              <motion.h1 
                className="font-bold text-gray-900 leading-tight tracking-tight relative"
                style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  maxWidth: '700px',
                  fontSize: '3.5rem'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block relative pb-3">
                  Vítej v&nbsp;certifikaci
                  {/* Premium modern underline accent */}
                  <motion.svg 
                    className="absolute left-0 w-full" 
                    style={{ top: '100%', marginTop: '-4px', originX: '50%' }}
                    viewBox="0 0 300 14" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ 
                      opacity: [0, 0.85, 0.85],
                      scaleX: [0, 1, 1],
                      y: [0, 0, -1.5, 0]
                    }}
                    transition={{ 
                      duration: 1.2,
                      delay: 0.5,
                      times: [0, 0.5, 0.7, 1],
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {/* Main stroke with variable thickness */}
                    <path
                      d="M 8 7 Q 75 5 150 5 Q 225 5 292 7"
                      stroke="url(#underlineGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.85"
                    />
                    {/* Thicker center accent */}
                    <path
                      d="M 100 5.5 Q 125 5 150 5 Q 175 5 200 5.5"
                      stroke="#5B9BD5"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#5B9BD5" stopOpacity="0.3" />
                        <stop offset="30%" stopColor="#5B9BD5" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="#5B9BD5" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5B9BD5" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br />
                <span>od Nelisy! 👋</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600"
                style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.55' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Tato certifikace vznikla proto, aby Ti pomohla lépe fungovat při <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>reálných schůzkách s klienty</span>.
                Nejde o zkoušení z detailů ani o chytání za slovíčka – cílem je ujasnit si, jak Nelisu správně vysvětlovat, prodávat a nastavovat očekávání.
              </motion.p>
              
              <motion.p 
                className="text-base text-gray-600"
                style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.55' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Otázky vycházejí z <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>běžné praxe a typických situací</span>, které řešíme dnes a denně.
              </motion.p>
            </div>

            {/* How to Approach This - Section Title OUTSIDE blue box */}
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#AE54FF' }}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 pt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Jak k tomu přistupovat
              </h2>
            </motion.div>

            {/* Certification Description Box - Only carousel inside */}
            <motion.div
              className="rounded-2xl p-4"
              style={{ 
                backgroundColor: 'rgba(174, 84, 255, 0.08)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(174, 84, 255, 0.15)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {/* Carousel Content */}
              <div className="relative min-h-[90px]">
                {slides.map((slide, index) => {
                  const Icon = slide.icon;
                  return (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: currentSlide === index ? 1 : 0,
                        x: currentSlide === index ? 0 : currentSlide > index ? -20 : 20,
                        pointerEvents: currentSlide === index ? 'auto' : 'none'
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(174, 84, 255, 0.15)' }}>
                          <Icon className="w-6 h-6" style={{ color: '#AE54FF' }} />
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1 pt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {slide.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Carousel Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: currentSlide === index ? '32px' : '8px',
                        height: '8px',
                        backgroundColor: currentSlide === index 
                          ? '#AE54FF' 
                          : 'rgba(174, 84, 255, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        if (currentSlide !== index) {
                          e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentSlide !== index) {
                          e.currentTarget.style.backgroundColor = 'rgba(174, 84, 255, 0.3)';
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* What You'll Do */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xs font-bold text-gray-500 tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                CO TĚ ČEKÁ
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">📖</span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    24 praktických otázek založených na reálných příbězích klientů
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">🎯</span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Různé typy úkolů (výběr odpovědi, více správných možností, přiřazování)
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <QuizButton onClick={onStart}>
                Začít certifikaci
              </QuizButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Atmospheric Background ONLY */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GameAtmosphereBackground />
          </motion.div>
        </div>
      </div>

      {/* Small Centered Logo at Bottom */}
      <motion.div 
        className="flex items-center justify-center pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <img 
          src={logoImage} 
          alt="Nelisa" 
          className="h-5"
          style={{ opacity: 0.75 }}
        />
      </motion.div>
    </div>
  );
}