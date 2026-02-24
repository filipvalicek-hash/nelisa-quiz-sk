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
      Základní koncept sedl. Klient už nepolemizuje, spíš se ptá: „A dá se to udělat i výrazněji? Máme jednu roli, která je pro nás kritická." Teď se láme chleba: když <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nadstandard</span> vytáhneš moc brzy, působíš jako <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>upsell</span>. Když pozdě, propásneš šanci.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}