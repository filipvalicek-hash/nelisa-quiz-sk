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
      Klient řekne: „Tak jo, ukažte mi to v praxi." Máš připravené všechno - Admin, bannery, příklady kampaní, copywriting… ale víš, že když začneš špatně, ztratí se. Potřebuješ zvolit <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>první ukázku</span>, která nejrychleji vysvětlí princip a nezahltí.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}