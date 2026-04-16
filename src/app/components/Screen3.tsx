import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen3Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen3({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen3Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Nelisa je moderná náborová platforma s multikanálovou reklamou."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Nelisa pomáha firmám osloviť aj pasívnych kandidátov mimo pracovné portály pomocou riadených kampaní."',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: '„Zabezpečujeme náborové kampane na sociálnych sieťach a ďalších kanáloch."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Naše riešenie prináša viac reakcií vďaka šikovnej optimalizácii."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>úvodnú vetu</span>, ktorá najlepšie nastaví rámec schôdzky a <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nehodí Ťa do škatuľky</span> „ďalší portál/agentúra".
    </>
  );

  const explanationText = `Záujem vzniká, keď klient spozná, že riešime jeho problém a že to dáva obchodný zmysel. Preto sa oplatí postupovať v poradí Prečo – Čo – Ako: najskôr ukázať Prečo (reálne úžitky a dopad na nábor: kvalita, rýchlosť, rozšírenie zásahu, úspora času), potom vysvetliť Čo (že to dosahujeme pomocou riadených kampaní, ktoré oslovujú aj pasívnych kandidátov mimo portály), a až nakoniec ukázať Ako (Admin a procesy, ako sa to zadáva, sleduje a zapadá do ATS).

Ak začneš funkciami, klient si to nevie zaradiť a vníma to ako ďalší nástroj; keď začneš dopadom, má dôvod počúvať a „Čo" a „Ako" už potom logicky zaklapne.`;

  return (
    <CardSelectionChallenge
      questionNumber={3}
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