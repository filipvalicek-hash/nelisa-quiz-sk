import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/d0e2f78dbf1cdd2a3ce4e658b6b6d676805bf5ea.png';

interface StoryScreen23Props {
  onContinue: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen23({ onContinue, onLogoClick }: StoryScreen23Props) {
  const storyContent = (
    <p>
      Klient si shrnuje poznámky, má pocit, že to dává smysl, ale nechce se rozhodnout hned. Řekne: „Pošlete mi podklady a já to proberu interně." Je klíčové uzavřít schůzku profesionálně a posunout ji, nebo to vyšumí.
    </p>
  );

  const illustration = (
    <img 
      src={storyImage} 
      alt="" 
      className="w-full h-auto object-contain"
      style={{ maxHeight: '280px' }}
    />
  );

  return (
    <StoryScreen
      questionNumber={23}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onLogoClick={onLogoClick}
    />
  );
}