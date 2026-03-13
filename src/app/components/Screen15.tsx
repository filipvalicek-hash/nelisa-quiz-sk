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
          Přiřaď <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správnou reakci</span> k tomu, co klient tímhle komentářem otevírá.
        </>
      }
      leftColumnTitle="CO KLIENT ŘEŠÍ"
      rightColumnTitle="ARGUMENTY"
      leftItems={[
        { id: '1', text: '1) Nechce řešit více nástrojů a reportů.' },
        { id: '2', text: '2) Chce, aby byla pracovní nabídka cílena na různé kanály, avšak jednoduše a se stejným obsahem.' },
        { id: '3', text: '3) Chce rozšířit zásah, ale jednoduše, bez složitého procesu na jednotlivých kanálech.' }
      ]}
      rightItems={[
        { id: 'A', text: 'A) Každý kanál má jinou roli – někde budujeme povědomí, jinde sbíráme reakce, ale vždy u stejné cílové skupiny.' },
        { id: 'B', text: 'B) Reporting i řízení a optimalizace kampaní je na straně Nelisy, klient dodává jen pracovní nabídku.' },
        { id: 'C', text: 'C) Na Nelise kombinujeme kanály automatizovaným systémem bez náročného procesu na straně klienta.' }
      ]}
      correctPairs={{
        '1': 'B',  // Nechce řešit více nástrojů → Reporting/řízení je na Nelise
        '2': 'A',  // Chce různé kanály ale stejný obsah → Každý kanál má jinou roli
        '3': 'C'   // Chce rozšířit zásah jednoduše → kombinujeme kanály automatizovaně
      }}
      explanationText={'Multi-channel není samoúčelný seznam kanálů. Smysl je v tom, že systém hledá, kde a jak doručit nabídku co nejefektivněji, a průběžně optimizuje doručování. Klient tak nekupuje „budeme všude", ale strategii doručování a řízení výkonu. To je rozdíl oproti jednorázovému nákupu prostoru.'}
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