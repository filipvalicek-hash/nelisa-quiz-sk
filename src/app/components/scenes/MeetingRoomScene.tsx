import { motion } from 'motion/react';

export function MeetingRoomScene() {
  return (
    <div className="flex justify-center">
      <motion.svg
        width="100%"
        height="400"
        viewBox="0 0 700 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          <linearGradient id="wallBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFB" />
            <stop offset="100%" stopColor="#EDF2F7" />
          </linearGradient>
          
          <linearGradient id="tableSurface" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4C4B0" />
            <stop offset="100%" stopColor="#BFB09D" />
          </linearGradient>
          
          <linearGradient id="screenGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#E8F1FA" />
            <stop offset="100%" stopColor="#D1E3F3" />
          </linearGradient>
          
          <radialGradient id="softLight">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          
          <filter id="blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Wall */}
        <rect width="700" height="280" fill="url(#wallBg)" />
        
        {/* Window light */}
        <motion.ellipse 
          cx="150" cy="120" rx="120" ry="140" 
          fill="url(#softLight)"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Table */}
        <ellipse cx="350" cy="320" rx="280" ry="60" fill="#B5A593" opacity="0.3" />
        <rect y="280" width="700" height="120" fill="url(#tableSurface)" />
        <rect y="280" width="700" height="8" fill="#AFA090" opacity="0.6" />

        {/* Large monitor/screen - centered */}
        <g transform="translate(220, 120)" filter="url(#shadow)">
          <rect x="0" y="0" width="260" height="165" rx="8" fill="#2A3441" />
          <rect x="8" y="8" width="244" height="149" rx="4" fill="url(#screenGlow)" />
          
          {/* Nelisa UI on screen */}
          <motion.g
            animate={{ opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="24" y="24" width="80" height="8" rx="4" fill="#6B95C4" opacity="0.6" />
            <rect x="24" y="44" width="200" height="4" rx="2" fill="#8AAAC8" opacity="0.4" />
            <rect x="24" y="56" width="180" height="4" rx="2" fill="#8AAAC8" opacity="0.35" />
            <rect x="24" y="68" width="190" height="4" rx="2" fill="#8AAAC8" opacity="0.35" />
            
            <rect x="24" y="88" width="100" height="54" rx="6" fill="#5B88B5" opacity="0.25" />
            <rect x="134" y="88" width="100" height="54" rx="6" fill="#5B88B5" opacity="0.2" />
          </motion.g>
          
          {/* Screen stand */}
          <rect x="110" y="165" width="40" height="20" fill="#2A3441" />
          <rect x="90" y="185" width="80" height="8" rx="4" fill="#2A3441" />
        </g>

        {/* Notebook on table */}
        <g transform="translate(80, 310)" filter="url(#shadow)">
          <rect width="110" height="80" rx="4" fill="#FFFFFF" />
          <line x1="12" y1="20" x2="95" y2="20" stroke="#E8ECEF" strokeWidth="1.5" />
          <line x1="12" y1="32" x2="88" y2="32" stroke="#E8ECEF" strokeWidth="1.5" />
          <line x1="12" y1="44" x2="82" y2="44" stroke="#EBEEF1" strokeWidth="1.5" />
          <line x1="12" y1="56" x2="75" y2="56" stroke="#EBEEF1" strokeWidth="1.5" />
        </g>

        {/* Coffee cups - two people meeting */}
        <g transform="translate(520, 320)" filter="url(#shadow)">
          <ellipse cx="15" cy="8" rx="12" ry="4" fill="#D8DDE3" />
          <rect x="4" y="8" width="22" height="28" rx="4" fill="#FFFFFF" />
          <ellipse cx="15" cy="8" rx="9" ry="3" fill="#E8E8E8" />
          <rect x="8" y="14" width="14" height="18" fill="#9B8165" opacity="0.1" />
        </g>

        <g transform="translate(580, 315)" filter="url(#shadow)">
          <ellipse cx="15" cy="8" rx="12" ry="4" fill="#D8DDE3" />
          <rect x="4" y="8" width="22" height="28" rx="4" fill="#FFFFFF" />
          <ellipse cx="15" cy="8" rx="9" ry="3" fill="#E8E8E8" />
          <rect x="8" y="14" width="14" height="18" fill="#9B8165" opacity="0.1" />
        </g>

        {/* Subtle plant in background */}
        <g transform="translate(600, 240)" opacity="0.4">
          <ellipse cx="20" cy="55" rx="18" ry="6" fill="#B5A593" />
          <path d="M 10 55 L 8 30 L 32 30 L 30 55 Z" fill="#C4B5A0" />
          <ellipse cx="20" cy="30" rx="11" ry="4" fill="#D4C4B0" />
          
          <motion.ellipse 
            cx="15" cy="20" rx="6" ry="14" 
            fill="#7A9B7E" 
            transform="rotate(-20 15 20)"
            animate={{ rotate: [-20, -18, -20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '15px 20px' }}
          />
          <motion.ellipse 
            cx="20" cy="15" rx="6" ry="16" 
            fill="#85A888"
            animate={{ scaleY: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse 
            cx="26" cy="18" rx="6" ry="15" 
            fill="#7A9B7E" 
            transform="rotate(22 26 18)"
            animate={{ rotate: [22, 24, 22] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '26px 18px' }}
          />
        </g>
      </motion.svg>
    </div>
  );
}
