export function DoodleChecklist() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paper */}
      <path 
        d="M 18 12 Q 18 11 19 11 L 58 11 Q 60 11 61 13 L 61 66 Q 61 68 59 68 L 19 68 Q 18 68 18 66 Z" 
        fill="#F0F4C3" 
        stroke="#9CCC65" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Checkboxes */}
      <rect x="25" y="22" width="8" height="8" rx="2" fill="white" stroke="#9CCC65" strokeWidth="2" />
      <rect x="25" y="36" width="8" height="8" rx="2" fill="white" stroke="#9CCC65" strokeWidth="2" />
      <rect x="25" y="50" width="8" height="8" rx="2" fill="white" stroke="#9CCC65" strokeWidth="2" />
      
      {/* Checkmarks */}
      <path d="M 26 26 L 28 29 L 32 24" stroke="#9CCC65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 26 40 L 28 43 L 32 38" stroke="#9CCC65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Lines */}
      <line x1="38" y1="26" x2="54" y2="26" stroke="#9CCC65" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="40" x2="54" y2="40" stroke="#9CCC65" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="54" x2="54" y2="54" stroke="#9CCC65" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
