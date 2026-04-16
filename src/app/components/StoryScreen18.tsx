import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/c44419fb1cb56ae19a2e2f2131f112b3a01a4e1d.png';

interface StoryScreen18Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen18({ onContinue, onBack, onLogoClick }: StoryScreen18Props) {
  const storyContent = (
    <p>
      Klient sa vráti k tomu, čo padlo pred chvíľou.<br />
      „My už sme kedysi skúšali niečo navyše," povie. „Bolo to drahšie, bežalo to pár týždňov… a potom sme vlastne nevedeli, či to pomohlo, alebo nie."<br /><br />
      Chce počuť, v čom je rozdiel medzi <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>náhodným rozšírením kampane</span> a situáciou, kedy má zmysel ísť nad rámec základu – a ako sa pri tom <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>pracuje s výsledkami</span>.
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
      questionNumber={18}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}