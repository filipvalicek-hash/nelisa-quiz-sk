import { ArrowLeft, Lightbulb, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface SentenceBuilderSidebarProps {
  onBack?: () => void;
  clientTrust?: number;
  fitConfidence?: number;
  engagement?: number;
}

export function SentenceBuilderSidebar({ 
  onBack, 
  clientTrust = 85, 
  fitConfidence = 90, 
  engagement = 90 
}: SentenceBuilderSidebarProps) {
  const getIndicatorColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-400';
    return 'bg-orange-500';
  };

  const getIndicatorLabel = (value: number) => {
    if (value >= 70) return 'Strong';
    if (value >= 40) return 'Building';
    return 'Uncertain';
  };

  return (
    <div className="w-[360px] bg-white border-r border-gray-200 min-h-screen p-8 space-y-6">
      {/* Back Link */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Spat na moduly</span>
      </button>

      {/* Badge */}
      <div>
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs font-bold tracking-wider px-3 py-1 border-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
          PRIBEH
        </Badge>
      </div>

      {/* Title */}
      <div>
        <div className="text-xs font-semibold text-gray-500 tracking-wide mb-2">CVICENIE</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Mini doplnovacka
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          Klient zdvihne obocie: „Akoby mu to konecne doslo. Ale kampane lovia ludi priamo... Takze... myslis dalsich kandidatov?"
        </p>
        <p className="text-gray-600 leading-relaxed italic text-sm">
          „Takze... najst ludi. Ale kampane lovia ludi priamo... Takze... najst ludi priamo. Presne. A ty mu to teraz strhnes jedinou vetou."
        </p>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Pokrok</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-500">Konverzacia</span>
            <span className="text-sm font-bold text-gray-900">3</span>
            <span className="text-xs text-gray-400">z</span>
            <span className="text-sm text-gray-500">12</span>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-500 animate-in slide-in-from-left" 
            style={{ width: '25%' }}
          ></div>
        </div>
        {/* Phase Badge */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-bold text-purple-600 tracking-wide">FAZA 1: POCHOPENIE KLIENTA</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Game State Indicators */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-gray-500 tracking-wide">STAV SITUACIE</div>
        
        {/* Client Trust */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Dovera klienta</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">{getIndicatorLabel(clientTrust)}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getIndicatorColor(clientTrust)}`}
              style={{ width: `${clientTrust}%` }}
            ></div>
          </div>
        </div>

        {/* Fit Confidence */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Istota zhody</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">{getIndicatorLabel(fitConfidence)}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getIndicatorColor(fitConfidence)}`}
              style={{ width: `${fitConfidence}%` }}
            ></div>
          </div>
        </div>

        {/* Engagement Level */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Zapojenie</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">{getIndicatorLabel(engagement)}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getIndicatorColor(engagement)}`}
              style={{ width: `${engagement}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-blue-900 tracking-wide">💡 NAPOVEDA</span>
          </div>
          <p className="text-sm text-blue-900 leading-relaxed">
            Pasivni kandidati aktivne nehladaju pracu — musis ich sam najst a oslovit. Aktivni kandidati uz nieco hladaju sami.
          </p>
        </div>
      </div>
    </div>
  );
}