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
        Pred schôdzkou s klientom je dôležité mať všetky potrebné materiály a nástroje pripravené, aby schôdzka prebiehala hladko a efektívne. Máš k dispozícii niekoľko <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>interných nástrojov</span>, ktoré Ti môžu pomôcť v rôznych situáciách: od odhadu výkonu kampaní po ukážky nadštandardných reklamných formátov. Aké materiály by si mal/a mať pripravené, než sa pustíš do <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>predstavovania Nelisy</span> klientovi?
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
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}