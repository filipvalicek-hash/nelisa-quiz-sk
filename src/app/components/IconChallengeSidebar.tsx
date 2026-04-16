import { ArrowLeft, Lightbulb, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface IconChallengeSidebarProps {
  onBack?: () => void;
  clientTrust?: number;
  fitConfidence?: number;
  engagement?: number;
}

export function IconChallengeSidebar({ 
  onBack, 
  clientTrust = 75, 
  fitConfidence = 80, 
  engagement = 85 
}: IconChallengeSidebarProps) {
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
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs font-bold tracking-wider px-3 py-1 border-0">
          SIMULACIA KLIENTA
        </Badge>
      </div>

      {/* Title */}
      <div>
        <div className="text-xs font-semibold text-gray-500 tracking-wide mb-2">TEMA</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Socialne siete
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Vas klient potrebuje poradit, ako najlepsie oslovit kandidatov, ktori aktivne nehladaju nove prilezitosti.
        </p>
      </div>

      {/* Illustration Placeholder */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 flex items-center justify-center border border-blue-100">
        <div className="text-center space-y-2">
          <div className="text-6xl">🤝</div>
          <p className="text-sm font-medium text-blue-900">Advisor & Client</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Pokrok</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-500">Otazka</span>
            <span className="text-sm font-bold text-gray-900">2</span>
            <span className="text-xs text-gray-400">z</span>
            <span className="text-sm text-gray-500">12</span>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-500 animate-in slide-in-from-left" 
            style={{ width: '17%' }}
          ></div>
        </div>
        {/* Phase Badge */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-bold text-blue-600 tracking-wide">FAZA 1: POCHOPENIE KLIENTA</span>
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
            <span className="text-xs font-bold text-blue-900 tracking-wide">💡 TIP</span>
          </div>
          <p className="text-sm text-blue-900 leading-relaxed">
            Nelisa sa zameriava na fazu naboru, nie na spravu po nastupe. Pasivni kandidati su profesionali, ktori momentalne aktivne nehladaju novu poziciu.
          </p>
        </div>
      </div>
    </div>
  );
}