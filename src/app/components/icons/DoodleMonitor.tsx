export function DoodleMonitor() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monitor screen */}
      <path 
        d="M 12 18 Q 11 19 11 22 L 11 48 Q 11 51 14 51 L 66 51 Q 69 51 69 48 L 69 22 Q 69 19 66 18 L 14 18 Z" 
        fill="#E3F2FD" 
        stroke="#5B9BD5" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Screen glow/content */}
      <rect x="17" y="24" width="46" height="22" rx="2" fill="#BBDEFB" />
      
      {/* Stand */}
      <path 
        d="M 38 51 Q 38 53 39 55 L 41 55 Q 42 53 42 51" 
        stroke="#5B9BD5" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Base */}
      <path 
        d="M 30 61 Q 30 60 31 59 L 49 59 Q 50 60 50 61 L 48 62 Q 47 63 32 63 Q 31 62 30 61 Z" 
        fill="#E3F2FD" 
        stroke="#5B9BD5" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}
