import { motion } from 'motion/react';

export function MorningDeskScene() {
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
          <filter id="softShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
            <feOffset dx="0" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Wall */}
        <rect width="700" height="400" fill="#F5F7FA" />
        
        {/* Window Light Effect */}
        <motion.rect 
          x="50" y="40" width="180" height="220" 
          rx="8" 
          fill="#E8F0F8" 
          opacity="0.5"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Desk Surface */}
        <rect y="280" width="700" height="120" fill="#D4C8BA" />
        <rect y="280" width="700" height="6" fill="#BFB3A5" opacity="0.6" />

        {/* Desk Shadow */}
        <ellipse cx="350" cy="320" rx="300" ry="50" fill="#000000" opacity="0.05" />

        {/* Person - Sitting at desk */}
        <g transform="translate(120, 140)">
          {/* Head */}
          <ellipse cx="60" cy="30" rx="24" ry="26" fill="#F4C9A0" />
          
          {/* Hair */}
          <path d="M 36 22 Q 36 8, 60 5 Q 84 8, 84 22 L 84 32 Q 84 20, 60 18 Q 36 20, 36 32 Z" fill="#6B5D54" />
          
          {/* Facial features - minimal */}
          <ellipse cx="52" cy="30" rx="2" ry="2.5" fill="#5A4D44" opacity="0.7" />
          <ellipse cx="68" cy="30" rx="2" ry="2.5" fill="#5A4D44" opacity="0.7" />
          <path d="M 54 42 Q 60 44, 66 42" stroke="#D4A882" strokeWidth="1.5" fill="none" opacity="0.6" />
          
          {/* Neck */}
          <rect x="52" y="52" width="16" height="12" fill="#F4C9A0" />
          
          {/* Torso/Shirt */}
          <path 
            d="M 40 64 L 45 120 L 75 120 L 80 64 Q 70 60, 60 60 Q 50 60, 40 64" 
            fill="#7B9FBF" 
          />
          
          {/* Collar */}
          <path d="M 52 60 L 50 68 L 60 72 L 70 68 L 68 60" fill="#6B8FAF" />
          
          {/* Arms */}
          <ellipse cx="38" cy="90" rx="8" ry="20" fill="#7B9FBF" transform="rotate(-15 38 90)" />
          <ellipse cx="82" cy="90" rx="8" ry="20" fill="#7B9FBF" transform="rotate(15 82 90)" />
          
          {/* Hands on keyboard */}
          <ellipse cx="32" cy="130" rx="7" ry="5" fill="#F4C9A0" />
          <ellipse cx="88" cy="130" rx="7" ry="5" fill="#F4C9A0" />
        </g>

        {/* Laptop - Open */}
        <g transform="translate(180, 295)" filter="url(#softShadow)">
          {/* Laptop base */}
          <rect x="0" y="30" width="200" height="12" rx="4" fill="#3A4450" />
          <rect x="8" y="32" width="184" height="8" rx="2" fill="#4A5460" />
          
          {/* Laptop screen */}
          <path d="M 20 30 L 10 0 L 190 0 L 180 30 Z" fill="#2D3641" />
          <path d="M 22 28 L 14 4 L 186 4 L 178 28 Z" fill="#E8F1F9" />
          
          {/* Screen content - abstract shapes */}
          <motion.g
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Header bar */}
            <rect x="20" y="8" width="160" height="3" rx="1.5" fill="#6B95C4" opacity="0.4" />
            
            {/* Content blocks */}
            <rect x="24" y="16" width="60" height="4" rx="2" fill="#8AAAC8" opacity="0.3" />
            <rect x="24" y="24" width="75" height="2.5" rx="1.25" fill="#A8BFD4" opacity="0.25" />
            <rect x="24" y="30" width="68" height="2.5" rx="1.25" fill="#A8BFD4" opacity="0.25" />
            
            {/* Calendar/schedule icons */}
            <rect x="110" y="16" width="25" height="25" rx="3" fill="#7B9FBF" opacity="0.2" />
            <rect x="142" y="16" width="25" height="25" rx="3" fill="#7B9FBF" opacity="0.15" />
          </motion.g>
          
          {/* Webcam */}
          <circle cx="100" cy="2" r="1.5" fill="#4A5460" opacity="0.5" />
        </g>

        {/* Coffee Mug */}
        <g transform="translate(410, 310)" filter="url(#softShadow)">
          {/* Mug body */}
          <ellipse cx="20" cy="12" rx="16" ry="6" fill="#E8E8E8" />
          <rect x="4" y="12" width="32" height="38" rx="6" fill="#FFFFFF" />
          <ellipse cx="20" cy="12" rx="13" ry="4" fill="#F5F5F5" />
          
          {/* Coffee inside */}
          <rect x="8" y="18" width="24" height="28" fill="#A67C52" opacity="0.15" />
          
          {/* Handle */}
          <path 
            d="M 36 24 Q 48 24, 48 34 Q 48 44, 36 44" 
            stroke="#E8E8E8" 
            strokeWidth="4" 
            fill="none"
          />
          
          {/* Steam */}
          <motion.path
            d="M 15 8 Q 13 0, 15 -8"
            stroke="#B8C5D0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            animate={{ 
              d: [
                "M 15 8 Q 13 0, 15 -8",
                "M 15 8 Q 17 0, 15 -8",
                "M 15 8 Q 13 0, 15 -8"
              ],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 25 6 Q 27 -2, 25 -10"
            stroke="#B8C5D0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
            animate={{ 
              d: [
                "M 25 6 Q 27 -2, 25 -10",
                "M 25 6 Q 23 -2, 25 -10",
                "M 25 6 Q 27 -2, 25 -10"
              ],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
        </g>

        {/* Notebook/Planner */}
        <g transform="translate(480, 315)" filter="url(#softShadow)">
          <rect width="90" height="70" rx="4" fill="#F9FAFB" />
          <rect x="2" y="2" width="86" height="66" rx="3" fill="#FFFFFF" />
          
          {/* Lines on notebook */}
          <line x1="10" y1="15" x2="75" y2="15" stroke="#E5E7EB" strokeWidth="1.5" />
          <line x1="10" y1="25" x2="70" y2="25" stroke="#E5E7EB" strokeWidth="1.5" />
          <line x1="10" y1="35" x2="78" y2="35" stroke="#E5E7EB" strokeWidth="1.5" />
          <line x1="10" y1="45" x2="65" y2="45" stroke="#E5E7EB" strokeWidth="1.5" />
          
          {/* Small calendar icon */}
          <rect x="55" y="52" width="20" height="14" rx="2" fill="#A8B8CC" opacity="0.2" />
          <rect x="57" y="54" width="6" height="2" rx="1" fill="#7B9FBF" opacity="0.4" />
        </g>

        {/* Small plant on desk */}
        <g transform="translate(580, 290)" opacity="0.5">
          <ellipse cx="18" cy="45" rx="16" ry="5" fill="#BFB3A5" />
          <path d="M 8 45 L 6 28 L 30 28 L 28 45 Z" fill="#C8BCB0" />
          
          {/* Leaves */}
          <motion.ellipse 
            cx="14" cy="20" rx="4" ry="10" 
            fill="#7A9B7E" 
            transform="rotate(-25 14 20)"
            animate={{ rotate: [-25, -22, -25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '14px 20px' }}
          />
          <motion.ellipse 
            cx="18" cy="16" rx="4" ry="11" 
            fill="#85A888"
            animate={{ scaleY: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse 
            cx="23" cy="19" rx="4" ry="10" 
            fill="#7A9B7E" 
            transform="rotate(22 23 19)"
            animate={{ rotate: [22, 25, 22] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '23px 19px' }}
          />
        </g>

        {/* Subtle shadow under items */}
        <ellipse cx="280" cy="340" rx="100" ry="8" fill="#000000" opacity="0.03" />
        <ellipse cx="440" cy="348" rx="70" ry="6" fill="#000000" opacity="0.03" />
        <ellipse cx="525" cy="350" rx="45" ry="5" fill="#000000" opacity="0.03" />
      </motion.svg>
    </div>
  );
}
