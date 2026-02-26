import { AutoAdvanceMatchingChallenge } from '@/app/components/AutoAdvanceMatchingChallenge';

interface Screen15Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen15({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen15Props) {
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
        { id: '2', text: '2) Nechce, aby se stejný obsah jen mechanicky kopíroval všude.' },
        { id: '3', text: '3) Chce rozšířit zásah, ale zachovat jednoduchost.' }
      ]}
      rightItems={[
        { id: 'A', text: 'A) Každý kanál má jinou roli – někde budujeme povědomí, jinde sbíráme reakce.' },
        { id: 'B', text: 'B) Řízení, optimalizace i reporting je na Nelise, klient dodává jen vstupy.' },
        { id: 'C', text: 'C) Kombinace kanálů pomáhá oslovit různé skupiny kandidátů bez závislosti na jednom zdroji.' }
      ]}
      correctPairs={{
        '1': 'B',         // Nechce řešit více nástrojů → Řízení je na Nelise
        '2': ['A', 'C'],  // Nechce mechanické kopírování → Každý kanál má jinou roli NEBO Kombinace kanálů
        '3': ['C', 'A']   // Chce rozšířit zásah → Kombinace kanálů NEBO Každý kanál má jinou roli
      }}
      explanationText={'Multi-channel není samoúčelný seznam kanálů. Smysl je v tom, že systém hledá, kde a jak doručit nabídku co nejefektivněji, a průběžně optimizuje doručování. Klient tak nekupuje „budeme všude", ale strategii doručování a řízení výkonu. To je rozdíl oproti jednorázovému nákupu prostoru.'}
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}