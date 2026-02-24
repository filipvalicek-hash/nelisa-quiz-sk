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
      Otevřeš ukázku nabídky a posuneš notebook trochu blíž ke klientovi. Necháš ho v klidu projít stránku tak, jak by ji viděl kandidát. Klient chvíli scrolluje, zastaví se u nadpisu, pak u fotek firmy. Na chvilku přejede kurzorem přes <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>firemní profil</span> a znovu se vrátí nahoru.
      „Vypadá to hezky," poznamená. „Má to ale reálně vliv na to, jestli se člověk <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>rozhodne reagovat</span>?"
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}