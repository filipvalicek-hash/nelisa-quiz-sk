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
      text: 'Meta ukazuje reklamy hlavne podľa veku, pohlavia a ďalších demografických údajov.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Meta sleduje, ako ľudia na reklamy reagujú, a postupne podľa toho upravuje, komu sa zobrazujú.',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Meta rozdeľuje reklamy rovnomerne, aby sa dostali ku všetkým v cieľovej oblasti.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Meta cieli predovšetkým podľa záujmov, ktoré si používatelia nastavia vo svojom profile.',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber jedno <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>vysvetlenie</span>, ktoré by si klientovi v tejto chvíli povedal/a. Také, ktoré je pravdivé, zrozumiteľné a nezahlcuje detailmi.
    </>
  );

  const explanationText = 'Klient potrebuje vedieť, čo sa optimalizuje a prečo. Keď sa to nevysvetlí, je ťažké obhájiť výsledok a vyhodnotiť, čo sa vlastne stalo. Správna odpoveď ukazuje, že doručovanie nie je „ručné cielenie" podľa demografie, ale algoritmická optimalizácia podľa správania ľudí v online priestore – podobne ako v e-commerce: systém sleduje, ako používatelia na reklamy reagujú, a postupne upravuje, komu sa ponuka zobrazuje, aby ju videli čo najrelevantnejší kandidáti. Zároveň je dôležité, že Nelisa nestavia len na tom, čo vie samotná platforma, ale využíva najlepšie dostupné cielenie, ktoré dnes technológie a trh ponúkajú, a k tomu aj vlastné know-how a dáta z tisícov HR kampaní, vďaka ktorým vieme kampane rýchlejšie správne nastaviť, interpretovať a priebežne zlepšovať. Vďaka tomu je spolupráca čitateľná, merateľná a dôveryhodná.';

  return (
    <CardSelectionChallenge
      questionNumber={19}
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