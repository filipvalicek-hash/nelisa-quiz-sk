import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen21Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen21({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen21Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„To je poměrně častá zkušenost. U kampaní na Metě se první dny až zhruba týden sbírají data a systém se učí, komu nabídku zobrazovat. Když se kampaň vypne moc brzy, většinou se k té fázi, kdy začne fungovat, ani nedostane."',
      isCorrect: true
    },
    {
      id: 'B',
      label: 'B',
      text: '„Tohle se stává hlavně tehdy, když se kampaň špatně nastaví. U Nelisy je to udělané jinak, takže se vám to nestane."',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„Sociální sítě jsou hodně o štěstí a načasování. Někdy to vyjde, někdy ne."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Proto my kampaně doporučujeme nevyhodnocovat hned, ale počkat, až se nasbírají výsledky."',
      isCorrect: false
    }
  ];

  const questionText = (
    <span style={{ lineHeight: '1.6' }}>
      Vyber odpověď, pomocí které bys <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>klientovi vysvětlil/a</span> <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>realitu fungování Meta kampaní</span>.
    </span>
  );

  const explanationText = 'Kampaň nemá stabilní výkon hned od začátku, protože systém se učí a ladí doručování. Klient je často zvyklý na inzerát, kde reakce přichází rychle a pak slábnou. U kampaní to může být opačně, výkon se může zlepšovat v čase. Proto je důležité říct, kdy dává smysl hodnotit a kdy je to předčasné.';

  return (
    <CardSelectionChallenge
      questionNumber={21}
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