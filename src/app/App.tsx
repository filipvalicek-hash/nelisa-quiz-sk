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
  const [userName, setUserName] = useState('Ján Novák');
  const [userEmail, setUserEmail] = useState('jan.novak@email.sk');

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
      questionText: 'Prirad ku každej situácii úroveň obchodnej príležitosti pre predaj Nelisy: HIGH / MID / LOW',
      selectedAnswer: selectedAnswers[1] ?? '',
      correctAnswer: 'A→HIGH, B→HIGH alebo MID, C→MID alebo HIGH, D→MID alebo HIGH, E→LOW',
      isCorrect: questionResults[0],
      explanation: 'Nejde o veľkosť firmy, ale o situáciu HR. Najväčší prínos má Nelisa tam, kde HR nestíha, je na všetko sama a potrebuje kompletné riešenie bez ďalšej práce navyše.'
    },
    {
      questionNumber: 2,
      questionText: 'Pretiahni materiály do správnej kategórie podľa toho, ako nutné je mať ich pripravené pred prezentačnou schôdzkou o Nelise.',
      selectedAnswer: selectedAnswers[2] ?? '',
      correctAnswer: 'Musí mať: Základná + nadstavbová prezentácia (A), Ukážky formátov (B), Demo Adminu (C), Obchodný pomocník (G)\nHodí sa / Nie je potreba: D, E, F, H',
      isCorrect: questionResults[1],
      explanation: 'Schôdzka býva úspešná vtedy, keď klient rýchlo pochopí princíp a vidí konkrétne ukážky. Pripravené materiály zvyšujú dôveryhodnosť, pretože obchodník nepôsobí neisto a nemusí dohľadávať veci za behu. Zároveň klient po schôdzke potrebuje podklady pre interné rozhodnutie a jasné ďalšie kroky, inak sa schvaľovanie rozpadne alebo sa k tomu nikto nevráti.'
    },
    {
      questionNumber: 3,
      questionText: 'Vyber úvodnú vetu, ktorá najlepšie nastaví rámec schôdzky a nehodí Ťa do škatuľky „ďalší portál/agentúra".',
      selectedAnswer: selectedAnswers[3] ?? '',
      correctAnswer: '„Nelisa pomáha firmám osloviť aj pasívnych kandidátov mimo pracovné portály pomocou riadených kampaní."',
      isCorrect: questionResults[2],
      explanation: 'Záujem vzniká, keď klient spozná, že riešime jeho problém a že to dáva obchodný zmysel. Preto sa oplatí postupovať v poradí Prečo – Čo – Ako: najprv ukázať Prečo (reálne úžitky a dopad na nábor), potom vysvetliť Čo (riadené kampane oslovujúce pasívnych kandidátov mimo portály), a až nakoniec ukázať Ako (Admin a procesy). Ak začneš funkciami, klient si to nevie zaradiť a vníma to ako ďalší nástroj; keď začneš dopadom, má dôvod počúvať.'
    },
    {
      questionNumber: 4,
      questionText: 'Vyber najlepšiu reakciu, ktorá rešpektuje portály a zároveň vysvetlí pridanú hodnotu kampaní.',
      selectedAnswer: selectedAnswers[4] ?? '',
      correctAnswer: '„Inzerát funguje hlavne na ľudí, ktorí prácu aktívne hľadajú. Kampane k tomu pridávajú zásah aj na kandidátov, ktorí teraz nehľadajú, ale môžu byť otvorení zmene."',
      isCorrect: questionResults[3],
      explanation: 'Klient často porovnáva cenu kampane s inzerciou, pretože obe veci „vyzerajú ako nábor". Rozdiel je v mechanizme aj rozsahu: pri inzeráte typicky platíš za 1 miesto na job boarde a čakáš, kto príde. Kampaň je naopak aktívna distribúcia naprieč zhruba 16 kanálmi a priebežné riadenie doručovania na výkon. Preto sa to nedá porovnávať 1:1 – klient nekupuje len „priestor" alebo nástroj na CVčka, ale riadenú HR marketingovú kampaň vrátane optimalizácie.'
    },
    {
      questionNumber: 5,
      questionText: 'Doplň dve kľúčové slová tak, aby vysvetlenie bolo stručné a obchodne použiteľné.',
      selectedAnswer: selectedAnswers[5] ?? '',
      correctAnswer: 'Blank 1: aktívnych\nBlank 2: pasívni',
      isCorrect: questionResults[4],
      explanation: 'Cieľom nie je odrecitovať percentá, ale ukázať logiku trhu práce. Portály typicky zachytia hlavne časť ľudí, ktorí aktívne hľadajú. Veľká časť trhu prácu aktívne nerieši, ale môže byť otvorená zmene, keď uvidí relevantnú ponuku v správny moment – a práve tam kampane rozširujú zásah mimo „rybník" portálov. Prakticky tak klient kampaňou zasahuje pasívnu aj aktívnu časť trhu – teda oveľa bližšie k „100 % trhu".'
    },
    {
      questionNumber: 6,
      questionText: 'Vyber najlepšiu reakciu.',
      selectedAnswer: selectedAnswers[6] ?? '',
      correctAnswer: '„V cene kampane platíte za to, že ponuku aktívne doručíme naprieč kanálmi a priebežne riadime výkon. Súčasťou sú aj priebežné štatistiky, konzultácie a grafické spracovanie bannerov, takže na to nemusíte mať vlastnú marketingovú kapacitu."',
      isCorrect: questionResults[5],
      explanation: 'Klient nekupuje len „zobrazenie", ale službu ako celok: aktívne doručenie kampane a riadenie výkonu, plus konkrétny servis okolo (štatistiky, konzultácie, grafika a bannery), ktorý má u Nelisy štandardne zahrnutý. Copywriting je navyše samostatná služba (nie je automaticky „vždy v cene").'
    },
    {
      questionNumber: 7,
      questionText: 'Klikni na tú ukážku, ktorú otvoríš ako prvú.',
      selectedAnswer: selectedAnswers[7] ?? '',
      correctAnswer: '„Ukážkou kandidátskej cesty (banner → ponuka → formulár), aby pochopil „čo uvidí človek vonku"."',
      isCorrect: questionResults[6],
      explanation: 'Najlepšie funguje ukázať jednu konkrétnu cestu kandidáta formou krátkeho príbehu. Je to rýchlejšie a účinnejšie než vysvetľovať technológiu alebo cielenie: „Predstavte si kandidáta, ktorý je práve v električke a scrolluje Facebook. Zrazu vidí banner → klikne na ponuku → má pozitívnu emóciu a počas pár sekúnd jednoducho odpovie → a reakcia sa rovnou prepíše do Teamia / ATS, kde s ním HR začne komunikovať."'
    },
    {
      questionNumber: 8,
      questionText: 'Klikni na argument, ktorý najlepšie vysvetlí význam firemného profilu. (Má to ale reálne vplyv na to, či sa človek rozhodne reagovať?)',
      selectedAnswer: selectedAnswers[8] ?? '',
      correctAnswer: '„Pretože u pasívnych kandidátov rozhoduje dôvera – profil dopĺňa kontext a zvyšuje ochotu odpovedať."',
      isCorrect: questionResults[7],
      explanation: 'Profil nie je len vizitka, ale dôveryhodnosť. Kandidát si firmu overuje a profil často rozhodne, či urobí ďalší krok, hlavne u pasívnejších ľudí, ktorí nepotrebujú prácu nutne. Kvalitný profil zvyšuje konverziu, pretože odpovedá na základné otázky a znižuje neistotu.'
    },
    {
      questionNumber: 9,
      questionText: 'Vyber odpoveď, ktorá najlepšie vysvetľuje prácu s bannermi v kampani od Nelisy.',
      selectedAnswer: selectedAnswers[9] ?? '',
      correctAnswer: '„Banner nie je len obrázok, v kampani bežia dve vizuálne varianty súčasne, sú robené pre konkrétne prostredie (feed, display) a priebežne sa optimalizujú podľa toho, čo na kandidátov reálne funguje."',
      isCorrect: questionResults[8],
      explanation: 'Klient vidí obrázok, ale hodnota je v tom, ako banner funguje v kampani. Bannery sú navrhnuté pre konkrétne prostredie a pracuje sa s nimi výkonovo. V kampani beží viac variantov súčasne a systém vyhodnocuje, čo prináša lepšie reakcie. Preto nejde len o grafiku, ale o testovanie, optimalizáciu a rýchle doručenie správy.'
    },
    {
      questionNumber: 10,
      questionText: 'Doplň do vety správne možnosti: „Pozíciu a podklady nastavíme v ___, ale reakcie kandidátov chodia do ___."',
      selectedAnswer: selectedAnswers[10] ?? '',
      correctAnswer: 'Blank 1: Adminu Nelisy\nBlank 2: Teamio alebo iného ATS',
      isCorrect: questionResults[9],
      explanation: 'Táto námietka je často o strachu z práce navyše. Správna odpoveď musí upokojiť, že recruiter nerobí marketing a nepotrebuje ďalšie know-how. Jeho úloha je zadať pozíciu a pripojiť službu, zatiaľ čo optimalizáciu kampane riadi Nelisa. Klient tým získa výsledok bez toho, aby do tímu pridával ďalšiu kompetenciu alebo kapacitu.'
    },
    {
      questionNumber: 11,
      questionText: 'Vyber položky, ktoré je potrebné mať pripravené pred spustením kampane.',
      selectedAnswer: selectedAnswers[11] ?? '',
      correctAnswer: 'Registrácia | Vyplnený firemný profil | Základné podklady k pozícii (názov, lokalita, typ roly) | Fakturačné údaje | Dohodnuté očakávania a ciele kampane',
      isCorrect: questionResults[10],
      explanation: 'Sklamanie väčšinou nevzniká z toho, že by kampaň nemala žiadny dopad, ale z toho, že si klient predstavoval niečo iné. Preto je dôležité dodržať 3 základné kroky: nastavenie očakávaní a ujasnenie cieľovky, priebežné vyhodnotenie a záverečné vyhodnotenie. Dobre vedený proces znižuje trenie a zvyšuje spokojnosť.'
    },
    {
      questionNumber: 12,
      questionText: 'Doplň do vety správne možnosti: „Po spustení spolupráce dávame klientom onboarding schôdzku po ___, kde spoločne prejdeme ___."',
      selectedAnswer: selectedAnswers[12] ?? '',
      correctAnswer: 'Blank 1: vyfakturovaní služieb\nBlank 2: základné nastavenie a orientáciu v Nelisa Admine',
      isCorrect: questionResults[11],
      explanation: 'Onboarding je zrýchlenie a poistka. Pomáha klientovi pochopiť Admin, doplniť potrebné informácie a nastaviť spoluprácu tak, aby nevznikali chyby z neznalosti. Podmienky dávajú zmysel preto, aby onboarding prebiehal vo chvíli, keď už je objednávka vyriešená a klient je pripravený.'
    },
    {
      questionNumber: 13,
      questionText: 'Vyber otázku/y, ktoré by si v túto chvíľu položil/a, aby si si overil/a, či súčasný spôsob písania inzerátov dokáže osloviť aj pasívnych kandidátov.',
      selectedAnswer: selectedAnswers[13] ?? '',
      correctAnswer: 'A) „Ako dnes premýšľate nad tým, aby bol text ponuky zaujímavý aj pre ľudí, ktorí prácu aktívne nehľadajú?"\nB) „Máte skúsenosť s tým, že by sa vám na ponuku ozvali ľudia, ktorí pôvodne zmenu práce vôbec neriešili?"',
      isCorrect: questionResults[12],
      explanation: 'Copy nie je prepísaný popis pozície, ale výkonový nástroj, ktorý rozhoduje o tom, či relevantný človek urobí ďalší krok. U kampaní to platí dvojnásobne: klient do nich investuje nemalé čiastky a bez správneho copy sa kampaň typicky „nechytí". Navyše pasívny kandidát sa správa inak než aktívny – potrebuješ ho zaujať rýchlo a nadchnúť pre myšlienku zmeny ešte skôr, než začne riešiť detaily.'
    },
    {
      questionNumber: 14,
      questionText: 'V čom je copywriting prínosný? Spáruj situáciu klienta s argumentom.',
      selectedAnswer: selectedAnswers[14] ?? '',
      correctAnswer: '1 → B alebo C | 2 → A | 3 → C alebo B',
      isCorrect: questionResults[13],
      explanation: 'Keď klient vníma copy ako kozmetiku, nebude doň investovať. Hodnota copy je v tom, že zvyšuje relevanciu, zrozumiteľnosť a dôveru, a tým zdvíha konverziu. U kampaní, ktoré oslovujú aj pasívnejšie publikum, je obsah často rozhodujúci. Preto sa copy predáva ako výkonová súčasť kampane, nie ako grafická úprava.'
    },
    {
      questionNumber: 15,
      questionText: 'Prirad správnu reakciu k tomu, čo klient týmto komentárom otvára.',
      selectedAnswer: selectedAnswers[15] ?? '',
      correctAnswer: '1 → B | 2 → A alebo C | 3 → C alebo A',
      isCorrect: questionResults[14],
      explanation: 'Multi-channel nie je samoúčelný zoznam kanálov. Zmysel je v tom, že systém hľadá, kde a ako doručiť ponuku čo najefektívnejšie, a priebežne optimalizuje doručovanie. Klient tak nekupuje „budeme všade", ale stratégiu doručovania a riadenie výkonu. To je rozdiel oproti jednorazovému nákupu priestoru.'
    },
    {
      questionNumber: 16,
      questionText: 'Vyber odpoveď, ktorá najlepšie vystihuje princíp práce s nadštandardnými formátmi u Nelisy.',
      selectedAnswer: selectedAnswers[16] ?? '',
      correctAnswer: '„Nadštandardné formáty umožňujú cielene posilniť zásah tam, kde základné riešenie nepokrýva konkrétnu potrebu."',
      isCorrect: questionResults[15],
      explanation: 'Nadštandard má byť odpoveď na potrebu, nie prvá veta prezentácie. Keď s ním začneš príliš skoro, klient to vníma ako upsell a prestane veriť, že riešiš jeho problém. Správne načasovanie je po pochopení cieľa a cieľovky.'
    },
    {
      questionNumber: 17,
      questionText: 'Prirad situáciu k správnemu formátu.',
      selectedAnswer: selectedAnswers[17] ?? '',
      correctAnswer: '1 → C: LinkedIn Channels a banner (seniórni špecialisti)\n2 → A: Google Demand Gen (širšie publikum)\n3 → B: Pinterest reklama (kreatívne orientovaní používatelia hľadajúci inšpiráciu)',
      isCorrect: questionResults[16],
      explanation: 'Formát sa vyberá podľa toho, čo má kampaň urobiť. Iný formát pomáha rýchlo priviesť reakcie, iný posilniť značku, iný zasiahnuť špecifické publikum. Preto správna odpoveď vždy viaže formát na cieľ, nie na osobné preferencie. Klient si z toho má odniesť, že voľba formátu je riadené rozhodnutie, nie náhoda.'
    },
    {
      questionNumber: 18,
      questionText: 'Stručne klientovi vysvetli, ako sa u Nelisy s nadštandardom pracuje. Vyber odpovede, ktoré by v takom vysvetlení mali zaznieť.',
      selectedAnswer: selectedAnswers[18] ?? '',
      correctAnswer: '1) „Nadštandard navrhujeme len, keď má jasný cieľ; nie je to \'skúsime\', ale riadené rozšírenie zásahu k publiku, ktoré základ nemusí pokryť."\n4) „Nejde o to robiť viac vecí, ale urobiť presne to, čo zodpovedá cieľu pozície."',
      isCorrect: questionResults[17],
      explanation: 'Klient sa bojí, že platí za pokus. Preto musí byť nadštandard vysvetlený ako riadená voľba s logikou – čo tým získame a ako spoznáme úspech. Keď obchodník nevie povedať prečo, znie to ako drahá hračka. Keď vie popísať prínos a meradlo, klient vníma nadštandard ako chytrú investíciu.'
    },
    {
      questionNumber: 19,
      questionText: 'Vyber jedno vysvetlenie, ktoré by si klientovi v túto chvíľu povedal/a. Také, ktoré je pravdivé, zrozumiteľné a nezahltí detailmi.',
      selectedAnswer: selectedAnswers[19] ?? '',
      correctAnswer: '„Meta sleduje, ako ľudia na reklamy reagujú, a postupne podľa toho upravuje, komu sa zobrazujú."',
      isCorrect: questionResults[18],
      explanation: 'Klient potrebuje vedieť, čo sa optimalizuje a prečo. Správna odpoveď ukazuje, že doručovanie nie je „ručné cielenie" podľa demografie, ale algoritmická optimalizácia podľa správania ľudí v online priestore – systém sleduje, ako používatelia na reklamy reagujú, a postupne upravuje, komu sa ponuka zobrazuje, aby ju videli čo najrelevantnejší kandidáti.'
    },
    {
      questionNumber: 20,
      questionText: 'Vyber odpoveď, ktorá je správna a obchodne použiteľná.',
      selectedAnswer: selectedAnswers[20] ?? '',
      correctAnswer: '„V HR kampaniach sú obmedzenia, nemožno cieliť vek/pohlavie; pracujeme s inými signálmi a lokalitou a optimalizáciou, aby sa reklama dostala k relevantným ľuďom."',
      isCorrect: questionResults[19],
      explanation: 'Platformy majú pravidlá a obmedzenia, ktoré sa v HR dotýkajú cielenia aj formátov. Klient si to môže vyložiť ako „nejde to", preto je dôležité vysvetliť, že sa len volia iné spôsoby cielenia a práce s publikom. Správna reakcia nastaví realistické možnosti a nespôsobí prehnané sľuby.'
    },
    {
      questionNumber: 21,
      questionText: 'Vyber odpoveď, pomocou ktorej by si klientovi vysvetlil/a realitu fungovania Meta kampaní.',
      selectedAnswer: selectedAnswers[21] ?? '',
      correctAnswer: '„To je pomerne častá skúsenosť. U kampaní na Mete sa prvé dni až zhruba týždeň zbierajú dáta a systém sa učí, komu ponuku zobrazovať. Keď sa kampaň vypne príliš skoro, väčšinou sa k tej fáze, keď začne fungovať, ani nedostane."',
      isCorrect: questionResults[20],
      explanation: 'Kampaň nemá stabilný výkon hneď od začiatku, pretože systém sa učí a ladí doručovanie. Klient je často zvyknutý na inzerát, kde reakcie prichádzajú rýchlo a potom slabú. U kampaní to môže byť naopak – výkon sa môže zlepšovať v čase. Preto je dôležité povedať, kedy dáva zmysel hodnotiť a kedy je to predčasné.'
    },
    {
      questionNumber: 22,
      questionText: 'Klient hovorí: „Počuj, my tie portály máme celkom vychytané. Zatiaľ nám fungujú." Vyber odpoveď, ktorá najlepšie vysvetľuje, kde Nelisa doplní portály.',
      selectedAnswer: selectedAnswers[22] ?? '',
      correctAnswer: '„Portály pracujú s existujúcim dopytom. Kampane pomáhajú ten dopyt aktívne vytvárať a rozširovať mimo portály."',
      isCorrect: questionResults[21],
      explanation: 'Klient nechce počuť, že jeho súčasné riešenie je zlé. Keď začneš zhadzovať portály, vyvoláš odpor a obrannú reakciu. Správny prístup je portály rešpektovať a vysvetliť doplnenie. Kampane rozširujú zásah mimo existujúci dopyt, a tým privádzajú iné publikum aj iné reakcie. Klient sa cíti pochopený a zároveň vidí dôvod, prečo pridať ďalšiu vrstvu.'
    },
    {
      questionNumber: 23,
      questionText: 'Vyber, na čo sa máš vo follow-upe zamerať ako na hlavnú os správy, aby interná diskusia u klienta mala šancu dôjsť k rozhodnutiu.',
      selectedAnswer: selectedAnswers[23] ?? '',
      correctAnswer: 'Hlavný úžitok kampaní – aký konkrétny náborový problém Nelisa rieši, prečo portály samé nestačia a čo klient získa navyše (zásah mimo aktívnych kandidátov, menšia konkurencia).',
      isCorrect: questionResults[22],
      explanation: 'Na konci klient často nemá problém s produktom, ale s tým, že nevie, čo teraz konkrétne urobiť. Dobré zhrnutie a jasný ďalší krok zvyšujú šancu, že sa schvaľovanie a štart naozaj stane. Keď klient odchádza bez „next steps", schôdzka často vyšumí a rozhodnutie sa odkladá.'
    },
    {
      questionNumber: 24,
      questionText: 'Pri každom kroku rozhodni, či zvyšuje šancu na retenciu (ÁNO), alebo skôr nie (NIE).',
      selectedAnswer: selectedAnswers[24] ?? '',
      correctAnswer: 'ÁNO: Nastavenie očakávaní | Priebežná schôdzka o výsledkoch | Vyhodnocovacia schôdzka po kampani | Priebežné sledovanie výsledkov\nNIE: Pravidelné zmeny copywritingu | Predaj brandingovej reklamy | „Ak ide dobre, nemusím s klientom nič riešiť"',
      isCorrect: questionResults[23],
      explanation: 'Retenciu najviac zvyšuje to, že klient má priebežne istotu, že je o kampaň postarané a existuje jasný rytmus komunikácie. Nastavenie očakávaní na štarte je základ, priebežná kontrola bráni tomu, aby klient robil závery po pár dňoch. Vyhodnocovacia schôdzka uzatvára spoluprácu profesionálne a otvára priestor pre ďalší krok. Naopak „nechať to byť, keď to ide dobre" je najrýchlejšia cesta, ako stratiť vzťah a príležitosť pre ďalšiu objednávku.'
    },
    {
      questionNumber: 25,
      questionText: 'Ku každej námietke prirad najvhodnejšiu argumentáciu, ktorú by si použil/a pri obchodnom rokovaní.',
      selectedAnswer: selectedAnswers[25] ?? '',
      correctAnswer: '1 (Príliš drahé) → A\n2 (Nemáme náborovú potrebu) → B\n3 (Riešime sami/s agentúrou) → C\n4 (Ďalší systém navyše) → D\n5 (Skúšali sme, nefungovalo) → E\n6 (Stačia jobboardy) → F',
      isCorrect: questionResults[24],
      explanation: 'Správna reakcia na námietky nestojí len na „protiargumente", ale na pochopení kontextu klienta. Každá z uvedených odpovedí reaguje na konkrétnu obavu a vracia debatu k hodnote, ktorú Nelisa prináša – či už ide o širší zásah, špecializované know-how, jednoduchosť implementácie alebo prácu s pasívnymi kandidátmi.'
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