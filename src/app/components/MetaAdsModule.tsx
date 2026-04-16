import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, BookOpen, MessageCircle, Zap, Target, TrendingUp, Users, Globe, AlertTriangle, Award, Layers, Sliders } from 'lucide-react';
import logoImage from 'figma:asset/df61b6f2193a78afb780969de31b920fd241cf00.png';

interface MetaAdsModuleProps {
  onFinish: () => void;
}

const TOTAL_SLIDES = 18;

// ─── Reusable sub-components ────────────────────────────────────────────────

function ChapterBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border self-start mb-4"
      style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
      <BookOpen className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
      <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
        {label}
      </span>
    </div>
  );
}

function SalesQuote({ text }: { text: string }) {
  return (
    <div className="rounded-2xl p-6 mt-4"
      style={{ backgroundColor: 'rgba(174, 84, 255, 0.07)', border: '1.5px solid rgba(174, 84, 255, 0.22)' }}>
      <div className="flex gap-3 items-start">
        <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#AE54FF' }} strokeWidth={2} />
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>
            Ako to povedať klientovi
          </p>
          <p className="text-sm leading-relaxed italic" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function FactorCard({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#E9E5F0' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(174, 84, 255, 0.1)' }}>
        <Icon className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
      </div>
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>{title}</p>
        <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>{text}</p>
      </div>
    </div>
  );
}

// ─── Slide content ──────────────────────────────────────────────────────────

function Slide2() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Aukcia pozornosti" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Súťaž o pozornosť
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Každé scrollnutie je <strong style={{ color: '#192550' }}>mikro-okamih rozhodovania</strong>. Platforma vyberá z desiatok reklám, ktorú zobrazí práve tomuto človeku. Nejde o to, kto zaplatil najviac – Meta sa pýta na tri veci naraz:
      </p>
      <div className="space-y-3 mb-5">
        <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
          <span className="text-xl flex-shrink-0">👥</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>Kto chce tohto človeka osloviť?</p>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Koľko inzerentov súperí o pozornosť rovnakého používateľa.</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
          <span className="text-xl flex-shrink-0">🎯</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>Aká je šanca, že zareaguje?</p>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Platforma odhaduje, či človek na reklamu klikne, alebo ju preskroluje.</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
          <span className="text-xl flex-shrink-0">💰</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>Koľko za to inzerent ponúka?</p>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Rozpočet hrá rolu, ale nie je jediný faktor.</p>
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        → Platforma zobrazí reklamu s najlepšou kombináciou relevancie a ponuky. Nie je to len o peniazoch – je to súťaž o pozornosť.
      </p>
    </div>
  );
}

function Slide0() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 zo 4" />
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>
        Ako fungujú reklamy na sociálnych sieťach
      </h1>
      <p className="text-base font-semibold mb-6" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>
        Meta – Facebook &amp; Instagram
      </p>
      <p className="text-base leading-relaxed mb-4" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
        V tomto module sa naučíš, ako fungujú reklamy na sociálnych sieťach, prečo sa líšia výsledky kampaní, ako sa kampane v čase zlepšujú a prečo Nelisa pracuje s mixom kanálov. Na záver nájdeš Cheat Sheet s najčastejšími otázkami klientov.
      </p>
      <div className="flex items-center gap-3 mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.06)', border: '1px solid rgba(174, 84, 255, 0.15)' }}>
        <span className="text-2xl">⏱️</span>
        <p className="text-sm" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
          Celková dĺžka modulu: cca <strong style={{ color: '#192550' }}>10–12 minút</strong>
        </p>
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Relevancia" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Prečo záleží na relevancii, nie len na peniazoch
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Meta zarába na tom, že ľudia na platforme <strong style={{ color: '#192550' }}>trávia čas</strong>. Keby ukazovala len reklamy od toho, kto zaplatí najviac, ľudia by ich ignorovali, prestali scrollovať – a Meta by prišla o príjmy.
      </p>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Preto platforme záleží na tom, aby reklamy boli relevantné. <strong style={{ color: '#192550' }}>Relevantnejšia reklama tak často vyhrá aj s nižšou cenou za preklik</strong>.
      </p>
      <div className="p-5 rounded-2xl mt-2" style={{ backgroundColor: 'rgba(34, 197, 94, 0.07)', border: '1.5px solid rgba(34, 197, 94, 0.25)' }}>
        <p className="font-bold text-sm mb-2" style={{ color: '#15803D', fontFamily: 'Poppins, sans-serif' }}>✅ Kľúčový princíp</p>
        <p className="text-sm leading-relaxed" style={{ color: '#14532D', fontFamily: 'Poppins, sans-serif' }}>
          Meta neukazuje reklamy preto, že niekto zaplatil. Ukazuje ich preto, že <strong>dávajú zmysel konkrétnym ľuďom v konkrétnom okamihu</strong>.
        </p>
      </div>
    </div>
  );
}

