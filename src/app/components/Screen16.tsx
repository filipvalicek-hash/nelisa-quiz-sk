import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen16Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen16({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen16Props) {
  return (
    <CardSelectionChallenge
      questionNumber={16}
      questionText={
        <>
          Vyber odpoveď, ktorá najlepšie vystihuje princíp práce s <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nadštandardnými formátmi</span> u Nelisy.
        </>
      }
      options={[
        {
          id: 'A',
          label: 'A',
          text: 'Nadštandardné formáty sa používajú ako náhrada základných kampaní.',
          isCorrect: false
        },
        {
          id: 'B',
          label: 'B',
          text: 'Nadštandardné formáty umožňujú cielene posilniť zásah a rozšíriť konkrétnu potrebu.',
          isCorrect: true
        },
        {
          id: 'C',
          label: 'C',
          text: 'Nadštandardné formáty sa odporúčajú plošne, aby mali všetky pozície rovnakú podporu.',
          isCorrect: false
        },
        {
          id: 'D',
          label: 'D',
          text: 'Nadštandardné formáty sa riešia až vo chvíli, keď základné kampane dlhodobo nefungujú.',
          isCorrect: false
        }
      ]}
      explanationText="Nadštandard má byť odpoveď na potrebu, nie prvá veta prezentácie. Keď s ním začneš príliš skoro, klient to vníma ako upsell a prestane veriť, že riešiš jeho problém. Keď s ním prídeš príliš neskoro, môžeš prepásť príležitosť, pretože klient si už vytvoril rámec rozpočtu a očakávaní. Správne načasovanie je po pochopení cieľa a cieľovky."
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