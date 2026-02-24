import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { X, Award, CheckCircle, Calendar, User } from 'lucide-react';

interface CertificateModalProps {
  userName: string;
  userEmail: string;
  correctAnswers: number;
  totalQuestions: number;
  onClose: () => void;
}

export function CertificateModal({
  userName,
  userEmail,
  correctAnswers,
  totalQuestions,
  onClose
}: CertificateModalProps) {
  // Get current date formatted in Czech
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}`;
  };

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
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
            className="relative p-12 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
              border: '3px solid #AE54FF',
              boxShadow: '0 10px 40px rgba(174, 84, 255, 0.2)'
            }}
          >
            {/* Decorative Corner Elements */}
            <div 
              className="absolute top-4 left-4 w-12 h-12 rounded-full opacity-20"
              style={{ backgroundColor: '#AE54FF' }}
            />
            <div 
              className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-20"
              style={{ backgroundColor: '#AE54FF' }}
            />
            <div 
              className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20"
              style={{ backgroundColor: '#AE54FF' }}
            />

            {/* Award Icon */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#AE54FF' }}
              >
                <Award className="w-14 h-14 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-8">
              <h3 
                className="text-4xl font-bold mb-2"
                style={{ color: '#7C3AED' }}
              >
                Certifikát o absolvování
              </h3>
              <div className="w-32 h-1 mx-auto rounded-full" style={{ backgroundColor: '#AE54FF' }} />
            </div>

            {/* Content */}
            <div className="text-center space-y-6">
              <p className="text-lg text-gray-700">
                Tento certifikát potvrzuje, že
              </p>

              {/* User Name */}
              <div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
                style={{ backgroundColor: 'white', border: '2px solid #AE54FF' }}
              >
                <User className="w-5 h-5" style={{ color: '#AE54FF' }} />
                <span className="text-2xl font-bold text-gray-900">
                  {userName}
                </span>
              </div>

              <p className="text-lg text-gray-700">
                úspěšně absolvoval(a) test
              </p>

              {/* Test Name */}
              <div className="py-4">
                <h4 className="text-3xl font-bold text-gray-900">
                  HR Recruit Certification
                </h4>
              </div>

              {/* Results */}
              <div 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl"
                style={{ 
                  backgroundColor: percentage >= 80 ? '#F0FDF4' : '#FEF2F2',
                  border: `2px solid ${percentage >= 80 ? '#10B981' : '#EF4444'}`
                }}
              >
                <CheckCircle 
                  className="w-6 h-6" 
                  style={{ color: percentage >= 80 ? '#10B981' : '#EF4444' }}
                />
                <div className="text-left">
                  <div className="text-sm text-gray-600">Výsledek</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {correctAnswers} / {totalQuestions} ({percentage}%)
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="pt-4">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ backgroundColor: 'white' }}
                >
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    Datum dokončení: <strong>{getCurrentDate()}</strong>
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="text-sm text-gray-600">
                {userEmail}
              </div>
            </div>

            {/* Footer Text */}
            <div className="mt-8 pt-6 border-t border-purple-300 text-center">
              <p className="text-sm text-gray-600">
                Tento certifikát je dokladem o úspěšném dokončení testu HR Recruit Certification
              </p>
            </div>
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
            onClick={() => window.print()}
            className="h-[48px] px-6 rounded-xl font-semibold transition-all"
            style={{ 
              backgroundColor: '#AE54FF',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#9333EA';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#AE54FF';
            }}
          >
            Vytisknout certifikát
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
