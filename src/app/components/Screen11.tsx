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
      Vyber položky, ktoré je potrebné mať <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>pripravené pred spustením</span> kampane.
    </>
  );

  return (
    <ChecklistChallenge
      questionNumber={11}
      questionText={questionText}
      options={[
        {
          id: 'option-c',
          text: 'Základné podklady k pozícii (názov, lokalita, typ role)',
          isCorrect: true
        },
        {
          id: 'option-a',
          text: 'Registrácia',
          isCorrect: true
        },
        {
          id: 'option-f',
          text: 'Finálne schválený text ponuky',
          isCorrect: true
        },
        {
          id: 'option-e',
          text: 'Hotový onboarding call',
          isCorrect: false
        },
        {
          id: 'option-g',
          text: 'Dohodnuté očakávania a ciele kampane',
          isCorrect: true
        },
        {
          id: 'option-d',
          text: 'Fakturačné údaje',
          isCorrect: true
        },
        {
          id: 'option-b',
          text: 'Vyplnený firemný profil',
          isCorrect: true
        }
      ]}
      correctFeedback={{
        emoji: '✅',
        message: 'Presne tak!',
        encouragement: 'Vybral si všetky položky, ktoré sú potrebné pred spustením.'
      }}
      partialFeedback={{
        emoji: '🤔',
        message: 'Máš časť správne.',
        encouragement: 'Časť položiek je správne, ale skús sa zamyslieť nad tým, čo je skutočne nutné PRED spustením a čo sa dá doladiť aj potom.'
      }}
      incorrectFeedback={{
        emoji: '💭',
        message: 'Skús to ešte raz.',
        encouragement: 'Zamysli sa nad tým, čo je naozaj nutné pred spustením kampane.'
      }}
      explanationText={
        <>
          <p>
            Sklamanie väčšinou nevzniká z toho, že by kampaň nemala žiadny dopad, ale z toho, že si klient predstavoval niečo iné. Preto je dobré dodržiavať 3 základné kroky:
          </p>
          <p>
            <strong>Nastavenie očakávaní a ujasnenie cieľovky</strong> – vyjasniť role, vstupy, harmonogram a hlavne koho klient skutočne hľadá a čo bude považovať za úspech. <strong>Priebežné vyhodnotenie</strong> – dohodnúť si kontrolné body, zbierať spätnú väzbu na kvalitu kandidátov a mať priestor na prípadnú úpravu kampane. <strong>Záverečné vyhodnotenie</strong> – spoločne uzavrieť kampaň, zhrnúť čo fungovalo a čo zlepšiť nabudúce; to je často začiatok retencie a nadväzujúcej spolupráce.
          </p>
          <p>
            Keď sa toto neurobí, klient čaká okamžitý výsledok, nedodá podklady alebo hodnotí podľa zlej metriky. Dobre vedený proces znižuje trenie a zvyšuje spokojnosť.
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