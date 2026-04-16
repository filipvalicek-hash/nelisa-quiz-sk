import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/0509a112806919fcb38abf53ac52fe3bcee2a019.png';

interface StoryScreen13Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen13({ onContinue, onBack, onLogoClick }: StoryScreen13Props) {
  const storyContent = (
    <>
      <p className="mb-4">
        Klient má stále otvorenú ponuku. Scrolluje hore a dole, očami prechádza text, na chvíľu sa zastaví pri nadpise.
      </p>
      <p className="mb-4">
        „Čo sa textu týka, ten si väčšinu píšeme sami," poznamenáva. „Hovorí do toho HR, občas aj marketing."
      </p>
      <p className="mb-4">
        Ty si v hlave potrebuješ rýchlo usporiadať jednu vec:
      </p>
      <p>
        či spôsob, akým dnes hovoria k ľuďom, zodpovedá tomu, koho chcú osloviť.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={storyImage} 
      alt="" 
      className="w-full h-auto object-contain"
      style={{ 
        maxHeight: '280px'
      }}
    />
  );

  return (
    <StoryScreen
      questionNumber={13}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}