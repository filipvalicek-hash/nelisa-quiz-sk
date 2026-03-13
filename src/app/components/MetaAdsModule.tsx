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
            Jak to říct klientovi
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
      <ChapterBadge label="Kapitola 1 — Aukce pozornosti" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Soutěž o pozornost
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Každé scrollnutí je <strong style={{ color: '#192550' }}>mikro-okamžik rozhodování</strong>. Platforma vybírá z desítek reklam, kterou zobrazí právě tomuhle člověku. Nejde o to, kdo zaplatil nejvíc – Meta se ptá na tři věci najednou:
      </p>
      <div className="space-y-3 mb-5">
        <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
          <span className="text-xl flex-shrink-0">👥</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>Kdo chce tohoto člověka oslovit?</p>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Kolik inzerentů soupeří o pozornost stejného uživatele.</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
          <span className="text-xl flex-shrink-0">🎯</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>Jaká je šance, že zareaguje?</p>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Platforma odhaduje, jestli člověk na reklamu klikne, nebo ji přeskroluje.</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E9E5F0' }}>
          <span className="text-xl flex-shrink-0">💰</span>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>Kolik za to inzerent nabízí?</p>
            <p className="text-xs" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Rozpočet hraje roli, ale není jediný faktor.</p>
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        → Platforma zobrazí reklamu s nejlepší kombinací relevance a nabídky. Není to jen o penězích – je to soutěž o pozornost.
      </p>
    </div>
  );
}

function Slide0() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 z 4" />
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>
        Jak fungují reklamy na sociálních sítích
      </h1>
      <p className="text-base font-semibold mb-6" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>
        Meta – Facebook &amp; Instagram
      </p>
      <p className="text-base leading-relaxed mb-4" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
        V tomto modulu se naučíš, jak fungují reklamy na sociálních sítích, proč se liší výsledky kampaní, jak se kampaně v čase zlepšují a proč Nelisa pracuje s mixem kanálů. Na závěr najdeš Cheat Sheet s nejčastějšími otázkami klientů.
      </p>
      <div className="flex items-center gap-3 mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.06)', border: '1px solid rgba(174, 84, 255, 0.15)' }}>
        <span className="text-2xl">⏱️</span>
        <p className="text-sm" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
          Celková délka modulu: cca <strong style={{ color: '#192550' }}>10–12 minut</strong>
        </p>
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Relevance" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Proč záleží na relevanci, ne jen na penězích
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Meta vydělává na tom, že lidé na platformě <strong style={{ color: '#192550' }}>tráví čas</strong>. Kdyby ukazovala jen reklamy od toho, kdo zaplatí nejvíc, lidi by je ignorovali, přestali scrollovat – a Meta by přišla o příjmy.
      </p>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Proto platformě záleží na tom, aby reklamy byly relevantní. <strong style={{ color: '#192550' }}>Relevantnější reklama tak často vyhraje i s nižší cenou za proklik</strong>.
      </p>
      <div className="p-5 rounded-2xl mt-2" style={{ backgroundColor: 'rgba(34, 197, 94, 0.07)', border: '1.5px solid rgba(34, 197, 94, 0.25)' }}>
        <p className="font-bold text-sm mb-2" style={{ color: '#15803D', fontFamily: 'Poppins, sans-serif' }}>✅ Klíčový princip</p>
        <p className="text-sm leading-relaxed" style={{ color: '#14532D', fontFamily: 'Poppins, sans-serif' }}>
          Meta neukazuje reklamy proto, že někdo zaplatil. Ukazuje je proto, že <strong>dávají smysl konkrétním lidem v konkrétním okamžiku</strong>.
        </p>
      </div>
    </div>
  );
}

function Slide4() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Náborové kampaně" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Specifika náborových kampaní na Meta
      </h2>
      <div className="p-4 rounded-xl mb-5 flex gap-3" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1.5px solid rgba(251, 191, 36, 0.4)' }}>
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} strokeWidth={2} />
        <p className="text-sm leading-relaxed" style={{ color: '#92400E', fontFamily: 'Poppins, sans-serif' }}>
          <strong>Důležité omezení:</strong> U pracovní inzerce na Meta <strong>není možné cílit podle věku ani pohlaví</strong>. To je pravidlo platformy pro HR reklamu.
        </p>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Relevance proto nevzniká ručním nastavením „chci muže 25–35", ale tím, <strong style={{ color: '#192550' }}>jak je nabídka komunikovaná</strong> – textem, vizuálem a celkovým kontextem reklamy.
      </p>
      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Algoritmus sleduje, jak lidé na reklamu reagují. Pokud určitý typ lidí kliká, platforma se to naučí a začne ji ukazovat <strong style={{ color: '#192550' }}>podobným lidem</strong>. Pokud ji lidé ignorují nebo skrývají, platforma ji přestane ukazovat – a výkon klesá.
      </p>
    </div>
  );
}

