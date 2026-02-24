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
        Schůzka zatím šlape dobře. Klient už kývá na to, že u Nelisy nejde jen o lidi, kteří „teď zrovna hledají", ale i o ty, co scrollují, koukají, přemýšlí a změnu by klidně udělali, jen jim k tomu nikdo nedal důvod.
      </p>
      <p>
        V tu chvíli se opře, pousměje se a přehodí výhybku:<br />
        „Dobře. A teď ta nepříjemná část – <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>kolik</span>?"
      </p>
      <p>
        Řekneš, že kampaně se pohybují od 16 900 Kč do 39 900 Kč. Klient se na vteřinu odmlčí a řekne:<br />
        „To je víc než inzerát. Co je na tom vlastně tak drahé? U inzerátu platím míň. <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Za co přesně tady platím navíc</span>?"
      </p>
      <p>
        Tvým úkolem je věcně a srozumitelně vysvětlit, v čem je hodnota Nelisy a za co klient v kampani reálně platí.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}