import { motion } from 'motion/react';

interface OfficeCharacterProps {
  variant?: 'thinking' | 'presenting' | 'working';
  className?: string;
}

export function OfficeCharacter({ variant = 'presenting', className = '' }: OfficeCharacterProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          {/* Advanced gradients for depth and realism */}
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDFC4" />
            <stop offset="50%" stopColor="#FFCDA3" />
            <stop offset="100%" stopColor="#FFB380" />
          </linearGradient>
          
          <radialGradient id="faceShadow">
            <stop offset="0%" stopColor="#FFB380" stopOpacity="0" />
            <stop offset="100%" stopColor="#E89B6B" stopOpacity="0.3" />
          </radialGradient>
          
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A3B2E" />
            <stop offset="50%" stopColor="#3A2E23" />
            <stop offset="100%" stopColor="#2B1F18" />
          </linearGradient>
          
          <linearGradient id="blazerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B6B7D" />
            <stop offset="50%" stopColor="#4A5668" />
            <stop offset="100%" stopColor="#3A4554" />
          </linearGradient>
          
          <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          
          <radialGradient id="backgroundGlow">
            <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E0E7FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.1" />
          </radialGradient>
          
          <linearGradient id="eyeShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4A3D" />
            <stop offset="100%" stopColor="#3A2E23" />
          </linearGradient>
          
          {/* Advanced shadow filters */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
            <feOffset dx="0" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Soft background with office elements */}
        <circle cx="200" cy="200" r="160" fill="url(#backgroundGlow)" />
        
        {/* Subtle office UI elements floating */}
        <motion.g
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="320" y="80" width="50" height="60" rx="6" fill="white" opacity="0.6" filter="url(#softShadow)" />
          <line x1="328" y1="95" x2="362" y2="95" stroke="#94A3B8" strokeWidth="2" opacity="0.4" />
          <line x1="328" y1="105" x2="358" y2="105" stroke="#94A3B8" strokeWidth="2" opacity="0.4" />
          <circle cx="333" cy="120" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="333" cy="130" r="3" fill="#10B981" opacity="0.6" />
        </motion.g>
        
        <motion.g
          animate={{ y: [0, 10, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <circle cx="50" cy="150" r="20" fill="#C7D2FE" opacity="0.3" />
          <text x="43" y="158" fontSize="20" fill="#6366F1" opacity="0.5" fontWeight="600">HR</text>
        </motion.g>

        {/* Body with natural breathing animation */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Neck with gradient */}
          <ellipse cx="200" cy="260" rx="22" ry="28" fill="url(#skinGradient)" />
          <ellipse cx="200" cy="270" rx="18" ry="8" fill="url(#faceShadow)" />
          
          {/* Shirt with realistic collar */}
          <path
            d="M 178 275 Q 178 268 183 263 L 188 275 L 178 282 Z"
            fill="url(#shirtGradient)"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <path
            d="M 222 275 Q 222 268 217 263 L 212 275 L 222 282 Z"
            fill="url(#shirtGradient)"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          
          {/* Shirt body */}
          <ellipse cx="200" cy="315" rx="60" ry="65" fill="url(#shirtGradient)" filter="url(#softShadow)" />
          
          {/* Blazer with detailed lapels */}
          <path
            d="M 140 285 Q 135 300 138 320 L 140 370 Q 140 378 147 378 L 180 378 L 180 280 Q 165 273 150 280 Z"
            fill="url(#blazerGradient)"
            filter="url(#softShadow)"
          />
          <path
            d="M 260 285 Q 265 300 262 320 L 260 370 Q 260 378 253 378 L 220 378 L 220 280 Q 235 273 250 280 Z"
            fill="url(#blazerGradient)"
            filter="url(#softShadow)"
          />
          
          {/* Blazer button details */}
          <circle cx="148" cy="300" r="3" fill="#3A4554" opacity="0.8" />
          <circle cx="252" cy="300" r="3" fill="#3A4554" opacity="0.8" />
          
          {/* Subtle fabric fold lines */}
          <path d="M 147 290 Q 145 310 147 330" stroke="#2D3748" strokeWidth="1" opacity="0.15" />
          <path d="M 253 290 Q 255 310 253 330" stroke="#2D3748" strokeWidth="1" opacity="0.15" />
        </motion.g>

        {/* Head with micro-movements */}
        <motion.g
          animate={{ 
            y: [0, -2, 0],
            rotate: [0, 0.5, 0, -0.5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
          style={{ transformOrigin: '200px 200px' }}
        >
          {/* Face with realistic shading */}
          <ellipse cx="200" cy="200" rx="52" ry="62" fill="url(#skinGradient)" filter="url(#softShadow)" />
          
          {/* Face shadow for depth */}
          <ellipse cx="200" cy="220" rx="48" ry="30" fill="url(#faceShadow)" opacity="0.2" />
          
          {/* Ears with detail */}
          <g opacity="0.85">
            <ellipse cx="152" cy="205" rx="10" ry="16" fill="#FFCDA3" />
            <ellipse cx="152" cy="205" rx="5" ry="9" fill="#FFB380" opacity="0.6" />
            <path d="M 150 200 Q 152 205 150 210" stroke="#E89B6B" strokeWidth="1" opacity="0.4" />
          </g>
          
          <g opacity="0.85">
            <ellipse cx="248" cy="205" rx="10" ry="16" fill="#FFCDA3" />
            <ellipse cx="248" cy="205" rx="5" ry="9" fill="#FFB380" opacity="0.6" />
            <path d="M 250 200 Q 248 205 250 210" stroke="#E89B6B" strokeWidth="1" opacity="0.4" />
          </g>
          
          {/* Detailed hair with natural flow */}
          <path
            d="M 148 170 Q 143 150 150 130 Q 165 110 190 105 Q 200 103 210 105 Q 235 110 250 130 Q 257 150 252 170 Q 250 185 245 195 L 242 180 Q 235 165 225 155 Q 210 145 200 145 Q 190 145 175 155 Q 165 165 158 180 L 155 195 Q 150 185 148 170 Z"
            fill="url(#hairGradient)"
            filter="url(#softShadow)"
          />
          
          {/* Hair texture and strands */}
          <path d="M 170 125 Q 175 118 182 122" stroke="#2B1F18" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          <path d="M 185 120 Q 190 113 197 117" stroke="#2B1F18" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          <path d="M 203 117 Q 208 113 215 120" stroke="#2B1F18" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          <path d="M 218 122 Q 223 118 230 125" stroke="#2B1F18" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          
          {/* Natural hairline shadows */}
          <path d="M 160 165 Q 180 160 200 160 Q 220 160 240 165" stroke="#2B1F18" strokeWidth="1.5" opacity="0.2" />
          
          {/* Expressive eyebrows */}
          {variant === 'thinking' ? (
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M 170 182 Q 180 178 190 179"
                stroke="#3A2E23"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 210 179 Q 220 178 230 182"
                stroke="#3A2E23"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
            </motion.g>
          ) : (
            <>
              <path
                d="M 170 180 Q 180 177 190 178"
                stroke="#3A2E23"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 210 178 Q 220 177 230 180"
                stroke="#3A2E23"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
            </>
          )}
          
          {/* Highly detailed eyes with realistic structure */}
          <motion.g
            animate={{ scaleY: [1, 0.08, 1] }}
            transition={{ 
              duration: 0.15,
              repeat: Infinity, 
              repeatDelay: 5,
              ease: "easeInOut"
            }}
          >
            {/* Left eye structure */}
            <ellipse cx="180" cy="197" rx="11" ry="14" fill="white" />
            <ellipse cx="180" cy="197" rx="9" ry="12" fill="url(#eyeShine)" />
            <circle cx="180" cy="197" r="7" fill="#3A2E23" />
            <circle cx="180" cy="197" r="5" fill="#1A1612" />
            
            {/* Multiple eye highlights for life */}
            <circle cx="182" cy="194" r="3" fill="white" opacity="0.95" />
            <circle cx="178" cy="199" r="1.5" fill="white" opacity="0.7" />
            <ellipse cx="183" cy="196" rx="1.5" ry="2" fill="white" opacity="0.5" />
            
            {/* Right eye structure */}
            <ellipse cx="220" cy="197" rx="11" ry="14" fill="white" />
            <ellipse cx="220" cy="197" rx="9" ry="12" fill="url(#eyeShine)" />
            <circle cx="220" cy="197" r="7" fill="#3A2E23" />
            <circle cx="220" cy="197" r="5" fill="#1A1612" />
            
            {/* Multiple eye highlights */}
            <circle cx="222" cy="194" r="3" fill="white" opacity="0.95" />
            <circle cx="218" cy="199" r="1.5" fill="white" opacity="0.7" />
            <ellipse cx="223" cy="196" rx="1.5" ry="2" fill="white" opacity="0.5" />
            
            {/* Upper eyelid definition */}
            <path d="M 169 190 Q 180 187 191 190" stroke="#3A2E23" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
            <path d="M 209 190 Q 220 187 231 190" stroke="#3A2E23" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
            
            {/* Lower eyelid subtle line */}
            <path d="M 171 204 Q 180 206 189 204" stroke="#E89B6B" strokeWidth="0.8" opacity="0.3" />
            <path d="M 211 204 Q 220 206 229 204" stroke="#E89B6B" strokeWidth="0.8" opacity="0.3" />
          </motion.g>
          
          {/* Realistic nose with shading */}
          <path
            d="M 200 200 L 200 215"
            stroke="#E89B6B"
            strokeWidth="2"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 200 210 Q 197 215 195 217"
            stroke="#E89B6B"
            strokeWidth="1.5"
            opacity="0.35"
            strokeLinecap="round"
          />
          <ellipse cx="196" cy="218" rx="3" ry="2" fill="#E89B6B" opacity="0.25" />
          <ellipse cx="204" cy="218" rx="3" ry="2" fill="#E89B6B" opacity="0.25" />
          
          {/* Natural mouth with expression variation */}
          {variant === 'thinking' ? (
            <>
              <path
                d="M 182 230 Q 188 233 194 233 Q 200 233 206 233 Q 212 233 218 230"
                stroke="#B45D3F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              <path
                d="M 182 227 Q 188 234 200 235 Q 212 234 218 227"
                stroke="#B45D3F"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 185 230 Q 193 235 200 235 Q 207 235 215 230"
                fill="#FECDD3"
                opacity="0.3"
              />
              {/* Subtle teeth highlight */}
              <rect x="194" y="231" width="12" height="2" rx="1" fill="white" opacity="0.6" />
            </>
          )}
          
          {/* Natural cheek color */}
          <ellipse cx="165" cy="210" rx="12" ry="8" fill="#FCA5A5" opacity="0.2" />
          <ellipse cx="235" cy="210" rx="12" ry="8" fill="#FCA5A5" opacity="0.2" />
          
          {/* Subtle chin shadow */}
          <ellipse cx="200" cy="245" rx="35" ry="8" fill="#E89B6B" opacity="0.1" />
        </motion.g>

        {/* Variant-specific interactive elements */}
        {variant === 'thinking' && (
          <motion.g
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            {/* Professional thought bubble */}
            <motion.circle 
              cx="270" cy="145" r="6" 
              fill="white" 
              stroke="#94A3B8" 
              strokeWidth="2.5"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="290" cy="125" r="10" 
              fill="white" 
              stroke="#94A3B8" 
              strokeWidth="2.5"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.ellipse 
              cx="320" cy="95" rx="35" ry="28" 
              fill="white" 
              stroke="#94A3B8" 
              strokeWidth="3"
              filter="url(#softShadow)"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            
            {/* Animated question mark */}
            <motion.text 
              x="308" y="105" 
              fontSize="32" 
              fill="#3B82F6" 
              fontWeight="bold" 
              fontFamily="system-ui"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: '320px 95px' }}
            >
              ?
            </motion.text>
          </motion.g>
        )}
        
        {variant === 'presenting' && (
          <motion.g
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Extended arm with natural bend */}
            <path
              d="M 145 295 Q 130 305 105 315 L 98 322 Q 95 326 98 329 L 148 338 Z"
              fill="url(#blazerGradient)"
              filter="url(#softShadow)"
            />
            
            {/* Detailed hand */}
            <ellipse cx="102" cy="325" rx="11" ry="8" fill="#FFDFC4" />
            <ellipse cx="97" cy="323" rx="4" ry="7" fill="#FFCDA3" opacity="0.7" />
            <ellipse cx="102" cy="322" rx="4" ry="7" fill="#FFCDA3" opacity="0.7" />
            <ellipse cx="107" cy="323" rx="4" ry="7" fill="#FFCDA3" opacity="0.7" />
            
            {/* Professional tablet/clipboard */}
            <rect 
              x="65" y="305" 
              width="40" height="52" 
              rx="4" 
              fill="white" 
              stroke="#CBD5E1" 
              strokeWidth="2.5"
              filter="url(#softShadow)"
            />
            <rect x="68" y="308" width="34" height="3" rx="1.5" fill="#E2E8F0" />
            <line x1="72" y1="318" x2="97" y2="318" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="72" y1="327" x2="97" y2="327" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="72" y1="336" x2="92" y2="336" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="72" y1="343" x2="88" y2="343" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="74" cy="349" r="2.5" fill="#3B82F6" opacity="0.6" />
            
            {/* Animated checkmark with glow */}
            <motion.path
              d="M 285 200 L 302 217 L 340 175"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glowEffect)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            />
          </motion.g>
        )}
        
        {variant === 'working' && (
          <motion.g
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Modern laptop */}
            <rect 
              x="105" y="345" 
              width="190" height="80" 
              rx="6" 
              fill="#2D3748" 
              filter="url(#softShadow)" 
            />
            <rect 
              x="112" y="352" 
              width="176" height="66" 
              rx="4" 
              fill="#1E293B" 
            />
            <rect 
              x="115" y="355" 
              width="170" height="60" 
              rx="3" 
              fill="#3B82F6" 
              opacity="0.15" 
            />
            
            {/* Screen content with UI elements */}
            <line x1="125" y1="365" x2="190" y2="365" stroke="#60A5FA" strokeWidth="3" opacity="0.7" />
            <line x1="125" y1="375" x2="260" y2="375" stroke="#60A5FA" strokeWidth="3" opacity="0.6" />
            <line x1="125" y1="385" x2="240" y2="385" stroke="#60A5FA" strokeWidth="3" opacity="0.5" />
            <line x1="125" y1="395" x2="210" y2="395" stroke="#60A5FA" strokeWidth="2.5" opacity="0.4" />
            <rect x="125" y="402" width="8" height="8" rx="2" fill="#10B981" opacity="0.6" />
            <rect x="138" y="402" width="8" height="8" rx="2" fill="#F59E0B" opacity="0.6" />
            
            {/* Laptop base and keyboard */}
            <path d="M 90 425 L 310 425 L 302 435 L 98 435 Z" fill="#1A202C" />
            <rect x="160" y="428" width="80" height="4" rx="2" fill="#334155" opacity="0.5" />
            
            {/* Premium coffee cup with details */}
            <g transform="translate(320, 375)">
              <ellipse cx="20" cy="5" rx="14" ry="4" fill="#94A3B8" opacity="0.2" />
              <rect x="6" y="5" width="28" height="35" rx="4" fill="white" stroke="#94A3B8" strokeWidth="2.5" filter="url(#softShadow)" />
              <path d="M 34 18 Q 43 18 43 23 Q 43 28 34 28" stroke="#94A3B8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="20" cy="5" rx="11" ry="3" fill="#D1D5DB" />
              <rect x="10" y="10" width="20" height="25" rx="2" fill="#92400E" opacity="0.15" />
              
              {/* Animated steam */}
              <motion.path
                d="M 14 0 Q 12 -8 14 -15"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
                animate={{ 
                  opacity: [0.6, 0.2, 0.6], 
                  y: [0, -3, 0],
                  pathLength: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M 26 0 Q 28 -8 26 -15"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
                animate={{ 
                  opacity: [0.6, 0.2, 0.6], 
                  y: [0, -3, 0],
                  pathLength: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
            </g>
            
            {/* Typing hand with micro-animation */}
            <motion.g
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="250" cy="395" rx="16" ry="11" fill="#FFDFC4" opacity="0.95" />
              <ellipse cx="243" cy="392" rx="4" ry="7" fill="#FFCDA3" opacity="0.8" />
              <ellipse cx="250" cy="390" rx="4" ry="7" fill="#FFCDA3" opacity="0.8" />
              <ellipse cx="257" cy="392" rx="4" ry="7" fill="#FFCDA3" opacity="0.8" />
            </motion.g>
          </motion.g>
        )}
        
        {/* Subtle floating UI accent dots */}
        <motion.circle
          cx="330"
          cy="250"
          r="4"
          fill="#3B82F6"
          opacity="0.4"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glowEffect)"
        />
        <motion.circle
          cx="70"
          cy="280"
          r="3"
          fill="#10B981"
          opacity="0.4"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          filter="url(#glowEffect)"
        />
      </motion.svg>
    </div>
  );
}