function Slide5() {
  return (
    <div>
      <ChapterBadge label="Kapitola 1 — Shrnutí" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Jak to vysvětlit klientovi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Klient většinou zná job portály. Tvůj úkol je vysvětlit rozdíl jednoduše – bez technického žargonu.
      </p>
      <SalesQuote text="Reklamy na sociálních sítích fungují jinak než job portál. Nejdeme čekat, až si někdo otevře nabídky práce. Jdeme za lidmi přímo tam, kde tráví čas – na Facebook a Instagram, případně s Nelisou i na další sociální sítě. Platforma pak vybírá, komu reklamu ukázat, podle toho, jestli dává tomu konkrétnímu člověku smysl. Proto je důležité, aby pracovní nabídka byla jasná a atraktivní – to je základ dobrého výkonu kampaně." />
    </div>
  );
}

function Slide6() {
  return (
    <div>
      <ChapterBadge label="Kapitola 2 z 4" />
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>
        Proč mají některé kampaně lepší výsledky než jiné
      </h1>
      <p className="text-base leading-relaxed mb-5" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
        Tohle je asi nejčastější otázka, kterou klient položí: <em>„Proč ta jedna pozice měla 200 prokliků a druhá jen 60?"</em> Odpověď nikdy není jen o penězích.
      </p>
      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Výkon kampaně ovlivňuje <strong style={{ color: '#192550' }}>5 faktorů, které se vzájemně násobí</strong>. V této kapitole si je projdeme jeden po druhém.
      </p>
      <div className="flex items-center gap-2 mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.06)', border: '1px solid rgba(174, 84, 255, 0.15)' }}>
        <span className="text-lg">🔗</span>
        <p className="text-sm font-medium" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
          Stejný budget ≠ stejný výsledek
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
        Atraktivita nabídky a kreativa reklamy
      </h2>
      <div className="space-y-4">
        <FactorCard
          icon={Target}
          title="Faktor 1: Atraktivita pracovní nabídky"
          text="Srozumitelnost, konkrétní benefity (ne 'motivující platové ohodnocení', ale 'od 38 000 Kč + bonusy'), nízká bariéra přihlášení. Pokud je nabídka vágní, lidi ji přeskrolují → platforma ji přestane ukazovat → vyšší cena."
        />
        <FactorCard
          icon={Zap}
          title="Faktor 2: Kreativa (vizuál a text)"
          text="I skvělá nabídka může mít slabý výkon, pokud kreativa nezaujme. Důležitý fenomén: okoukání (ad fatigue) – když se stejná kreativa opakuje, proklikovost klesá, cena roste. Proto se kreativy pravidelně obměňují – je to normální součást procesu."
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
        Lokalita a konkurence v aukci
      </h2>
      <div className="space-y-4">
        <FactorCard
          icon={Globe}
          title="Faktor 3: Velikost cílové skupiny v dané lokalitě"
          text="Kampaň na pozici skladníka v Praze má úplně jiné publikum než stejná pozice v malém městě s 15 000 obyvateli. Menší lokalita = rychlejší saturace = vyšší cena za proklik. To není chyba kampaně – je to matematika."
        />
        <FactorCard
          icon={TrendingUp}
          title="Faktor 4: Konkurence v aukci"
          text="Pokud ve stejné lokalitě běží reklamy od deseti dalších zaměstnavatelů, cena roste. Sezónnost hraje roli – v září bývá konkurence vyšší. Naopak v létě a kolem svátků bývá levněji, ale méně lidí aktivně reaguje."
        />
      </div>
    </div>
  );
}

