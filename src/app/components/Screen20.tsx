import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen20Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen20({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen20Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Ano, nastavíme přesně věk i pohlaví."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Ne, v HR kampaních to nejde, takže Meta nemá smysl."',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„V HR kampaních jsou omezení, nelze cílit věk/pohlaví; pracujeme s jinými signály a lokalitou a optimalizací, aby se reklama dostala k relevantním lidem."',
      isCorrect: true
    },
    {
      id: 'D',
      label: 'D',
      text: '„To záleží, někdy to jde."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber odpověď, která je <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správná a obchodně použitelná</span>.
    </>
  ); 

  const explanationText = 'Platformy mají pravidla a omezení, která se v HR dotýkají cílení i formátů. Klient si to může vyložit jako „nejde to", proto je důležité vysvětlit, že se jen volí jiné způsoby cílení a práce s publikem. Správná reakce je taková, která nastaví realistické možnosti a nezpůsobí přehnané sliby.';

  return (
    <CardSelectionChallenge
      questionNumber={20}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBĚR JEDNÉ ODPOVĚDI"
      singleColumn={true}
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