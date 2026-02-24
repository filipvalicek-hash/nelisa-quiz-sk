export function DoodleStar() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Star shape */}
      <path 
        d="M 40 15 L 46 32 L 64 34 L 51 46 L 54 64 L 40 55 L 26 64 L 29 46 L 16 34 L 34 32 Z" 
        fill="#FFF9C4" 
        stroke="#FFB300" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Inner glow lines */}
      <line x1="40" y1="20" x2="40" y2="28" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="25" x2="45" y2="25" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
