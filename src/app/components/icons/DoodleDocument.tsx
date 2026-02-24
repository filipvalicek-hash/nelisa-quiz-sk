export function DoodleDocument() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paper with folded corner */}
      <path 
        d="M 20 10 Q 19 10 19 11 L 19 68 Q 19 70 21 70 L 59 70 Q 61 70 61 68 L 61 24 L 47 10 Z" 
        fill="#FCE4EC" 
        stroke="#EC407A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Folded corner */}
      <path 
        d="M 47 10 L 47 22 Q 47 24 49 24 L 61 24" 
        fill="#F8BBD0" 
        stroke="#EC407A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Lines */}
      <line x1="28" y1="34" x2="52" y2="34" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="42" x2="52" y2="42" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="50" x2="46" y2="50" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="58" x2="48" y2="58" stroke="#EC407A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
