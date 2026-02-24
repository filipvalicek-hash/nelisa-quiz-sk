import { motion } from 'motion/react';

export function StrategyScene() {
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
          <linearGradient id="bg5" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7F9FB" />
            <stop offset="100%" stopColor="#EEF2F6" />
          </linearGradient>
          
          <filter id="shadow">
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
        </defs>

        {/* Background */}
        <rect width="700" height="400" fill="url(#bg5)" />

        {/* Board/whiteboard suggestion */}
        <rect x="100" y="60" width="500" height="280" rx="12" fill="#FCFCFD" opacity="0.8" filter="url(#shadow)" />

        {/* Process flow - step by step */}
        <g transform="translate(150, 130)">
          {/* Step 1 */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <rect width="90" height="70" rx="8" fill="#E8F1FA" />
            <rect x="10" y="15" width="70" height="5" rx="2.5" fill="#7A95B5" opacity="0.5" />
            <rect x="10" y="28" width="60" height="4" rx="2" fill="#8FA9C4" opacity="0.4" />
            <rect x="10" y="38" width="65" height="4" rx="2" fill="#8FA9C4" opacity="0.4" />
            
            {/* Number */}
            <circle cx="20" cy="55" r="8" fill="#6B95C4" opacity="0.3" />
            <text x="20" y="59" textAnchor="middle" fontSize="12" fill="#6B95C4" fontWeight="bold">1</text>
          </motion.g>

          {/* Arrow */}
          <motion.path
            d="M 100 35 L 140 35"
            stroke="#9CA3AF"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
          <motion.path
            d="M 135 30 L 145 35 L 135 40"
            stroke="#9CA3AF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />

          {/* Step 2 */}
          <motion.g
            transform="translate(150, 0)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <rect width="90" height="70" rx="8" fill="#F0F9ED" />
            <rect x="10" y="15" width="70" height="5" rx="2.5" fill="#85A888" opacity="0.5" />
            <rect x="10" y="28" width="60" height="4" rx="2" fill="#95B898" opacity="0.4" />
            <rect x="10" y="38" width="65" height="4" rx="2" fill="#95B898" opacity="0.4" />
            
            {/* Number */}
            <circle cx="20" cy="55" r="8" fill="#7A9B7E" opacity="0.3" />
            <text x="20" y="59" textAnchor="middle" fontSize="12" fill="#7A9B7E" fontWeight="bold">2</text>
          </motion.g>

          {/* Arrow */}
          <motion.path
            d="M 250 35 L 290 35"
            stroke="#9CA3AF"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          />
          <motion.path
            d="M 285 30 L 295 35 L 285 40"
            stroke="#9CA3AF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.4, duration: 0.3 }}
          />

          {/* Step 3 */}
          <motion.g
            transform="translate(300, 0)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <rect width="90" height="70" rx="8" fill="#FEF7ED" />
            <rect x="10" y="15" width="70" height="5" rx="2.5" fill="#D4A574" opacity="0.5" />
            <rect x="10" y="28" width="60" height="4" rx="2" fill="#E0B888" opacity="0.4" />
            <rect x="10" y="38" width="65" height="4" rx="2" fill="#E0B888" opacity="0.4" />
            
            {/* Number */}
            <circle cx="20" cy="55" r="8" fill="#C8956A" opacity="0.3" />
            <text x="20" y="59" textAnchor="middle" fontSize="12" fill="#C8956A" fontWeight="bold">3</text>
          </motion.g>
        </g>

        {/* Success indicator at bottom */}
        <motion.g
          transform="translate(320, 320)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
        >
          <circle cx="0" cy="0" r="30" fill="#85A888" opacity="0.15" />
          <circle cx="0" cy="0" r="20" fill="#85A888" opacity="0.25" />
          <path
            d="M -8 -2 L -2 6 L 10 -8"
            stroke="#7A9B7E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>

        {/* Subtle grid in background */}
        <g opacity="0.08">
          <line x1="350" y1="80" x2="350" y2="320" stroke="#9CA3AF" strokeWidth="1" />
          <line x1="120" y1="200" x2="580" y2="200" stroke="#9CA3AF" strokeWidth="1" />
        </g>
      </motion.svg>
    </div>
  );
}
