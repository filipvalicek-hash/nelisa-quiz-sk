import { StoryScreen } from '@/app/components/StoryScreen';
import characterImage from 'figma:asset/9a07d579d0c1ab4539dec3e369a568a4de511cda.png';

interface StoryScreen2Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen2({ onContinue, onBack, onLogoClick }: StoryScreen2Props) {
  const storyContent = (
    <>
      <p>
        Je ráno a právě jsi dorazil do práce s úsměvem. Otevíráš notebook a u prvního ranního kafe se připravuješ na dnešní schůzky. V kalendáři máš dvě setkání s klienty. Otevíráš CRM a díváš se na firmy, se kterými se dnes potkáš.
      </p>
      <p>
        Chtěl/a bys, aby právě Tebe tentokrát na Slacku vyhlásili jako Top obchodníka pro Nelisu, a přemýšlíš, kde by se Nelisa mohla hodit. Víš, že Nelisu lze nabídnout téměř každé firmě, ale největší přidanou hodnotu má v konkrétních situacích – tam, kde portály samy o sobě nestačí, kde dává smysl oslovit i pasivní kandidáty, nebo tam, kde HRista/HRistka nestíhá, je na všechno sám/sama, nemá čas ani know-how a Nelisa je pro něj/ni řešení bez další práce.
      </p>
      <p>
        Potřebuješ si proto rychle ujasnit, kteří klienti jsou pro Nelisu ideální a mají nejvyšší prioritu.
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
      questionNumber={1}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}