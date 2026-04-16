import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/52166ed2d8a52d81945ed509f115289c3852a85d.png';

interface StoryScreen8Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen8({ onContinue, onBack, onLogoClick }: StoryScreen8Props) {
  const storyContent = (
    <p>
      Otvoríš ukážku ponuky a posunieš notebook trochu bližšie ku klientovi. Necháš ho v pokoji prejsť stránku tak, ako by ju videl kandidát. Klient chvíľu scrolluje, zastaví sa pri nadpise, potom pri fotkách firmy. Na chvíľu prejde kurzorom cez <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>firemný profil</span> a znova sa vráti nahor.
      „Vyzerá to pekne," poznamená. „Má to ale reálne vplyv na to, či sa človek <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>rozhodne reagovať</span>?"
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
      questionNumber={8}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}