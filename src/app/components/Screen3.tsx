import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen3Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen3({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen3Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Nelisa je moderní náborová platforma s multikanálovou reklamou."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Nelisa pomáhá firmám oslovit i pasivní kandidáty mimo pracovní portály pomocí řízených kampaní."',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: '„Zajišťujeme náborové kampaně na sociálních sítích a dalších kanálech."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Naše řešení přináší více reakcí díky chytré optimalizaci."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>úvodní větu</span>, která nejlépe nastaví rámec schůzky a <span className="font-bold" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>nehodí Tě do škatulky</span> „další portál/agentura".
    </>
  );

  const explanationText = `Zájem vzniká, když klient pozná, že řešíme jeho problém a že to dává obchodní smysl. Pokud začneš funkcemi, klient si to neumí zařadit a vnímá to jako další nástroj.

Když začneš dopadem na nábor (kvalita, rychlost, rozšíření zásahu, úspora času), má klient důvod poslouchat a teprve potom dává smysl ukázat, jak to funguje.`;

  return (
    <CardSelectionChallenge
      questionNumber={3}
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