function Slide9() {
  return (
    <div>
      <ChapterBadge label="Kapitola 2 — Faktor 5 + řetěz" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Kvalita cílové stránky a celkový řetěz
      </h2>
      <FactorCard
        icon={Users}
        title="Faktor 5: Kvalita cílové stránky (landing page)"
        text="Člověk klikne na reklamu a dostane se na nabídku. Pokud je stránka pomalá, nepřehledná nebo se na mobilu špatně vyplňuje formulář, odejde. To přímo neovlivní počet prokliků, ale ovlivní, kolik z nich se skutečně přihlásí."
      />
      <div className="mt-5 p-5 rounded-2xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.07)', border: '1.5px solid rgba(174, 84, 255, 0.22)' }}>
        <p className="font-bold text-sm mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>🔗 Jak to drží pohromadě</p>
        <div className="flex flex-wrap gap-2 items-center text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#475569' }}>
          {['Atraktivní nabídka', 'Dobrá kreativa', 'Dostatek lidí v lokalitě', 'Rozumná konkurence', 'Funkční cílová stránka'].map((item, i, arr) => (
            <span key={i} className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: '#fff', border: '1px solid #AE54FF', color: '#AE54FF' }}>{item}</span>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#AE54FF' }} />}
            </span>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Pokud jedno z těchto oček povolí, výkon celé kampaně klesne.</p>
      </div>
    </div>
  );
}

function Slide11() {
  return (
    <div>
      <ChapterBadge label="Kapitola 3 z 4" />
      <h1 className="text-3xl font-bold mb-3" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif', lineHeight: 1.25 }}>
        Jak se kampaně v čase zlepšují
      </h1>
      <p className="text-base leading-relaxed mb-5" style={{ color: '#231F20', fontFamily: 'Poppins, sans-serif' }}>
        Algoritmus Meta není statický. Je to systém, který se neustále učí z toho, co se děje. Pokaždé, když někdo na reklamu klikne nebo ji přeskroluje, platforma si to zapíše a příště lépe odhadne, komu reklamu ukázat.
      </p>
      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(174, 84, 255, 0.07)', border: '1.5px solid rgba(174, 84, 255, 0.2)' }}>
        <p className="font-bold text-sm mb-2" style={{ color: '#AE54FF', fontFamily: 'Poppins, sans-serif' }}>📈 Learning phase</p>
        <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
          Každá nová kampaň prochází <strong style={{ color: '#192550' }}>učící fází</strong>. Platforma v prvních dnech testuje – ukazuje reklamu různým typům lidí a sleduje, kdo reaguje. Výsledky jsou proto nestabilní: jeden den 30 prokliků, druhý den 8. <strong style={{ color: '#192550' }}>To je normální a očekávané.</strong>
        </p>
        <p className="text-sm leading-relaxed mt-3" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
          Po learning phase se výkon stabilizuje. Kampaně, které běží stabilně několik týdnů, mají tendenci mít lepší výsledky než kampaně, které se neustále zapínají a vypínají.
        </p>
      </div>
    </div>
  );
}

function Slide12() {
  const items = [
    { days: '3 dny', icon: '🌱', color: '#F59E0B', text: 'Nemá dost dat. Algoritmus se teprve zaučuje, výsledky jsou nestabilní.' },
    { days: '3 týdny', icon: '📈', color: '#10B981', text: 'Slušný základ. Výkon se typicky stabilizuje a zlepšuje.' },
  ];
  return (
    <div>
      <ChapterBadge label="Kapitola 3 — Délka kampaně" />
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Co to znamená prakticky
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Systém sleduje, kdo kliká, a hledá vzorce – věk, zájmy, chování, čas aktivity. <strong style={{ color: '#192550' }}>Čím víc dat má, tím přesněji cílí.</strong>
      </p>
      <div className="space-y-3 mb-5">
        {items.map(item => (
          <div key={item.days} className="flex gap-4 p-4 rounded-xl border" style={{ backgroundColor: '#fff', borderColor: '#E9E5F0' }}>
            <div className="text-xl flex-shrink-0">{item.icon}</div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: item.color, fontFamily: 'Poppins, sans-serif' }}>Kampaň běží {item.days}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Kampaně nastavujeme tak, aby platforma hledala lidi, kteří s největší pravděpodobností kliknou na reklamu a dostanou se na nabídku. Systém se v tom postupně zlepšuje – učí se z každého prokliku.
      </p>
    </div>
  );
}

function Slide14() {
  return (
    <div>
      <ChapterBadge label="Kapitola 3 — Shrnutí" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Jak to říct klientovi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Klient, který vidí slabé výsledky v prvním týdnu, je nervózní. Tvůj úkol je nastavit správná očekávání <strong style={{ color: '#192550' }}>ještě před startem kampaně</strong>.
      </p>
      <SalesQuote text="Kampaně na sociálních sítích se v čase zlepšují. Platforma se učí z výsledků – kdo kliká, kdy, odkud. Proto potřebují nějaký čas na rozjezd. Po pár týdnech se výkon stabilizuje a typicky zlepšuje. Je to jako nový zaměstnanec – první týden se zaučuje, ale pak už ví, co dělat." />
    </div>
  );
}

function Slide16() {
  return (
    <div>
      <ChapterBadge label="Kapitola 4 — Co Nelisa dělá jinak" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Jak Nelisa pracuje s kanály
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Nelisa umí pracovat s celou řadou kanálů najednou – <strong style={{ color: '#192550' }}>Meta, Google, Seznam a další</strong>. Klient nakoupí budget a Nelisa ho takticky rozpouští mezi kanály podle toho, kde jsou výsledky nejlepší.
      </p>
      <div className="space-y-3">
        {[
          { icon: '📊', text: 'Pokud Meta v dané lokalitě funguje skvěle, jde tam víc peněz.' },
          { icon: '🔄', text: 'Pokud jeden kanál „vyschne" (saturace, sezónnost), ostatní to vyrovnají.' },
          { icon: '👁️', text: 'Klient vidí výsledek: kolik lidí se přihlásilo a za kolik – ne kde reklama běžela.' },
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
      <ChapterBadge label="Kapitola 4 — Škálování" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Kohoutek s uchazeči
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Velká výhoda oproti job portálům je <strong style={{ color: '#192550' }}>rychlost a flexibilita</strong>. Na job portálu zaplatíte za inzerát a čekáte. U PPC reklam máte kontrolu:
      </p>
      <div className="space-y-2">
        {[
          { trigger: 'Potřebujete rychle nabrat?', action: 'Přidáme budget, rozšíříme kanály, zintenzivníme kampaně.' },
          { trigger: 'Otevíráte novou pobočku?', action: 'Spustíme kampaně na novou lokalitu během dní.' },
          { trigger: 'Něco nefunguje?', action: 'Vyměníme kreativu, přesuneme budget, otestujeme jiný kanál.' },
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
      <ChapterBadge label="Kapitola 4 — Shrnutí" />
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#192550', fontFamily: 'Poppins, sans-serif' }}>
        Jak to říct klientovi
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Poppins, sans-serif' }}>
        Klient chce vědět, proč nemít jen jeden kanál a proč Nelisa. Tady je věta, která to říká jasně:
      </p>
      <SalesQuote text="Nelisa nefunguje jako jeden inzerát na jednom portálu. Je to systém, který rozpouští váš budget mezi nejvýkonnější kanály – Facebook, Instagram, Google, Seznam. Když potřebujete přidat uchazeče, přidáme výkon. Když je plno, zvolníme. Máte kontrolu nad přísunem lidí, ne naopak." />
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
        Klient říká → Ty odpovídáš
      </h2>
      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Nejčastější otázky a jak na ně reagovat (1 / 3)</p>
      <div className="space-y-3">
        <QACard question="Proč bychom platili za reklamy, když máme job portál?" answer="Job portál čeká, až si někdo otevře nabídky. My jdeme za lidmi tam, kde tráví čas – na sociálních sítích. Oslovujeme i ty, kteří by si práci jinak nehledali, ale nabídka je zaujme. Je to úplně jiný zdroj kandidátů." />
        <QACard question="Co všechno ovlivní výkon kampaně?" answer="Výkon závisí na atraktivitě nabídky, vzhledu reklamy, velikosti okruhu lidí v lokalitě a konkurenci. Když to vidíme, umíme říct, co konkrétně zlepšit – třeba změnit vizuál nebo zpřesnit text nabídky." />
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
        Klient říká → Ty odpovídáš
      </h2>
      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Nejčastější otázky a jak na ně reagovat (2 / 3)</p>
      <div className="space-y-3">
        <QACard question="Už to běží týden a nic moc. Nefunguje to." answer="Kampaně na sociálních sítích potřebují rozjezd. Platforma se v prvních dnech učí, komu reklamu ukazovat. Po 2–3 týdnech se výkon stabilizuje a zlepšuje. Je to normální součást procesu, ne chyba." />
        <QACard question="Můžeme to nějak zrychlit? Potřebujeme lidi hned." answer="Ano, to je právě výhoda tohoto systému. Můžeme přidat budget a rozšířit kanály – výkon se zvýší rychle. Oproti job portálu, kde čekáte, tady máte kontrolu nad tím, kolik lidí oslovíte." />
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
        Klient říká → Ty odpovídáš
      </h2>
      <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>Nejčastější otázky a jak na ně reagovat (3 / 3)</p>
      <div className="space-y-3 mb-6">
        <QACard question="Proč potřebujeme víc kanálů? Nestačí Facebook?" answer="Jeden kanál je riziko. Když se změní algoritmus nebo se vyčerpá publikum, nemáte zálohu. Mix kanálů znamená, že když jeden zvolní, ostatní to vyrovnají. Proto Nelisa rozpouští budget tam, kde jsou výsledky nejlepší." />
      </div>
      <div className="p-5 rounded-2xl text-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.07)', border: '1.5px solid rgba(34, 197, 94, 0.3)' }}>
        <Award className="w-10 h-10 mx-auto mb-3" style={{ color: '#16A34A' }} strokeWidth={1.5} />
        <p className="font-bold text-base mb-1" style={{ color: '#15803D', fontFamily: 'Poppins, sans-serif' }}>Modul dokončen! 🎉</p>
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
              {currentSlide === 0 ? 'Zpět na hlavní stránku' : 'Zpět'}
            </button>
            <button onClick={goNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: isLast ? '#16A34A' : 'linear-gradient(135deg, #AE54FF 0%, #8B35D6 100%)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(174,84,255,0.3)' }}>
              {isLast ? 'Dokončit modul' : 'Další'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

