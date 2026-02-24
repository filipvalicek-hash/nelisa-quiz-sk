import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen8Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen8({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen8Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Ano, protože to vypadá profesionálně."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Ano, zlepší to SEO a také zvedne estetický dojem z toho, jak se dá na webu prezentovat"',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„Protože u pasivních kandidátů rozhoduje důvěra - profil doplňuje kontext a zvyšuje ochotu odpovědět."',
      isCorrect: true
    },
    {
      id: 'D',
      label: 'D',
      text: '„Hlavně to vyžaduje systém Nelisy a bez firemního profilu nenechá firmu zveřejnit kampaň."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Klikni na argument, který nejlépe vysvětlí <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>význam firemního profilu</span>.
    </>
  );

  const explanationText = `Profil není jen vizitka, ale důvěryhodnost. Kandidát si firmu ověřuje a profil často rozhodne, jestli udělá další krok, hlavně u pasivnějších lidí, kteří nepotřebují práci nutně.

Kvalitní profil zvyšuje konverzi, protože odpovídá na základní otázky a snižuje nejistotu. Proto se profil řeší jako jednoduchá věc s velkým dopadem, ne jako povinná byrokracie.`;

  return (
    <CardSelectionChallenge
      questionNumber={8}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBĚR JEDNÉ ODPOVĚDI"
      singleColumn={true}
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}