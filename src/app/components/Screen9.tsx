import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen9Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen9({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen9Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„Banner musí byť čitateľný a profesionálny, keď kandidát nepochopí sdielenie počas sekundy, neklikne."',
      isCorrect: false
    },
    {
      id: 'B',
      label: 'B',
      text: '„Banner nie je len obrázok, v kampani bežia dve vizuálne varianty súbežne – tzn. maximálna miera preklikovosti. Navyše sú robené pre konkrétne prostredie – feed a display."',
      isCorrect: true
    },
    {
      id: 'C',
      label: 'C',
      text: '„Je dôležité držať konzistentný vizuálny štýl, aby si kandidáti firmu a sdielenie rýchlo spojili."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Banner musí byť navrhnutý pre prostredie, kde sa zobrazuje (feed, display), aby zodpovedal tomu, ako ľudia obsah v praxi konzumujú."',
      isCorrect: false
    }
  ];

  const questionText = (
    <>
      Vyber odpoveď, ktorá najlepšie vysvetľuje <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>prácu s bannermi</span> v kampani od Nelisy.
    </>
  );

  const explanationText = `Klient vidí obrázok, ale hodnota je v tom, ako banner funguje v kampani. Bannery sú navrhnuté pre konkrétne prostredie a pracuje sa s nimi výkonovo. V kampani beží viac variantov súčasne a systém vyhodnocuje, čo prináša lepšie reakcie. Preto nejde len o grafiku, ale o testovanie, optimalizáciu a rýchle doručenie sdielenia v pár sekundách.`;

  return (
    <CardSelectionChallenge
      questionNumber={9}
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