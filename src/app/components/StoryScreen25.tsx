import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/fc651cc5e103c1044c91746e652b04a3c9ee61d4.png';

interface StoryScreen25Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen25({ onContinue, onBack, onLogoClick }: StoryScreen25Props) {
  const storyContent = (
    <>
      <p>
        Kampaň běží už pár dní. První kandidáti se ozývají, čísla se postupně skládají a klient je v klidu. Vypadá to, že všechno šlape tak, jak jste si na začátku nastavili.
      </p>
      <p>
        Než se rozloučíme úplně, pojďme si ještě jednou projít nejčastější námitky, které v podobných schůzkách zaznívají – a ověřit, že na ně dokážeš reagovat klidně, věcně a s jistotou.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={storyImage} 
      alt="" 
      className="w-full h-auto object-contain"
      style={{ maxHeight: '280px' }}
    />
  );

  return (
    <StoryScreen
      questionNumber={25}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}