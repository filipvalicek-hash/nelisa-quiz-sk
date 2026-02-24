import { MatchingChallenge } from '@/app/components/MatchingChallenge';
import { QuestionTypeTag } from '@/app/components/QuestionTypeTag';
import { Link2 } from 'lucide-react';

interface Screen26Props {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function Screen26({ onNext, onBack, onSkip, onLogoClick, onAnswerSubmit }: Screen26Props) {
  const leftItems = [
    { id: '1', text: '„Oproti běžné inzerci je to moc drahé."' },
    { id: '2', text: '„Aktuálně nemáme žádnou náborovou potřebu."' },
    { id: '3', text: '„Inzerci přes sociální sítě řešíme s agenturou nebo interně."' },
    { id: '4', text: '„Je to další systém navíc, už teď jich máme příliš / bude to složité."' },
    { id: '5', text: '„Už jsme to zkoušeli a nefungovalo to."' },
    { id: '6', text: '„Stačí nám inzerovat přes jobboardy."' },
  ];

  const rightItems = [
    { id: 'A', text: 'U běžné inzerce jste zvyklí platit za jeden měsíc na jednom jobboardu a čekat, kdo se ozve.\nU Nelisy běží po stejnou dobu aktivní kampaň napříč zhruba 16 kanály, která jde za výrazně větším publikem.\nSoučástí ceny jsou navíc služby jako firemní profil, tvorba bannerů a přehledné statistiky.\nDává smysl to ověřit pilotně na jedné roli a podle výsledků se rozhodnout dál.' },
    { id: 'B', text: 'Právě období bez akutní potřeby je ideální chvíle řešit nábor s předstihem.\nMůžete budovat databázi kandidátů, posílit employer branding a mít kampaně připravené tak, aby šly rychle spustit ve chvíli, kdy potřeba reálně vznikne.' },
    { id: 'C', text: 'Agentury i interní marketing obvykle řeší hlavně produktové nebo brandové kampaně.\nNelisa má za sebou více než 4 roky praxe a tisíce HR kampaní, ze kterých vychází specializované know-how.\nDíky tomu optimalizujeme rychle podle dat a oproti interní nebo agenturní správě často šetříme čas i náklady.' },
    { id: 'D', text: 'Proces je nastavený jednoduše – od založení profilu dokážeme spustit kampaň do 3 pracovních dnů.\nDíky integracím jdou kandidáti přímo do ATS, takže HR nepřibývá další nástroj ani manuální práce.\nNejlepší je vyzkoušet první kampaň pilotně.' },
    { id: 'E', text: 'Je důležité podívat se na to, proč předchozí pokus nefungoval – často chybí správné nastavení cílové skupiny nebo optimalizace v průběhu kampaně.\nDíky zkušenostem s tisíci kampaní víme, kde bývají slabá místa a jak je včas upravit.' },
    { id: 'F', text: 'Jobboardy fungují primárně na aktivní kandidáty.\nNelisa oslovuje i pasivní publikum napříč sociálními sítěmi a dalšími kanály, čímž výrazně rozšiřuje zásah a šanci najít relevantní kandidáty.' },
  ];

  const correctPairs: Record<string, string> = {
    '1': 'A',
    '2': 'B',
    '3': 'C',
    '4': 'D',
    '5': 'E',
    '6': 'F',
  };

  const questionText = (
    <div>
      <div className="mb-6">
        <QuestionTypeTag text="PŘIŘAZOVÁNÍ" icon={Link2} />
      </div>
      <h3 
        className="text-gray-900 mb-4 leading-tight" 
        style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          lineHeight: '130%'
        }}
      >
        Ke každé námitce přiřaď nejvhodnější argumentaci, kterou bys použil/a při obchodním jednání.
      </h3>
    </div>
  );

  const explanationText = 'Správná reakce na námitky nestojí jen na „protiargumentu", ale na pochopení kontextu klienta. Každá z uvedených odpovědí reaguje na konkrétní obavu a vrací debatu k hodnotě, kterou Nelisa přináší – ať už jde o širší zásah, specializované know-how, jednoduchost implementace nebo práci s pasivními kandidáty.';

  return (
    <MatchingChallenge
      questionNumber={25}
      questionText={questionText}
      leftColumnTitle="NÁMITKY"
      rightColumnTitle="ARGUMENTACE"
      leftItems={leftItems}
      rightItems={rightItems}
      correctPairs={correctPairs}
      correctFeedback={{
        emoji: '🎯',
        message: 'Výborně! Všechny námitky jsi správně spároval/a.',
        encouragement: explanationText,
      }}
      partialFeedback={{
        emoji: '📝',
        message: 'Některé odpovědi nesedí.',
        encouragement: explanationText,
      }}
      incorrectFeedback={{
        emoji: '🔄',
        message: 'Zkus to znovu.',
        encouragement: explanationText,
      }}
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onAnswerSubmit={onAnswerSubmit}
      singleAttempt={true}
    />
  );
}