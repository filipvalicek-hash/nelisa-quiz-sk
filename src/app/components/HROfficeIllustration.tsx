import { motion } from 'motion/react';

export function HROfficeIllustration() {
  return (
    <svg
      width="100%"
      height="600"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Soft neutral gradients */}
        <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F7FA" />
          <stop offset="100%" stopColor="#E8EDF2" />
        </linearGradient>
        
        <linearGradient id="deskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8BFB0" />
          <stop offset="100%" stopColor="#B0A898" />
        </linearGradient>
        
        <linearGradient id="laptopScreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E5EDF5" />
          <stop offset="100%" stopColor="#D0DCE8" />
        </linearGradient>
        
        <linearGradient id="notebookPage" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F9F9F9" />
        </linearGradient>
        
        <radialGradient id="softLight">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        
        {/* Realistic shadows */}
        <filter id="subtleShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="mediumShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="3" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.22"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Wall background - soft neutral */}
      <rect width="800" height="420" fill="url(#wallGradient)" />
      
      {/* Soft ambient light from window (left side) */}
      <ellipse cx="150" cy="200" rx="180" ry="220" fill="url(#softLight)" opacity="0.4" />

      {/* Window frame suggestion (subtle) */}
      <g opacity="0.12">
        <rect x="40" y="80" width="180" height="280" rx="8" fill="none" stroke="#A0B0C0" strokeWidth="3" />
        <line x1="130" y1="80" x2="130" y2="360" stroke="#A0B0C0" strokeWidth="3" />
        <line x1="40" y1="220" x2="220" y2="220" stroke="#A0B0C0" strokeWidth="3" />
      </g>

      {/* Desk surface */}
      <rect y="420" width="800" height="180" fill="url(#deskGradient)" />
      <rect y="420" width="800" height="8" fill="#A09588" opacity="0.4" />

      {/* Laptop - center of desk, realistic perspective */}
      <g transform="translate(280, 320)" filter="url(#mediumShadow)">
        {/* Laptop base/keyboard */}
        <path d="M 10 110 L 240 110 L 235 125 L 15 125 Z" fill="#3A3F45" />
        <ellipse cx="125" cy="115" rx="55" ry="8" fill="#2A2E33" opacity="0.3" />
        
        {/* Laptop screen back */}
        <path d="M 30 10 L 35 110 L 215 110 L 220 10 Z" fill="#2D3238" />
        
        {/* Screen bezel */}
        <path d="M 40 18 L 44 102 L 206 102 L 210 18 Z" fill="#1E2227" />
        
        {/* Screen display */}
        <path d="M 48 25 L 52 95 L 198 95 L 202 25 Z" fill="url(#laptopScreen)" />
        
        {/* Minimal UI on screen - abstract shapes only */}
        <motion.g
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Header bar */}
          <path d="M 58 32 L 59 40 L 192 40 L 193 32 Z" fill="#7A95B5" opacity="0.6" />
          
          {/* Content lines */}
          <path d="M 62 50 L 62.5 56 L 140 56 L 140.5 50 Z" fill="#8FA9C4" opacity="0.4" />
          <path d="M 62 62 L 62.8 68 L 180 68 L 180.8 62 Z" fill="#8FA9C4" opacity="0.35" />
          <path d="M 62 74 L 62.8 80 L 165 80 L 165.8 74 Z" fill="#8FA9C4" opacity="0.3" />
          
          {/* Card/panel shapes */}
          <path d="M 65 88 L 66 128 L 115 128 L 116 88 Z" fill="#6B88A8" opacity="0.25" transform="scale(0.6) translate(30, 30)" />
          <path d="M 130 88 L 131 128 L 180 128 L 181 88 Z" fill="#6B88A8" opacity="0.2" transform="scale(0.6) translate(100, 30)" />
        </motion.g>
        
        {/* Screen reflection/glare */}
        <path d="M 58 30 L 100 60 L 95 65 L 56 38 Z" fill="white" opacity="0.08" />
      </g>

      {/* Notebook - left side of desk */}
      <g transform="translate(80, 450)" filter="url(#subtleShadow)">
        <rect x="0" y="0" width="130" height="95" rx="4" fill="url(#notebookPage)" stroke="#D8DDE3" strokeWidth="1.5" />
        
        {/* Notebook lines */}
        <line x1="15" y1="20" x2="110" y2="20" stroke="#E5E9ED" strokeWidth="1.2" />
        <line x1="15" y1="32" x2="105" y2="32" stroke="#E5E9ED" strokeWidth="1.2" />
        <line x1="15" y1="44" x2="100" y2="44" stroke="#E8ECF0" strokeWidth="1.2" />
        <line x1="15" y1="56" x2="95" y2="56" stroke="#E8ECF0" strokeWidth="1.2" />
        <line x1="15" y1="68" x2="85" y2="68" stroke="#EBEEF2" strokeWidth="1.2" />
        <line x1="15" y1="80" x2="75" y2="80" stroke="#EBEEF2" strokeWidth="1.2" />
        
        {/* Spiral binding suggestion */}
        <g opacity="0.3">
          <circle cx="8" cy="20" r="2" fill="none" stroke="#B0B8C0" strokeWidth="1" />
          <circle cx="8" cy="35" r="2" fill="none" stroke="#B0B8C0" strokeWidth="1" />
          <circle cx="8" cy="50" r="2" fill="none" stroke="#B0B8C0" strokeWidth="1" />
          <circle cx="8" cy="65" r="2" fill="none" stroke="#B0B8C0" strokeWidth="1" />
          <circle cx="8" cy="80" r="2" fill="none" stroke="#B0B8C0" strokeWidth="1" />
        </g>
      </g>

      {/* Pen beside notebook */}
      <g transform="translate(195, 490)" filter="url(#subtleShadow)">
        <rect x="0" y="0" width="85" height="6" rx="3" fill="#4A5568" />
        <rect x="0" y="1" width="85" height="4" rx="2" fill="#5A6A78" />
        <polygon points="85,3 95,1 95,5" fill="#3A4554" />
        <rect x="3" y="1.5" width="15" height="3" rx="1.5" fill="#94A3B8" opacity="0.5" />
      </g>

      {/* Coffee cup - right side */}
      <g transform="translate(580, 460)" filter="url(#subtleShadow)">
        {/* Saucer shadow */}
        <ellipse cx="30" cy="68" rx="28" ry="8" fill="#A0A8B0" opacity="0.15" />
        
        {/* Cup body */}
        <ellipse cx="30" cy="50" rx="22" ry="7" fill="#E0E4E8" />
        <rect x="8" y="50" width="44" height="50" rx="8" fill="#FFFFFF" />
        <ellipse cx="30" cy="100" rx="22" ry="7" fill="#D8DDE3" />
        
        {/* Coffee inside */}
        <ellipse cx="30" cy="58" rx="18" height="5" fill="#8B7355" opacity="0.15" />
        <rect x="12" y="58" width="36" height="30" fill="#9B8165" opacity="0.12" />
        
        {/* Cup handle */}
        <path d="M 52 65 Q 62 65 62 75 Q 62 85 52 85" 
              stroke="#D8DDE3" 
              strokeWidth="4.5" 
              fill="none" 
              strokeLinecap="round" />
        
        {/* Highlight on cup */}
        <ellipse cx="20" cy="70" rx="6" ry="18" fill="white" opacity="0.3" />
      </g>

      {/* Plant pot - far right corner */}
      <g transform="translate(680, 440)" filter="url(#subtleShadow)">
        {/* Pot */}
        <path d="M 20 60 L 15 95 L 65 95 L 60 60 Z" fill="#C8BFB0" />
        <ellipse cx="40" cy="60" rx="20" ry="6" fill="#D8CFC0" />
        <ellipse cx="40" cy="95" rx="25" ry="7" fill="#B0A898" opacity="0.4" />
        
        {/* Soil */}
        <ellipse cx="40" cy="62" rx="17" ry="5" fill="#8B7D6B" opacity="0.3" />
        
        {/* Simple plant leaves - minimal, geometric */}
        <g opacity="0.85">
          <motion.ellipse 
            cx="35" cy="45" rx="8" ry="18" 
            fill="#7A9B7E" 
            transform="rotate(-25 35 45)"
            animate={{ rotate: [-25, -23, -25] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '35px 45px' }}
          />
          <motion.ellipse 
            cx="40" cy="38" rx="8" ry="20" 
            fill="#85A888"
            animate={{ scaleY: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse 
            cx="48" cy="42" rx="8" ry="19" 
            fill="#7A9B7E" 
            transform="rotate(28 48 42)"
            animate={{ rotate: [28, 30, 28] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: '48px 42px' }}
          />
        </g>
      </g>

      {/* Desk lamp - back left (subtle silhouette) */}
      <g transform="translate(520, 360)" opacity="0.6" filter="url(#subtleShadow)">
        {/* Lamp base */}
        <ellipse cx="20" cy="92" rx="18" ry="6" fill="#6B7280" />
        <rect x="16" y="85" width="8" height="7" fill="#6B7280" />
        
        {/* Lamp arm */}
        <rect x="18" y="40" width="4" height="48" fill="#7A8290" />
        
        {/* Lamp head */}
        <path d="M 10 30 L 8 40 L 32 40 L 30 30 Z" fill="#8A929E" />
        <ellipse cx="20" cy="30" rx="10" ry="3" fill="#9AA2AE" />
        
        {/* Soft glow from lamp */}
        <motion.ellipse 
          cx="20" cy="42" rx="35" ry="15" 
          fill="#FFF8E8" 
          opacity="0.08"
          animate={{ opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>

      {/* Soft daylight cast shadow on desk */}
      <ellipse cx="400" cy="500" rx="280" ry="60" fill="#9A8E7D" opacity="0.06" />
    </svg>
  );
}
