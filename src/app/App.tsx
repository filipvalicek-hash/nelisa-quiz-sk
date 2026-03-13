import { useState, useCallback, useEffect, useRef } from 'react';
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
import { MetaAdsModule } from '@/app/components/MetaAdsModule';

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
    'meta-ads-module' |
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

  // Track the actual answer each user submitted (keyed by 1-based question number)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  // Track raw selection data for visual restoration (keyed by 1-based question number)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answerSelections, setAnswerSelections] = useState<Record<number, any>>({});

  // Track skipped questions
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());

  // Retry mode state
  const [retryMode, setRetryMode] = useState(false);
  const [retryQuestions, setRetryQuestions] = useState<number[]>([]);
  const retryQuestionsRef = useRef<number[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(1);

  // Centralized question data for results display
  // This should match the actual questions used in each Screen component
  const questionsData = [
    {
      questionNumber: 1,
      questionText: 'Přiřaď ke každé situaci úroveň obchodní příležitosti pro prodej Nelisy: HIGH / MID / LOW',
      selectedAnswer: selectedAnswers[1] ?? '',
      correctAnswer: 'A→HIGH, B→HIGH nebo MID, C→MID nebo HIGH, D→MID nebo HIGH, E→LOW',
      isCorrect: questionResults[0],
      explanation: 'Nejde o velikost firmy, ale o situaci HR. Největší přínos má Nelisa tam, kde HR nestíhá, je na vše sama a potřebuje kompletní řešení bez další práce navíc.'
    },
    {
      questionNumber: 2,
      questionText: 'Přetáhni materiály do správné kategorie podle toho, jak nutné je mít je připravené před prezentační schůzkou o Nelise.',
      selectedAnswer: selectedAnswers[2] ?? '',
      correctAnswer: 'Musí mít: Základní + nadstavbová prezentace (A), Ukázky formátů (B), Demo Adminu (C), Obchodní pomocník (G)\nHodí se / Není potřeba: D, E, F, H',
      isCorrect: questionResults[1],
      explanation: 'Schůzka bývá úspěšná tehdy, když klient rychle pochopí princip a vidí konkrétní ukázky. Připravené materiály zvyšují důvěryhodnost, protože obchodník nepůsobí nejistě a nemusí dohledávat věci za běhu. Zároveň klient po schůzce potřebuje podklady pro interní rozhodnutí a jasné další kroky, jinak se schvalování rozpadne nebo se k tomu nikdo nevrátí.'
    },
    {
      questionNumber: 3,
      questionText: 'Vyber úvodní větu, která nejlépe nastaví rámec schůzky a nehodí Tě do škatulky „další portál/agentura".',
      selectedAnswer: selectedAnswers[3] ?? '',
      correctAnswer: '„Nelisa pomáhá firmám oslovit i pasivní kandidáty mimo pracovní portály pomocí řízených kampaní."',
      isCorrect: questionResults[2],
      explanation: 'Zájem vzniká, když klient pozná, že řešíme jeho problém a že to dává obchodní smysl. Proto se vyplatí postupovat v pořadí Proč – Co – Jak: nejdřív ukázat Proč (reálné užitky a dopad na nábor), potom vysvětlit Co (řízené kampaně oslovující pasivní kandidáty mimo portály), a teprve nakonec ukázat Jak (Admin a procesy). Pokud začneš funkcemi, klient si to neumí zařadit a vnímá to jako další nástroj; když začneš dopadem, má důvod poslouchat.'
    },
    {
      questionNumber: 4,
      questionText: 'Vyber nejlepší reakci, která respektuje portály a zároveň vysvětlí přidanou hodnotu kampaní.',
      selectedAnswer: selectedAnswers[4] ?? '',
      correctAnswer: '„Inzerát funguje hlavně na lidi, kteří práci aktivně hledají. Kampaně k tomu přidávají zásah i na kandidáty, kteří teď nehledají, ale mohou být otevření změně."',
      isCorrect: questionResults[3],
      explanation: 'Klient často porovnává cenu kampaně s inzercí, protože obě věci „vypadají jako nábor". Rozdíl je v mechanismu i rozsahu: u inzerátu typicky platíš za 1 místo na job boardu a čekáš, kdo přijde. Kampaň je naopak aktivní distribuce napříč zhruba 16 kanály a průběžné řízení doručování na výkon. Proto to nejde srovnávat 1:1 – klient nekupuje jen „prostor" nebo nástroj na CVčka, ale řízenou HR marketingovou kampaň včetně optimalizace.'
    },
    {
      questionNumber: 5,
      questionText: 'Doplň dvě klíčová slova tak, aby vysvětlení bylo stručné a obchodně použitelné.',
      selectedAnswer: selectedAnswers[5] ?? '',
      correctAnswer: 'Blank 1: aktivních\nBlank 2: pasivní',
      isCorrect: questionResults[4],
      explanation: 'Cílem není odrecitovat procenta, ale ukázat logiku trhu práce. Portály typicky zachytí hlavně část lidí, kteří aktivně hledají. Velká část trhu práci aktivně neřeší, ale může být otevřená změně, když uvidí relevantní nabídku ve správný moment – a právě tam kampaně rozšiřují zásah mimo „rybník" portálů. Prakticky tak klient kampaní zasahuje pasivní i aktivní část trhu – tedy mnohem blíž k „100 % trhu".'
    },
    {
      questionNumber: 6,
      questionText: 'Vyber nejlepší reakci.',
      selectedAnswer: selectedAnswers[6] ?? '',
      correctAnswer: '„V ceně kampaně platíte za to, že nabídku aktivně doručíme napříč kanály a průběžně řídíme výkon. Součástí jsou i průběžné statistiky, konzultace a grafické zpracování bannerů, takže na to nemusíte mít vlastní marketingovou kapacitu."',
      isCorrect: questionResults[5],
      explanation: 'Klient nekupuje jen „zobrazení", ale službu jako celek: aktivní doručení kampaně a řízení výkonu, plus konkrétní servis kolem (statistiky, konzultace, grafika a bannery), který má u Nelisy standardně zahrnutý. Copywriting je navíc samostatná služba (není automaticky „vždy v ceně").'
    },
    {
      questionNumber: 7,
      questionText: 'Klikni na tu ukázku, kterou otevřeš jako první.',
      selectedAnswer: selectedAnswers[7] ?? '',
      correctAnswer: '„Ukázkou kandidátské cesty (banner → nabídka → formulář), aby pochopil „co uvidí člověk venku"."',
      isCorrect: questionResults[6],
      explanation: 'Nejlépe funguje ukázat jednu konkrétní cestu kandidáta formou krátkého příběhu. Je to rychlejší a účinnější než vysvětlovat technologii nebo cílení: „Představte si kandidáta, který je zrovna v tramvaji a scrolluje Facebook. Najednou vidí banner → klikne na nabídku → má pozitivní emoci a během pár vteřin jednoduše odpoví → a reakce se rovnou propíše do Teamia / ATS, kde s ním HR začne komunikovat."'
    },
    {
      questionNumber: 8,
      questionText: 'Klikni na argument, který nejlépe vysvětlí význam firemního profilu. (Má to ale reálně vliv na to, jestli se člověk rozhodne reagovat?)',
      selectedAnswer: selectedAnswers[8] ?? '',
      correctAnswer: '„Protože u pasivních kandidátů rozhoduje důvěra – profil doplňuje kontext a zvyšuje ochotu odpovědět."',
      isCorrect: questionResults[7],
      explanation: 'Profil není jen vizitka, ale důvěryhodnost. Kandidát si firmu ověřuje a profil často rozhodne, jestli udělá další krok, hlavně u pasivnějších lidí, kteří nepotřebují práci nutně. Kvalitní profil zvyšuje konverzi, protože odpovídá na základní otázky a snižuje nejistotu.'
    },
    {
      questionNumber: 9,
      questionText: 'Vyber odpověď, která nejlépe vysvětluje práci s bannery v kampani od Nelisy.',
      selectedAnswer: selectedAnswers[9] ?? '',
      correctAnswer: '„Banner není jen obrázek, v kampani běží dvě vizuální varianty současně, jsou dělané pro konkrétní prostředí (feed, display) a průběžně se optimalizují podle toho, co na kandidáty reálně funguje."',
      isCorrect: questionResults[8],
      explanation: 'Klient vidí obrázek, ale hodnota je v tom, jak banner funguje v kampani. Bannery jsou navržené pro konkrétní prostředí a pracuje se s nimi výkonově. V kampani běží více variant současně a systém vyhodnocuje, co přináší lepší reakce. Proto nejde jen o grafiku, ale o testování, optimalizaci a rychlé doručení sdělení.'
    },
    {
      questionNumber: 10,
      questionText: 'Doplň do věty správné možnosti: „Pozici a podklady nastavíme v ___, ale reakce kandidátů chodí do ___."',
      selectedAnswer: selectedAnswers[10] ?? '',
      correctAnswer: 'Blank 1: Adminu Nelisy\nBlank 2: Teamio nebo jiného ATS',
      isCorrect: questionResults[9],
      explanation: 'Tahle námitka je často o strachu z práce navíc. Správná odpověď musí uklidnit, že recruiter nedělá marketing a nepotřebuje další know-how. Jeho role je zadat pozici a připojit službu, zatímco optimalizaci kampaně řídí Nelisa. Klient tím získá výsledek bez toho, aby do týmu přidával další kompetenci nebo kapacitu.'
    },
    {
      questionNumber: 11,
      questionText: 'Vyber položky, které je potřeba mít připravené před spuštěním kampaně.',
      selectedAnswer: selectedAnswers[11] ?? '',
      correctAnswer: 'Registrace | Vyplněný firemní profil | Základní podklady k pozici (název, lokalita, typ role) | Fakturační údaje | Dohodnutá očekávání a cíle kampaně',
      isCorrect: questionResults[10],
      explanation: 'Zklamání většinou nevzniká z toho, že by kampaň neměla žádný dopad, ale z toho, že si klient představoval něco jiného. Proto je důležité držet 3 základní kroky: nastavení očekávání a ujasnění cílovky, průběžné vyhodnocení a závěrečné vyhodnocení. Dobře vedený proces snižuje tření a zvyšuje spokojenost.'
    },
    {
      questionNumber: 12,
      questionText: 'Doplň do věty správné možnosti: „Po spuštění spolupráce dáváme klientům onboarding schůzku po ___, kde společně projdeme ___."',
      selectedAnswer: selectedAnswers[12] ?? '',
      correctAnswer: 'Blank 1: vyfakturování služeb\nBlank 2: základní nastavení a orientaci v Nelisa Adminu',
      isCorrect: questionResults[11],
      explanation: 'Onboarding je zrychlení a pojistka. Pomáhá klientovi pochopit Admin, doplnit potřebné informace a nastavit spolupráci tak, aby nevznikaly chyby z neznalosti. Podmínky dávají smysl proto, aby onboarding probíhal ve chvíli, kdy už je objednávka vyřešená a klient je připravený.'
    },
    {
      questionNumber: 13,
      questionText: 'Vyber otázku/y, které bys v tuhle chvíli položil/a, aby sis ověřil/a, jestli současný způsob psaní inzerátů dokáže oslovit i pasivní kandidáty.',
      selectedAnswer: selectedAnswers[13] ?? '',
      correctAnswer: 'A) „Jak dnes přemýšlíte nad tím, aby byl text nabídky zajímavý i pro lidi, kteří práci aktivně nehledají?"\nB) „Máte zkušenost s tím, že by se vám na nabídku ozvali lidé, kteří původně změnu práce vůbec neřešili?"',
      isCorrect: questionResults[12],
      explanation: 'Copy není přepsaný popis pozice, ale výkonový nástroj, který rozhoduje o tom, jestli relevantní člověk udělá další krok. U kampaní to platí dvojnásob: klient do nich investuje nemalé částky a bez správného copy se kampaň typicky „nechytí". Navíc pasivní kandidát se chová jinak než aktivní – potřebuješ ho zaujmout rychle a nadchnout pro myšlenku změny ještě dřív, než začne řešit detaily.'
    },
    {
      questionNumber: 14,
      questionText: 'V čem je copywriting přínosný? Spáruj situaci klienta s argumentem.',
      selectedAnswer: selectedAnswers[14] ?? '',
      correctAnswer: '1 → B nebo C | 2 → A | 3 → C nebo B',
      isCorrect: questionResults[13],
      explanation: 'Když klient vnímá copy jako kosmetiku, nebude do něj investovat. Hodnota copy je v tom, že zvyšuje relevanci, srozumitelnost a důvěru, a tím zvedá konverzi. U kampaní, které oslovují i pasivnější publikum, je obsah často rozhodující. Proto se copy prodává jako výkonová součást kampaně, ne jako grafická úprava.'
    },
    {
      questionNumber: 15,
      questionText: 'Přiřaď správnou reakci k tomu, co klient tímhle komentářem otevírá.',
      selectedAnswer: selectedAnswers[15] ?? '',
      correctAnswer: '1 → B | 2 → A nebo C | 3 → C nebo A',
      isCorrect: questionResults[14],
      explanation: 'Multi-channel není samoúčelný seznam kanálů. Smysl je v tom, že systém hledá, kde a jak doručit nabídku co nejefektivněji, a průběžně optimalizuje doručování. Klient tak nekupuje „budeme všude", ale strategii doručování a řízení výkonu. To je rozdíl oproti jednorázovému nákupu prostoru.'
    },
    {
      questionNumber: 16,
      questionText: 'Vyber odpověď, která nejlépe vystihuje princip práce s nadstandardními formáty u Nelisy.',
      selectedAnswer: selectedAnswers[16] ?? '',
      correctAnswer: '„Nadstandardní formáty umožňují cíleně posílit zásah tam, kde základní řešení nepokrývá konkrétní potřebu."',
      isCorrect: questionResults[15],
      explanation: 'Nadstandard má být odpověď na potřebu, ne první věta prezentace. Když s ním začneš moc brzy, klient to vnímá jako upsell a přestane věřit, že řešíš jeho problém. Správné načasování je po pochopení cíle a cílovky.'
    },
    {
      questionNumber: 17,
      questionText: 'Přiřaď situaci ke správnému formátu.',
      selectedAnswer: selectedAnswers[17] ?? '',
      correctAnswer: '1 → C: LinkedIn Channels a banner (seniorní specialisté)\n2 → A: Google Demand Gen (širší publikum)\n3 → B: Seznam Native (zásah mimo sociální sítě)',
      isCorrect: questionResults[16],
      explanation: 'Formát se vybírá podle toho, co má kampaň udělat. Jiný formát pomáhá rychle přivést reakce, jiný posílit značku, jiný zasáhnout specifické publikum. Proto správná odpověď vždy váže formát na cíl, ne na osobní preference. Klient si z toho má odnést, že volba formátu je řízené rozhodnutí, ne náhoda.'
    },
    {
      questionNumber: 18,
      questionText: 'Stručně klientovi vysvětli, jak se u Nelisy s nadstandardem pracuje. Vyber odpovědi, které by v takovém vysvětlení měly zaznít.',
      selectedAnswer: selectedAnswers[18] ?? '',
      correctAnswer: '1) „Nadstandard navrhujeme jen, když má jasný cíl; není to \'zkusíme\', ale řízené rozšíření zásahu k publiku, které základ nemusí pokrýt."\n4) „Nejde o to dělat víc věcí, ale udělat přesně to, co odpovídá cíli pozice."',
      isCorrect: questionResults[17],
      explanation: 'Klient se bojí, že platí za pokus. Proto musí být nadstandard vysvětlený jako řízená volba s logikou – co tím získáme a jak poznáme úspěch. Když obchodník neumí říct proč, zní to jako drahá hračka. Když umí popsat přínos a měřítko, klient vnímá nadstandard jako chytrou investici.'
    },
    {
      questionNumber: 19,
      questionText: 'Vyber jedno vysvětlení, které bys klientovi v tuhle chvíli řekl/a. Takové, které je pravdivé, srozumitelné a nezahlcuje detaily.',
      selectedAnswer: selectedAnswers[19] ?? '',
      correctAnswer: '„Meta sleduje, jak lidé na reklamy reagují, a postupně podle toho upravuje, komu se zobrazují."',
      isCorrect: questionResults[18],
      explanation: 'Klient potřebuje vědět, co se optimalizuje a proč. Správná odpověď ukazuje, že doručování není „ruční cílení" podle demografie, ale algoritmická optimalizace podle chování lidí v online prostoru – systém sleduje, jak uživatelé na reklamy reagují, a postupně upravuje, komu se nabídka zobrazuje, aby ji viděli co nejrelevantnější kandidáti.'
    },
    {
      questionNumber: 20,
      questionText: 'Vyber odpověď, která je správná a obchodně použitelná.',
      selectedAnswer: selectedAnswers[20] ?? '',
      correctAnswer: '„V HR kampaních jsou omezení, nelze cílit věk/pohlaví; pracujeme s jinými signály a lokalitou a optimalizací, aby se reklama dostala k relevantním lidem."',
      isCorrect: questionResults[19],
      explanation: 'Platformy mají pravidla a omezení, která se v HR dotýkají cílení i formátů. Klient si to může vyložit jako „nejde to", proto je důležité vysvětlit, že se jen volí jiné způsoby cílení a práce s publikem. Správná reakce nastaví realistické možnosti a nezpůsobí přehnané sliby.'
    },
    {
      questionNumber: 21,
      questionText: 'Vyber odpověď, pomocí které bys klientovi vysvětlil/a realitu fungování Meta kampaní.',
      selectedAnswer: selectedAnswers[21] ?? '',
      correctAnswer: '„To je poměrně častá zkušenost. U kampaní na Metě se první dny až zhruba týden sbírají data a systém se učí, komu nabídku zobrazovat. Když se kampaň vypne moc brzy, většinou se k té fázi, kdy začne fungovat, ani nedostane."',
      isCorrect: questionResults[20],
      explanation: 'Kampaň nemá stabilní výkon hned od začátku, protože systém se učí a ladí doručování. Klient je často zvyklý na inzerát, kde reakce přichází rychle a pak slábnou. U kampaní to může být opačně – výkon se může zlepšovat v čase. Proto je důležité říct, kdy dává smysl hodnotit a kdy je to předčasné.'
    },
    {
      questionNumber: 22,
      questionText: 'Klient říká: „Hele, my ty portály máme docela vychytané. Zatím nám fungují." Vyber odpověď, která nejlépe vysvětluje, kde Nelisa doplní portály.',
      selectedAnswer: selectedAnswers[22] ?? '',
      correctAnswer: '„Portály pracují s existující poptávkou. Kampaně pomáhají tu poptávku aktivně vytvářet a rozšiřovat mimo portály."',
      isCorrect: questionResults[21],
      explanation: 'Klient nechce slyšet, že jeho současné řešení je špatně. Když začneš shazovat portály, vyvoláš odpor a obrannou reakci. Správný přístup je portály respektovat a vysvětlit doplnění. Kampaně rozšiřují zásah mimo existující poptávku, a tím přivádí jiné publikum i jiné reakce. Klient se cítí pochopený a zároveň vidí důvod, proč přidat další vrstvu.'
    },
    {
      questionNumber: 23,
      questionText: 'Vyber, na co se máš ve follow-upu zaměřit jako na hlavní osu sdělení, aby interní diskuze u klienta měla šanci dojít k rozhodnutí.',
      selectedAnswer: selectedAnswers[23] ?? '',
      correctAnswer: 'Hlavní užitek kampaní – jaký konkrétní náborový problém Nelisa řeší, proč portály samy nestačí a co klient získá navíc (zásah mimo aktivní kandidáty, menší konkurence).',
      isCorrect: questionResults[22],
      explanation: 'Na konci klient často nemá problém s produktem, ale s tím, že neví, co teď konkrétně udělat. Dobré shrnutí a jasný další krok zvyšují šanci, že se schvalování a start opravdu stane. Když klient odchází bez „next steps", schůzka často vyšumí a rozhodnutí se odkládá.'
    },
    {
      questionNumber: 24,
      questionText: 'U každého kroku rozhodni, jestli zvyšuje šanci na retenci (ANO), nebo spíš ne (NE).',
      selectedAnswer: selectedAnswers[24] ?? '',
      correctAnswer: 'ANO: Nastavení očekávání | Průběžná schůzka o výsledcích | Vyhodnocovací schůzka po kampani | Průběžné sledování výsledků\nNE: Pravidelné změny copywritingu | Prodej brandingové reklamy | „Pokud jde dobře, nemusím s klientem nic řešit"',
      isCorrect: questionResults[23],
      explanation: 'Retenci nejvíc zvyšuje to, že klient má průběžně jistotu, že je o kampaň postaráno a existuje jasný rytmus komunikace. Nastavení očekávání na startu je základ, průběžná kontrola brání tomu, aby klient dělal závěry po pár dnech. Vyhodnocovací schůzka uzavírá spolupráci profesionálně a otevírá prostor pro další krok. Naopak „nechat to být, když to jde dobře" je nejrychlejší cesta, jak ztratit vztah a příležitost pro další objednávku.'
    },
    {
      questionNumber: 25,
      questionText: 'Ke každé námitce přiřaď nejvhodnější argumentaci, kterou bys použil/a při obchodním jednání.',
      selectedAnswer: selectedAnswers[25] ?? '',
      correctAnswer: '1 (Moc drahé) → A\n2 (Nemáme náborovou potřebu) → B\n3 (Řešíme sami/s agenturou) → C\n4 (Další systém navíc) → D\n5 (Zkoušeli jsme, nefungovalo) → E\n6 (Stačí jobboardy) → F',
      isCorrect: questionResults[24],
      explanation: 'Správná reakce na námitky nestojí jen na „protiargumentu", ale na pochopení kontextu klienta. Každá z uvedených odpovědí reaguje na konkrétní obavu a vrací debatu k hodnotě, kterou Nelisa přináší – ať už jde o širší zásah, specializované know-how, jednoduchost implementace nebo práci s pasivními kandidáty.'
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

  // Map question number → its preceding story screen (used for retry navigation)
  const questionToStoryScreen: Record<number, string> = {
    1: 'story2', 2: 'story3new', 3: 'story3', 4: 'story4', 5: 'story5',
    6: 'story6', 7: 'story7', 8: 'story8', 9: 'story9', 10: 'story10',
    11: 'story11', 12: 'story12', 13: 'story13', 14: 'story14', 15: 'story15',
    16: 'story16', 17: 'story17', 18: 'story18', 19: 'story19', 20: 'story20',
    21: 'story21', 22: 'story22', 23: 'story23', 24: 'story24', 25: 'story25',
  };

  /**
   * Returns the next screen for retry navigation.
   * After last retry question → 'completion'.
   * Otherwise → story screen of the next wrong question.
   * Uses a ref so the closure always sees the latest retryQuestions.
   */
  const getNextScreenForRetry = useCallback((questionNumber: number): string => {
    const rqs = retryQuestionsRef.current;
    const idx = rqs.indexOf(questionNumber);
    if (idx === -1 || idx === rqs.length - 1) {
      return 'completion';
    }
    return questionToStoryScreen[rqs[idx + 1]];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Smart retry — keeps correct answers, replays only wrong questions with their stories. */
  const handleRetryQuiz = () => {
    const wrongQs = questionResults
      .map((correct, i) => (!correct ? i + 1 : null))
      .filter(Boolean) as number[];

    if (wrongQs.length === 0) return; // nothing to retry

    // Clear only wrong answers so they become editable again
    setSelectedAnswers(prev => {
      const next = { ...prev };
      wrongQs.forEach(q => delete next[q]);
      return next;
    });
    setAnswerSelections(prev => {
      const next = { ...prev };
      wrongQs.forEach(q => delete next[q]);
      return next;
    });

    retryQuestionsRef.current = wrongQs;
    setRetryQuestions(wrongQs);
    setRetryMode(true);
    setCurrentAttempt(prev => prev + 1);

    // Navigate to story of first wrong question
    setCurrentScreen(questionToStoryScreen[wrongQs[0]] as typeof currentScreen);
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

  // Map question number to the screen name (task screen, not story)
  const questionToScreen: Record<number, typeof currentScreen> = {
    1: 'screen2',
    2: 'screen3new',
    3: 'screen3',
    4: 'screen4',
    5: 'screen5',
    6: 'screen6',
    7: 'screen7',
    8: 'screen8',
    9: 'screen9',
    10: 'screen10',
    11: 'screen11',
    12: 'screen12',
    13: 'screen13',
    14: 'screen14',
    15: 'screen15',
    16: 'screen16',
    17: 'screen17',
    18: 'screen18',
    19: 'screen19',
    20: 'screen20',
    21: 'screen21',
    22: 'screen23',
    23: 'screen24',
    24: 'screen25',
    25: 'screen26',
  };

  // Navigate to a specific question by number (only accessible questions)
  const handleNavigateToQuestion = (questionNumber: number) => {
    const target = questionToScreen[questionNumber];
    if (target) {
      setCurrentScreen(target);
    }
  };

  // Set of questions that have been answered (confirmed) or skipped
  const answeredQuestions = new Set<number>([
    ...selectedAnswers ? Object.keys(selectedAnswers).map(Number) : [],
    ...Array.from(skippedQuestions),
  ]);

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
        // Store the actual answer the user selected
        setSelectedAnswers(prev => ({ ...prev, [questionNumber]: selectedAnswer }));
        // Persist to Supabase — fire-and-forget, errors logged to console
        if (sessionId) {
          recordAnswer(sessionId, {
            questionNumber,
            questionText,
            selectedAnswer,
            correctAnswer,
            isCorrect,
            skipped: false,
            attemptNumber: currentAttempt,
          }).catch(err => console.error('[recordAnswer] Q' + questionNumber, err));
        }
      },
    [sessionId, currentAttempt],
  );

  // Store raw selection data for visual restoration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeSelection = useCallback((questionNumber: number, selection: any) => {
    setAnswerSelections(prev => ({ ...prev, [questionNumber]: selection }));
  }, []);

  // When retry completes (navigates to 'completion'), update session score in Supabase
  useEffect(() => {
    if (currentScreen === 'completion' && retryMode && sessionId) {
      const correct = questionResults.filter(Boolean).length;
      completeSession(sessionId, 25, correct, skippedQuestions.size)
        .catch(err => console.error('[completeSession retry]', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreen]);

  /**
   * Returns the onNext handler for a question screen.
   * In retry mode: navigates to the next wrong question's story (or completion).
   * In normal mode: navigates to the given default next screen.
   */
  const makeOnNext = useCallback(
    (questionNumber: number, defaultNext: string) => () => {
      if (retryMode) {
        setCurrentScreen(getNextScreenForRetry(questionNumber) as typeof currentScreen);
      } else {
        setCurrentScreen(defaultNext as typeof currentScreen);
      }
    },
    [retryMode, getNextScreenForRetry],
  );

  // Correctly answered questions for progress bar graying in retry mode
  const correctQuestions = retryMode
    ? new Set<number>(
        questionResults
          .map((correct, i) => (correct ? i + 1 : null))
          .filter(Boolean) as number[]
      )
    : undefined;

  // Determine screen type for progress bar
  const getScreenType = (screen: typeof currentScreen): 'story' | 'task' | null => {
    if (screen === 'userInfo' || screen === 'screen1') {
      return null; // No progress bar for these screens
    }
    if (screen === 'completion' || screen === 'admin-login' || screen === 'admin-dashboard' || screen === 'meta-ads-module') {
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
            onNavigate={retryMode ? undefined : handleNavigateToQuestion}
            answeredQuestions={answeredQuestions}
            correctQuestions={correctQuestions}
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
            onModuleClick={() => setCurrentScreen('meta-ads-module')}
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
            onNext={makeOnNext(1, 'story3new')}
            onSkip={() => handleSkipQuestion(1, 'story3new')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(1, questionsData[0].questionText, questionsData[0].correctAnswer)}
            initialConfirmed={!!selectedAnswers[1]}
            initialSelection={answerSelections[1]}
            onStoreSelection={(sel) => storeSelection(1, sel)}
          />
        )}

        {currentScreen === 'story3new' && (
          <StoryScreen3New key="story3new" onContinue={() => setCurrentScreen('screen3new')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen3new' && (
          <Screen3New
            key="screen3new"
            onBack={() => setCurrentScreen('story3new')}
            onNext={makeOnNext(2, 'story3')}
            onSkip={() => handleSkipQuestion(2, 'story3')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(2, questionsData[1].questionText, questionsData[1].correctAnswer)}
            initialConfirmed={!!selectedAnswers[2]}
            initialSelection={answerSelections[2]}
            onStoreSelection={(sel) => storeSelection(2, sel)}
          />
        )}

        {currentScreen === 'story3' && (
          <StoryScreen3 key="story3" onContinue={() => setCurrentScreen('screen3')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen3' && (
          <Screen3
            key="screen3"
            onBack={() => setCurrentScreen('story3')}
            onNext={makeOnNext(3, 'story4')}
            onSkip={() => handleSkipQuestion(3, 'story4')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(3, questionsData[2].questionText, questionsData[2].correctAnswer)}
            initialConfirmed={!!selectedAnswers[3]}
            initialSelection={answerSelections[3]}
            onStoreSelection={(sel) => storeSelection(3, sel)}
          />
        )}

        {currentScreen === 'story4' && (
          <StoryScreen4 key="story4" onContinue={() => setCurrentScreen('screen4')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen4' && (
          <Screen4
            key="screen4"
            onBackToStory={() => setCurrentScreen('story4')}
            onNext={makeOnNext(4, 'story5')}
            onSkipTask={() => handleSkipQuestion(4, 'story5')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(4, questionsData[3].questionText, questionsData[3].correctAnswer)}
            initialConfirmed={!!selectedAnswers[4]}
            initialSelection={answerSelections[4]}
            onStoreSelection={(sel) => storeSelection(4, sel)}
          />
        )}

        {currentScreen === 'story5' && (
          <StoryScreen5 key="story5" onContinue={() => setCurrentScreen('screen5')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen5' && (
          <Screen5
            key="screen5"
            onBack={() => setCurrentScreen('story5')}
            onNext={makeOnNext(5, 'story6')}
            onSkip={() => handleSkipQuestion(5, 'story6')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(5, questionsData[4].questionText, questionsData[4].correctAnswer)}
            initialConfirmed={!!selectedAnswers[5]}
            initialSelection={answerSelections[5]}
            onStoreSelection={(sel) => storeSelection(5, sel)}
          />
        )}

        {currentScreen === 'story6' && (
          <StoryScreen6 key="story6" onContinue={() => setCurrentScreen('screen6')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen6' && (
          <Screen6
            key="screen6"
            onBackToStory={() => setCurrentScreen('story6')}
            onNext={makeOnNext(6, 'story7')}
            onSkipTask={() => handleSkipQuestion(6, 'story7')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(6, questionsData[5].questionText, questionsData[5].correctAnswer)}
            initialConfirmed={!!selectedAnswers[6]}
            initialSelection={answerSelections[6]}
            onStoreSelection={(sel) => storeSelection(6, sel)}
          />
        )}

        {currentScreen === 'story7' && (
          <StoryScreen7 key="story7" onContinue={() => setCurrentScreen('screen7')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen7' && (
          <Screen7
            key="screen7"
            onBack={() => setCurrentScreen('story7')}
            onNext={makeOnNext(7, 'story8')}
            onSkip={() => handleSkipQuestion(7, 'story8')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(7, questionsData[6].questionText, questionsData[6].correctAnswer)}
            initialConfirmed={!!selectedAnswers[7]}
            initialSelection={answerSelections[7]}
            onStoreSelection={(sel) => storeSelection(7, sel)}
          />
        )}

        {currentScreen === 'story8' && (
          <StoryScreen8 key="story8" onContinue={() => setCurrentScreen('screen8')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen8' && (
          <Screen8
            key="screen8"
            onBack={() => setCurrentScreen('story8')}
            onNext={makeOnNext(8, 'story9')}
            onSkip={() => handleSkipQuestion(8, 'story9')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(8, questionsData[7].questionText, questionsData[7].correctAnswer)}
            initialConfirmed={!!selectedAnswers[8]}
            initialSelection={answerSelections[8]}
            onStoreSelection={(sel) => storeSelection(8, sel)}
          />
        )}

        {currentScreen === 'story9' && (
          <StoryScreen9 key="story9" onContinue={() => setCurrentScreen('screen9')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen9' && (
          <Screen9
            key="screen9"
            onBack={() => setCurrentScreen('story9')}
            onNext={makeOnNext(9, 'story10')}
            onSkip={() => handleSkipQuestion(9, 'story10')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(9, questionsData[8].questionText, questionsData[8].correctAnswer)}
            initialConfirmed={!!selectedAnswers[9]}
            initialSelection={answerSelections[9]}
            onStoreSelection={(sel) => storeSelection(9, sel)}
          />
        )}

        {currentScreen === 'story10' && (
          <StoryScreen10 key="story10" onContinue={() => setCurrentScreen('screen10')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen10' && (
          <Screen10
            key="screen10"
            onBackToStory={() => setCurrentScreen('story10')}
            onNext={makeOnNext(10, 'story11')}
            onSkipTask={() => handleSkipQuestion(10, 'story11')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(10, questionsData[9].questionText, questionsData[9].correctAnswer)}
            initialConfirmed={!!selectedAnswers[10]}
            initialSelection={answerSelections[10]}
            onStoreSelection={(sel) => storeSelection(10, sel)}
          />
        )}

        {currentScreen === 'story11' && (
          <StoryScreen11 key="story11" onContinue={() => setCurrentScreen('screen11')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen11' && (
          <Screen11
            key="screen11"
            onBack={() => setCurrentScreen('story11')}
            onNext={makeOnNext(11, 'story12')}
            onSkip={() => handleSkipQuestion(11, 'story12')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(11, questionsData[10].questionText, questionsData[10].correctAnswer)}
            initialConfirmed={!!selectedAnswers[11]}
            initialSelection={answerSelections[11]}
            onStoreSelection={(sel) => storeSelection(11, sel)}
          />
        )}

        {currentScreen === 'story12' && (
          <StoryScreen12 key="story12" onContinue={() => setCurrentScreen('screen12')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen12' && (
          <Screen12
            key="screen12"
            onBackToStory={() => setCurrentScreen('story12')}
            onNext={makeOnNext(12, 'story13')}
            onSkipTask={() => handleSkipQuestion(12, 'story13')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(12, questionsData[11].questionText, questionsData[11].correctAnswer)}
            initialConfirmed={!!selectedAnswers[12]}
            initialSelection={answerSelections[12]}
            onStoreSelection={(sel) => storeSelection(12, sel)}
          />
        )}

        {currentScreen === 'story13' && (
          <StoryScreen13 key="story13" onContinue={() => setCurrentScreen('screen13')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen13' && (
          <Screen13
            key="screen13"
            onBackToStory={() => setCurrentScreen('story13')}
            onNext={makeOnNext(13, 'story14')}
            onSkipTask={() => handleSkipQuestion(13, 'story14')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(13, questionsData[12].questionText, questionsData[12].correctAnswer)}
            initialConfirmed={!!selectedAnswers[13]}
            initialSelection={answerSelections[13]}
            onStoreSelection={(sel) => storeSelection(13, sel)}
          />
        )}

        {currentScreen === 'story14' && (
          <StoryScreen14 key="story14" onContinue={() => setCurrentScreen('screen14')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen14' && (
          <Screen14
            key="screen14"
            onBack={() => setCurrentScreen('story14')}
            onNext={makeOnNext(14, 'story15')}
            onSkip={() => handleSkipQuestion(14, 'story15')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(14, questionsData[13].questionText, questionsData[13].correctAnswer)}
            initialConfirmed={!!selectedAnswers[14]}
            initialSelection={answerSelections[14]}
            onStoreSelection={(sel) => storeSelection(14, sel)}
          />
        )}

        {currentScreen === 'story15' && (
          <StoryScreen15 key="story15" onContinue={() => setCurrentScreen('screen15')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen15' && (
          <Screen15
            key="screen15"
            onBack={() => setCurrentScreen('story15')}
            onNext={makeOnNext(15, 'story16')}
            onSkip={() => handleSkipQuestion(15, 'story16')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(15, questionsData[14].questionText, questionsData[14].correctAnswer)}
            initialConfirmed={!!selectedAnswers[15]}
            initialSelection={answerSelections[15]}
            onStoreSelection={(sel) => storeSelection(15, sel)}
          />
        )}

        {currentScreen === 'story16' && (
          <StoryScreen16 key="story16" onContinue={() => setCurrentScreen('screen16')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen16' && (
          <Screen16
            key="screen16"
            onBack={() => setCurrentScreen('story16')}
            onNext={makeOnNext(16, 'story17')}
            onSkip={() => handleSkipQuestion(16, 'story17')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(16, questionsData[15].questionText, questionsData[15].correctAnswer)}
            initialConfirmed={!!selectedAnswers[16]}
            initialSelection={answerSelections[16]}
            onStoreSelection={(sel) => storeSelection(16, sel)}
          />
        )}

        {currentScreen === 'story17' && (
          <StoryScreen17 key="story17" onContinue={() => setCurrentScreen('screen17')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen17' && (
          <Screen17
            key="screen17"
            onBack={() => setCurrentScreen('story17')}
            onNext={makeOnNext(17, 'story18')}
            onSkip={() => handleSkipQuestion(17, 'story18')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(17, questionsData[16].questionText, questionsData[16].correctAnswer)}
            initialConfirmed={!!selectedAnswers[17]}
            initialSelection={answerSelections[17]}
            onStoreSelection={(sel) => storeSelection(17, sel)}
          />
        )}

        {currentScreen === 'story18' && (
          <StoryScreen18 key="story18" onContinue={() => setCurrentScreen('screen18')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen18' && (
          <Screen18
            key="screen18"
            onBack={() => setCurrentScreen('story18')}
            onNext={makeOnNext(18, 'story19')}
            onSkip={() => handleSkipQuestion(18, 'story19')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(18, questionsData[17].questionText, questionsData[17].correctAnswer)}
            initialConfirmed={!!selectedAnswers[18]}
            initialSelection={answerSelections[18]}
            onStoreSelection={(sel) => storeSelection(18, sel)}
          />
        )}

        {currentScreen === 'story19' && (
          <StoryScreen19 key="story19" onContinue={() => setCurrentScreen('screen19')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen19' && (
          <Screen19
            key="screen19"
            onBack={() => setCurrentScreen('story19')}
            onNext={makeOnNext(19, 'story20')}
            onSkip={() => handleSkipQuestion(19, 'story20')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(19, questionsData[18].questionText, questionsData[18].correctAnswer)}
            initialConfirmed={!!selectedAnswers[19]}
            initialSelection={answerSelections[19]}
            onStoreSelection={(sel) => storeSelection(19, sel)}
          />
        )}

        {currentScreen === 'story20' && (
          <StoryScreen20 key="story20" onContinue={() => setCurrentScreen('screen20')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen20' && (
          <Screen20
            key="screen20"
            onBack={() => setCurrentScreen('story20')}
            onNext={makeOnNext(20, 'story21')}
            onSkip={() => handleSkipQuestion(20, 'story21')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(20, questionsData[19].questionText, questionsData[19].correctAnswer)}
            initialConfirmed={!!selectedAnswers[20]}
            initialSelection={answerSelections[20]}
            onStoreSelection={(sel) => storeSelection(20, sel)}
          />
        )}

        {currentScreen === 'story21' && (
          <StoryScreen21 key="story21" onContinue={() => setCurrentScreen('screen21')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen21' && (
          <Screen21
            key="screen21"
            onBack={() => setCurrentScreen('story21')}
            onNext={makeOnNext(21, 'story22')}
            onSkip={() => handleSkipQuestion(21, 'story22')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(21, questionsData[20].questionText, questionsData[20].correctAnswer)}
            initialConfirmed={!!selectedAnswers[21]}
            initialSelection={answerSelections[21]}
            onStoreSelection={(sel) => storeSelection(21, sel)}
          />
        )}

        {currentScreen === 'story22' && (
          <StoryScreen22 key="story22" onContinue={() => setCurrentScreen('screen23')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen23' && (
          <Screen23
            key="screen23"
            onBack={() => setCurrentScreen('story22')}
            onNext={makeOnNext(22, 'story23')}
            onSkip={() => handleSkipQuestion(22, 'story23')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(22, questionsData[21].questionText, questionsData[21].correctAnswer)}
            initialConfirmed={!!selectedAnswers[22]}
            initialSelection={answerSelections[22]}
            onStoreSelection={(sel) => storeSelection(22, sel)}
          />
        )}

        {currentScreen === 'story23' && (
          <StoryScreen23 key="story23" onContinue={() => setCurrentScreen('screen24')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen24' && (
          <Screen24
            key="screen24"
            onBack={() => setCurrentScreen('story23')}
            onNext={makeOnNext(23, 'story24')}
            onSkip={() => handleSkipQuestion(23, 'story24')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(23, questionsData[22].questionText, questionsData[22].correctAnswer)}
            initialConfirmed={!!selectedAnswers[23]}
            initialSelection={answerSelections[23]}
            onStoreSelection={(sel) => storeSelection(23, sel)}
          />
        )}

        {currentScreen === 'story24' && (
          <StoryScreen24 key="story24" onContinue={() => setCurrentScreen('screen25')} onLogoClick={handleLogoClick} />
        )}
        {currentScreen === 'screen25' && (
          <Screen25
            key="screen25"
            onBack={() => setCurrentScreen('story24')}
            onNext={makeOnNext(24, 'story25')}
            onSkip={() => handleSkipQuestion(24, 'story25')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(24, questionsData[23].questionText, questionsData[23].correctAnswer)}
            initialConfirmed={!!selectedAnswers[24]}
            initialSelection={answerSelections[24]}
            onStoreSelection={(sel) => storeSelection(24, sel)}
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
              if (retryMode) {
                // In retry mode, navigate to next wrong question's story or completion
                setCurrentScreen(getNextScreenForRetry(25) as typeof currentScreen);
              } else {
                // Fire-and-forget — don't block the UI while Supabase writes
                if (sessionId) {
                  const correct = questionResults.filter(Boolean).length;
                  const skipped = skippedQuestions.size;
                  completeSession(sessionId, TOTAL_STORIES, correct, skipped)
                    .catch(err => console.error('[completeSession]', err));
                }
                setCurrentScreen('completion');
              }
            }}
            onSkip={() => handleSkipQuestion(25, 'completion')}
            onLogoClick={handleLogoClick}
            onAnswerSubmit={makeAnswerHandler(25, questionsData[24].questionText, questionsData[24].correctAnswer)}
            initialConfirmed={!!selectedAnswers[25]}
            initialSelection={answerSelections[25]}
            onStoreSelection={(sel) => storeSelection(25, sel)}
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
            selectedAnswers={selectedAnswers}
            onModuleClick={() => setCurrentScreen('meta-ads-module')}
            retryMode={retryMode}
            retryQuestions={retryQuestions}
          />
        )}

        {currentScreen === 'meta-ads-module' && (
          <MetaAdsModule
            key="meta-ads-module"
            onFinish={() => setCurrentScreen('userInfo')}
          />
        )}
      </AnimatePresence>
    </>
  );
}