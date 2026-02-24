import { ChecklistChallenge } from '@/app/components/ChecklistChallenge';

interface Screen11Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen11({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen11Props) {
  const questionText = (
    <>
      Vyber položky, které je potřeba mít <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>připravené před spuštěním</span> kampaně.
    </>
  );

  return (
    <ChecklistChallenge
      questionNumber={11}
      questionText={questionText}
      options={[
        {
          id: 'option-a',
          text: 'Registrace',
          isCorrect: true
        },
        {
          id: 'option-b',
          text: 'Vyplněný firemní profil',
          isCorrect: true
        },
        {
          id: 'option-c',
          text: 'Základní podklady k pozici (název, lokalita, typ role)',
          isCorrect: true
        },
        {
          id: 'option-d',
          text: 'Fakturační údaje',
          isCorrect: true
        },
        {
          id: 'option-e',
          text: 'Hotový onboarding call',
          isCorrect: false
        },
        {
          id: 'option-f',
          text: 'Finálně schválený text nabídky',
          isCorrect: false
        },
        {
          id: 'option-g',
          text: 'Dohodnutá očekávání a cíle kampaně',
          isCorrect: false
        }
      ]}
      correctFeedback={{
        emoji: '✅',
        message: 'Přesně tak!',
        encouragement: 'Vybrals všechny položky, které jsou potřeba před spuštěním.'
      }}
      partialFeedback={{
        emoji: '🤔',
        message: 'Máš část správně.',
        encouragement: 'Část položek je správně, ale zkus se zamyslet nad tím, co je skutečně nutné PŘED spuštěním a co lze doladit i potom.'
      }}
      incorrectFeedback={{
        emoji: '💭',
        message: 'Zkus to ještě jednou.',
        encouragement: 'Zamysli se nad tím, co je opravdu nutné před spuštěním kampaně.'
      }}
      explanationText={
        <>
          <p>
            Zklamání většinou nevzniká z toho, že by kampaň neměla žádný dopad, ale z toho, že si klient představoval něco jiného.
          </p>
          <p>
            Proto je klíčové vyjasnit role, vstupy, harmonogram a co je úspěch. Když se to neudělá, klient čeká okamžitý výsledek, nedodá podklady nebo hodnotí podle špatné metriky.
          </p>
          <p>
            Dobře nastavené očekávání snižuje tření a zvyšuje spokojenost.
          </p>
        </>
      }
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}