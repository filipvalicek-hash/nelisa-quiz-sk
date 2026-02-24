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
      Klient se vrátí k tomu, co padlo před chvílí.<br />
      „My už jsme kdysi zkoušeli něco navíc," řekne. „Bylo to dražší, běželo to pár týdnů… a pak jsme vlastně nevěděli, jestli to pomohlo, nebo ne."<br /><br />
      Chce slyšet, v čem je rozdíl mezi <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>náhodným rozšířením kampaně</span> a situací, kdy má smysl jít nad rámec základu – a jak se u toho <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>pracuje s výsledky</span>.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}