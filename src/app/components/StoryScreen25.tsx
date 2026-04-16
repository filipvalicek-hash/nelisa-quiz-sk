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
        Kampaň beží už pár dní. Prví kandidáti sa ozývajú, čísla sa postupne skladajú a klient je v pokoji. Vyzerá to, že všetko šliape tak, ako ste si na začiatku nastavili.
      </p>
      <p>
        Než sa rozlúčime úplne, poďme si ešte raz prejsť najčastejšie námietky, ktoré na podobných stretnutiach zaznievajú – a overiť, že na ne dokážeš reagovať pokojne, vecne a s istotou.
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
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}