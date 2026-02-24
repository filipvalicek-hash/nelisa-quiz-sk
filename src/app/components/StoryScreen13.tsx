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
        Klient má pořád otevřenou nabídku. Scrolluje nahoru a dolů, očima projíždí text, na chvíli se zastaví u nadpisu.
      </p>
      <p className="mb-4">
        „Co se textu týče, ten si většinu píšeme sami," poznamená. „Mluví do toho HR, občas i marketing."
      </p>
      <p className="mb-4">
        Ty si v hlavě potřebuješ rychle srovnat jednu věc:
      </p>
      <p>
        jestli způsob, jakým dnes mluví k lidem, odpovídá tomu, koho chtějí oslovit.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}