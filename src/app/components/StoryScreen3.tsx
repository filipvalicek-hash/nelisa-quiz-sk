import { StoryScreen } from '@/app/components/StoryScreen';
import characterImage from 'figma:asset/a4bdf6806162839440f8c001b8c588dff85a1cef.png';

interface StoryScreen3Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen3({ onContinue, onBack, onLogoClick }: StoryScreen3Props) {
  const storyContent = (
    <>
      <p>
        Vybral/a sis klienta, u kterého Ti Nelisa dává smysl.
        Teď už sedíš u stolu v jejich kanceláři, notebook otevřený, poznámky připravené. Vyměníte si pár vět o tom, co je nového, a schůzka se přirozeně přesouvá k věci. <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Je čas otevřít téma Nelisy</span>.
      </p>
      <p>
        Právě teď se rozhoduje, <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>jak ji představíš</span> a jak zapůsobíš.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={characterImage} 
      alt="" 
      className="w-full h-auto object-contain"
    />
  );

  return (
    <StoryScreen
      questionNumber={3}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}