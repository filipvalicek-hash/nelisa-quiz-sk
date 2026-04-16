import { StoryScreen } from '@/app/components/StoryScreen';
import illustrationImage from 'figma:asset/046ec2024a93f071e2178c3f3f042ce5f58cc08e.png';

interface StoryScreen6Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen6({ onContinue, onBack, onLogoClick }: StoryScreen6Props) {
  const storyContent = (
    <>
      <p>
        Stretnutie zatiaľ ide dobre. Klient už prikyvuje na to, že u Nelisy nejde len o ľudí, ktorí „práve teraz hľadajú", ale aj o tých, čo scrollujú, pozerajú, premýšľajú a zmenu by pokojne urobili, len im k tomu nikto nedal dôvod.
      </p>
      <p>
        V tej chvíli sa oprie, pousmeje sa a prehodí výhybku:<br />
        „Dobre. A teraz tá nepríjemná časť – <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>koľko</span>?"
      </p>
      <p>
        Povieš, že kampane sa pohybujú od 16 900 Kč do 39 900 Kč. Klient sa na sekundu odmlčí a povie:<br />
        „To je viac než inzerát. Čo je na tom vlastne tak drahé? Za inzerát platím menej. <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Za čo presne tu platím navyše</span>?"
      </p>
      <p>
        Tvojou úlohou je vecne a zrozumiteľne vysvetliť, v čom je hodnota Nelisy a za čo klient v kampani reálne platí.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={illustrationImage} 
      alt="" 
      className="w-full h-auto object-contain"
    />
  );

  return (
    <StoryScreen
      questionNumber={6}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}