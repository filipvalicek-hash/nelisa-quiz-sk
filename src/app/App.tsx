import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { QuizTopNavigation } from '@/app/components/QuizTopNavigation';
import { ProgressSection } from '@/app/components/ProgressSection';
import { UserInfoScreen } from '@/app/components/UserInfoScreen';
import { AdminLogin } from '@/app/components/AdminLogin';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { startSession, recordAnswer, completeSession } from '@/app/utils/quizStorage';
import { CertificationIntro } from '@/app/components/CertificationIntro';
import { StoryScreen2 } from '@/app/components/StoryScreen2';
import { Screen2 } from '@/app/components/Screen2';
import { StoryScreen3New } from '@/app/components/StoryScreen3New';
import { Screen3New } from '@/app/components/Screen3New';
import { StoryScreen3 } from '@/app/components/StoryScreen3';
import { Screen3 } from '@/app/components/Screen3';
import { StoryScreen4 } from '@/app/components/StoryScreen4';
import { Screen4 } from '@/app/components/Screen4';
import { StoryScreen5 } from '@/app/components/StoryScreen5';
import { Screen5 } from '@/app/components/Screen5';
import { StoryScreen6 } from '@/app/components/StoryScreen6';
import { Screen6 } from '@/app/components/Screen6';
import { StoryScreen7 } from '@/app/components/StoryScreen7';
import { Screen7 } from '@/app/components/Screen7';
import { StoryScreen8 } from '@/app/components/StoryScreen8';
import { Screen8 } from '@/app/components/Screen8';
import { StoryScreen9 } from '@/app/components/StoryScreen9';
import { Screen9 } from '@/app/components/Screen9';
import { StoryScreen10 } from '@/app/components/StoryScreen10';
import { Screen10 } from '@/app/components/Screen10';
import { StoryScreen11 } from '@/app/components/StoryScreen11';
import { Screen11 } from '@/app/components/Screen11';
import { StoryScreen12 } from '@/app/components/StoryScreen12';
import { Screen12 } from '@/app/components/Screen12';
import { StoryScreen13 } from '@/app/components/StoryScreen13';
import { Screen13 } from '@/app/components/Screen13';
import { StoryScreen14 } from '@/app/components/StoryScreen14';
import { Screen14 } from '@/app/components/Screen14';
import { StoryScreen15 } from '@/app/components/StoryScreen15';
import { Screen15 } from '@/app/components/Screen15';
import { StoryScreen16 } from '@/app/components/StoryScreen16';
import { Screen16 } from '@/app/components/Screen16';
import { StoryScreen17 } from '@/app/components/StoryScreen17';
import { Screen17 } from '@/app/components/Screen17';
import { StoryScreen18 } from '@/app/components/StoryScreen18';
import { Screen18 } from '@/app/components/Screen18';
import { StoryScreen19 } from '@/app/components/StoryScreen19';
import { Screen19 } from '@/app/components/Screen19';
import { StoryScreen20 } from '@/app/components/StoryScreen20';
import { Screen20 } from '@/app/components/Screen20';
import { StoryScreen21 } from '@/app/components/StoryScreen21';
import { Screen21 } from '@/app/components/Screen21';
import { StoryScreen22 } from '@/app/components/StoryScreen22';
import { Screen23 } from '@/app/components/Screen23';
import { StoryScreen23 } from '@/app/components/StoryScreen23';
import { Screen24 } from '@/app/components/Screen24';
import { StoryScreen24 } from '@/app/components/StoryScreen24';
import { Screen25 } from '@/app/components/Screen25';
import { StoryScreen25 } from '@/app/components/StoryScreen25';
import { Screen26 } from '@/app/components/Screen26';
import { TestResultsScreen } from '@/app/components/TestResultsScreen';

