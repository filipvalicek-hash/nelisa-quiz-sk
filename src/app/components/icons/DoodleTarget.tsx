export function DoodleTarget() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <path 
        d="M 40 10 Q 52 10 60 18 Q 68 26 68 40 Q 68 54 60 62 Q 52 70 40 70 Q 28 70 20 62 Q 12 54 12 40 Q 12 26 20 18 Q 28 10 40 10 Z" 
        fill="none" 
        stroke="#FF7043" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Middle circle */}
      <path 
        d="M 40 20 Q 48 20 54 26 Q 60 32 60 40 Q 60 48 54 54 Q 48 60 40 60 Q 32 60 26 54 Q 20 48 20 40 Q 20 32 26 26 Q 32 20 40 20 Z" 
        fill="#FFCCBC" 
        stroke="#FF7043" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Inner circle */}
      <path 
        d="M 40 28 Q 45 28 48 31 Q 52 35 52 40 Q 52 45 48 49 Q 45 52 40 52 Q 35 52 32 49 Q 28 45 28 40 Q 28 35 32 31 Q 35 28 40 28 Z" 
        fill="#FF8A65" 
        stroke="#FF7043" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <circle cx="40" cy="40" r="4" fill="#FF7043" />
    </svg>
  );
}
