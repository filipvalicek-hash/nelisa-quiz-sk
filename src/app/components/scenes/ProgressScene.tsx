import { motion } from 'motion/react';

export function ProgressScene() {
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
          <linearGradient id="bg6" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFB" />
            <stop offset="100%" stopColor="#F0F4F7" />
          </linearGradient>
          
          <linearGradient id="progressBar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B95C4" />
            <stop offset="100%" stopColor="#85A888" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="700" height="400" fill="url(#bg6)" />

        {/* Progress visualization - centered */}
        <g transform="translate(150, 180)">
          {/* Track */}
          <rect width="400" height="40" rx="20" fill="#E8ECEF" />
          
          {/* Progress fill */}
          <motion.rect 
            width="300" 
            height="40" 
            rx="20" 
            fill="url(#progressBar)"
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Percentage text */}
          <motion.text
            x="200"
            y="28"
            textAnchor="middle"
            fontSize="20"
            fill="#FFFFFF"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            75%
          </motion.text>
        </g>

        {/* Milestone checkpoints */}
        <g transform="translate(150, 180)">
          <motion.circle 
            cx="0" cy="20" r="12" 
            fill="#7A9B7E"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          />
          <motion.path
            d="M -4 18 L -1 23 L 5 15"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />

          <motion.circle 
            cx="133" cy="20" r="12" 
            fill="#7A9B7E"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          />
          <motion.path
            d="M 129 18 L 132 23 L 138 15"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.3, duration: 0.3 }}
          />

          <motion.circle 
            cx="266" cy="20" r="12" 
            fill="#7A9B7E"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
          />
          <motion.path
            d="M 262 18 L 265 23 L 271 15"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.6, duration: 0.3 }}
          />

          <motion.circle 
            cx="400" cy="20" r="12" 
            fill="#D5DCE1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, type: "spring" }}
          />
        </g>

        {/* Achievement stars */}
        <motion.g
          transform="translate(280, 100)"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 2, type: "spring", bounce: 0.5 }}
        >
          <path
            d="M 0 -20 L 6 -6 L 21 -4 L 10 7 L 13 22 L 0 15 L -13 22 L -10 7 L -21 -4 L -6 -6 Z"
            fill="#F0B429"
            opacity="0.6"
          />
        </motion.g>

        <motion.g
          transform="translate(420, 110)"
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 2.2, type: "spring", bounce: 0.5 }}
        >
          <path
            d="M 0 -15 L 4 -4 L 16 -3 L 8 5 L 10 17 L 0 11 L -10 17 L -8 5 L -16 -3 L -4 -4 Z"
            fill="#F0B429"
            opacity="0.5"
          />
        </motion.g>

        {/* Upward trend arrow */}
        <motion.g
          transform="translate(500, 280)"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <path
            d="M 0 40 Q 20 25 40 10 Q 60 -5 80 -20"
            stroke="#85A888"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 65 -10 L 80 -20 L 75 -5"
            fill="#85A888"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