// Global constant for total number of stories (questions)
// Change this value to update the total across all screens
const TOTAL_STORIES = 25;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'userInfo' |
    'screen1' | 
    'story2' | 'screen2' | 
    'story3new' | 'screen3new' |
    'story3' | 'screen3' | 
    'story4' | 'screen4' | 
    'story5' | 'screen5' | 
    'story6' | 'screen6' |
    'story7' | 'screen7' |
    'story8' | 'screen8' |
    'story9' | 'screen9' |
    'story10' | 'screen10' |
    'story11' | 'screen11' |
    'story12' | 'screen12' |
    'story13' | 'screen13' |
    'story14' | 'screen14' |
    'story15' | 'screen15' |
    'story16' | 'screen16' |
    'story17' | 'screen17' |
    'story18' | 'screen18' |
    'story19' | 'screen19' |
    'story20' | 'screen20' |
    'story21' | 'screen21' |
    'story22' | 'screen23' |
    'story23' | 'screen24' |
    'story24' | 'screen25' |
    'story25' | 'screen26' |
    'completion' |
    'admin-login' | 'admin-dashboard'
  >('userInfo');

  // Active quiz session id (set when user submits UserInfoScreen)
  const [sessionId, setSessionId] = useState<string | null>(null);

  // User information
  const [userName, setUserName] = useState('Jan Novák');
  const [userEmail, setUserEmail] = useState('jan.novak@email.cz');

  // Track answers for all 25 questions (true = correct, false = incorrect)
  const [questionResults, setQuestionResults] = useState<boolean[]>(
    Array(25).fill(false)
  );

  // Track skipped questions
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());

  // Centralized question data for results display
  // This should match the actual questions used in each Screen component
  const questionsData = [
    {
      questionNumber: 1,
      questionText: 'Přiřaď každé situaci prioritu, jak moc jsi daného klienta schopen/schopna posunout pomocí Nelisy.',
      selectedAnswer: 'Priorita HIGH: A, B, E | Priorita MID: C, D | Priorita LOW: F',
      correctAnswer: 'Priorita HIGH: A, B, E | Priorita MID: C, D | Priorita LOW: F',
      isCorrect: questionResults[0],
      explanation: 'Nelisa cílí na ty, co potřebují pracovat s pasivními kandidáty, ale nemají na to kapacitu, znalosti nebo strukturu. Když klient má funkční HR a spolupracuje s agenturami, může Nelisu doplnit, ale není to jeho hlavní bolest. A pokud nemá objem pozic nebo má jen jednoduché role s dostatkem aktivních kandidátů, Nelisa mu prakticky nepomůže.'
    },
    {
      questionNumber: 2,
      questionText: 'Co by mělo být cílem komunikace na prvním meetingu s klientem?',
      selectedAnswer: questionResults[1] ? 'Získat kontext (pozice, která se nabírá, co už zkoušeli)' : 'Ukázat prezentaci s referenčními klienty',
      correctAnswer: 'Získat kontext (pozice, která se nabírá, co už zkoušeli)',
      isCorrect: questionResults[1],
      explanation: 'První meeting má zjistit, jestli má Nelisa vůbec smysl. Bez kontextu o pozici, cílovce a dosavadních zkušenostech klienta nemůžeme posoudit, jestli Nelisa problém vyřeší. Proto správně začínáme ptaním, ne pitchováním.'
    },
    {
      questionNumber: 3,
      questionText: 'Vyber tvrzení, která jsou pravdivá.',
      selectedAnswer: questionResults[2] ? 'Správné odpovědi vybrány' : 'Nesprávné odpovědi vybrány',
      correctAnswer: 'A) Kampaň je určená hlavně pro oslovení pasivních kandidátů. | B) Kreativu, copy i targeting nastavuje Nelisa. | C) Kampaň může běžet na více kanálech najednou.',
      isCorrect: questionResults[2],
      explanation: 'Nelisa má jasný cíl: oslovit pasivní kandidáty. Kreativu, copy i targeting nastavuje Nelisa – klient dodává jen podklady. A kampaň běží multi-channel (Meta, LinkedIn, Google, Seznam), což je jedna z hlavních přidaných hodnot.'
    },
    {
      questionNumber: 4,
      questionText: 'Která z těchto vět nejlíp vystihuje, co má klient pochopit o kampaních na volné pozice?',
      selectedAnswer: questionResults[3] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Kampaň běží reálně – to není inzerce v záloze, ale aktivní oslovování kandidátů s jasným cílem.',
      isCorrect: questionResults[3],
      explanation: 'Kampaň na volnou pozici má jasný rámec: běží, dokud pozice není obsazená nebo dokud nevyprší dohodnutý limit. Není to automatická platba za nějaký objem, ale řízené oslovování s cílem naplnit konkrétní pozici.'
    },
    {
      questionNumber: 5,
      questionText: 'Proč má klient nastavit tracking pro měření kampaně?',
      selectedAnswer: questionResults[4] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Protože bez měření neví, jestli kandidáti z kampaně reálně reagují, a nemůže optimalizovat ani rozhodnout, jestli Nelisa funguje.',
      isCorrect: questionResults[4],
      explanation: 'Nelisa dodává reakce (kliknutí, zobrazení), ale pokud klient neměří, co se děje dál (zda kandidáti opravdu reagují, jak pokračují v procesu), nedokáže posoudit efektivitu. Tracking není technická formalita, ale základ pro vyhodnocení ROI.'
    },
    {
      questionNumber: 6,
      questionText: 'Co přesně znamená, že je kampaň "multi-channel"?',
      selectedAnswer: questionResults[5] ? 'Správná odpověď' : 'Nesprávná odpověď', 
      correctAnswer: 'Kampaň je aktivní na více platformách zároveň (např. Meta, LinkedIn, Google, Seznam) a Nelisa řídí, kde a jak se co zobrazuje, aby byl zásah co nejefektivnější.',
      isCorrect: questionResults[5],
      explanation: 'Multi-channel neznamená „je to všude stejně". Nelisa řídí strategii doručování – podle profilu kandidáta, chování a výkonu vybírá, kde a jak kampaň běží. Takže ne „rozhazujeme peníze všude", ale „hledáme, kde to funguje nejlíp".'
    },
    {
      questionNumber: 7,
      questionText: 'Která z těchto vět je nejbližší tomu, jak vnímá cenu "průměrný" klient?',
      selectedAnswer: questionResults[6] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: '„To je dost velký balík, co když to nebude fungovat?"',
      isCorrect: questionResults[6],
      explanation: 'Klient obvykle nevnímá cenu jako absolutní částku, ale jako riziko, že zaplatí a neobsadí. Proto má strach z toho, že investuje a nedostane kandidáty. Správně na to jde přes nastavení očekávání, reference a vysvětlení struktury – ne přes slevu.'
    },
    {
      questionNumber: 8,
      questionText: 'Jak má vypadat správně nastavené očekávání ohledně výsledků kampaně?',
      selectedAnswer: questionResults[7] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Očekávání = kontext + upřímnost. „Podobný klient měl X reakcí, u vás to může být jinak, ale uděláme maximum pro to, aby kampaň fungo vala."',
      isCorrect: questionResults[7],
      explanation: 'Nastavení očekávání není slib. Je to upřímné vysvětlení, co je realistické, co ovlivňujeme a co ne. Klient má vědět, co může čekat, ale zároveň že výsledek závisí i na pozici, trhu a jeho vlastním zapojení.'
    },
    {
      questionNumber: 9,
      questionText: 'Co znamená "aktivní kandidát" a "pasivní kandidát" v kontextu náborových kampaní?',
      selectedAnswer: questionResults[8] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Aktivní kandidát sám hledá práci. Pasivní kandidát práci nehledá, ale správná nabídka by ho mohla zajímat.',
      isCorrect: questionResults[8],
      explanation: 'Aktivní kandidát reaguje na portály, je v módu „hledám práci". Pasivní kandidát má práci, nesleduje nabídky, ale pokud ho něco osloví, může se začít zajímat. Nelisa cílí právě na pasivní, protože ti se na Jobs.cz nedostanou.'
    },
    {
      questionNumber: 10,
      questionText: 'Vyber situaci/e, kde Nelisa nedává smysl, protože klient s ní asi nebude spokojený.',
      selectedAnswer: questionResults[9] ? 'Správné odpovědi vybrány' : 'Nesprávné odpovědi vybrány',
      correctAnswer: 'B) Klient nemá tracking, a chce jednoduše "vidět čísla", ale neví, jak je interpretovat. | C) Pozice je akutní, klient potřebuje obsadit do 2 týdnů. | E) Klient čeká, že Nelisa udělá vše za něj, včetně komunikace s kandidáty po reakci.',
      isCorrect: questionResults[9],
      explanation: 'Nelisa nedává smysl tam, kde klient nemá podmínky pro vyhodnocení (tracking), nebo kde má nerealistické očekávání (akutní pozice do 2 týdnů, nebo že po reakci Nelisa vše zařídí). Tyto situace vedou ke špatným zkušenostem, proto je lepší je říct dopředu.'
    },
    {
      questionNumber: 11,
      questionText: 'Co má být hlavní outcome prvního meetingu s klientem?',
      selectedAnswer: questionResults[10] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Klient rozumí, jak Nelisa funguje, co od ní může čekat, a ví, jestli na to má kapacitu a strukturu.',
      isCorrect: questionResults[10],
      explanation: 'První meeting nemá končit objednávkou, ale tím, že klient ví, jestli Nelisa sedí. Pokud mu chybí tracking, nemá čas na vyhodnocení nebo má nerealistické očekávání, měli bychom to říct – ne prodat za každou cenu.'
    },
    {
      questionNumber: 12,
      questionText: 'Klient říká: "My nejsme velká firma jako Lidl nebo PPF, to pro nás nebude." Co odpovíš?',
      selectedAnswer: questionResults[11] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Nelisa je postavená právě pro firmy, co nemají vlastní náborový tým a strukturu na práci s pasivními kandidáty. Neřešíme objem, ale způsob – a ten funguje i pro menší firmy.',
      isCorrect: questionResults[11],
      explanation: 'Nelisa není o velikosti firmy, ale o problému: když klient nemá na pasivní kandidáty čas nebo know-how, Nelisa to řeší. Tuhle námitku vyřešíš tím, že ukážeš, že jde o kapacitu a způsob práce, ne o rozpočet nebo značku.'
    },
    {
      questionNumber: 13,
      questionText: 'Vyber otázku/y, které bys v tuhle chvíli položil/a, aby sis ověřil/a, jestli současný způsob psaní inzerátů dokáže oslovit i pasivní kandidáty.',
      selectedAnswer: questionResults[12] ? 'Správné odpovědi vybrány' : 'Nesprávné odpovědi vybrány',
      correctAnswer: 'A) Jak dnes přemýšlíte nad tím, aby byl text nabídky zajímavý i pro lidi, kteří práci aktivně nehledají? | B) Máte zkušenost s tím, že by se vám na nabídku ozvali lidé, kteří původně změnu práce vůbec neřešili?',
      isCorrect: questionResults[12],
      explanation: 'Copy není přepsaný popis pozice, ale nástroj, který má přimět relevantního člověka udělat krok. To nejde bez kontextu, protože každá cílovka má jiné motivace, obavy a jazyk. Proto je správný postup ten, který sbírá podklady a doptává se. Kvalita vstupních informací od klienta ovlivňuje výsledek kampaně víc než „hezké věty".'
    },
    {
      questionNumber: 14,
      questionText: 'Klient říká: "To zní fajn, ale my nemáme lidi na vyhodnocování kampaní." Co odpovíš?',
      selectedAnswer: questionResults[13] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'To je vlastně hlavní důvod, proč Nelisa existuje – řízení, optimalizace i reporting je na nás. Vy dodáte podklady na pozici a zpětnou vazbu, jak to funguje, zbytek řešíme my.',
      isCorrect: questionResults[13],
      explanation: 'Nelisa je pro klienty, kteří na kampaně nemají lidi. Tahle námitka není blocker, ale důvod, proč Nelisa dává smysl. Správná reakce to potvrdí a vysvětlí, že klient není závislý na vlastním týmu.',
    },
    {
      questionNumber: 15,
      questionText: 'Přiřaď správnou reakci k tomu, co klient tímhle komentářem otevírá.',
      selectedAnswer: questionResults[14] ? 'Správné páry přiřazeny' : 'Nesprávné páry přiřazeny',
      correctAnswer: '1 → B: Nechce řešit více nástrojů → Řízení je na Nelise | 2 → A: Nechce mechanické kopírování → Každý kanál má jinou roli | 3 → C: Chce rozšířit zásah → Kombinace kanálů osloví různé skupiny',
      isCorrect: questionResults[14],
      explanation: 'Multi-channel není samoúčelný seznam kanálů. Smysl je v tom, že systém hledá, kde a jak doručit nabídku co nejefektivněji, a průběžně optimalizuje doručování. Klient tak nekupuje „budeme všude", ale strategii doručování a řízení výkonu. To je rozdíl oproti jednorázovému nákupu prostoru.'
    },
    {
      questionNumber: 16,
      questionText: 'Klient říká: "My už jsme zkoušeli Meta kampaně sami a nefungovaly." Co odpovíš?',
      selectedAnswer: questionResults[15] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'To je častá zkušenost. Rozdíl je v nastavení – Nelisa pracuje s kombinací kanálů, kontinuálně optimalizuje targeting a kreativu na základě dat a má know-how z desítek podobných kampaní.',
      isCorrect: questionResults[15],
      explanation: 'Klient možná spustil kampaň sám, ale pak nevěděl, jak vyhodnotit, co upravit nebo jak optimalizovat. Nelisa to dělá kontinuálně, má data z desítek kampaní a ví, kde jsou obvykle problémy. To je hlavní přidaná hodnota – ne jen „spuštění", ale řízení.'
    },
    {
      questionNumber: 17,
      questionText: 'Přiřaď situaci ke správnému formátu.',
      selectedAnswer: questionResults[16] ? 'Správné páry přiřazeny' : 'Nesprávné páry přiřazeny',
      correctAnswer: '1 → C: Seniorní specialisté → LinkedIn Channels | 2 → A: Širší publikum → Google Demand Gen | 3 → B: Zásah mimo sítě → Seznam Native',
      isCorrect: questionResults[16],
      explanation: 'Formát se vybírá podle toho, co má kampaň udělat. Jiný formát pomáhá rychle přivést reakce, jiný posílit značku, jiný zasáhnout specifické publikum. Proto správná odpověď vždy váže formát na cíl, ne na osobní preference. Klient si z toho má odnést, že volba formátu je řízené rozhodnutí, ne náhoda.'
    },
    {
      questionNumber: 18,
      questionText: 'Co je hlavní přínos toho, že Nelisa má vlastní náborový tým, který provádí recruitment intelligence?',
      selectedAnswer: questionResults[17] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Tým mapuje trh, zná reálné platy, ví, kde se lidé pohybují a co je zajímá – díky tomu je kampaň postavená na realitě, ne na představách.',
      isCorrect: questionResults[17],
      explanation: 'Recruitment intelligence znamená, že Nelisa nestaví kampaně na odhadech, ale na reálných datech z trhu. To je rozdíl proti „spustíme kampaň podle popisu pozice". Klient díky tomu dostává kampaň, která cílí tam, kde to má smysl, a s realistickým očekáváním.'
    },
    {
      questionNumber: 19,
      questionText: 'Které z těchto tvrzení vystihuje, proč je dobré pracovat s referencemi a case studies?',
      selectedAnswer: questionResults[18] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Reference ukazují, že Nelisa funguje i v podobných situacích, což snižuje obavu z rizika a pomáhá klientovi vizualizovat, jak by to u něj mohlo vypadat.',
      isCorrect: questionResults[18],
      explanation: 'Reference nejsou o chvástání, ale o snížení obavy. Když klient vidí, že podobná firma měla výsledek, je to pro něj důkaz, že to má smysl zkusit. Ideálně reference obsahuje kontext (podobný obor, pozice, problém) a reálná čísla, ne jen „funguje skvěle".'
    },
    {
      questionNumber: 20,
      questionText: 'Klient říká: "Máme vlastní HR, která se stará o employer branding, tohle by bylo asi duplicitní." Co odpovíš?',
      selectedAnswer: questionResults[19] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Employer branding je dlouhodobá práce na značce. Nelisa řeší akutní potřebu – oslovit konkrétní lidi na konkrétní pozici. To se nevylučuje, ale doplňuje.',
      isCorrect: questionResults[19],
      explanation: 'Employer branding je o tom, jak vás vnímají. Nelisa je o tom, jak oslovit konkrétní lidi teď. To jsou dvě různé věci, které se doplňují. Pokud to klient vnímá jako duplicitu, znamená to, že si myslí, že Nelisa je "jen inzerce" – a to je dobré místo, kde to vysvětlit.'
    },
    {
      questionNumber: 21,
      questionText: 'Na co má být konverzace s klientem o ceně zaměřená?',
      selectedAnswer: questionResults[20] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Na vysvětlení struktury a hodnoty – co klient dostává, jak se výsledek měří a proč ta cena dává smysl vzhledem k alternativě (agentura, interní tým).',
      isCorrect: questionResults[20],
      explanation: 'Cena není technická záležitost, ale konverzace o hodnotě. Klient potřebuje vědět, co za tu cenu dostává, jak se to poměřuje s jinými řešeními (agentura, portály, interní kapacita) a proč to dává smysl. Když tohle umíš vysvětlit, cena přestane být hlavní námitka.'
    },
    {
      questionNumber: 22,
      questionText: 'Co je hlavní důvod, proč klientovi vysvětlovat koncept "performance kampaně" místo klasického přístupu "zaplatíš za zobrazení"?',
      selectedAnswer: questionResults[21] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Protože performance kampaň znamená, že platí za výsledek (reakce, kvalitu), ne za "byl jsem vidět". To mění způsob, jak vnímá hodnotu.',
      isCorrect: questionResults[21],
      explanation: 'Klasický model je "zaplatíš X, uvidí to Y lidí". Performance model je "zaplatíš X, dostaneš Y reakcí s kvalitou Z". To je fundamentální rozdíl, protože klient neplatí za doručení, ale za výsledek. A to mění celou logiku toho, jak vyhodnocuje, jestli to bylo dobrý.'
    },
    {
      questionNumber: 23,
      questionText: 'Vyber, na co se máš ve follow-upu zaměřit jako na hlavní osu sdělení, aby interní diskuze u klienta měla šanci dojít k rozhodnutí.',
      selectedAnswer: questionResults[22] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Pošlu materiály, ale zároveň řeknu: „Rád vám je pošlu, ale aby to pro vás mělo smysl, potřebuju vědět XYZ – můžeme se na to podívat společně?\"',
      isCorrect: questionResults[22],
      explanation: 'Poslat materiály a čekat je risk, že klient ztratí kontext. Lepší je poslat podklady, ale zároveň navrhnout, že se na to podíváte společně. Tím udržíš kontrolu nad tím, jak klient Nelisu vnímá, a nedáváš mu prostor na to, aby si to špatně interpretoval sám.'
    },
    {
      questionNumber: 24,
      questionText: 'Která z těchto situací je "red flag", že obchod asi nebude fungovat, i kdyby klient řekl ano?',
      selectedAnswer: questionResults[23] ? 'Správná odpověď' : 'Nesprávná odpověď',
      correctAnswer: 'Klient očekává, že po reakci z kampaně už je hotovo, a nemusí s kandidáty komunikovat.',
      isCorrect: questionResults[23],
      explanation: 'Když klient očekává, že Nelisa vše udělá za něj, včetně komunikace s kandidáty, je to red flag. To znamená špatně nastavené očekávání a téměř jistě povede ke špatné zkušenosti. Proto je lepší to říct dopředu, než řešit nespokojenost po kampani.'
    },
    {
      questionNumber: 25,
      questionText: 'U každého kroku rozhodni, jestli zvyšuje šanci na retenci (ANO), nebo spíš ne (NE).',
      selectedAnswer: questionResults[24] ? 'Všechny odpovědi správně' : 'Některé odpovědi nesprávně',
      correctAnswer: 'ANO: Nastavení očekávání | Průběžné schůzky | Vyhodnocovací schůzka | Sledování výsledků | NE: Pravidelné změny copywritingu | Prodej brandingu | Ignorování uspokojivých výsledků',
      isCorrect: questionResults[24],
      explanation: 'Retenci nejvíc zvyšuje to, že klient má průběžně jistotu, že je o kampaň postaráno a že existuje jasný rytmus komunikace. Nastavení očekávání na startu je základ, průběžná kontrola a domluvený check-in brání tomu, aby klient dělal závěry po pár dnech. Vyhodnocovací schůzka po kampani uzavírá spolupráci profesionálně a otevírá prostor pro další krok. Naopak „nechat to být, když to jde dobře" je nejrychlejší cesta, jak ztratit vztah a příležitost pro další objednávku.'
    }
  ];

  // Map screens to question numbers
  const getQuestionNumber = (screen: typeof currentScreen): number => {
    const questionMap: Record<string, number> = {
      'story2': 1,
      'screen2': 1,
      'story3new': 2,
      'screen3new': 2,
      'story3': 3,
      'screen3': 3,
      'story4': 4,
      'screen4': 4,
      'story5': 5,
      'screen5': 5,
      'story6': 6,
      'screen6': 6,
      'story7': 7,
      'screen7': 7,
      'story8': 8,
      'screen8': 8,
      'story9': 9,
      'screen9': 9,
      'story10': 10,
      'screen10': 10,
      'story11': 11,
      'screen11': 11,
      'story12': 12,
      'screen12': 12,
      'story13': 13,
      'screen13': 13,
      'story14': 14,
      'screen14': 14,
      'story15': 15,
      'screen15': 15,
      'story16': 16,
      'screen16': 16,
      'story17': 17,
      'screen17': 17,
      'story18': 18,
      'screen18': 18,
      'story19': 19,
      'screen19': 19,
      'story20': 20,
      'screen20': 20,
      'story21': 21,
      'screen21': 21,
      'story22': 22,
      'screen23': 22,
      'story23': 23,
      'screen24': 23,
      'story24': 24,
      'screen25': 24,
      'story25': 25,
      'screen26': 25,
    };
    return questionMap[screen] || 0;
  };

  const currentQuestionNumber = getQuestionNumber(currentScreen);
  const totalQuestions = TOTAL_STORIES;

  // Track quiz results (in a real app, this would come from quiz state)
  const [quizResults] = useState({
    correctAnswers: 10, // Updated to 10 questions
    totalQuestions: 10
  });

  const handleRetryQuiz = () => {
    setQuestionResults(Array(25).fill(false));
    setSkippedQuestions(new Set());
    setSessionId(null);
    setCurrentScreen('userInfo');
  };

  const handleLogoClick = () => {
    setCurrentScreen('screen1');
  };

  const handleUserInfoSubmit = async (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    try {
      const id = await startSession(name, email);
      setSessionId(id);
    } catch (err) {
      // Supabase unavailable — quiz still works, answers won't be tracked
      console.error('[startSession] Failed to create session:', err);
    }
    setCurrentScreen('screen1');
  };

  // Handle skip question
  const handleSkipQuestion = (questionNumber: number, nextScreen: typeof currentScreen) => {
    setSkippedQuestions(prev => new Set(prev).add(questionNumber));
    setCurrentScreen(nextScreen);
  };

  /**
   * Factory that returns an onAnswerSubmit callback for a given question.
   * Updates local state immediately (no UI delay) and persists to Supabase
   * fire-and-forget so the quiz flow is never blocked by network latency.
   */
  const makeAnswerHandler = useCallback(
    (questionNumber: number, questionText: string, correctAnswer: string) =>
      (isCorrect: boolean, selectedAnswer: string) => {
        // Update local results array immediately (0-based index)
        setQuestionResults(prev => {
          const next = [...prev];
          next[questionNumber - 1] = isCorrect;
          return next;
        });
        // Persist to Supabase — fire-and-forget, errors logged to console
        if (sessionId) {
          recordAnswer(sessionId, {
            questionNumber,
            questionText,
            selectedAnswer,
            correctAnswer,
            isCorrect,
            skipped: false,
          }).catch(err => console.error('[recordAnswer] Q' + questionNumber, err));
        }
      },
    [sessionId],
  );

  // Determine screen type for progress bar
  const getScreenType = (screen: typeof currentScreen): 'story' | 'task' | null => {
    if (screen === 'userInfo' || screen === 'screen1') {
      return null; // No progress bar for these screens
    }
    if (screen === 'completion' || screen === 'admin-login' || screen === 'admin-dashboard') {
      return null; // No progress bar on these screens
    }
    if (screen.startsWith('story')) {
      return 'story';
    }
    return 'task';
  };

  const screenType = getScreenType(currentScreen);
  const showProgressBar = screenType !== null;
  
  // For completion screen, show 100% progress
  const displayQuestionNumber = currentScreen === 'completion' ? totalQuestions : currentQuestionNumber;

  return (
    <>
      {/* Global Progress Bar - No Header, Direct Progress */}
      {showProgressBar && (
        <div style={{ paddingTop: '44px' }}>
          <ProgressSection 
            currentQuestion={displayQuestionNumber} 
            totalQuestions={totalQuestions} 
            screenType={screenType} 
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 'admin-login' && (
          <AdminLogin
            key="admin-login"
            onLogin={() => setCurrentScreen('admin-dashboard')}
            onBack={() => setCurrentScreen('userInfo')}
          />
        )}

        {currentScreen === 'admin-dashboard' && (
          <AdminDashboard
            key="admin-dashboard"
            onLogout={() => setCurrentScreen('userInfo')}
          />
        )}

        {currentScreen === 'userInfo' && (
          <UserInfoScreen
            key="userInfo"
            onContinue={handleUserInfoSubmit}
            onAdminClick={() => setCurrentScreen('admin-login')}
          />
        )}
        
        {currentScreen === 'screen1' && (
          <CertificationIntro key="screen1" onStart={() => setCurrentScreen('story2')} />
        )}
        
        {currentScreen === 'story2' && (
          <StoryScreen2 key="story2" onContinue={() => setCurrentScreen('screen2')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen2' && (
          <Screen2
            key="screen2"
            onBack={() => setCurrentScreen('story2')}
            onNext={() => setCurrentScreen('story3new')}
            onSkip={() => handleSkipQuestion(1, 'story3new')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(1, questionsData[0].questionText, questionsData[0].correctAnswer)}
          />
        )}

        {currentScreen === 'story3new' && (
          <StoryScreen3New key="story3new" onContinue={() => setCurrentScreen('screen3new')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen3new' && (
          <Screen3New
            key="screen3new"
            onBack={() => setCurrentScreen('story3new')}
            onNext={() => setCurrentScreen('story3')}
            onSkip={() => handleSkipQuestion(2, 'story3')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(2, questionsData[1].questionText, questionsData[1].correctAnswer)}
          />
        )}

        {currentScreen === 'story3' && (
          <StoryScreen3 key="story3" onContinue={() => setCurrentScreen('screen3')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen3' && (
          <Screen3
            key="screen3"
            onBack={() => setCurrentScreen('story3')}
            onNext={() => setCurrentScreen('story4')}
            onSkip={() => handleSkipQuestion(3, 'story4')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(3, questionsData[2].questionText, questionsData[2].correctAnswer)}
          />
        )}

        {currentScreen === 'story4' && (
          <StoryScreen4 key="story4" onContinue={() => setCurrentScreen('screen4')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen4' && (
          <Screen4
            key="screen4"
            onBackToStory={() => setCurrentScreen('story4')}
            onNext={() => setCurrentScreen('story5')}
            onSkipTask={() => handleSkipQuestion(4, 'story5')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(4, questionsData[3].questionText, questionsData[3].correctAnswer)}
          />
        )}

        {currentScreen === 'story5' && (
          <StoryScreen5 key="story5" onContinue={() => setCurrentScreen('screen5')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen5' && (
          <Screen5
            key="screen5"
            onBack={() => setCurrentScreen('story5')}
            onNext={() => setCurrentScreen('story6')}
            onSkip={() => handleSkipQuestion(5, 'story6')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(5, questionsData[4].questionText, questionsData[4].correctAnswer)}
          />
        )}

        {currentScreen === 'story6' && (
          <StoryScreen6 key="story6" onContinue={() => setCurrentScreen('screen6')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen6' && (
          <Screen6
            key="screen6"
            onBackToStory={() => setCurrentScreen('story6')}
            onNext={() => setCurrentScreen('story7')}
            onSkipTask={() => handleSkipQuestion(6, 'story7')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(6, questionsData[5].questionText, questionsData[5].correctAnswer)}
          />
        )}

        {currentScreen === 'story7' && (
          <StoryScreen7 key="story7" onContinue={() => setCurrentScreen('screen7')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen7' && (
          <Screen7
            key="screen7"
            onBack={() => setCurrentScreen('story7')}
            onNext={() => setCurrentScreen('story8')}
            onSkip={() => handleSkipQuestion(7, 'story8')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(7, questionsData[6].questionText, questionsData[6].correctAnswer)}
          />
        )}

        {currentScreen === 'story8' && (
          <StoryScreen8 key="story8" onContinue={() => setCurrentScreen('screen8')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen8' && (
          <Screen8
            key="screen8"
            onBack={() => setCurrentScreen('story8')}
            onNext={() => setCurrentScreen('story9')}
            onSkip={() => handleSkipQuestion(8, 'story9')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(8, questionsData[7].questionText, questionsData[7].correctAnswer)}
          />
        )}

        {currentScreen === 'story9' && (
          <StoryScreen9 key="story9" onContinue={() => setCurrentScreen('screen9')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen9' && (
          <Screen9
            key="screen9"
            onBack={() => setCurrentScreen('story9')}
            onNext={() => setCurrentScreen('story10')}
            onSkip={() => handleSkipQuestion(9, 'story10')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(9, questionsData[8].questionText, questionsData[8].correctAnswer)}
          />
        )}

        {currentScreen === 'story10' && (
          <StoryScreen10 key="story10" onContinue={() => setCurrentScreen('screen10')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen10' && (
          <Screen10
            key="screen10"
            onBackToStory={() => setCurrentScreen('story10')}
            onNext={() => setCurrentScreen('story11')}
            onSkipTask={() => handleSkipQuestion(10, 'story11')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(10, questionsData[9].questionText, questionsData[9].correctAnswer)}
          />
        )}

        {currentScreen === 'story11' && (
          <StoryScreen11 key="story11" onContinue={() => setCurrentScreen('screen11')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen11' && (
          <Screen11
            key="screen11"
            onBack={() => setCurrentScreen('story11')}
            onNext={() => setCurrentScreen('story12')}
            onSkip={() => handleSkipQuestion(11, 'story12')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(11, questionsData[10].questionText, questionsData[10].correctAnswer)}
          />
        )}

        {currentScreen === 'story12' && (
          <StoryScreen12 key="story12" onContinue={() => setCurrentScreen('screen12')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen12' && (
          <Screen12
            key="screen12"
            onBackToStory={() => setCurrentScreen('story12')}
            onNext={() => setCurrentScreen('story13')}
            onSkipTask={() => handleSkipQuestion(12, 'story13')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(12, questionsData[11].questionText, questionsData[11].correctAnswer)}
          />
        )}

        {currentScreen === 'story13' && (
          <StoryScreen13 key="story13" onContinue={() => setCurrentScreen('screen13')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen13' && (
          <Screen13
            key="screen13"
            onBackToStory={() => setCurrentScreen('story13')}
            onNext={() => setCurrentScreen('story14')}
            onSkipTask={() => handleSkipQuestion(13, 'story14')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(13, questionsData[12].questionText, questionsData[12].correctAnswer)}
          />
        )}

        {currentScreen === 'story14' && (
          <StoryScreen14 key="story14" onContinue={() => setCurrentScreen('screen14')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen14' && (
          <Screen14
            key="screen14"
            onBack={() => setCurrentScreen('story14')}
            onNext={() => setCurrentScreen('story15')}
            onSkip={() => handleSkipQuestion(14, 'story15')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(14, questionsData[13].questionText, questionsData[13].correctAnswer)}
          />
        )}

        {currentScreen === 'story15' && (
          <StoryScreen15 key="story15" onContinue={() => setCurrentScreen('screen15')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen15' && (
          <Screen15
            key="screen15"
            onBack={() => setCurrentScreen('story15')}
            onNext={() => setCurrentScreen('story16')}
            onSkip={() => handleSkipQuestion(15, 'story16')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(15, questionsData[14].questionText, questionsData[14].correctAnswer)}
          />
        )}

        {currentScreen === 'story16' && (
          <StoryScreen16 key="story16" onContinue={() => setCurrentScreen('screen16')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen16' && (
          <Screen16
            key="screen16"
            onBack={() => setCurrentScreen('story16')}
            onNext={() => setCurrentScreen('story17')}
            onSkip={() => handleSkipQuestion(16, 'story17')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(16, questionsData[15].questionText, questionsData[15].correctAnswer)}
          />
        )}

        {currentScreen === 'story17' && (
          <StoryScreen17 key="story17" onContinue={() => setCurrentScreen('screen17')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen17' && (
          <Screen17
            key="screen17"
            onBack={() => setCurrentScreen('story17')}
            onNext={() => setCurrentScreen('story18')}
            onSkip={() => handleSkipQuestion(17, 'story18')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(17, questionsData[16].questionText, questionsData[16].correctAnswer)}
          />
        )}

        {currentScreen === 'story18' && (
          <StoryScreen18 key="story18" onContinue={() => setCurrentScreen('screen18')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen18' && (
          <Screen18
            key="screen18"
            onBack={() => setCurrentScreen('story18')}
            onNext={() => setCurrentScreen('story19')}
            onSkip={() => handleSkipQuestion(18, 'story19')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(18, questionsData[17].questionText, questionsData[17].correctAnswer)}
          />
        )}

        {currentScreen === 'story19' && (
          <StoryScreen19 key="story19" onContinue={() => setCurrentScreen('screen19')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen19' && (
          <Screen19
            key="screen19"
            onBack={() => setCurrentScreen('story19')}
            onNext={() => setCurrentScreen('story20')}
            onSkip={() => handleSkipQuestion(19, 'story20')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(19, questionsData[18].questionText, questionsData[18].correctAnswer)}
          />
        )}

        {currentScreen === 'story20' && (
          <StoryScreen20 key="story20" onContinue={() => setCurrentScreen('screen20')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen20' && (
          <Screen20
            key="screen20"
            onBack={() => setCurrentScreen('story20')}
            onNext={() => setCurrentScreen('story21')}
            onSkip={() => handleSkipQuestion(20, 'story21')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(20, questionsData[19].questionText, questionsData[19].correctAnswer)}
          />
        )}

        {currentScreen === 'story21' && (
          <StoryScreen21 key="story21" onContinue={() => setCurrentScreen('screen21')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen21' && (
          <Screen21
            key="screen21"
            onBack={() => setCurrentScreen('story21')}
            onNext={() => setCurrentScreen('story22')}
            onSkip={() => handleSkipQuestion(21, 'story22')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(21, questionsData[20].questionText, questionsData[20].correctAnswer)}
          />
        )}

        {currentScreen === 'story22' && (
          <StoryScreen22 key="story22" onContinue={() => setCurrentScreen('screen23')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen23' && (
          <Screen23
            key="screen23"
            onBack={() => setCurrentScreen('story22')}
            onNext={() => setCurrentScreen('story23')}
            onSkip={() => handleSkipQuestion(22, 'story23')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(22, questionsData[21].questionText, questionsData[21].correctAnswer)}
          />
        )}

        {currentScreen === 'story23' && (
          <StoryScreen23 key="story23" onContinue={() => setCurrentScreen('screen24')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen24' && (
          <Screen24
            key="screen24"
            onBack={() => setCurrentScreen('story23')}
            onNext={() => setCurrentScreen('story24')}
            onSkip={() => handleSkipQuestion(23, 'story24')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(23, questionsData[22].questionText, questionsData[22].correctAnswer)}
          />
        )}

        {currentScreen === 'story24' && (
          <StoryScreen24 key="story24" onContinue={() => setCurrentScreen('screen25')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen25' && (
          <Screen25
            key="screen25"
            onBack={() => setCurrentScreen('story24')}
            onNext={() => setCurrentScreen('story25')}
            onSkip={() => handleSkipQuestion(24, 'story25')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(24, questionsData[23].questionText, questionsData[23].correctAnswer)}
          />
        )}

        {currentScreen === 'story25' && (
          <StoryScreen25 key="story25" onContinue={() => setCurrentScreen('screen26')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen26' && (
          <Screen26
            key="screen26"
            onBack={() => setCurrentScreen('story25')}
            onNext={() => {
              // Fire-and-forget — don't block the UI while Supabase writes
              if (sessionId) {
                const correct = questionResults.filter(Boolean).length;
                const skipped = skippedQuestions.size;
                completeSession(sessionId, TOTAL_STORIES, correct, skipped)
                  .catch(err => console.error('[completeSession]', err));
              }
              setCurrentScreen('completion');
            }}
            onSkip={() => handleSkipQuestion(25, 'completion')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(25, questionsData[24].questionText, questionsData[24].correctAnswer)}
          />
        )}

        {currentScreen === 'completion' && (
          <TestResultsScreen
            key="completion"
            userName={userName}
            userEmail={userEmail}
            questionResults={questionResults}
            skippedQuestions={Array.from(skippedQuestions)}
            onRetry={handleRetryQuiz}
            questionsData={questionsData}
          />
        )}
      </AnimatePresence>
    </>
  );
}