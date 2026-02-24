import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/c7ef5795c75db7325e714c01ea7f0fd23215d05e.png';

interface StoryScreen11Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen11({ onContinue, onBack, onLogoClick }: StoryScreen11Props) {
  const storyContent = (
    <>
      <p>
        Schůzka se přehoupne z „dává to smysl" do „jak by to vypadalo v praxi". Klient si dělá poznámky a pak se zeptá: „Když do toho půjdeme, co od nás budete potřebovat, aby se to mohlo spustit?" Nečeká detailní plán. Chce vědět, co je <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nutné hned</span> a co se řeší až potom.
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
      questionNumber={11}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}