function Slide4() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Náborové kampane" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Špecifiká náborových kampaní na Meta
      </h2>
      <div className="p-4 rounded-xl mb-5 flex gap-3" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1.5px solid rgba(251, 191, 36, 0.4)' }}>
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} strokeWidth={2} />
        <p className="text-sm leading-relaxed" style={{ color: '#92400E', fontFamily: 'Poppins, sans-serif' }}>
          <strong>Dôležité obmedzenie:</strong> Pri pracovnej inzercii na Meta <strong>nie je možné cieliť podľa veku ani pohlavia</strong>. To je pravidlo platformy pre HR reklamu.
        </p>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Relevancia preto nevzniká ručným nastavením „chcem mužov 25–35", ale tým, <strong style={{ color: '#192550' }}>ako je ponuka komunikovaná</strong> – textom, vizuálom a celkovým kontextom reklamy.
      </p>
      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Algoritmus sleduje, ako ľudia na reklamu reagujú. Ak určitý typ ľudí kliká, platforma sa to naučí a začne ju ukazovať <strong style={{ color: '#192550' }}>podobným ľuďom</strong>. Ak ju ľudia ignorujú alebo skrývajú, platforma ju prestane ukazovať – a výkon klesá.
      </p>
    </div>
  );
}

function Slide5() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Zhrnutie" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Ako to vysvetliť klientovi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Klient väčšinou pozná job portály. Tvoja úloha je vysvetliť rozdiel jednoducho – bez technického žargónu.
      </p>
      <SalesQuote text="Reklamy na sociálnych sieťach fungujú inak než job portál. Nejdeme čakať, kým si niekto otvorí ponuky práce. Ideme za ľuďmi priamo tam, kde trávia čas – na Facebook a Instagram, prípadne s Nelisou aj na ďalšie sociálne siete. Platforma potom vyberá, komu reklamu ukázať, podľa toho, či dáva tomu konkrétnemu človeku zmysel. Preto je dôležité, aby pracovná ponuka bola jasná a atraktívna – to je základ dobrého výkonu kampane." />
    </div>
  );
}

function Slide6() {
  return (
    <div>
      <ChapterBadge label="Kapitola 2 zo 4" />
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>
        Prečo majú niektoré kampane lepšie výsledky než iné
      </h1>
      <p className="text-base leading-relaxed mb-5" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
        Toto je asi najčastejšia otázka, ktorú klient položí: <em>„Prečo tá jedna pozícia mala 200 preklikov a druhá len 60?"</em> Odpoveď nikdy nie je len o peniazoch.
      </p>
      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Výkon kampane ovplyvňuje <strong style={{ color: '#192550' }}>5 faktorov, ktoré sa vzájomne násobia</strong>. V tejto kapitole si ich prejdeme jeden po druhom.
      </p>
      <div className="flex items-center gap-2 mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.06)', border: '1px solid rgba(174, 84, 255, 0.15)' }}>
        <span className="text-lg">🔗</span>
        <p className="text-sm font-medium" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
          Rovnaký budget ≠ rovnaký výsledok
        </p>
      </div>
    </div>
  );
}

