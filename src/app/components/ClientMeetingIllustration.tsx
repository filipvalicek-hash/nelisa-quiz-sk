import { motion } from 'motion/react';

export function ClientMeetingIllustration() {
  return (
    <div className="flex justify-center">
      <motion.svg
        width="520"
        height="400"
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          {/* Natural skin tones - realistic gradients */}
          <linearGradient id="skinTone1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4D4C0" />
            <stop offset="40%" stopColor="#ECC5AD" />
            <stop offset="100%" stopColor="#E0B89E" />
          </linearGradient>
          
          <linearGradient id="skinTone2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DEB89A" />
            <stop offset="40%" stopColor="#D1A688" />
            <stop offset="100%" stopColor="#C29778" />
          </linearGradient>
          
          {/* Hair - natural brown tones */}
          <linearGradient id="hairBrown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4D3F36" />
            <stop offset="100%" stopColor="#3A2E26" />
          </linearGradient>
          
          <linearGradient id="hairLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="100%" stopColor="#6D5943" />
          </linearGradient>
          
          {/* Professional clothing */}
          <linearGradient id="blazerNavy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3D4E5D" />
            <stop offset="100%" stopColor="#2C3A46" />
          </linearGradient>
          
          <linearGradient id="shirtWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F7F7F7" />
          </linearGradient>
          
          <linearGradient id="shirtBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B96C4" />
            <stop offset="100%" stopColor="#5581AD" />
          </linearGradient>
          
          {/* Office elements */}
          <linearGradient id="deskWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B59F88" />
            <stop offset="100%" stopColor="#9A8570" />
          </linearGradient>
          
          <linearGradient id="screenDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A3544" />
            <stop offset="100%" stopColor="#1C2531" />
          </linearGradient>
          
          <radialGradient id="screenGlow">
            <stop offset="0%" stopColor="#3B4F63" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1C2531" stopOpacity="0" />
          </radialGradient>
          
          {/* Subtle shadows */}
          <filter id="softShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.8"/>
            <feOffset dx="0" dy="1.2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Minimal background */}
        <rect width="520" height="400" fill="#FAFBFC" />
        
        {/* Soft ambient background shapes */}
        <ellipse cx="420" cy="100" rx="140" ry="140" fill="#E8EDF2" opacity="0.4" />
        <ellipse cx="100" cy="320" rx="120" ry="120" fill="#F0F3F7" opacity="0.5" />

        {/* Desk surface */}
        <rect y="290" width="520" height="110" fill="url(#deskWood)" />
        <rect y="290" width="520" height="6" fill="#8A7561" opacity="0.4" />

        {/* Monitor/laptop screen - centered */}
        <g transform="translate(190, 120)" filter="url(#dropShadow)">
          {/* Monitor stand */}
          <rect x="50" y="175" width="40" height="12" rx="2" fill="#34373A" />
          <rect x="60" y="167" width="20" height="20" fill="#34373A" />
          
          {/* Screen bezel */}
          <rect x="0" y="0" width="140" height="170" rx="6" fill="url(#screenDark)" />
          
          {/* Screen display area */}
          <rect x="6" y="6" width="128" height="158" rx="3" fill="#1A1F28" />
          
          {/* Screen glow */}
          <rect x="6" y="6" width="128" height="158" rx="3" fill="url(#screenGlow)" />
          
          {/* Minimal UI on screen - no text */}
          <motion.g
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="18" y="20" width="45" height="5" rx="2.5" fill="#5B8AB8" opacity="0.6" />
            <rect x="18" y="34" width="100" height="3" rx="1.5" fill="#768BA3" opacity="0.4" />
            <rect x="18" y="43" width="90" height="3" rx="1.5" fill="#768BA3" opacity="0.35" />
            <rect x="18" y="52" width="105" height="3" rx="1.5" fill="#768BA3" opacity="0.35" />
            
            <rect x="18" y="70" width="48" height="38" rx="3" fill="#4A6B8A" opacity="0.25" />
            <rect x="72" y="70" width="48" height="38" rx="3" fill="#4A6B8A" opacity="0.2" />
            
            <circle cx="25" cy="125" r="3.5" fill="#5B8AB8" opacity="0.5" />
            <circle cx="38" cy="125" r="3.5" fill="#768BA3" opacity="0.4" />
            <circle cx="51" cy="125" r="3.5" fill="#768BA3" opacity="0.4" />
          </motion.g>
        </g>

        {/* Empty whiteboard on wall - background element */}
        <rect x="25" y="40" width="130" height="90" rx="4" fill="#FCFCFD" stroke="#D8DDE3" strokeWidth="1.5" opacity="0.8" />

        {/* Notebook on desk */}
        <g transform="translate(410, 310)" filter="url(#softShadow)">
          <rect x="0" y="0" width="85" height="65" rx="3" fill="#FBFBFB" stroke="#D0D4D9" strokeWidth="1.2" />
          <line x1="10" y1="15" x2="70" y2="15" stroke="#E5E8EB" strokeWidth="1.2" />
          <line x1="10" y1="26" x2="65" y2="26" stroke="#E5E8EB" strokeWidth="1.2" />
          <line x1="10" y1="37" x2="58" y2="37" stroke="#EDEEF0" strokeWidth="1.2" />
          <line x1="10" y1="48" x2="52" y2="48" stroke="#EDEEF0" strokeWidth="1.2" />
        </g>

        {/* PERSON 1 - Left side (Advisor) */}
        <motion.g
          animate={{ y: [0, -1.2, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Shoulders and torso - blue shirt */}
          <path 
            d="M 70 260 Q 65 280 68 310 L 72 330 L 130 330 L 134 310 Q 137 280 132 260 L 120 250 L 82 250 Z" 
            fill="url(#shirtBlue)" 
            filter="url(#softShadow)" 
          />
          
          {/* Collar detail */}
          <path d="M 88 258 L 92 270 L 101 273 L 110 270 L 114 258" fill="#5581AD" opacity="0.8" />
          <line x1="101" y1="258" x2="101" y2="275" stroke="#4A6D92" strokeWidth="1" opacity="0.5" />
          
          {/* Neck */}
          <path 
            d="M 89 245 Q 89 258 94 262 L 108 262 Q 113 258 113 245 Q 112 238 101 235 Q 90 238 89 245 Z" 
            fill="url(#skinTone1)" 
          />
          
          {/* Jawline shadow */}
          <path d="M 92 245 Q 97 250 101 251 Q 105 250 110 245" stroke="#E0B89E" strokeWidth="0.8" opacity="0.3" />
          
          {/* Head - natural oval shape */}
          <ellipse cx="101" cy="220" rx="28" ry="34" fill="url(#skinTone1)" filter="url(#softShadow)" />
          
          {/* Ear (subtle, partially visible) */}
          <ellipse cx="73" cy="222" rx="5" ry="9" fill="#E8C5AE" opacity="0.75" />
          <ellipse cx="73" cy="222" rx="3" ry="6" fill="#E0B89E" opacity="0.4" />
          
          {/* Hair - natural shape with volume */}
          <path 
            d="M 73 202 Q 68 186 72 172 Q 78 160 88 154 Q 96 151 105 152 Q 114 154 122 162 Q 130 174 129 188 Q 127 200 123 210 L 120 218 Q 115 224 108 227 Q 101 228 94 227 Q 87 224 82 218 L 79 210 Q 75 204 73 202 Z" 
            fill="url(#hairLight)" 
          />
          
          {/* Hair detail - natural strands */}
          <path d="M 82 165 Q 87 161 92 164" stroke="#6D5943" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
          <path d="M 95 162 Q 100 159 105 162" stroke="#6D5943" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
          <path d="M 108 164 Q 113 161 118 165" stroke="#6D5943" strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
          
          {/* Eyebrows - natural shape */}
          <path d="M 87 208 Q 93 206 99 207" stroke="#6D5943" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          <path d="M 103 207 Q 109 206 115 208" stroke="#6D5943" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          
          {/* Eyes - realistic proportions */}
          <motion.g
            animate={{ scaleY: [1, 0.08, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5.8, ease: "easeInOut" }}
          >
            {/* Left eye */}
            <ellipse cx="92" cy="217" rx="5" ry="6" fill="white" />
            <ellipse cx="92" cy="217" rx="3.5" ry="4.5" fill="#4A3D32" />
            <circle cx="92" cy="217" r="2.5" fill="#2B2420" />
            <circle cx="93" cy="216" r="1.2" fill="white" opacity="0.85" />
            
            {/* Right eye */}
            <ellipse cx="110" cy="217" rx="5" ry="6" fill="white" />
            <ellipse cx="110" cy="217" rx="3.5" ry="4.5" fill="#4A3D32" />
            <circle cx="110" cy="217" r="2.5" fill="#2B2420" />
            <circle cx="111" cy="216" r="1.2" fill="white" opacity="0.85" />
          </motion.g>
          
          {/* Upper eyelid line */}
          <path d="M 87 214 Q 92 212 97 214" stroke="#4A3D32" strokeWidth="0.8" opacity="0.3" />
          <path d="M 105 214 Q 110 212 115 214" stroke="#4A3D32" strokeWidth="0.8" opacity="0.3" />
          
          {/* Nose - subtle and natural */}
          <path d="M 101 217 Q 101 223 101 228" stroke="#D1A688" strokeWidth="1.2" opacity="0.25" />
          <path d="M 101 226 Q 99 228 98 229" stroke="#D1A688" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="98.5" cy="229" rx="1.8" ry="1.2" fill="#D1A688" opacity="0.2" />
          <ellipse cx="103.5" cy="229" rx="1.8" ry="1.2" fill="#D1A688" opacity="0.2" />
          
          {/* Mouth - calm, neutral */}
          <path d="M 95 235 Q 101 237 107 235" stroke="#C29778" strokeWidth="1.8" strokeLinecap="round" />
          
          {/* Arm extending toward screen */}
          <motion.g
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path 
              d="M 130 270 Q 155 265 175 262" 
              stroke="url(#shirtBlue)" 
              strokeWidth="18" 
              strokeLinecap="round" 
            />
            
            {/* Hand pointing */}
            <g transform="translate(175, 262)">
              <ellipse cx="0" cy="0" rx="11" ry="9" fill="url(#skinTone1)" />
              <ellipse cx="-4" cy="-2" rx="3" ry="6" fill="#ECC5AD" />
              <ellipse cx="1" cy="-3" rx="3" ry="6" fill="#ECC5AD" />
              <ellipse cx="6" cy="-2" rx="2.5" ry="5" fill="#ECC5AD" />
            </g>
          </motion.g>
        </motion.g>

        {/* PERSON 2 - Right side (Client) */}
        <motion.g
          animate={{ y: [0, -1.4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          {/* Shoulders and torso - blazer with white shirt */}
          <path 
            d="M 360 265 Q 355 285 358 315 L 362 335 L 420 335 L 424 315 Q 427 285 422 265 L 410 255 L 372 255 Z" 
            fill="url(#blazerNavy)" 
            filter="url(#softShadow)" 
          />
          
          {/* Shirt collar visible */}
          <path d="M 378 265 L 383 278 L 391 281 L 399 278 L 404 265" fill="url(#shirtWhite)" />
          <path d="M 381 265 L 385 273 L 391 275" stroke="#EFEFEF" strokeWidth="0.8" opacity="0.6" />
          <path d="M 401 265 L 397 273 L 391 275" stroke="#EFEFEF" strokeWidth="0.8" opacity="0.6" />
          
          {/* Blazer lapels */}
          <path d="M 366 268 L 372 285 L 378 268" fill="#2C3A46" opacity="0.6" />
          <path d="M 416 268 L 410 285 L 404 268" fill="#2C3A46" opacity="0.6" />
          
          {/* Neck */}
          <path 
            d="M 378 250 Q 378 262 383 266 L 399 266 Q 404 262 404 250 Q 403 243 391 240 Q 379 243 378 250 Z" 
            fill="url(#skinTone2)" 
          />
          
          {/* Head - natural oval */}
          <ellipse cx="391" cy="224" rx="30" ry="36" fill="url(#skinTone2)" filter="url(#softShadow)" />
          
          {/* Ears */}
          <ellipse cx="361" cy="226" rx="5.5" ry="10" fill="#D1A688" opacity="0.7" />
          <ellipse cx="361" cy="226" rx="3" ry="6" fill="#C29778" opacity="0.4" />
          <ellipse cx="421" cy="226" rx="5.5" ry="10" fill="#D1A688" opacity="0.7" />
          <ellipse cx="421" cy="226" rx="3" ry="6" fill="#C29778" opacity="0.4" />
          
          {/* Hair - professional short style */}
          <path 
            d="M 361 204 Q 356 186 362 170 Q 370 156 382 150 Q 391 148 400 150 Q 412 156 420 170 Q 426 186 423 204 Q 420 218 414 227 L 408 233 Q 401 237 391 237 Q 381 237 374 233 L 368 227 Q 363 218 361 204 Z" 
            fill="url(#hairBrown)" 
          />
          
          {/* Hair texture */}
          <path d="M 375 165 Q 380 161 385 164" stroke="#3A2E26" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
          <path d="M 388 163 Q 393 160 398 164" stroke="#3A2E26" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
          <path d="M 401 165 Q 406 162 411 166" stroke="#3A2E26" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
          
          {/* Eyebrows - slightly raised (attentive) */}
          <motion.g
            animate={{ y: [0, -0.8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 375 211 Q 381 209 387 210" stroke="#3A2E26" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
            <path d="M 395 210 Q 401 209 407 211" stroke="#3A2E26" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
          </motion.g>
          
          {/* Eyes - attentive expression */}
          <motion.g
            animate={{ scaleY: [1, 0.08, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 6.2, ease: "easeInOut", delay: 1.5 }}
          >
            {/* Left eye */}
            <ellipse cx="380" cy="221" rx="5.5" ry="6.5" fill="white" />
            <ellipse cx="380" cy="221" rx="4" ry="5" fill="#4D3F36" />
            <circle cx="380" cy="221" r="2.8" fill="#2B2420" />
            <circle cx="381" cy="220" r="1.3" fill="white" opacity="0.85" />
            
            {/* Right eye */}
            <ellipse cx="402" cy="221" rx="5.5" ry="6.5" fill="white" />
            <ellipse cx="402" cy="221" rx="4" ry="5" fill="#4D3F36" />
            <circle cx="402" cy="221" r="2.8" fill="#2B2420" />
            <circle cx="403" cy="220" r="1.3" fill="white" opacity="0.85" />
          </motion.g>
          
          {/* Eyelid lines */}
          <path d="M 375 218 Q 380 216 385 218" stroke="#3A2E26" strokeWidth="0.8" opacity="0.25" />
          <path d="M 397 218 Q 402 216 407 218" stroke="#3A2E26" strokeWidth="0.8" opacity="0.25" />
          
          {/* Nose - natural shape */}
          <path d="M 391 221 Q 391 227 391 232" stroke="#C29778" strokeWidth="1.2" opacity="0.25" />
          <path d="M 391 230 Q 389 232 388 233" stroke="#C29778" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="388.5" cy="233" rx="2" ry="1.3" fill="#C29778" opacity="0.2" />
          <ellipse cx="393.5" cy="233" rx="2" ry="1.3" fill="#C29778" opacity="0.2" />
          
          {/* Mouth - slight neutral/thinking expression */}
          <path d="M 384 240 Q 391 241.5 398 240" stroke="#B88968" strokeWidth="2" strokeLinecap="round" />
          
          {/* Hand resting on desk */}
          <ellipse cx="355" cy="325" rx="13" ry="10" fill="url(#skinTone2)" opacity="0.95" />
          <ellipse cx="350" cy="322" rx="3.5" ry="6" fill="#D1A688" />
          <ellipse cx="356" cy="321" rx="3.5" ry="6" fill="#D1A688" />
          <ellipse cx="361" cy="322" rx="3" ry="5" fill="#D1A688" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
