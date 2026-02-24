import { StoryScreen } from '@/app/components/StoryScreen';
import { motion } from 'motion/react';
import discussionImage from 'figma:asset/5c7644b4cb0b6eff56f70982e9cc829624a30f76.png';

interface StoryScreen14Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen14({ onContinue, onBack, onLogoClick }: StoryScreen14Props) {
  const storyContent = (
    <p>
      Klient se po Tvých otázkách na chvíli zamyslí. „No… vlastně asi moc nevíme, jak by měl text mluvit na někoho, kdo práci nehledá," připustí. „Ale pořád nevím,{' '}
      <span style={{ 
        background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)',
        padding: '0 2px'
      }}>
        co přesně tím copywritingem získáme
      </span>
      ." Chceš mu vysvětlit, jaké konkrétní benefity mu služba copywritingu přinese.
    </p>
  );

  const illustration = (
    <motion.img
      src={discussionImage}
      alt=""
      className="w-full"
      style={{ maxHeight: '280px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
  );

  return (
    <StoryScreen
      questionNumber={14}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}