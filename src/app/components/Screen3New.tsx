import { CategoryDragDropChallenge } from '@/app/components/CategoryDragDropChallenge';

interface Screen3NewProps {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen3New({ onBack, onNext, onSkip, onLogoClick, onAnswerSubmit }: Screen3NewProps) {
  const categories = [
    {
      id: 'essential',
      title: '1️⃣ Bez toho se neobejdu',
      subtitle: 'Na schůzce to fakt použiju nebo to musím umět poslat hned po schůzce.'
    },
    {
      id: 'useful',
      title: '2️⃣ Hodí se mít po ruce',
      subtitle: 'Může padnout dotaz, ale není to povinný základ.'
    },
    {
      id: 'ignore',
      title: '3️⃣ Teď neřeším',
      subtitle: 'Typicky zbytečná odbočka na prezentační schůzce.'
    }
  ];

  const materials = [
    {
      id: 'A',
      label: 'A',
      text: 'Základní + nadstavbová prezentace Nelisy (pro poslání klientovi po schůzce)',
      correctCategory: 'essential'
    },
    {
      id: 'B',
      label: 'B',
      text: 'Ukázky formátů / nadstandardních reklamních formátů',
      correctCategory: 'essential'
    },
    {
      id: 'C',
      label: 'C',
      text: 'Demo Firemního Adminu (nebo připravené screenshoty)',
      correctCategory: 'essential'
    },
    {
      id: 'D',
      label: 'D',
      text: 'Odkaz na onboarding schůzku (Calendly) + podmínky onboardingu',
      correctCategory: 'essential'
    },
    {
      id: 'E',
      label: 'E',
      text: 'Přístupy do ATS klienta (Teamio apod.)',
      correctCategory: 'ignore'
    },
    {
      id: 'F',
      label: 'F',
      text: 'Interní ceník všech produktů Alma + slevová politika',
      correctCategory: 'ignore'
    },
    {
      id: 'G',
      label: 'G',
      text: 'Obchodní pomocník: Desatero prezentační schůzky + rozcestník na materiály',
      correctCategory: 'essential'
    },
    {
      id: 'H',
      label: 'H',
      text: 'Kalkulačka / modelace výkonu',
      correctCategory: 'useful'
    }
  ];

  const questionText = (
    <>
      Přetáhni materiály do <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>správné kategorie</span> podle toho, jak nutné je mít je připravené před prezentační schůzkou o Nelise.
    </>
  );

  return (
    <CategoryDragDropChallenge
      questionNumber={2}
      questionText={questionText}
      categories={categories}
      materials={materials}
      correctFeedback="Schůzka bývá úspěšná tehdy, když klient rychle pochopí princip a vidí konkrétní ukázky. Připravené materiály zvyšují důvěryhodnost, protože obchodník nepůsobí nejistě a nemusí dohledávat věci za běhu.\n\nZároveň klient po schůzce potřebuje podklady pro interní rozhodnutí a jasné další kroky, jinak se schvalování rozpadne nebo se k tomu nikdo nevrátí."
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
      onLogoClick={onLogoClick}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}