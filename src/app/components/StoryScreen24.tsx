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
        Pošleš mu prezentaci a domluvíte další kontakt. O pár dní později přichází zpráva:
        <br />
        „Schválili jsme to. Pojďme do toho."
      </p>
      <p>
        Kampaň se spouští, ale tady se láme chleba. První týdny rozhodují o tom, jestli se z toho stane jednorázová akce, nebo dlouhodobá spolupráce. Tvoje práce teď není jen „nechat to běžet", ale nastavit rytmus péče a vyhodnocování tak, aby klient měl průběžně jistotu, že to máte pod kontrolou.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}