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
      Klient sa po Tvojich otázkach na chvíľu zamyslí. „No… vlastne asi veľmi nevieme, ako by mal text hovoriť na niekoho, kto prácu nehľadá," pripustí. „Ale stále neviem,{' '}
      <span style={{
        background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)',
        padding: '0 2px'
      }}>
        čo presne tým copywritingom získame
      </span>
      ." Chceš mu vysvetliť, aké konkrétne benefity mu služba copywritingu prinesie.
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
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}