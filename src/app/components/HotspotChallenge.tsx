import { useState } from 'react';
import { ChevronRight, Target } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import hotspotImage from 'figma:asset/d1d1ba6db7e8def12d6e0bae28d8afb7e93bffc5.png';

interface HotspotChallengeProps {
  questionNumber: number;
  onNext?: () => void;
  onLogoClick?: () => void;
  onBack?: () => void;
}

interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  correct: boolean;
  label: string;
}

export function HotspotChallenge({ questionNumber, onNext, onLogoClick, onBack }: HotspotChallengeProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const hotspots: Hotspot[] = [
    { id: 'pracovni-nabidky', x: 2, y: 36, width: 18, height: 6, correct: true, label: 'Pracovní nabídky' },
    { id: 'prehled', x: 2, y: 28, width: 18, height: 6, correct: false, label: 'Přehled' },
    { id: 'zajemci', x: 2, y: 44, width: 18, height: 6, correct: false, label: 'Zájemci' }
  ];

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot.id);
  };

  const handleContinue = () => {
    if (!selectedHotspot) return;
    const selected = hotspots.find(hotspot => hotspot.id === selectedHotspot);
    if (selected && selected.correct) {
      setShowFeedback(true);
      setTimeout(() => {
        onNext?.();
      }, 1000);
    } else {
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* REMOVED: QuizTopNavigation - now global in App.tsx */}
      {/* REMOVED: ProgressSection - now global in App.tsx */}

      <div className="flex items-start justify-center px-8 pb-12" style={{ marginTop: '60px' }}>
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="bg-white rounded-3xl p-8 relative"
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(255, 116, 0, 0.08)', borderColor: 'rgba(255, 116, 0, 0.2)' }}>
                <Target className="w-4 h-4" style={{ color: '#ff7400' }} />
                <span className="text-xs font-bold tracking-wider" style={{ color: '#ff7400' }}>
                  JEDNA VOLBA
                </span>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Kde v Nelise najdeš seznam všech tvých pracovních nabídek?
            </h3>

            <div className="relative mb-8 rounded-2xl overflow-hidden border-2 border-gray-200">
              <ImageWithFallback src={hotspotImage} alt="Nelisa interface" className="w-full" />
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => handleHotspotClick(hotspot)}
                  className="absolute transition-all"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`,
                    backgroundColor: selectedHotspot === hotspot.id ? 'rgba(255, 116, 0, 0.3)' : 'transparent',
                    border: selectedHotspot === hotspot.id ? '2px solid #ff7400' : '2px solid transparent'
                  }}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-500 hover:text-gray-900 gap-2 font-medium"
              >
                Vrátit se na přehled
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedHotspot}
                  className="w-[280px] h-[56px] px-8 rounded-xl font-semibold text-[16px] transition-all shadow-md hover:shadow-lg"
                  style={
                    selectedHotspot
                      ? { backgroundColor: 'var(--primary-brand)', color: 'var(--text-on-primary)', borderRadius: '12px' }
                      : { borderRadius: '12px' }
                  }
                  onMouseEnter={(e) => {
                    if (selectedHotspot) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedHotspot) {
                      e.currentTarget.style.backgroundColor = 'var(--primary-brand)';
                    }
                  }}
                >
                  {showFeedback ? 'Přejít na další úkol' : 'Pokračovat'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}