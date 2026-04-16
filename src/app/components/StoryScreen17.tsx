import { StoryScreen } from '@/app/components/StoryScreen';
import illustrationImage from 'figma:asset/65715352acef46428f0c2af4ff47faccf621e596.png';

interface StoryScreen17Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen17({ onContinue, onBack, onLogoClick }: StoryScreen17Props) {
  const storyContent = (
    <p>
      Klient prikývne.<br />
      „Dobre," povie. „Tak keď už vieme, pri ktorých pozíciách chceme pridať plyn… čo konkrétne by si tam dal?"<br />
      Chce <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>zrozumiteľné odporúčanie</span>, kde konkrétne hľadať <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>aký typ pozícií</span>.
    </p>
  );

  const illustration = (
    <img 
      src={illustrationImage} 
      alt="" 
      className="w-full h-auto object-contain"
      style={{ 
        maxHeight: '280px'
      }}
    />
  );

  return (
    <StoryScreen
      questionNumber={17}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}