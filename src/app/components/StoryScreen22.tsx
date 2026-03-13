import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/9f30defe8dc9d41f3262cbe441c7f03f60e4f6bd.png';

interface StoryScreen22Props {
  onContinue: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen22({ onContinue, onLogoClick }: StoryScreen22Props) {
  const storyContent = (
    <p>
      Schůzka se pomalu chýlí ke konci. Klient to shrne jednou větou: „Hele, my ty portály vlastně máme docela vychytané. Zatím nám fungují." Nechce se hádat ani nic bourat.
    </p>
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
      questionNumber={22}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onLogoClick={onLogoClick}
    />
  );
}