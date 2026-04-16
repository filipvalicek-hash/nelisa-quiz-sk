import { StoryScreen } from '@/app/components/StoryScreen';
import clientQuestionImage from 'figma:asset/6e9d9d8471e829fdd1d3195f6f35d7233f45082b.png';

interface StoryScreen10Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen10({ onContinue, onBack, onLogoClick }: StoryScreen10Props) {
  const storyContent = (
    <>
      <p className="mb-4">
        Po chvíli sa dostanete k tomu, ako by spolupráca vyzerala v praxi. Klient sa oprie v stoličke a ešte predtým, než otvoríš Admin, zdvihne ruku. „Len, prosím, nie ďalší systém," povie. „HR už teraz jazdí vo viacerých nástrojoch. Všetko, čo nie je <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>napojené na ATS</span>, je pre nás problém."
      </p>
      <p className="mb-4">
        Je vidieť, že rieši hlavne tok práce. Kam pôjdu reakcie. Kde s kandidátmi budú pracovať. A koľko klikov navyše to celé pridá.
      </p>
      <p>
        Vysvetľuješ, že Nelisa s týmto počíta – a že nová služba <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Kombo integrácia</span> zabezpečuje prepojenie s ATS systémami.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={clientQuestionImage} 
      alt="Client meeting illustration" 
      className="w-full h-auto"
    />
  );

  return (
    <StoryScreen
      questionNumber={10}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}