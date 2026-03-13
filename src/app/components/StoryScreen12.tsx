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
        Klient si zapíše pár poznámek a pak se podívá zpátky na Tebe.
      </p>
      <p className="mb-4">
        „A kdo nám s tím pomůže <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>na začátku</span>?" ptá se. „Nechci, aby se organizační pokyny ztratily mezi e-maily."
      </p>
      <p>
        Neřeší technické detaily. Chce si ujasnit, jak ten start bude vypadat v reálu a kdo u toho bude sedět.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}