export function DoodleLightBulb() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bulb */}
      <path 
        d="M 40 12 Q 48 12 54 18 Q 60 24 60 34 Q 60 42 56 48 Q 54 51 52 52 L 52 56 Q 52 58 50 58 L 30 58 Q 28 58 28 56 L 28 52 Q 26 51 24 48 Q 20 42 20 34 Q 20 24 26 18 Q 32 12 40 12 Z" 
        fill="#FFF9C4" 
        stroke="#FFB300" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Base threads */}
      <line x1="28" y1="58" x2="52" y2="58" stroke="#FFB300" strokeWidth="2" />
      <line x1="28" y1="62" x2="52" y2="62" stroke="#FFB300" strokeWidth="2" />
      
      {/* Socket */}
      <path 
        d="M 32 62 Q 31 63 31 65 L 49 65 Q 49 63 48 62" 
        fill="#FFECB3" 
        stroke="#FFB300" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Light rays */}
      <line x1="40" y1="8" x2="40" y2="4" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="16" x2="62" y2="12" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="16" x2="18" y2="12" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="66" y1="34" x2="70" y2="34" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="34" x2="10" y2="34" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
