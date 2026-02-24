import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen16Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen16({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen16Props) {
  return (
    <CardSelectionChallenge
      questionNumber={16}
      questionText={
        <>
          Vyber odpověď, která nejlépe vystihuje princip práce s <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nadstandardními formáty</span> u Nelisy.
        </>
      }
      options={[
        {
          id: 'A',
          label: 'A',
          text: 'Nadstandardní formáty se používají jako náhrada základních kampaní.',
          isCorrect: false
        },
        {
          id: 'B',
          label: 'B',
          text: 'Nadstandardní formáty umožňují cíleně posílit zásah tam, kde základní řešení nepokrývá konkrétní potřebu.',
          isCorrect: true
        },
        {
          id: 'C',
          label: 'C',
          text: 'Nadstandardní formáty se doporučují plošně, aby měly všechny pozice stejnou podporu.',
          isCorrect: false
        },
        {
          id: 'D',
          label: 'D',
          text: 'Nadstandardní formáty se řeší až ve chvíli, kdy základní kampaně dlouhodobě nefungují.',
          isCorrect: false
        }
      ]}
      explanationText="Nadstandard má být odpověď na potřebu, ne první věta prezentace. Když s ním začneš moc brzy, klient to slyší jako upsell a přestane věřit, že řešíš jeho problém. Když s ním přijdeš moc pozdě, můžeš propásnout příležitost, protože klient si už vytvořil rámec rozpočtu a očekávání. Správné načasování je po pochopení cíle a cílovky."
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}