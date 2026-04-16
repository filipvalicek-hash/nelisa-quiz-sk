import { CategoryDragDropChallenge } from '@/app/components/CategoryDragDropChallenge';

interface Screen3NewProps {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: Record<string, string>;
  onStoreSelection?: (sel: Record<string, string>) => void;
}

export function Screen3New({ onBack, onNext, onSkip, onLogoClick, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen3NewProps) {
  const categories = [
    {
      id: 'essential',
      title: '1️⃣ Bez toho sa nezaobídem',
      subtitle: 'Počas prípravy na schôdzku alebo počas samotnej schôdzky tieto materiály potrebujem.'
    },
    {
      id: 'useful',
      title: '2️⃣ Hodí sa mať po ruke',
      subtitle: 'Môže padnúť otázka, ale nie je to povinný základ.'
    },
    {
      id: 'ignore',
      title: '3️⃣ Teraz neriešim',
      subtitle: 'Typicky zbytočná odbočka na prezentačnej schôdzke.'
    }
  ];

  const materials = [
    {
      id: 'A',
      label: 'A',
      text: 'Základná + nadstavbová prezentácia Nelisy (na poslanie klientovi po schôdzke)',
      correctCategory: 'essential'
    },
    {
      id: 'B',
      label: 'B',
      text: 'Ukážky formátov / nadštandardných reklamných formátov',
      correctCategory: 'essential'
    },
    {
      id: 'C',
      label: 'C',
      text: 'Demo Firemného Adminu (alebo pripravené screenshoty)',
      correctCategory: 'essential'
    },
    {
      id: 'E',
      label: 'E',
      text: 'Prístupy do ATS klienta (Teamio a pod.)',
      correctCategory: 'ignore',
      correctCategories: ['ignore', 'useful']
    },
    {
      id: 'F',
      label: 'F',
      text: 'Interný cenník všetkých produktov Alma + zľavová politika',
      correctCategory: 'ignore',
      correctCategories: ['ignore', 'useful']
    },
    {
      id: 'G',
      label: 'G',
      text: 'Obchodný pomocník: Desatoro prezentačnej schôdzky + rozcestník na materiály',
      correctCategory: 'essential'
    },
    {
      id: 'H',
      label: 'H',
      text: 'Kalkulačka / modelácia výkonu',
      correctCategory: 'useful',
      correctCategories: ['useful', 'essential']
    }
  ];

  const questionText = (
    <>
      Pretiahni materiály do <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správnej kategórie</span> podľa toho, ako nutné je mať ich pripravené pred prezentačnou schôdzkou o Nelise.
    </>
  );

  return (
    <CategoryDragDropChallenge
      questionNumber={2}
      questionText={questionText}
      categories={categories}
      materials={materials}
      correctFeedback="Schôdzka býva úspešná vtedy, keď klient rýchlo pochopí princíp a vidí konkrétne ukážky. Pripravené materiály zvyšujú dôveryhodnosť, pretože obchodník nepôsobí neisto a nemusí dohľadávať veci za behu. Zároveň klient po schôdzke potrebuje podklady pre interné rozhodnutie a jasné ďalšie kroky, inak sa schvaľovanie rozpadne alebo sa k tomu nikto nevráti."
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
      onLogoClick={onLogoClick}
      onAnswerSubmit={onAnswerSubmit}
      initialConfirmed={initialConfirmed}
      initialSelection={initialSelection}
      onStoreSelection={onStoreSelection}
    />
  );
}