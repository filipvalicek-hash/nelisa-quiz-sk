import { motion } from 'motion/react';
import { QuizButton } from '@/app/components/ui/quiz-button';
import { Calendar, MessageCircle, Star, Coffee } from 'lucide-react';
import { FooterLogoNavigation } from '@/app/components/FooterLogoNavigation';

interface StoryScreenProps {
  questionNumber: number;
  storyLabel?: string;
  storyContent: React.ReactNode;
  illustration: React.ReactNode;
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
  onSkip?: () => void;
}

export function StoryScreen({
  questionNumber,
  storyLabel = "PRÍBEH",
  storyContent,
  illustration,
  onContinue,
  onBack,
  onLogoClick,
  onSkip
}: StoryScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F9F8FB' }}>
      {/* Main Content - Card positioned safely below progress bar */}
      <div className="flex items-start justify-center px-6 pb-12" style={{ marginTop: '140px' }}>
        
        <div className="w-full mx-auto" style={{ maxWidth: '920px' }}>
          
          {/* Wrapper: Card + Illustration as ONE component */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            
            {/* Illustration - FLOATING OUTSIDE CARD at top-right corner */}
            <motion.div
              className="absolute hidden lg:block pointer-events-none"
              style={{
                top: '-120px',
                right: '40px',
                width: '300px',
                zIndex: 40,
                marginBottom: '32px'
              }}
              initial={{ opacity: 0, y: -30, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.35 }}
            >
              {/* Floating Decorative Icons - Around Character */}
              
              {/* Calendar Icon - Upper Left */}
              <motion.div
                className="absolute"
                style={{ top: '8%', left: '-14%', zIndex: 5 }}
                animate={{ 
                  y: [0, -6, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-white rounded-xl p-2.5 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
                  <Calendar className="w-5 h-5" style={{ color: 'var(--icon-primary)' }} strokeWidth={2} />
                </div>
              </motion.div>

              {/* Chat Bubble - Lower Left */}
              <motion.div
                className="absolute"
                style={{ top: '45%', left: '-18%', zIndex: 5 }}
                animate={{ 
                  y: [0, -5, 0],
                  x: [0, -2, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="bg-white rounded-xl p-2.5 shadow-lg border-2" style={{ borderColor: '#BBF7D0' }}>
                  <MessageCircle className="w-5 h-5" style={{ color: 'var(--state-success)' }} strokeWidth={2} />
                </div>
              </motion.div>

              {/* Star - Upper Left (above character head) */}
              <motion.div
                className="absolute"
                style={{ top: '-8%', left: '18%', zIndex: 5 }}
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                <Star className="w-7 h-7" style={{ color: 'var(--state-warning)', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} strokeWidth={2} fill="currentColor" />
              </motion.div>

              {/* Star - Upper Right (above character head) */}
              <motion.div
                className="absolute"
                style={{ top: '-3%', right: '5%', zIndex: 5 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -12, 0]
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
              >
                <Star className="w-6 h-6" style={{ color: 'var(--state-warning)', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} strokeWidth={2} fill="currentColor" />
              </motion.div>

              {/* Coffee Cup - Right Side */}
              <motion.div
                className="absolute"
                style={{ top: '12%', right: '-10%', zIndex: 5 }}
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="bg-white rounded-xl p-2.5 shadow-lg border-2" style={{ borderColor: 'var(--card-border)' }}>
                  <Coffee className="w-5 h-5" style={{ color: 'var(--icon-primary)' }} strokeWidth={2} />
                </div>
              </motion.div>

              {/* Character Image - Gentle Float */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.12))'
                }}
              >
                {illustration}
              </motion.div>
            </motion.div>

            {/* Story Card - Main Focus */}
            <div 
              className="rounded-3xl relative"
              style={{
                background: '#FFFFFF',
                boxShadow: `
                  0 0 0 1px rgba(0, 0, 0, 0.02),
                  0 2px 4px rgba(0, 0, 0, 0.03),
                  0 8px 16px rgba(0, 0, 0, 0.06),
                  0 24px 48px rgba(0, 0, 0, 0.08)
                `,
                paddingLeft: '48px',
                paddingRight: '48px',
                paddingTop: '48px',
                paddingBottom: '40px'
              }}
            >
              {/* Vertical Layout: Badge on top, Story Text below */}
              <div className="flex flex-col" style={{ gap: '24px', marginBottom: '32px' }}>
                {/* Header Label - PRÍBEH Tag */}
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border self-start"
                  style={{ 
                    backgroundColor: 'rgba(174, 84, 255, 0.08)', 
                    borderColor: 'rgba(174, 84, 255, 0.2)',
                    cursor: 'default'
                  }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: '#AE54FF' }} strokeWidth={2} />
                  <span className="text-xs tracking-wider uppercase" style={{ color: '#AE54FF', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                    {storyLabel}
                  </span>
                </div>

                {/* Story Content - Vertically aligned with tag */}
                <div className="story-content" style={{ maxWidth: '700px' }}>
                  <div className="story-text-wrapper">
                    {storyContent}
                  </div>
                </div>
              </div>

              {/* Button Inside Card - Right aligned */}
              <div className="flex items-center justify-end">
                <QuizButton onClick={onContinue}>
                  Pokračovať
                </QuizButton>
              </div>
            </div>
          </motion.div>

          {/* Footer Logo Navigation */}
          <FooterLogoNavigation onLogoClick={onLogoClick} />

        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Story Text Wrapper - ensures consistent paragraph spacing */
        .story-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        
        /* Story Content Styling */
        .story-content p {
          margin: 0;
          line-height: 1.58;
          font-size: 16px;
          font-weight: 400;
          font-family: 'Poppins', sans-serif;
          color: #231F20;
          text-align: left;
        }
        
        /* Marker-style highlights for bold text */
        .story-content strong,
        .story-content b {
          font-weight: 600 !important;
          color: #231F20 !important;
          background: linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%) !important;
          padding: 0 2px !important;
          border-radius: 3px !important;
        }

        /* First paragraph slightly larger and emphasized */
        .story-content p:first-child {
          font-size: 16px;
          font-weight: 400;
          font-family: 'Poppins', sans-serif;
          color: #231F20;
          line-height: 1.58;
          text-align: left;
        }

        /* Mobile - full width on mobile */
        @media (max-width: 1024px) {
          .story-content {
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}