function Slide7() {
  return (
    <div>
      <ChapterBadge label="Kapitola 2 — Faktor 1 a 2" />
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Atraktivita ponuky a kreatíva reklamy
      </h2>
      <div className="space-y-4">
        <FactorCard
          icon={Target}
          title="Faktor 1: Atraktivita pracovnej ponuky"
          text="Zrozumiteľnosť, konkrétne benefity (nie 'motivujúce platové ohodnotenie', ale 'od 1 400 € + bonusy'), nízka bariéra prihlásenia. Ak je ponuka vágna, ľudia ju preskrolujú → platforma ju prestane ukazovať → vyššia cena."
        />
        <FactorCard
          icon={Zap}
          title="Faktor 2: Kreatíva (vizuál a text)"
          text="Aj skvelá ponuka môže mať slabý výkon, ak kreatíva nezaujme. Dôležitý fenomén: opozeranosť (ad fatigue) – keď sa rovnaká kreatíva opakuje, preklikovosť klesá, cena rastie. Preto sa kreatívy pravidelne obmieňajú – je to normálna súčasť procesu."
        />
      </div>
    </div>
  );
}

function Slide8() {
  return (
    <div>
      <ChapterBadge label="Kapitola 2 — Faktor 3 a 4" />
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Lokalita a konkurencia v aukcii
      </h2>
      <div className="space-y-4">
        <FactorCard
          icon={Globe}
          title="Faktor 3: Veľkosť cieľovej skupiny v danej lokalite"
          text="Kampaň na pozíciu skladníka v Bratislave má úplne iné publikum než rovnaká pozícia v malom meste s 15 000 obyvateľmi. Menšia lokalita = rýchlejšia saturácia = vyššia cena za preklik. To nie je chyba kampane – je to matematika."
        />
        <FactorCard
          icon={TrendingUp}
          title="Faktor 4: Konkurencia v aukcii"
          text="Ak v rovnakej lokalite bežia reklamy od desiatich ďalších zamestnávateľov, cena rastie. Sezónnosť hrá rolu – v septembri býva konkurencia vyššia. Naopak v lete a okolo sviatkov býva lacnejšie, ale menej ľudí aktívne reaguje."
        />
      </div>
    </div>
  );
}

function Slide9() {
  return (
    <div>
      <ChapterBadge label="Kapitola 2 — Faktor 5 + reťaz" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Kvalita cieľovej stránky a celkový reťaz
      </h2>
      <FactorCard
        icon={Users}
        title="Faktor 5: Kvalita cieľovej stránky (landing page)"
        text="Človek klikne na reklamu a dostane sa na ponuku. Ak je stránka pomalá, neprehľadná alebo sa na mobile zle vypĺňa formulár, odíde. To priamo neovplyvní počet preklikov, ale ovplyvní, koľko z nich sa skutočne prihlási."
      />
      <div className="mt-5 p-5 rounded-2xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.07)', border: '1.5px solid rgba(174, 84, 255, 0.22)' }}>
        <p className="font-bold text-sm mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>🔗 Ako to drží pohromade</p>
        <div className="flex flex-wrap gap-2 items-center text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#475569' }}>
          {['Atraktívna ponuka', 'Dobrá kreatíva', 'Dostatok ľudí v lokalite', 'Rozumná konkurencia', 'Funkčná cieľová stránka'].map((item, i, arr) => (
            <span key={i} className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: '#fff', border: '1px solid #AE54FF', color: '#AE54FF' }}>{item}</span>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#AE54FF' }} />}
            </span>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Ak jedno z týchto očiek povolí, výkon celej kampane klesne.</p>
      </div>
    </div>
  );
}

function Slide11() {
  return (
    <div>
      <ChapterBadge label="Kapitola 3 zo 4" />
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>
        Ako sa kampane v čase zlepšujú
      </h1>
      <p className="text-base leading-relaxed mb-5" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
        Algoritmus Meta nie je statický. Je to systém, ktorý sa neustále učí z toho, čo sa deje. Zakaždým, keď niekto na reklamu klikne alebo ju preskroluje, platforma si to zapíše a nabudúce lepšie odhadne, komu reklamu ukázať.
      </p>
      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.07)', border: '1.5px solid rgba(174, 84, 255, 0.2)' }}>
        <p className="font-bold text-sm mb-2" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>📈 Learning phase</p>
        <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
          Každá nová kampaň prechádza <strong style={{ color: '#192550' }}>učiacou fázou</strong>. Platforma v prvých dňoch testuje – ukazuje reklamu rôznym typom ľudí a sleduje, kto reaguje. Výsledky sú preto nestabilné: jeden deň 30 preklikov, druhý deň 8. <strong style={{ color: '#192550' }}>To je normálne a očakávané.</strong>
        </p>
        <p className="text-sm leading-relaxed mt-3" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
          Po learning phase sa výkon stabilizuje. Kampane, ktoré bežia stabilne niekoľko týždňov, majú tendenciu mať lepšie výsledky než kampane, ktoré sa neustále zapínajú a vypínajú.
        </p>
      </div>
    </div>
  );
}

