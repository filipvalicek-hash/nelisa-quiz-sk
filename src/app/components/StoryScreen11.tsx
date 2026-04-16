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
        Stretnutie sa prehupne z „dáva to zmysel" do „ako by to vyzeralo v praxi". Klient si robí poznámky a potom sa opýta: „Keď do toho pôjdeme, čo od nás budete potrebovať, aby sa to mohlo spustiť?" Nečaká detailný plán. Chce vedieť, čo je <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nutné hneď</span> a čo sa rieši až potom.
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
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}