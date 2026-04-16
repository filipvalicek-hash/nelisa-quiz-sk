import { StoryScreen } from '@/app/components/StoryScreen';
import characterImage from 'figma:asset/04ebb09890fb3e540a19f1b06307f71fa48118e0.png';

interface StoryScreen24Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen24({ onContinue, onBack, onLogoClick }: StoryScreen24Props) {
  const storyContent = (
    <>
      <p>
        Pošleš mu prezentáciu a dohodnete ďalší kontakt. O pár dní neskôr prichádza správa:
        <br />
        „Schválili sme to. Poďme do toho."
      </p>
      <p>
        Kampaň sa spúšťa, ale tu sa láme chlieb. Prvé týždne rozhodujú o tom, či sa z toho stane jednorazová akcia, alebo dlhodobá spolupráca. Tvoja práca teraz nie je len „nechať to bežať", ale nastaviť rytmus starostlivosti a vyhodnocovania tak, aby mal klient priebežne istotu, že to máte pod kontrolou.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={characterImage} 
      alt="" 
      className="w-full h-auto object-contain"
    />
  );

  return (
    <StoryScreen
      questionNumber={24}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}