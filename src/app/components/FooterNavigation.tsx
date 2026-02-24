import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface FooterNavigationProps {
  onNext?: () => void;
}

export function FooterNavigation({ onNext }: FooterNavigationProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-t border-gray-200 bg-white">
      <Button variant="ghost" className="text-gray-600 hover:text-gray-900 gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
        Next Scene
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}