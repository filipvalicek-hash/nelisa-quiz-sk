import { ArrowLeft, Users, TrendingUp, MessageCircle, Shuffle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

interface MatchingSidebarProps {
  onBack: () => void;
  clientTrust: number;
  fitConfidence: number;
  engagement: number;
}

export function MatchingSidebar({ onBack, clientTrust, fitConfidence, engagement }: MatchingSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="p-6 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 gap-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Spat
        </Button>
      </div>

      {/* Story Section */}
      <div className="flex-1 p-6 space-y-6">
        {/* Story Label */}
        <div className="inline-block">
          <span className="text-xs font-bold text-blue-600 tracking-wider bg-blue-50 px-3 py-1 rounded-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
            PRIBEH
          </span>
        </div>

        {/* Story Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Spravny kanal</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Klient chape, ze kampane su aktivne. Ale ako vybrat spravny kanal pre konkretnu poziciu?
          </p>

          <motion.div 
            className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-blue-900 font-medium">
              "Kde najdem juniorov? A kde naopak seniorov?"
            </p>
            <p className="text-xs text-blue-700 mt-1">— Client</p>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div 
          className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center space-y-2">
            <div className="text-6xl">🔄</div>
            <p className="text-sm text-gray-600 font-medium">Matching Game</p>
          </div>
        </motion.div>

        {/* Progress Info */}
        <div className="pt-6 border-t border-gray-200">
          <div className="text-xs font-semibold text-gray-500 tracking-wide mb-2">
            PRIEBEH KONZULTACIE
          </div>
          <div className="text-sm text-gray-600">
            Otazka <span className="font-bold text-gray-900">5</span> z <span className="font-bold">12</span>
          </div>
        </div>
      </div>

      {/* Game State Section */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
        <div className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          STAV KLIENTA
        </div>

        {/* Client Trust */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              <span>Client Trust</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{clientTrust}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${clientTrust}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Fit Confidence */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <TrendingUp className="w-4 h-4" />
              <span>Fit Confidence</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{fitConfidence}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${fitConfidence}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </div>
        </div>

        {/* Engagement */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MessageCircle className="w-4 h-4" />
              <span>Engagement</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{engagement}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${engagement}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}