import { StoryScreen } from '@/app/components/StoryScreen';
import { motion } from 'motion/react';
import { Lightbulb, TrendingUp, Target, CheckCircle, Presentation } from 'lucide-react';
import illustrationImage from 'figma:asset/602624ebca7903d866c647fe850c1259856f8b66.png';

interface StoryScreen5Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen5({ onContinue, onBack, onLogoClick }: StoryScreen5Props) {
  const storyContent = (
    <>
      <p>
        Klient sa oprie: ‚<span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Pasívni kandidáti</span>… to znie pekne, ale ja potrebujem nabrať teraz. Nie čakať pol roka.'
      </p>
      <p>
        Teraz dáva zmysel vytiahnuť <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>jednoduché číslo</span>, ktoré rýchlo vysvetlí, prečo sa firmy často točia dokola okolo tých istých ľudí – a prečo samotné portály prestávajú stačiť.
      </p>
    </>
  );

  const illustration = (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Main Illustration */}
      <img 
        src={illustrationImage} 
        alt="Discussion illustration" 
        className="w-full h-auto object-contain"
        style={{ 
          filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.1))',
          maxHeight: '280px'
        }}
      />

      {/* Floating Decorative Icons - Around Illustration - SMALLER & MORE SUBTLE */}
      
      {/* Lightbulb Icon - Upper Left */}
      <motion.div
        className="absolute"
        style={{ top: '8%', left: '-12%', zIndex: 5 }}
        animate={{ 
          y: [0, -6, 0],
          rotate: [0, -6, 0]
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-white rounded-xl p-2 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
          <Lightbulb className="w-4 h-4" style={{ color: '#FFB800' }} strokeWidth={2} fill="#FFF4CC" />
        </div>
      </motion.div>

      {/* Chart Icon - Upper Right */}
      <motion.div
        className="absolute"
        style={{ top: '5%', right: '-10%', zIndex: 5 }}
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 6, 0]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      >
        <div className="bg-white rounded-xl p-2 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
          <TrendingUp className="w-4 h-4" style={{ color: 'var(--icon-success)' }} strokeWidth={2} />
        </div>
      </motion.div>

      {/* Target Icon - Middle Left */}
      <motion.div
        className="absolute"
        style={{ top: '40%', left: '-14%', zIndex: 5 }}
        animate={{ 
          y: [0, -5, 0],
          x: [0, 2, 0]
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6
        }}
      >
        <div className="bg-white rounded-xl p-2 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
          <Target className="w-4 h-4" style={{ color: '#FF6B6B' }} strokeWidth={2} />
        </div>
      </motion.div>

      {/* CheckCircle Icon - Lower Right */}
      <motion.div
        className="absolute"
        style={{ bottom: '12%', right: '-12%', zIndex: 5 }}
        animate={{ 
          y: [0, -6, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9
        }}
      >
        <div className="bg-white rounded-xl p-2 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
          <CheckCircle className="w-4 h-4" style={{ color: 'var(--icon-success)' }} strokeWidth={2} />
        </div>
      </motion.div>

      {/* Presentation Icon - Lower Left */}
      <motion.div
        className="absolute"
        style={{ bottom: '18%', left: '-10%', zIndex: 5 }}
        animate={{ 
          y: [0, -4, 0],
          rotate: [0, -4, 0]
        }}
        transition={{
          duration: 3.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2
        }}
      >
        <div className="bg-white rounded-xl p-2 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
          <Presentation className="w-4 h-4" style={{ color: 'var(--primary-active)' }} strokeWidth={2} />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <StoryScreen
      questionNumber={5}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}