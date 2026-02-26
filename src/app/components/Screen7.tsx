import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen7Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen7({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen7Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: 'Detailní nastavení cílení v Meta Business Manageru.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Ukázku kandidátské cesty (banner → nabídka → formulář), aby pochopil „co uvidí člověk venku".',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Přehled všech nadstandardních formátů.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Ceník.',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Klikni na <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>tu ukázku</span>, kterou otevřeš jako první.
    </>
  );

  const explanationText = (
    <>
      Nejlépe funguje <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>ukázat jednu konkrétní cestu kandidáta</span> například formou <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>krátkého příběhu</span>. Je to rychlejší a účinnější než vysvětlovat technologii nebo cílení:
      <br /><br />
      <em>„Představte si kandidáta, který je zrovna v tramvaji nebo na lanovce, scrolluje Facebook a práci aktivně neřeší. Najednou vidí banner → klikne na nabídku, která ho chytne za srdce → má pozitivní emoci a během pár vteřin jednoduše odpoví → a reakce se rovnou propíše do Teamia / ATS, kde s ním HR začne komunikovat."</em>
    </>
  );

  return (
    <CardSelectionChallenge
      questionNumber={7}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBĚR JEDNÉ ODPOVĚDI"
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}