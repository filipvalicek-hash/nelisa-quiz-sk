import { Eye } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function InsightQuestion() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
        <h3 className="text-xs font-semibold text-blue-600 tracking-wider">
          INSIGHT QUESTION
        </h3>
      </div>
      
      <div className="flex items-start justify-between gap-4">
        <p className="text-base text-gray-900 flex-1">
          Why do you think top talent often ignores standard job boards?
        </p>
        
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2 flex-shrink-0"
        >
          Reveal Answer
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
