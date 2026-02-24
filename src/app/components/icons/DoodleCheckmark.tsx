export function DoodleCheckmark() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle */}
      <path 
        d="M 40 12 Q 50 12 57 19 Q 64 26 64 40 Q 64 54 57 61 Q 50 68 40 68 Q 30 68 23 61 Q 16 54 16 40 Q 16 26 23 19 Q 30 12 40 12 Z" 
        fill="#E8F5E9" 
        stroke="#66BB6A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Big checkmark */}
      <path 
        d="M 28 38 L 36 48 L 54 28" 
        stroke="#66BB6A" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