function Slide12() {
  const items = [
    { days: '3 dni', icon: '🌱', color: '#F59E0B', text: 'Nemá dosť dát. Algoritmus sa ešte len zaúča, výsledky sú nestabilné.' },
    { days: '3 týždne', icon: '📈', color: '#10B981', text: 'Slušný základ. Výkon sa typicky stabilizuje a zlepšuje.' },
  ];
  return (
    <div>
      <ChapterBadge label="Kapitola 3 — Dĺžka kampane" />
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Čo to znamená prakticky
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Systém sleduje, kto kliká, a hľadá vzorce – vek, záujmy, správanie, čas aktivity. <strong style={{ color: '#192550' }}>Čím viac dát má, tým presnejšie cieli.</strong>
      </p>
      <div className="space-y-3 mb-5">
        {items.map(item => (
          <div key={item.days} className="flex gap-4 p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#E9E5F0' }}>
            <div className="text-xl flex-shrink-0">{item.icon}</div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: item.color, fontFamily: 'Poppins, sans-serif' }}>Kampaň beží {item.days}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Kampane nastavujeme tak, aby platforma hľadala ľudí, ktorí s najväčšou pravdepodobnosťou kliknú na reklamu a dostanú sa na ponuku. Systém sa v tom postupne zlepšuje – učí sa z každého prekliku.
      </p>
    </div>
  );
}

function Slide14() {
  return (
    <div>
      <ChapterBadge label="Kapitola 3 — Zhrnutie" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Ako to povedať klientovi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Klient, ktorý vidí slabé výsledky v prvom týždni, je nervózny. Tvoja úloha je nastaviť správne očakávania <strong style={{ color: '#192550' }}>ešte pred štartom kampane</strong>.
      </p>
      <SalesQuote text="Kampane na sociálnych sieťach sa v čase zlepšujú. Platforma sa učí z výsledkov – kto kliká, kedy, odkiaľ. Preto potrebujú nejaký čas na rozbeh. Po pár týždňoch sa výkon stabilizuje a typicky zlepšuje. Je to ako nový zamestnanec – prvý týždeň sa zaúča, ale potom už vie, čo robiť." />
    </div>
  );
}

function Slide16() {
  return (
    <div>
      <ChapterBadge label="Kapitola 4 — Čo Nelisa robí inak" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Ako Nelisa pracuje s kanálmi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Nelisa vie pracovať s celým radom kanálov naraz – <strong style={{ color: '#192550' }}>Meta, Google, Seznam a ďalšie</strong>. Klient nakúpi budget a Nelisa ho takticky rozpúšťa medzi kanály podľa toho, kde sú výsledky najlepšie.
      </p>
      <div className="space-y-3">
        {[
          { icon: '📊', text: 'Ak Meta v danej lokalite funguje skvele, ide tam viac peňazí.' },
          { icon: '🔄', text: 'Ak jeden kanál „vyschne" (saturácia, sezónnosť), ostatné to vyrovnajú.' },
          { icon: '👁️', text: 'Klient vidí výsledok: koľko ľudí sa prihlásilo a za koľko – nie kde reklama bežala.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide17() {
  return (
    <div>
      <ChapterBadge label="Kapitola 4 — Škálovanie" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Kohútik s uchádzačmi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Veľká výhoda oproti job portálom je <strong style={{ color: '#192550' }}>rýchlosť a flexibilita</strong>. Na job portáli zaplatíte za inzerát a čakáte. Pri PPC reklamách máte kontrolu:
      </p>
      <div className="space-y-2">
        {[
          { trigger: 'Potrebujete rýchlo nabrať?', action: 'Pridáme budget, rozšírime kanály, zintenzívnime kampane.' },
          { trigger: 'Otvárate novú pobočku?', action: 'Spustíme kampane na novú lokalitu v priebehu dní.' },
          { trigger: 'Niečo nefunguje?', action: 'Vymeníme kreatívu, presunieme budget, otestujeme iný kanál.' },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
            <p className="text-xs font-bold mb-1" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>→ {item.trigger}</p>
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>{item.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide18() {
  return (
    <div>
      <ChapterBadge label="Kapitola 4 — Zhrnutie" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Ako to povedať klientovi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Klient chce vedieť, prečo nemať len jeden kanál a prečo Nelisa. Tu je veta, ktorá to hovorí jasne:
      </p>
      <SalesQuote text="Nelisa nefunguje ako jeden inzerát na jednom portáli. Je to systém, ktorý rozpúšťa váš budget medzi najvýkonnejšie kanály – Facebook, Instagram, Google, Seznam. Keď potrebujete pridať uchádzačov, pridáme výkon. Keď je plno, zvoľníme. Máte kontrolu nad prísunom ľudí, nie naopak." />
    </div>
  );
}

// ─── Cheat Sheet slides ──────────────────────────────────────────────────────

function QACard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#E9E5F0' }}>
      <div className="px-4 py-3" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)' }}>
        <p className="text-sm font-semibold" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>💬 {question}</p>
      </div>
      <div className="px-4 py-3" style={{ backgroundColor: '#fff' }}>
        <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>→ {answer}</p>
      </div>
    </div>
  );
}

function Slide19() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border self-start mb-4"
        style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.4)' }}>
        <span className="text-xs tracking-wider uppercase font-bold" style={{ color: '#D97706', fontFamily: 'Poppins, sans-serif' }}>⚡ Cheat Sheet</span>
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Klient hovorí → Ty odpovedáš
      </h2>
      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Najčastejšie otázky a ako na ne reagovať (1 / 3)</p>
      <div className="space-y-3">
        <QACard question="Prečo by sme platili za reklamy, keď máme job portál?" answer="Job portál čaká, kým si niekto otvorí ponuky. My ideme za ľuďmi tam, kde trávia čas – na sociálnych sieťach. Oslovujeme aj tých, ktorí by si prácu inak nehľadali, ale ponuka ich zaujme. Je to úplne iný zdroj kandidátov." />
        <QACard question="Čo všetko ovplyvní výkon kampane?" answer="Výkon závisí od atraktivity ponuky, vzhľadu reklamy, veľkosti okruhu ľudí v lokalite a konkurencie. Keď to vidíme, vieme povedať, čo konkrétne zlepšiť – napríklad zmeniť vizuál alebo spresniť text ponuky." />
      </div>
    </div>
  );
}

function Slide20() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border self-start mb-4"
        style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.4)' }}>
        <span className="text-xs tracking-wider uppercase font-bold" style={{ color: '#D97706', fontFamily: 'Poppins, sans-serif' }}>⚡ Cheat Sheet</span>
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Klient hovorí → Ty odpovedáš
      </h2>
      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Najčastejšie otázky a ako na ne reagovať (2 / 3)</p>
      <div className="space-y-3">
        <QACard question="Už to beží týždeň a nič moc. Nefunguje to." answer="Kampane na sociálnych sieťach potrebujú rozbeh. Platforma sa v prvých dňoch učí, komu reklamu ukazovať. Po 2–3 týždňoch sa výkon stabilizuje a zlepšuje. Je to normálna súčasť procesu, nie chyba." />
        <QACard question="Môžeme to nejako zrýchliť? Potrebujeme ľudí hneď." answer="Áno, to je práve výhoda tohto systému. Môžeme pridať budget a rozšíriť kanály – výkon sa zvýši rýchlo. Oproti job portálu, kde čakáte, tu máte kontrolu nad tým, koľko ľudí oslovíte." />
      </div>
    </div>
  );
}

function Slide21({ onFinish }: { onFinish: () => void }) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border self-start mb-4"
        style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.4)' }}>
        <span className="text-xs tracking-wider uppercase font-bold" style={{ color: '#D97706', fontFamily: 'Poppins, sans-serif' }}>⚡ Cheat Sheet</span>
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Klient hovorí → Ty odpovedáš
      </h2>
      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Najčastejšie otázky a ako na ne reagovať (3 / 3)</p>
      <div className="space-y-3 mb-6">
        <QACard question="Prečo potrebujeme viac kanálov? Nestačí Facebook?" answer="Jeden kanál je riziko. Keď sa zmení algoritmus alebo sa vyčerpá publikum, nemáte zálohu. Mix kanálov znamená, že keď jeden zvoľní, ostatné to vyrovnajú. Preto Nelisa rozpúšťa budget tam, kde sú výsledky najlepšie." />
      </div>
      <div className="p-5 rounded-2xl text-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.07)', border: '1.5px solid rgba(34, 197, 94, 0.3)' }}>
        <Award className="w-10 h-10 mx-auto mb-3" style={{ color: '#16A34A' }} strokeWidth={1.5} />
        <p className="font-bold text-base mb-1" style={{ color: '#15803D', fontFamily: 'Poppins, sans-serif' }}>Modul dokončený! 🎉</p>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function MetaAdsModule({ onFinish }: MetaAdsModuleProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    } else {
      onFinish();
    }
  };

  const goBack = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    } else {
      onFinish();
    }
  };

  const slides = [
    <Slide0 />,
    <Slide2 />,
    <Slide3 />,
    <Slide4 />,
    <Slide5 />,
    <Slide6 />,
    <Slide7 />,
    <Slide8 />,
    <Slide9 />,
    <Slide11 />,
    <Slide12 />,
    <Slide14 />,
    <Slide16 />,
    <Slide17 />,
    <Slide18 />,
    <Slide19 />,
    <Slide20 />,
    <Slide21 onFinish={onFinish} />,
  ];

  const isLast = currentSlide === TOTAL_SLIDES - 1;

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F9F8FB' }}>

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: '#F9F8FB', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <img src={logoImage} alt="Nelisa" className="h-5" style={{ opacity: 0.85 }} />
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300"
                style={{ width: i === currentSlide ? '20px' : '6px', height: '6px',
                  backgroundColor: i === currentSlide ? '#AE54FF' : i < currentSlide ? 'rgba(174,84,255,0.4)' : '#E2E8F0' }} />
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>
            {currentSlide + 1} / {TOTAL_SLIDES}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-start justify-center px-6 pb-12" style={{ paddingTop: '100px' }}>
        <div className="w-full" style={{ maxWidth: '760px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-3xl p-8 md:p-12"
              style={{ backgroundColor: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={goBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif', border: '1px solid #E2E8F0', backgroundColor: '#fff' }}>
              <ChevronLeft className="w-4 h-4" />
              {currentSlide === 0 ? 'Späť na hlavnú stránku' : 'Späť'}
            </button>
            <button onClick={goNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: isLast ? '#16A34A' : 'linear-gradient(135deg, #AE54FF 0%, #8B35D6 100%)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(174,84,255,0.3)' }}>
              {isLast ? 'Dokončiť modul' : 'Ďalej'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

