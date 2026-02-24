import { Lightbulb } from 'lucide-react';

export function KeyConceptBox() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4 text-white" fill="currentColor" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Key Concept</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            A job ad is a <span className="font-semibold">document</span>. A recruitment campaign is a{' '}
            <span className="font-semibold">strategy</span>. Campaigns use marketing tactics to convert talent into applicants.
          </p>
        </div>
      </div>
    </div>
  );
}
