import { CardSelectionChallenge } from '@/app/components/CardSelectionChallenge';

interface Screen21Props {
  onBack: () => void;
  onNext: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: string | null;
  onStoreSelection?: (sel: string | null) => void;
}

export function Screen21({ onBack, onNext, onLogoClick, onSkip, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen21Props) {
  const options = [
    {
      id: 'A',
      label: 'A',
      text: '„To je pomerne častá skúsenosť. Pri kampaniach na Mete sa prvé dni až zhruba týždeň zbierajú dáta a systém sa učí, komu ponuku zobrazovať. Keď sa kampaň vypne príliš skoro, väčšinou sa k tej fáze, kedy začne fungovať, ani nedostane."',
      isCorrect: true
    },
    {
      id: 'B',
      label: 'B',
      text: '„Toto sa stáva hlavne vtedy, keď sa kampaň zle nastaví. U Nelisy je to urobené inak, takže sa vám to nestane."',
      isCorrect: false
    },
    {
      id: 'C',
      label: 'C',
      text: '„Sociálne siete sú veľa o šťastí a načasovaní. Niekedy to vyjde, niekedy nie."',
      isCorrect: false
    },
    {
      id: 'D',
      label: 'D',
      text: '„Preto my kampane odporúčame nevyhodnocovať hneď, ale počkať, kým sa nazbierajú výsledky."',
      isCorrect: false
    }
  ];

  const questionText = (
    <span style={{ lineHeight: '1.6' }}>
      Vyber odpoveď, pomocou ktorej by si <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>klientovi vysvetlil/a</span> <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>realitu fungovania Meta kampaní</span>.
    </span>
  );

  const explanationText = 'Kampaň nemá stabilný výkon hneď od začiatku, pretože systém sa učí a ladí doručovanie. Klient je často zvyknutý na inzerát, kde reakcie prichádzajú rýchlo a potom slabnú. Pri kampaniach to môže byť opačne, výkon sa môže zlepšovať v čase. Preto je dôležité povedať, kedy dáva zmysel hodnotiť a kedy je to predčasné.';

  return (
    <CardSelectionChallenge
      questionNumber={21}
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