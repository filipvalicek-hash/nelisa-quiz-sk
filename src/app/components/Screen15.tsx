import { AutoAdvanceMatchingChallenge } from '@/app/components/AutoAdvanceMatchingChallenge';

interface Screen15Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: Array<{ leftId: string; rightId: string }>;
  onStoreSelection?: (sel: Array<{ leftId: string; rightId: string }>) => void;
}

export function Screen15({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen15Props) {
  return (
    <AutoAdvanceMatchingChallenge
      questionNumber={15}
      questionText={
        <>
          Priraď <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správnu reakciu</span> k tomu, čo klient týmto komentárom otvára.
        </>
      }
      leftColumnTitle="ČO KLIENT RIEŠI"
      rightColumnTitle="ARGUMENTY"
      leftItems={[
        { id: '1', text: '1) Nechce riešiť viac nástrojov a reportov.' },
        { id: '2', text: '2) Chce, aby bola pracovná ponuka cielená na rôzne kanály, avšak jednoducho a s rovnakým obsahom.' },
        { id: '3', text: '3) Chce rozšíriť zásah, ale jednoducho, bez zložitého procesu na jednotlivých kanáloch.' }
      ]}
      rightItems={[
        { id: 'A', text: 'A) Každý kanál má inú rolu – niekde budujeme povedomie, inde zbierame reakcie, ale vždy u rovnakej cieľovej skupiny.' },
        { id: 'B', text: 'B) Reporting aj riadenie a optimalizácia kampaní je na strane Nelisy, klient dodáva len pracovnú ponuku.' },
        { id: 'C', text: 'C) Na Nelise kombinujeme kanály automatizovaným systémom bez náročného procesu na strane klienta.' }
      ]}
      correctPairs={{
        '1': 'B',  // Nechce riešiť viac nástrojov → Reporting/riadenie je na Nelise
        '2': 'A',  // Chce rôzne kanály ale rovnaký obsah → Každý kanál má inú rolu
        '3': 'C'   // Chce rozšíriť zásah jednoducho → kombinujeme kanály automatizovane
      }}
      explanationText={'Multi-channel nie je samoúčelný zoznam kanálov. Zmysel je v tom, že systém hľadá, kde a ako doručiť ponuku čo najefektívnejšie, a priebežne optimalizuje doručovanie. Klient tak nekupuje „budeme všade", ale stratégiu doručovania a riadenia výkonu. To je rozdiel oproti jednorazovému nákupu priestoru.'}
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