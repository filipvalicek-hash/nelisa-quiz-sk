import { StoryScreen } from '@/app/components/StoryScreen';
import meetingImage from 'figma:asset/c23b68e2908ccaad80fe2a159634a830c8d1aecd.png';

interface StoryScreen3NewProps {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen3New({ onContinue, onBack, onLogoClick }: StoryScreen3NewProps) {
  const storyContent = (
    <>
      <p>
        Před schůzkou s klientem je důležité mít všechny potřebné materiály a nástroje připravené, aby schůzka probíhala hladce a efektivně. Máš k dispozici několik <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>interních nástrojů</span>, které Ti mohou pomoci v různých situacích: od odhadu výkonu kampaní po ukázky nadstandardních reklamních formátů. Jaké materiály bys měl/a mít připravené, než se pustíš do <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>představování Nelisy</span> klientovi?
      </p>
    </>
  );

  const illustration = (
    <img 
      src={meetingImage}
      alt="" 
      className="w-full h-auto object-contain"
      style={{ maxWidth: '100%' }}
    />
  );

  return (
    <StoryScreen
      questionNumber={2}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}