import { StoryScreen } from '@/app/components/StoryScreen';
import { motion } from 'motion/react';
import consultationImage from 'figma:asset/502c724b9b140a85bd719475bd04e94171b78bba.png';

interface StoryScreen16Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen16({ onContinue, onBack, onLogoClick }: StoryScreen16Props) {
  const storyContent = (
    <p>
      Základný koncept sedel. Klient už nepolemizuje, skôr sa pýta: „A dá sa to urobiť aj výraznejšie? Máme jednu rolu, ktorá je pre nás kritická." Teraz sa láme chlieb: keď <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nadštandard</span> vytiahneš príliš skoro, pôsobíš ako <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>upsell</span>. Keď neskoro, prepásneš šancu.
    </p>
  );

  const illustration = (
    <motion.img
      src={consultationImage}
      alt="Consultation scene"
      className="w-full"
      style={{ maxHeight: '280px', objectFit: 'contain' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
  );

  return (
    <StoryScreen
      questionNumber={16}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}