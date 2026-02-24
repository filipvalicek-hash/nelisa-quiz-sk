import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/1956a575cf7a2f4a4f4d4b3585d742d0cd97bcad.png';

interface StoryScreen20Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen20({ onContinue, onBack, onLogoClick }: StoryScreen20Props) {
  const storyContent = (
    <p>
      Po vysvětlení, jak Meta pracuje s doručováním, klient naváže další otázkou.<br />
      „A můžeme si to nějak <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>víc zpřesnit</span>?\" ptá se. „Třeba cílit jen na ženy 35–45 v Praze?"<br />
      <br />
      Je to logická otázka, padá skoro pokaždé. Musíš říct pravdu, ale <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nezabít tím hodnotu řešení</span>.
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
      questionNumber={20}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}