import { StoryScreen } from '@/app/components/StoryScreen';
import { motion } from 'motion/react';
import illustrationImage from 'figma:asset/7f2e4c1587f53085f733e22c9d4d32a3170639df.png';

interface StoryScreen7Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen7({ onContinue, onBack, onLogoClick }: StoryScreen7Props) {
  const storyContent = (
    <p>
      Klient povie: „Tak dobre, ukážte mi to v praxi." Máš pripravené všetko – Admin, bannery, príklady kampaní, copywriting... ale vieš, že keď začneš zle, stratí sa. Potrebuješ zvoliť <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>prvú ukážku</span>, ktorá najrýchlejšie vysvetlí princíp a nezahltí.
    </p>
  );

  const illustration = (
    <img 
      src={illustrationImage} 
      alt="Presentation scene"
      style={{
        width: '100%',
        height: 'auto',
        display: 'block'
      }}
    />
  );

  return (
    <StoryScreen
      questionNumber={7}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}