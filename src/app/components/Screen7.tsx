import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen7Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen7({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen7Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: 'Detailné nastavenie cielenia v Meta Business Manageri.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Ukážku kandidátskej cesty (banner → ponuka → formulár), aby pochopil „čo uvidí človek vonku".',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Prehľad všetkých nadštandardných formátov.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Cenník.',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Klikni na <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>tú ukážku</span>, ktorú otvoríš ako prvú.
    </>
  );

  const explanationText = (
    <>
      Najlepšie funguje <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>ukázať jednu konkrétnu cestu kandidáta</span> napríklad formou <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>krátkeho príbehu</span>. Je to rýchlejšie a účinnejšie než vysvetľovať technológiu alebo cielenie:
      <br /><br />
      <em>„Predstavte si kandidáta, ktorý je práve v električke alebo v čakárni a scrolluje Facebook. Zrazu uvidí banner → klikne na ponuku, ktorá ho zaujme → má pozitívnu emóciu a počas pár sekúnd jednoducho odpovie → a reakcia sa rovno prepíše do Teamia / ATS, kde s ním HR začne komunikovať."</em>
    </>
  );

  return (
    <CardSelectionChallenge
      questionNumber={7}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBER JEDNEJ ODPOVEDE"
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
      initialConfirmed={initialConfirmed}
      initialSelection={initialSelection}
      onStoreSelection={onStoreSelection}
    />
  );
}