import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen9Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen9({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen9Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Banner musí být čitelný a profesionální, když kandidát nepochopí sdělení během vteřiny, neklikne."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Banner není jen obrázek, v kampani běží dvě vizuální varianty souběžně - tzn. maximální míra proklikovosti. Navíc jsou dělané pro konkrétní prostředí - feed a display."',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: '„Je důležité držet konzistentní vizuální styl, aby si kandidáti firmu a sdělení rychle spojili."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Banner musí být navržený pro prostředí, kde se zobrazuje (feed, display), aby odpovídal tomu, jak lidé obsah v praxi konzumují."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber odpověď, která nejlépe vysvětluje <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>práci s bannery</span> v kampani od Nelisy.
    </>
  );

  const explanationText = `Klient vidí obrázek, ale hodnota je v tom, jak banner funguje v kampani. Bannery jsou navržené pro konkrétní prostředí a pracuje se s nimi výkonově. V kampani běží více variant současně a systém vyhodnocuje, co přináší lepší reakce. Proto nejde jen o grafiku, ale o testování, optimalizaci a rychlé doručení sdělení v pár vteřinách.`;

  return (
    <CardSelectionChallenge
      questionNumber={9}
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