import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CheckUnderstanding() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-4">
        CHECK YOUR UNDERSTANDING
      </h3>
      
      <div className="mb-4">
        <p className="text-base text-gray-900 leading-relaxed">
          "A recruitment campaign treats candidates like{' '}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="type here..."
            className="inline-block min-w-[140px] px-3 py-1 mx-1 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none bg-gray-50 rounded"
          />
          {' '}rather than just applicants."
        </p>
      </div>

      <p className="text-sm text-gray-500 italic mb-4">
        Hint: Think about sales & marketing terms.
      </p>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          Check Answer
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
