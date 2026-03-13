import { useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { X, Award, CheckCircle, Calendar, User, Download } from 'lucide-react';

interface CertificateModalProps {
  userName: string;
  userEmail: string;
  correctAnswers: number;
  totalQuestions: number;
  onClose: () => void;
}

const MATERIAL_LINKS = [
  {
    emoji: '🌐',
    title: 'Oficiální web Nelisy',
    url: 'https://nelisa.com/cs-cz',
  },
  {
    emoji: '📘',
    title: 'Obchodní podklady a prezentace',
    url: 'https://nelisacom.notion.site/',
  },
  {
    emoji: '🧠',
    title: 'Interní knowledge base',
    url: 'https://www.notion.so/almacareer/Nelisa-30cabb65fca54aa2ba430a46f553e613',
    highlight: true,
  },
  {
    emoji: '🤝',
    title: 'Obchodní pomocník',
    url: 'https://nelisa-obchodni-pomocnik.netlify.app/',
  },
  {
    emoji: '💰',
    title: 'Ceník 2026',
    url: 'https://www.notion.so/almacareer/Cen-k-2026-2836f3e88bc280aa8dc2d07fed941bc9',
  },
];

export function CertificateModal({
  userName,
  userEmail,
  correctAnswers,
  totalQuestions,
  onClose,
}: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
  };

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const handleDownloadPDF = () => {
    if (!certificateRef.current) return;
    const html = certificateRef.current.outerHTML;

    // Collect all CSS rules from loaded stylesheets (Tailwind, etc.)
    let allStyles = '';
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules).forEach(rule => {
          allStyles += rule.cssText + '\n';
        });
      } catch {
        // Cross-origin stylesheets can't be read — skip
      }
    });

    const printWindow = window.open('', '_blank', 'width=960,height=700');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Certifikát – ${userName}</title>
          <style>${allStyles}</style>
          <style>
            * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { font-family: system-ui, sans-serif; background: white; margin: 0; padding: 20px; display: flex; justify-content: center; }
            @media print {
              @page { size: A4 landscape; margin: 6mm; }
              body { padding: 0 !important; margin: 0 !important; zoom: 0.62; display: flex; justify-content: center; }
            }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-8 py-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Certifikát o absolvování</h2>
        </div>

        {/* Certificate Content */}
        <div className="p-12">
          <div
            ref={certificateRef}
            className="relative p-12 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
              border: '3px solid #AE54FF',
              boxShadow: '0 10px 40px rgba(174, 84, 255, 0.2)',
            }}
          >
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full opacity-20" style={{ backgroundColor: '#AE54FF' }} />
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#AE54FF' }} />
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: '#AE54FF' }} />

            {/* Award Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#AE54FF' }}>
                <Award className="w-14 h-14 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold mb-2" style={{ color: '#7C3AED' }}>
                Certifikát o absolvování
              </h3>
              <div className="w-32 h-1 mx-auto rounded-full" style={{ backgroundColor: '#AE54FF' }} />
            </div>

            {/* Content */}
            <div className="text-center space-y-6">
              <p className="text-lg text-gray-700">Tento certifikát potvrzuje, že</p>

              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
                style={{ backgroundColor: 'white', border: '2px solid #AE54FF' }}
              >
                <User className="w-5 h-5" style={{ color: '#AE54FF' }} />
                <span className="text-2xl font-bold text-gray-900">{userName}</span>
              </div>

              <p className="text-lg text-gray-700">úspěšně absolvoval(a) test</p>

              <div className="py-4">
                <h4 className="text-3xl font-bold text-gray-900">HR Recruit Certification</h4>
              </div>

              <div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl"
                style={{
                  backgroundColor: percentage >= 80 ? '#F0FDF4' : '#FEF2F2',
                  border: `2px solid ${percentage >= 80 ? '#10B981' : '#EF4444'}`,
                }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: percentage >= 80 ? '#10B981' : '#EF4444' }} />
                <div className="text-left">
                  <div className="text-sm text-gray-600">Výsledek</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {correctAnswers} / {totalQuestions} ({percentage}%)
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'white' }}>
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    Datum dokončení: <strong>{getCurrentDate()}</strong>
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600">{userEmail}</div>
            </div>

            {/* Footer Text */}
            <div className="mt-8 pt-6 border-t border-purple-300 text-center">
              <p className="text-sm text-gray-600">
                Tento certifikát je dokladem o úspěšném dokončení testu HR Recruit Certification
              </p>
            </div>
          </div>
        </div>

        {/* Odkazy na materiály */}
        <div className="px-12 pb-10">
          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Odkazy na materiály</h3>
            <p className="text-gray-600 mb-6">
              Chceš si projít argumenty detailněji nebo mít podklady po ruce při obchodních jednáních?
              Níže najdeš všechny důležité materiály na jednom místě.
            </p>
            <div className="grid gap-3 mb-8">
              {MATERIAL_LINKS.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:bg-purple-50/30"
                  style={{
                    borderColor: link.highlight ? '#AE54FF' : '#E5E7EB',
                    backgroundColor: link.highlight ? 'rgba(174,84,255,0.04)' : 'white',
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{link.emoji}</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900">{link.title}</div>
                    <div className="text-sm truncate" style={{ color: '#7C3AED' }}>{link.url}</div>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-gray-600 mb-4">Chceš lépe pochopit, jak fungují reklamy na sociálních sítích?</p>
            <a
              href="https://nelisa-obchodni-pomocnik.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#5B3AE8' }}
            >
              <span>📱</span>
              Jak fungují reklamy na soc. sítích
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-gray-200 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 font-medium"
          >
            Zavřít
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="h-[48px] px-6 rounded-xl font-semibold transition-all gap-2"
            style={{ backgroundColor: '#AE54FF', color: 'white' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#9333EA'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#AE54FF'; }}
          >
            <Download className="w-4 h-4" />
            Stáhnout jako PDF
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
