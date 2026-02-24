import { FileText, Megaphone } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface ComparisonCardProps {
  type: 'traditional' | 'campaign';
}

export function ComparisonCard({ type }: ComparisonCardProps) {
  const isTraditional = type === 'traditional';

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {!isTraditional && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-xs px-2 py-1 border-0">
            RECOMMENDED
          </Badge>
        </div>
      )}
      
      <div className="flex flex-col items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isTraditional ? 'bg-gray-100' : 'bg-blue-100'
        }`}>
          {isTraditional ? (
            <FileText className="w-6 h-6 text-gray-600" />
          ) : (
            <Megaphone className="w-6 h-6 text-blue-600" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isTraditional ? 'Traditional Job Ad' : 'Recruitment Campaign'}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {isTraditional
              ? 'Reactive. Posted on a job board, waiting for active seekers to apply. High competition, low engagement.'
              : 'Proactive. Multi-channel approach targeting passive talent. Uses storytelling and branding to attract.'}
          </p>
        </div>
      </div>
    </div>
  );
}
