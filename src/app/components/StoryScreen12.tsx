import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/e011b65d18f6bf4d67db18ef521f5a9ead4762e2.png';

interface StoryScreen12Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen12({ onContinue, onBack, onLogoClick }: StoryScreen12Props) {
  const storyContent = (
    <>
      <p className="mb-4">
        Klient si zapíše pár poznámok a potom sa pozrie späť na Teba.
      </p>
      <p className="mb-4">
        „A kto nám s tým pomôže <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>na začiatku</span>?" pýta sa. „Nechcem, aby sa organizačné pokyny stratili medzi e-mailmi."
      </p>
      <p>
        Nerieši technické detaily. Chce si ujasniť, ako ten štart bude vyzerať v realite a kto pri tom bude sedieť.
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
      questionNumber={12}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}