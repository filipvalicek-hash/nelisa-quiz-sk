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
      text: '„Áno, nastavíme presne vek aj pohlavie."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Nie, v HR kampaniach to nejde, takže Meta nemá zmysel."',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„V HR kampaniach sú obmedzenia, nemožno cieliť vek/pohlavie; pracujeme s inými signálmi a lokalitou a optimalizáciou, aby sa reklama dostala k relevantným ľuďom."',
      isCorrect: true
    },
    {
      id: 'D',
      label: 'D',
      text: '„To záleží, niekedy to ide."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber odpoveď, ktorá je <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správna a obchodne použiteľná</span>.
    </>
  ); 

  const explanationText = 'Platformy majú pravidlá a obmedzenia, ktoré sa v HR dotýkajú cielenia aj formátov. Klient si to môže vyložiť ako „nejde to", preto je dôležité vysvetliť, že sa len volia iné spôsoby cielenia a práce s publikom. Správna reakcia je taká, ktorá nastaví realistické možnosti a nespôsobí prehnané sľuby.';

  return (
    <CardSelectionChallenge
      questionNumber={20}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBER JEDNEJ ODPOVEDE"
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