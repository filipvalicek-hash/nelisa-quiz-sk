export function DoodleBadge() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Badge circle */}
      <path 
        d="M 40 15 Q 48 15 54 21 Q 60 27 60 38 Q 60 49 54 55 Q 48 61 40 61 Q 32 61 26 55 Q 20 49 20 38 Q 20 27 26 21 Q 32 15 40 15 Z" 
        fill="#FFF9C4" 
        stroke="#FDD835" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Star in center */}
      <path 
        d="M 40 26 L 42 33 L 49 34 L 44 39 L 45 46 L 40 42 L 35 46 L 36 39 L 31 34 L 38 33 Z" 
        fill="#FDD835" 
        stroke="#FDD835" 
        strokeWidth="1.5"
      />
      
      {/* Ribbons */}
      <path 
        d="M 32 56 Q 30 58 28 64 L 32 62 L 36 66 L 36 58" 
        fill="#FFF59D" 
        stroke="#FDD835" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M 48 56 Q 50 58 52 64 L 48 62 L 44 66 L 44 58" 
        fill="#FFF59D" 
        stroke="#FDD835" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
