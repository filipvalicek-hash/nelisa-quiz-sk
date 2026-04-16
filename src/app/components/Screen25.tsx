import { useState } from 'react';
import { ChevronRight, Check, X, ArrowLeft, ToggleLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { QuestionBackgroundDecoration } from '@/app/components/QuestionBackgroundDecoration';
import { ExplanationBlock } from '@/app/components/ExplanationBlock';
import { motion } from 'motion/react';

interface Screen25Props {
  onNext?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  initialConfirmed?: boolean;
  initialSelection?: Record<string, Answer | null>;
  onStoreSelection?: (sel: Record<string, Answer | null>) => void;
}

type Answer = 'ÁNO' | 'NIE';

const items: { id: string; text: string; correct: Answer }[] = [
  { id: '1', text: 'Správne som s klientom nastavil očakávania.', correct: 'ÁNO' },
  { id: '2', text: 'V priebehu kampane si dohodnem s klientom stretnutie, kde preberieme jeho pohľad na výsledky a prípadnú optimalizáciu.', correct: 'ÁNO' },
  { id: '3', text: 'Po skončení kampane si s klientom dohodnem vyhodnocovacie stretnutie.', correct: 'ÁNO' },
  { id: '4', text: 'Budem pravidelne meniť copywriting v inzeráte.', correct: 'NIE' },
  { id: '5', text: 'Zameriam sa na branding a snažím sa predať Seznam.cz branding reklamu.', correct: 'NIE' },
  { id: '6', text: 'Ak má kampaň uspokojivé výsledky, nemusím s klientom nič riešiť.', correct: 'NIE' },
  { id: '7', text: 'Priebežne sledujem výsledky a včas detekujem, keď je potrebné optimalizovať.', correct: 'ÁNO' },
];

export function Screen25({ onNext, onBack, onSkip, onAnswerSubmit, initialConfirmed = false, initialSelection, onStoreSelection }: Screen25Props) {
  const [answers, setAnswers] = useState<Record<string, Answer | null>>(
    initialSelection ?? { '1': null, '2': null, '3': null, '4': null, '5': null, '6': null, '7': null }
  );
  const [isConfirmed, setIsConfirmed] = useState(initialConfirmed);

  const allAnswered = Object.values(answers).every(a => a !== null);
  const allCorrect = items.every(item => answers[item.id] === item.correct);

  const handleAnswer = (id: string, answer: Answer) => {
    if (isConfirmed) return;
    setAnswers(prev => {
      const next = { ...prev, [id]: answer };
      onStoreSelection?.(next);
      return next;
    });
  };

  const handleConfirm = () => {
    if (!allAnswered) return;
    setIsConfirmed(true);
    const label = items.map(item => `${item.id}:${answers[item.id]}`).join(', ');
    onAnswerSubmit?.(allCorrect, label);
  };





  return (
    <div className="min-h-screen bg-white relative">
      <QuestionBackgroundDecoration type="choice" />

      <div className="flex items-center justify-center px-8 pb-16 relative z-10" style={{ marginTop: '32px' }}>
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="bg-white rounded-3xl p-12 relative"
            style={{
              boxShadow: `
                0 0 0 1px rgba(0, 0, 0, 0.02),
                0 2px 4px rgba(0, 0, 0, 0.03),
                0 8px 16px rgba(0, 0, 0, 0.06),
                0 24px 48px rgba(0, 0, 0, 0.08)
              `
            }}
          >
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border mb-6" style={{ backgroundColor: 'rgba(174, 84, 255, 0.08)', borderColor: 'rgba(174, 84, 255, 0.2)' }}>
                <ToggleLeft className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                  ÁNO / NIE
                </span>
              </div>
              <h3
                className="text-gray-900 mb-4 leading-tight"
                style={{ fontSize: '24px', fontWeight: 600, lineHeight: '130%', letterSpacing: 0 }}
              >
                U každého kroku rozhodni, či zvyšuje šancu na retenciu (ÁNO), alebo skôr nie (NIE).
              </h3>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-10">
              {items.map((item, index) => {
                const answer = answers[item.id];
                const isCorrect = answer === item.correct;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      isConfirmed
                        ? isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                        : answer !== null
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-white border-gray-200'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gray-100 text-gray-500">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-gray-900 text-sm leading-relaxed">
                      {item.text}
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      {(['ÁNO', 'NIE'] as Answer[]).map(btn => (
                        <button
                          key={btn}
                          onClick={() => handleAnswer(item.id, btn)}
                          disabled={isConfirmed}
                          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all border-2 ${
                            answer === btn
                              ? isConfirmed
                                ? isCorrect
                                  ? 'bg-green-500 text-white border-green-500'
                                  : 'bg-red-500 text-white border-red-500'
                                : 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                          } ${isConfirmed ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                    {isConfirmed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {isCorrect ? <Check className="w-4 h-4 text-white" strokeWidth={3} /> : <X className="w-4 h-4 text-white" strokeWidth={3} />}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {isConfirmed && (
              <ExplanationBlock>
                <p>
                  Retenciu najviac zvyšuje to, že klient má priebežne istotu, že je o kampaň postarané a že existuje jasný rytmus komunikácie. Nastavenie očakávaní na štarte je základ, priebežná kontrola a dohodnutý check-in bránia tomu, aby klient robil závery po pár dňoch.
                </p>
                <p>
                  <strong>Novo je to ešte jednoduchšie udržať aj procesne: s priebežným vyhodnotením kampane aktívne pomáha aj Nelisa – klientom posielame e-mail s otázkou na spokojnosť a zbierame spätnú väzbu, ktorú môžeme rýchlo premietnuť do ďalšieho postupu.</strong>
                </p>
                <p>
                  Vyhodnocovacie stretnutie po kampani uzatvára spoluprácu profesionálne a otvára priestor pre ďalší krok – ideálne by malo byť štandard/povinný krok po každom pilote, aby sa výsledky správne interpretovali a nadviazalo sa retenciou. Naopak „nechať to byť, keď to ide dobre" je najrýchlejšia cesta, ako stratiť vzťah a príležitosť pre ďalšiu objednávku. A zmeny copy alebo predaj iného brandingu nie sú automaticky retencia, pokiaľ nenadväzujú na potrebu klienta a cieľ kampane.
                </p>
              </ExplanationBlock>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                {!isConfirmed && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={onBack}
                      className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Späť na príbeh
                    </Button>
                    {onSkip && (
                      <Button
                        variant="ghost"
                        onClick={onSkip}
                        className="text-gray-400 hover:text-gray-600 gap-2 font-medium text-sm"
                      >
                        Preskočiť úlohu
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                {!isConfirmed && (
                  <Button
                    onClick={handleConfirm}
                    disabled={!allAnswered}
                    style={
                      allAnswered
                        ? { backgroundColor: '#AE54FF', color: '#FFFFFF', borderRadius: '12px' }
                        : { borderRadius: '12px' }
                    }
                    onMouseEnter={(e) => { if (allAnswered) e.currentTarget.style.backgroundColor = '#9842E6'; }}
                    onMouseLeave={(e) => { if (allAnswered) e.currentTarget.style.backgroundColor = '#AE54FF'; }}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                  >
                    Skontrolovať
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
                {isConfirmed && (
                  <Button
                    onClick={onNext}
                    style={{ backgroundColor: '#AE54FF', color: 'white' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#9333EA'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#AE54FF'; }}
                    className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all"
                  >
                    Pokračovať
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
