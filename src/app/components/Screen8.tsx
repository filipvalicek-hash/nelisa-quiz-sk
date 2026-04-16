import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen8Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen8({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen8Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Áno, pretože to vyzerá profesionálne."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Áno, zlepší to SEO a tiež zdvihne estetický dojem z toho, ako sa dá na webe prezentovať"',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„Pretože u pasívnych kandidátov rozhoduje dôvera – profil dopĺňa kontext a zvyšuje ochotu odpovedať."',
      isCorrect: true
    },
    {
      id: 'D',
      label: 'D',
      text: '„Hlavne to vyžaduje systém Nelisy a bez firemného profilu nedovolí firme zverejniť kampaň."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Klikni na argument, ktorý najlepšie vysvetlí <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>význam firemného profilu</span>.
      <span style={{ display: 'block', marginTop: '6px', fontSize: '16px', fontWeight: 400, color: '#64748B' }}>
        Má to ale reálne vplyv na to, či sa človek rozhodne reagovať?
      </span>
    </>
  );

  const explanationText = `Profil nie je len vizitka, ale dôveryhodnosť. Kandidát si firmu overuje a profil často rozhodne, či urobí ďalší krok, hlavne u pasívnejších ľudí, ktorí nepotrebujú prácu nutne.

Kvalitný profil zvyšuje konverziu, pretože odpovedá na základné otázky a znižuje neistotu. Preto sa profil rieši ako jednoduchá vec s veľkým dopadom, nie ako povinná byrokracia.`;

  return (
    <CardSelectionChallenge
      questionNumber={8}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBER JEDNEJ ODPOVEDE"
      singleColumn={true}
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