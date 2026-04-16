import { MatchingChallenge } from '@/app/components/MatchingChallenge';
import { QuestionTypeTag } from '@/app/components/QuestionTypeTag';
import { Link2 } from 'lucide-react';

interface Screen26Props {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  onLogoClick?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: Array<{ leftId: string; rightId: string }>;
  onStoreSelection?: (sel: Array<{ leftId: string; rightId: string }>) => void;
}

export function Screen26({ onNext, onBack, onSkip, onLogoClick, onAnswerSubmit, initialConfirmed, initialSelection, onStoreSelection }: Screen26Props) {
  const leftItems = [
    { id: '1', text: '„Oproti bežnej inzercii je to príliš drahé."' },
    { id: '2', text: '„Aktuálne nemáme žiadnu náborovú potrebu."' },
    { id: '3', text: '„Inzerciu cez sociálne siete riešime s agentúrou alebo interne."' },
    { id: '4', text: '„Je to ďalší systém navyše, už teraz ich máme príliš / bude to zložité."' },
    { id: '5', text: '„Už sme to skúšali a nefungovalo to."' },
    { id: '6', text: '„Stačí nám inzerovať cez jobboardy."' },
  ];

  const rightItems = [
    { id: 'C', text: 'Agentúry aj interný marketing obvykle riešia hlavne produktové alebo brandové kampane.\nNelisa má za sebou viac než 4 roky praxe a tisíce HR kampaní, z ktorých vychádza špecializované know-how.\nVďaka tomu optimalizujeme rýchlo podľa dát a oproti internej alebo agentúrnej správe často šetríme čas aj náklady.' },
    { id: 'F', text: 'Jobboardy fungujú primárne na aktívnych kandidátov.\nNelisa oslovuje aj pasívne publikum naprieč sociálnymi sieťami a ďalšími kanálmi, čím výrazne rozširuje zásah a šancu nájsť relevantných kandidátov.' },
    { id: 'A', text: 'Pri bežnej inzercii ste zvyknutí platiť za jeden mesiac na jednom jobboarde a čakať, kto sa ozve.\nPri Nelise beží po rovnakú dobu aktívna kampaň naprieč minimálne 16 kanálmi, ktorá ide za výrazne väčším publikom.\nSúčasťou ceny sú navyše služby ako firemný profil, tvorba bannerov a prehľadné štatistiky.\nDáva zmysel to overiť pilotne na jednej roli a podľa výsledkov sa rozhodnúť ďalej.' },
    { id: 'D', text: 'Proces je nastavený jednoducho – od založenia profilu dokážeme spustiť kampaň do 3 pracovných dní.\nVďaka integráciám idú kandidáti priamo do ATS, takže HR nepribúda ďalší nástroj ani manuálna práca.\nNajlepšie je vyskúšať prvú kampaň pilotne.' },
    { id: 'B', text: 'Práve obdobie bez akútnej potreby je ideálna chvíľa riešiť nábor s predstihom.\nMôžete budovať databázu kandidátov, posilniť employer branding a mať kampane pripravené tak, aby sa dali rýchlo spustiť vo chvíli, keď potreba reálne vznikne.' },
    { id: 'E', text: 'Je dôležité pozrieť sa na to, prečo predchádzajúci pokus nefungoval – často chýba správne nastavenie cieľovej skupiny alebo optimalizácia v priebehu kampane.\nVďaka skúsenostiam s tisícmi kampaní vieme, kde bývajú slabé miesta a ako ich včas upraviť.' },
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
        <QuestionTypeTag text="PRIRAĎOVANIE" icon={Link2} />
      </div>
      <h3
        className="text-gray-900 mb-4 leading-tight"
        style={{
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: '130%'
        }}
      >
        Ku každej námietke priraď najvhodnejšiu informáciu, ktorú by si zmienil/a pri obchodnom jednaní.
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        Argumentácia sa samozrejme líši podľa situácie na obchodnom jednaní a prístupu protistrany. Počas stretnutia je pri argumentovaní tiež potrebné myslieť na princípy „Nárazníka".
      </p>
    </div>
  );

  const explanationText = 'Správna reakcia na námietky nestojí len na „protiargumente", ale na pochopení kontextu klienta. Každá z uvedených odpovedí reaguje na konkrétnu obavu a vracia debatu k hodnote, ktorú Nelisa prináša – či už ide o širší zásah, špecializované know-how, jednoduchosť implementácie alebo prácu s pasívnymi kandidátmi.';

  return (
    <MatchingChallenge
      questionNumber={25}
      questionText={questionText}
      leftColumnTitle="NÁMIETKY"
      rightColumnTitle="Informácie, ktoré by mali zaznieť"
      leftItems={leftItems}
      rightItems={rightItems}
      correctPairs={correctPairs}
      correctFeedback={{
        emoji: '🎯',
        message: 'Výborne! Všetky námietky si správne spároval/a.',
        encouragement: explanationText,
      }}
      partialFeedback={{
        emoji: '📝',
        message: 'Niektoré odpovede nesedia.',
        encouragement: explanationText,
      }}
      incorrectFeedback={{
        emoji: '🔄',
        message: 'Skús to znova.',
        encouragement: explanationText,
      }}
      onNext={onNext}
      onBack={onBack}
      onLogoClick={onLogoClick}
      onAnswerSubmit={onAnswerSubmit}
      singleAttempt={true}
      initialConfirmed={initialConfirmed}
      initialSelection={initialSelection}
      onStoreSelection={onStoreSelection}
    />
  );
}