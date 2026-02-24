import { motion } from 'motion/react';

export function DiscussionScene() {
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
        <linearGradient id="bg4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#F0F3F6" />
        </linearGradient>
        
        <linearGradient id="bubble1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F1FA" />
          <stop offset="100%" stopColor="#D5E5F3" />
        </linearGradient>
        
        <linearGradient id="bubble2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0F9ED" />
          <stop offset="100%" stopColor="#E3F2DF" />
        </linearGradient>
        
        <filter id="softShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="400" fill="url(#bg4)" />

      {/* Speech bubble 1 - left */}
      <motion.g
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <g filter="url(#softShadow)">
          <rect x="80" y="120" width="240" height="100" rx="16" fill="url(#bubble1)" />
          <path d="M 100 220 L 80 240 L 120 220 Z" fill="url(#bubble1)" />
        </g>
        
        {/* Content lines */}
        <rect x="105" y="145" width="180" height="6" rx="3" fill="#7A95B5" opacity="0.4" />
        <rect x="105" y="165" width="160" height="5" rx="2.5" fill="#8FA9C4" opacity="0.3" />
        <rect x="105" y="182" width="190" height="5" rx="2.5" fill="#8FA9C4" opacity="0.3" />
      </motion.g>

      {/* Speech bubble 2 - right */}
      <motion.g
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <g filter="url(#softShadow)">
          <rect x="380" y="200" width="260" height="110" rx="16" fill="url(#bubble2)" />
          <path d="M 620 310 L 640 330 L 600 310 Z" fill="url(#bubble2)" />
        </g>
        
        {/* Content lines */}
        <rect x="405" y="228" width="200" height="6" rx="3" fill="#85A888" opacity="0.4" />
        <rect x="405" y="248" width="180" height="5" rx="2.5" fill="#95B898" opacity="0.3" />
        <rect x="405" y="265" width="210" height="5" rx="2.5" fill="#95B898" opacity="0.3" />
        <rect x="405" y="282" width="160" height="5" rx="2.5" fill="#95B898" opacity="0.25" />
      </motion.g>

      {/* Connecting dots suggesting conversation flow */}
      <motion.g
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="340" cy="180" r="4" fill="#9CA3AF" />
        <circle cx="360" cy="190" r="4" fill="#9CA3AF" />
        <circle cx="380" cy="200" r="4" fill="#9CA3AF" />
      </motion.g>

      {/* Document/agreement icon at bottom */}
      <g transform="translate(280, 340)" opacity="0.5">
        <rect width="140" height="50" rx="4" fill="#E8ECEF" />
        <rect x="0" y="0" width="140" height="10" rx="4" fill="#D5DCE1" />
        
        <line x1="15" y1="22" x2="120" y2="22" stroke="#B0B8C0" strokeWidth="2" />
        <line x1="15" y1="32" x2="110" y2="32" stroke="#B0B8C0" strokeWidth="2" />
        
        {/* Checkmark */}
        <motion.path
          d="M 105 20 L 115 30 L 130 12"
          stroke="#85A888"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        />
      </g>
    </motion.svg>
  );
}