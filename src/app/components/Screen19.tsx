import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen19Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen19({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen19Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: 'Meta ukazuje reklamy hlavně podle věku, pohlaví a dalších demografických údajů.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Meta sleduje, jak lidé na reklamy reagují, a postupně podle toho upravuje, komu se zobrazují.',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Meta rozděluje reklamy rovnoměrně, aby se dostaly ke všem v cílové oblasti.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Meta cílí především podle zájmů, které si uživatelé nastaví ve svém profilu.',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber jedno <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>vysvětlení</span>, které bys klientovi v tuhle chvíli řekl/a. Takové, které je pravdivé, srozumitelné a nezahlcuje detaily.
    </>
  );

  const explanationText = 'Klient potřebuje vědět, co se optimalizuje a proč. Když se to nevysvětlí, je těžké obhájit výsledek a vyhodnotit, co se vlastně stalo. Správná odpověď ukazuje, že doručování není „ruční cílení" podle demografie, ale algoritmická optimalizace podle chování lidí v online prostoru – podobně jako v e-commerce: systém sleduje, jak uživatelé na reklamy reagují, a postupně upravuje, komu se nabídka zobrazuje, aby ji viděli co nejrelevantnější kandidáti. Zároveň je důležité, že Nelisa nestaví jen na tom, co umí samotná platforma, ale využívá nejlepší dostupné cílení, které dnes technologie a trh nabízí, a k tomu i vlastní know-how a data z tisíců HR kampaní, díky kterým umíme kampaně rychleji správně nastavit, interpretovat a průběžně zlepšovat. Díky tomu je spolupráce čitelná, měřitelná a důvěryhodná.';

  return (
    <CardSelectionChallenge
      questionNumber={19}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBĚR JEDNÉ ODPOVĚDI"
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