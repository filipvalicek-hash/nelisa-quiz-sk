import { motion } from 'motion/react';

export function DecisionMomentScene() {
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
        <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFB" />
          <stop offset="100%" stopColor="#EEF3F7" />
        </linearGradient>
        
        <linearGradient id="path1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A95B5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7A95B5" stopOpacity="0" />
        </linearGradient>
        
        <linearGradient id="path2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#85A888" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#85A888" stopOpacity="0" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="400" fill="url(#bg3)" />

      {/* Decision point - center */}
      <g transform="translate(350, 200)">
        <motion.circle 
          cx="0" cy="0" r="50" 
          fill="#6B95C4" 
          opacity="0.15"
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="0" cy="0" r="30" fill="#6B95C4" opacity="0.3" />
        <circle cx="0" cy="0" r="12" fill="#6B95C4" opacity="0.6" />
      </g>

      {/* Path option 1 - going up-left */}
      <motion.path
        d="M 350 200 Q 250 150 150 100"
        stroke="url(#path1)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
      
      {/* Destination 1 */}
      <motion.g
        transform="translate(150, 100)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        <circle cx="0" cy="0" r="25" fill="#7A95B5" opacity="0.2" />
        <circle cx="0" cy="0" r="15" fill="#7A95B5" opacity="0.4" />
        <circle cx="0" cy="0" r="6" fill="#7A95B5" />
      </motion.g>

      {/* Path option 2 - going up-right */}
      <motion.path
        d="M 350 200 Q 450 150 550 100"
        stroke="url(#path2)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />
      
      {/* Destination 2 */}
      <motion.g
        transform="translate(550, 100)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      >
        <circle cx="0" cy="0" r="25" fill="#85A888" opacity="0.2" />
        <circle cx="0" cy="0" r="15" fill="#85A888" opacity="0.4" />
        <circle cx="0" cy="0" r="6" fill="#85A888" />
      </motion.g>

      {/* Subtle icons at destinations */}
      <g transform="translate(150, 100)" opacity="0.5">
        <rect x="-8" y="-12" width="16" height="3" rx="1.5" fill="#5B7FA5" />
        <rect x="-8" y="-7" width="16" height="3" rx="1.5" fill="#5B7FA5" />
        <rect x="-8" y="-2" width="16" height="3" rx="1.5" fill="#5B7FA5" />
      </g>

      <g transform="translate(550, 100)" opacity="0.5">
        <motion.path
          d="M -8 -8 L -2 0 L -8 8"
          stroke="#6B9370"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 2 -8 L 8 0 L 2 8"
          stroke="#6B9370"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </g>

      {/* Question mark at center - subtle */}
      <motion.text
        x="350"
        y="210"
        textAnchor="middle"
        fontSize="24"
        fill="#6B95C4"
        opacity="0.4"
        fontWeight="bold"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ?
      </motion.text>

      {/* Floating particles suggesting motion */}
      <motion.circle
        cx="280"
        cy="170"
        r="3"
        fill="#7A95B5"
        opacity="0.3"
        animate={{ 
          x: [-30, 0, -30],
          y: [0, -20, 0],
          opacity: [0, 0.3, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="420"
        cy="170"
        r="3"
        fill="#85A888"
        opacity="0.3"
        animate={{ 
          x: [30, 0, 30],
          y: [0, -20, 0],
          opacity: [0, 0.3, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}