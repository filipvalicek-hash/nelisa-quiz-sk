import { motion } from 'motion/react';
import { DoodleMonitor } from '@/app/components/icons/DoodleMonitor';
import { DoodleChecklist } from '@/app/components/icons/DoodleChecklist';
import { DoodleDocument } from '@/app/components/icons/DoodleDocument';
import { DoodleCheckmark } from '@/app/components/icons/DoodleCheckmark';
import { DoodleBadge } from '@/app/components/icons/DoodleBadge';
import { DoodleCalendar } from '@/app/components/icons/DoodleCalendar';
import { DoodleTarget } from '@/app/components/icons/DoodleTarget';
import { DoodleChatBubble } from '@/app/components/icons/DoodleChatBubble';
import { DoodleLightBulb } from '@/app/components/icons/DoodleLightBulb';
import { DoodleChart } from '@/app/components/icons/DoodleChart';
import { DoodleStar } from '@/app/components/icons/DoodleStar';
import { SmallStar, SparkStar } from '@/app/components/icons/DecorativeStars';

export function GameAtmosphereBackground() {
  // Main icon composition - organic, uneven layout
  const icons = [
    // Upper area
    { Component: DoodleStar, x: '8%', y: '10%', scale: 0.7, delay: 0, duration: 22, yRange: 15, xRange: 10, rotation: 8 },
    { Component: DoodleMonitor, x: '25%', y: '15%', scale: 0.85, delay: 2, duration: 26, yRange: 20, xRange: 12, rotation: -5 },
    { Component: DoodleCheckmark, x: '52%', y: '8%', scale: 0.75, delay: 1.5, duration: 24, yRange: 18, xRange: 8, rotation: 6 },
    { Component: DoodleChart, x: '72%', y: '12%', scale: 0.8, delay: 3.5, duration: 28, yRange: 22, xRange: 14, rotation: -4 },
    
    // Middle area - denser
    { Component: DoodleBadge, x: '15%', y: '35%', scale: 0.9, delay: 1, duration: 23, yRange: 16, xRange: 11, rotation: -7 },
    { Component: DoodleChatBubble, x: '38%', y: '32%', scale: 0.85, delay: 4, duration: 25, yRange: 19, xRange: 9, rotation: 5 },
    { Component: DoodleTarget, x: '58%', y: '38%', scale: 0.95, delay: 2.5, duration: 27, yRange: 21, xRange: 13, rotation: -6 },
    { Component: DoodleLightBulb, x: '78%', y: '35%', scale: 0.75, delay: 0.5, duration: 24, yRange: 17, xRange: 10, rotation: 7 },
    
    // Lower area
    { Component: DoodleDocument, x: '12%', y: '62%', scale: 0.8, delay: 3, duration: 26, yRange: 20, xRange: 12, rotation: 4 },
    { Component: DoodleChecklist, x: '35%', y: '65%', scale: 0.9, delay: 1.5, duration: 22, yRange: 15, xRange: 8, rotation: -5 },
    { Component: DoodleCalendar, x: '60%', y: '60%', scale: 0.85, delay: 4.5, duration: 25, yRange: 18, xRange: 11, rotation: 6 },
    { Component: DoodleCheckmark, x: '80%', y: '68%', scale: 0.7, delay: 2, duration: 23, yRange: 16, xRange: 9, rotation: -8 },
  ];

  // Decorative stars and sparkles
  const decorativeStars = [
    { x: '20%', y: '25%', delay: 0, duration: 15, color: '#FFB300', size: 16 },
    { x: '45%', y: '18%', delay: 2, duration: 18, color: '#5B9BD5', size: 14 },
    { x: '68%', y: '28%', delay: 1, duration: 20, color: '#9B59B6', size: 12 },
    { x: '30%', y: '52%', delay: 3, duration: 16, color: '#66BB6A', size: 16 },
    { x: '75%', y: '50%', delay: 1.5, duration: 19, color: '#FFA726', size: 14 },
    { x: '18%', y: '78%', delay: 2.5, duration: 17, color: '#5B9BD5', size: 12 },
    { x: '50%', y: '75%', delay: 0.5, duration: 21, color: '#9B59B6', size: 16 },
    { x: '85%', y: '82%', delay: 4, duration: 18, color: '#FFB300', size: 14 },
  ];

  const sparkles = [
    { x: '10%', y: '20%', delay: 1, duration: 12, color: '#FFB300' },
    { x: '42%', y: '45%', delay: 3, duration: 14, color: '#5B9BD5' },
    { x: '65%', y: '55%', delay: 0.5, duration: 13, color: '#66BB6A' },
    { x: '88%', y: '25%', delay: 2, duration: 15, color: '#9B59B6' },
    { x: '25%', y: '70%', delay: 4, duration: 11, color: '#FFA726' },
  ];

  return (
    <div className="relative w-full h-[700px] overflow-visible">
      {/* Main floating icons */}
      {icons.map(({ Component, x, y, scale, delay, duration, yRange, xRange, rotation }, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute"
          style={{ 
            left: x, 
            top: y,
          }}
          initial={{ opacity: 0, scale: scale * 0.7 }}
          animate={{
            opacity: [0.5, 0.8, 0.7, 0.85, 0.6],
            y: [0, -yRange, yRange * 0.5, -yRange * 0.3, 0],
            x: [0, xRange, -xRange * 0.6, xRange * 0.4, 0],
            rotate: [0, rotation, -rotation * 0.5, rotation * 0.7, 0],
            scale: [scale * 1.05, scale * 1.15, scale * 1.2, scale * 1.1, scale * 1.15],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Component />
        </motion.div>
      ))}

      {/* Soft bubble-style HR text labels */}
      <motion.div
        className="absolute"
        style={{ left: '16%', top: '20%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.55, 0.45, 0.5], y: [0, -8, 4, -5, 0] }}
        transition={{ duration: 20, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="px-4 py-2 rounded-full text-blue-600 text-xs"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(191, 219, 254, 0.8))',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15), 0 1px 3px rgba(59, 130, 246, 0.1)',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}
        >
          HR
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: '46%', top: '23%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.5, 0.6, 0.55], y: [0, -10, 6, -7, 0] }}
        transition={{ duration: 22, delay: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="px-4 py-2 rounded-full text-purple-600 text-xs"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, rgba(243, 232, 255, 0.9), rgba(233, 213, 255, 0.8))',
            boxShadow: '0 2px 8px rgba(168, 85, 247, 0.15), 0 1px 3px rgba(168, 85, 247, 0.1)',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}
        >
          nábor
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: '68%', top: '42%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.55, 0.45, 0.5], y: [0, -9, 5, -6, 0] }}
        transition={{ duration: 24, delay: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="px-4 py-2 rounded-full text-green-600 text-xs"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, rgba(220, 252, 231, 0.9), rgba(187, 247, 208, 0.8))',
            boxShadow: '0 2px 8px rgba(34, 197, 94, 0.15), 0 1px 3px rgba(34, 197, 94, 0.1)',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}
        >
          kandidáti
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: '22%', top: '53%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.5, 0.6, 0.55], y: [0, -11, 7, -8, 0] }}
        transition={{ duration: 26, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="px-4 py-2 rounded-full text-orange-600 text-xs"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, rgba(255, 237, 213, 0.9), rgba(254, 215, 170, 0.8))',
            boxShadow: '0 2px 8px rgba(251, 146, 60, 0.15), 0 1px 3px rgba(251, 146, 60, 0.1)',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}
        >
          rozhodování
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: '48%', top: '76%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.55, 0.45, 0.5], y: [0, -7, 4, -5, 0] }}
        transition={{ duration: 23, delay: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="px-4 py-2 rounded-full text-blue-600 text-xs"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(191, 219, 254, 0.8))',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15), 0 1px 3px rgba(59, 130, 246, 0.1)',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}
        >
          zpětná vazba
        </div>
      </motion.div>

      {/* Decorative small stars */}
      {decorativeStars.map(({ x, y, delay, duration, color, size }, index) => (
        <motion.div
          key={`star-${index}`}
          className="absolute"
          style={{ 
            left: x, 
            top: y,
            color: color,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0],
            y: [0, -10, 5, -8, 0],
            rotate: [0, 180, 90, 270, 360],
            scale: [0.8, 1, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SmallStar size={size} opacity={0.4} />
        </motion.div>
      ))}

      {/* Sparkles (four-point stars) */}
      {sparkles.map(({ x, y, delay, duration, color }, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="absolute"
          style={{ 
            left: x, 
            top: y,
            color: color,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.7, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
            rotate: [0, 45, 90, 135, 180],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SparkStar size={12} opacity={0.5} />
        </motion.div>
      ))}

      {/* Additional subtle abstract shapes */}
      {/* Floating dots */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-blue-300"
        style={{ left: '35%', top: '40%', opacity: 0.3 }}
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-purple-300"
        style={{ left: '62%', top: '58%', opacity: 0.3 }}
        animate={{ y: [0, -12, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, delay: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-green-300"
        style={{ left: '83%', top: '35%', opacity: 0.3 }}
        animate={{ y: [0, -18, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 22, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-orange-300"
        style={{ left: '12%', top: '48%', opacity: 0.3 }}
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 19, delay: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft wave shapes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
        <motion.path
          d="M 50 180 Q 120 170 180 180"
          stroke="#5B9BD5"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 25, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 380 280 Q 420 270 460 280"
          stroke="#9B59B6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 23, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Enhanced connecting lines and flow paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
        {/* Flowing curved paths connecting icons and bubbles */}
        <motion.path
          d="M 80 90 Q 120 105 160 130"
          stroke="#5B9BD5"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 300 80 Q 340 100 380 140"
          stroke="#9B59B6"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 18, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 120 260 Q 180 270 240 255"
          stroke="#66BB6A"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 22, delay: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 360 240 Q 400 265 435 300"
          stroke="#FFA726"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 24, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 100 420 Q 160 435 230 425"
          stroke="#5B9BD5"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 26, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 340 400 Q 380 420 420 455"
          stroke="#9B59B6"
          strokeWidth="1.5"
          strokeDasharray="2 5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 19, delay: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Learning journey flow - connecting bubbles to icons */}
        <motion.path
          d="M 140 145 Q 160 155 180 170"
          stroke="#5B9BD5"
          strokeWidth="1"
          strokeDasharray="1 4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 28, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 310 155 Q 340 180 360 210"
          stroke="#9B59B6"
          strokeWidth="1"
          strokeDasharray="1 4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 30, delay: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Connecting dots for journey feel */}
        <motion.circle
          cx="150"
          cy="130"
          r="2.5"
          fill="#5B9BD5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0, 0.25, 0] }}
          transition={{ duration: 18, delay: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="340"
          cy="140"
          r="2.5"
          fill="#9B59B6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0, 0.25, 0] }}
          transition={{ duration: 20, delay: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="200"
          cy="270"
          r="2.5"
          fill="#66BB6A"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0, 0.25, 0] }}
          transition={{ duration: 22, delay: 1, repeat: Infinity }}
        />
        <motion.circle
          cx="420"
          cy="310"
          r="2.5"
          fill="#FFA726"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0, 0.25, 0] }}
          transition={{ duration: 24, delay: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="180"
          cy="440"
          r="2.5"
          fill="#5B9BD5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0, 0.25, 0] }}
          transition={{ duration: 19, delay: 5, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}