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
      Klient přikývne.<br />
      „Dobře," řekne. „Tak když už víme, u kterých pozic chceme přidat plyn… co konkrétně bys tam dal?"<br />
      Chce <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>srozumitelné doporučení</span>, kde konkrétně hledat <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>jaký typ pozic</span>.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}