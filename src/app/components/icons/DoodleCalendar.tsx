export function DoodleCalendar() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calendar body */}
      <path 
        d="M 16 22 Q 15 22 15 23 L 15 64 Q 15 66 17 66 L 63 66 Q 65 66 65 64 L 65 23 Q 65 22 64 22 Z" 
        fill="#E1F5FE" 
        stroke="#29B6F6" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Header */}
      <rect x="15" y="22" width="50" height="12" fill="#81D4FA" />
      
      {/* Binding rings */}
      <circle cx="26" cy="18" r="3" fill="none" stroke="#29B6F6" strokeWidth="2.5" />
      <circle cx="54" cy="18" r="3" fill="none" stroke="#29B6F6" strokeWidth="2.5" />
      <line x1="26" y1="15" x2="26" y2="24" stroke="#29B6F6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="54" y1="15" x2="54" y2="24" stroke="#29B6F6" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Grid dots */}
      <circle cx="24" cy="42" r="2" fill="#29B6F6" />
      <circle cx="32" cy="42" r="2" fill="#29B6F6" />
      <circle cx="40" cy="42" r="2" fill="#29B6F6" />
      <circle cx="48" cy="42" r="2" fill="#29B6F6" />
      <circle cx="56" cy="42" r="2" fill="#29B6F6" />
      
      <circle cx="24" cy="52" r="2" fill="#29B6F6" />
      <circle cx="32" cy="52" r="2" fill="#29B6F6" />
      <circle cx="40" cy="52" r="2" fill="#29B6F6" />
      <circle cx="48" cy="52" r="2" fill="#29B6F6" />
      <circle cx="56" cy="52" r="2" fill="#29B6F6" />
    </svg>
  );
}
