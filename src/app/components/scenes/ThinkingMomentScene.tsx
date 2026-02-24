import { motion } from 'motion/react';

export function ThinkingMomentScene() {
  return (
    <motion.svg
      width="100%"
      height="280"
      viewBox="0 0 700 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ maxHeight: '280px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F8FA" />
          <stop offset="100%" stopColor="#E8EEF3" />
        </linearGradient>
        
        <linearGradient id="desk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8BEB0" />
          <stop offset="100%" stopColor="#B5AB9D" />
        </linearGradient>
        
        <linearGradient id="clock" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8ECEF" />
          <stop offset="100%" stopColor="#D5DCE1" />
        </linearGradient>
        
        <filter id="softShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.18"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="400" fill="url(#bgGrad)" />

      {/* Desk */}
      <rect y="300" width="700" height="100" fill="url(#desk)" />
      <rect y="300" width="700" height="6" fill="#A5998B" opacity="0.5" />

      {/* Wall clock - suggesting time passing */}
      <g transform="translate(580, 80)" filter="url(#softShadow)">
        <circle cx="0" cy="0" r="45" fill="url(#clock)" />
        <circle cx="0" cy="0" r="42" fill="#F5F7F9" />
        <circle cx="0" cy="0" r="4" fill="#6B7280" />
        
        {/* Hour hand */}
        <motion.rect 
          x="-2" y="-20" width="4" height="20" rx="2" 
          fill="#6B7280"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '0px 0px' }}
        />
        
        {/* Minute hand */}
        <motion.rect 
          x="-1.5" y="-28" width="3" height="28" rx="1.5" 
          fill="#9CA3AF"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '0px 0px' }}
        />
        
        {/* Hour markers */}
        <circle cx="0" cy="-35" r="2" fill="#D1D5DB" />
        <circle cx="0" cy="35" r="2" fill="#D1D5DB" />
        <circle cx="35" cy="0" r="2" fill="#D1D5DB" />
        <circle cx="-35" cy="0" r="2" fill="#D1D5DB" />
      </g>

      {/* Open laptop */}
      <g transform="translate(250, 240)" filter="url(#softShadow)">
        <rect x="0" y="70" width="200" height="10" rx="5" fill="#3A4148" />
        <path d="M 10 10 L 15 70 L 185 70 L 190 10 Z" fill="#2D3238" />
        <path d="M 20 18 L 24 62 L 176 62 L 180 18 Z" fill="#1E2227" />
        
        {/* Screen glow */}
        <motion.path 
          d="M 25 22 L 28 58 L 172 58 L 175 22 Z" 
          fill="#E8F1FA"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Minimal content */}
        <rect x="40" y="30" width="50" height="4" rx="2" fill="#7A95B5" opacity="0.5" />
        <rect x="40" y="42" width="100" height="3" rx="1.5" fill="#8FA9C4" opacity="0.4" />
      </g>

      {/* Calendar/planner */}
      <g transform="translate(90, 320)" filter="url(#softShadow)">
        <rect width="100" height="70" rx="4" fill="#FFFFFF" />
        <rect width="100" height="12" rx="4" fill="#6B95C4" opacity="0.3" />
        
        <g opacity="0.5">
          {/* Grid pattern */}
          <line x1="14" y1="20" x2="86" y2="20" stroke="#D5DCE1" strokeWidth="1" />
          <line x1="14" y1="30" x2="86" y2="30" stroke="#D5DCE1" strokeWidth="1" />
          <line x1="14" y1="40" x2="86" y2="40" stroke="#D5DCE1" strokeWidth="1" />
          <line x1="14" y1="50" x2="86" y2="50" stroke="#D5DCE1" strokeWidth="1" />
          <line x1="14" y1="60" x2="86" y2="60" stroke="#D5DCE1" strokeWidth="1" />
          
          <line x1="30" y1="12" x2="30" y2="70" stroke="#E0E5E9" strokeWidth="1" />
          <line x1="50" y1="12" x2="50" y2="70" stroke="#E0E5E9" strokeWidth="1" />
          <line x1="70" y1="12" x2="70" y2="70" stroke="#E0E5E9" strokeWidth="1" />
        </g>
        
        {/* Current day highlight */}
        <rect x="51" y="31" width="18" height="8" rx="2" fill="#6B95C4" opacity="0.4" />
      </g>

      {/* Notepad with pen */}
      <g transform="translate(510, 330)" filter="url(#softShadow)">
        <rect width="95" height="65" rx="3" fill="#FFF8E8" />
        <line x1="10" y1="15" x2="80" y2="15" stroke="#E8E0D0" strokeWidth="1.2" />
        <line x1="10" y1="27" x2="75" y2="27" stroke="#E8E0D0" strokeWidth="1.2" />
        <line x1="10" y1="39" x2="70" y2="39" stroke="#ECE4D4" strokeWidth="1.2" />
        <line x1="10" y1="51" x2="65" y2="51" stroke="#ECE4D4" strokeWidth="1.2" />
        
        {/* Pen */}
        <rect x="75" y="50" width="60" height="5" rx="2.5" fill="#4A5568" transform="rotate(35 105 52.5)" />
        <polygon points="130,45 138,48 138,52 130,55" fill="#3A4554" transform="rotate(35 134 50)" />
      </g>

      {/* Floating thought indicators */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 0.3, 0], y: [20, -10, -30] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      >
        <circle cx="400" cy="200" r="6" fill="#9CA3AF" />
        <circle cx="420" cy="180" r="9" fill="#9CA3AF" />
        <circle cx="450" cy="160" r="12" fill="#9CA3AF" />
      </motion.g>
    </motion.svg>
  );
}