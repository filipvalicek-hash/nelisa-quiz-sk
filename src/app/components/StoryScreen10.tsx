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
        Po chvíli se dostanete k tomu, jak by spolupráce vypadala v praxi. Klient se opře v židli a ještě než otevřeš Admin, zvedne ruku. „Jen, prosím, ne další systém", řekne. „HR už teď jede v několika nástrojích. Všechno, co není <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>napojené na ATS</span>, je pro nás problém."
      </p>
      <p className="mb-4">
        Je vidět, že řeší hlavně tok práce. Kam půjdou reakce. Kde s kandidáty budou pracovat. A kolik kliků navíc to celé přidá.
      </p>
      <p>
        Vysvětluješ, že Nelisa s tímhle počítá – a že nová služba <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Kombo integrace</span> zajišťuje propojení s ATS systémy.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}