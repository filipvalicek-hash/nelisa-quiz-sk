import { ChecklistChallenge } from '@/app/components/ChecklistChallenge';

interface Screen11Props {
  initialSelection?: string[];
  onStoreSelection?: (sel: string[]) => void;
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
}

export function Screen11({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen11Props) {
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
          id: 'option-c',
          text: 'Základní podklady k pozici (název, lokalita, typ role)',
          isCorrect: true
        },
        {
          id: 'option-a',
          text: 'Registrace',
          isCorrect: true
        },
        {
          id: 'option-f',
          text: 'Finálně schválený text nabídky',
          isCorrect: true
        },
        {
          id: 'option-e',
          text: 'Hotový onboarding call',
          isCorrect: false
        },
        {
          id: 'option-g',
          text: 'Dohodnutá očekávání a cíle kampaně',
          isCorrect: true
        },
        {
          id: 'option-d',
          text: 'Fakturační údaje',
          isCorrect: true
        },
        {
          id: 'option-b',
          text: 'Vyplněný firemní profil',
          isCorrect: true
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
            Zklamání většinou nevzniká z toho, že by kampaň neměla žádný dopad, ale z toho, že si klient představoval něco jiného. Proto je dobré držet 3 základní kroky:
          </p>
          <p>
            <strong>Nastavení očekávání a ujasnění cílovky</strong> – vyjasnit role, vstupy, harmonogram a hlavně koho klient skutečně hledá a co bude považovat za úspěch. <strong>Průběžné vyhodnocení</strong> – domluvit si kontrolní body, sbírat zpětnou vazbu na kvalitu kandidátů a mít prostor na případnou úpravu kampaně. <strong>Závěrečné vyhodnocení</strong> – společně uzavřít kampaň, shrnout co fungovalo a co zlepšit příště; to je často začátek retence a navazující spolupráce.
          </p>
          <p>
            Když se toto neudělá, klient čeká okamžitý výsledek, nedodá podklady nebo hodnotí podle špatné metriky. Dobře vedený proces snižuje tření a zvyšuje spokojenost.
          </p>
        </>
      }
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