import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen7Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen7({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit }: Screen7Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: 'Hlavní je, že banner dobře vypadá a působí profesionálně.',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: 'Banner není samostatný obrázek – je navržený pro konkrétní prostředí (feed, display), dlouhodobě se testuje a upravuje podle toho, co na kandidáty reálně funguje.',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: 'Používáme jednotný design, takže kandidáti reklamu lépe poznají.',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: 'Upřímně, většina grafiků neumí bannery pro kampaně dělat správně.',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Klikni na <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>tu ukázku</span>, kterou otevřeš jako první.
    </>
  );

  const explanationText = (
    <>
      Nejlépe funguje <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>ukázat jednu konkrétní cestu kandidáta</span>, protože to klientovi zhmotní <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>celý princip během chvíle</span>. Když klient vidí banner, detail nabídky a odpověď, přestane to být abstraktní „nějaká kampaň". Zároveň tím obchodník vysvětlí, co se děje na straně kandidáta a proč má smysl obsah, profil a formulář. To je často rychlejší než vysvětlovat technologii nebo cílení.
    </>
  );

  return (
    <CardSelectionChallenge
      questionNumber={7}
      questionText={questionText}
      options={options}
      explanationText={explanationText}
      questionTypeTag="VÝBĚR JEDNÉ ODPOVĚDI"
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onSkip={onSkip}
      onAnswerSubmit={onAnswerSubmit}
    />
  );
}