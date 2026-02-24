export function DoodleChart() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chart background */}
      <path 
        d="M 14 12 Q 12 12 12 14 L 12 66 Q 12 68 14 68 L 66 68 Q 68 68 68 66 L 68 14 Q 68 12 66 12 L 14 12 Z" 
        fill="#FFF3E0" 
        stroke="#FFA726" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Bar 1 - shortest */}
      <rect 
        x="20" 
        y="48" 
        width="10" 
        height="12" 
        fill="#FFB74D" 
        stroke="#FFA726" 
        strokeWidth="2"
        rx="2"
      />
      
      {/* Bar 2 - medium */}
      <rect 
        x="35" 
        y="38" 
        width="10" 
        height="22" 
        fill="#FFB74D" 
        stroke="#FFA726" 
        strokeWidth="2"
        rx="2"
      />
      
      {/* Bar 3 - tallest */}
      <rect 
        x="50" 
        y="26" 
        width="10" 
        height="34" 
        fill="#FFB74D" 
        stroke="#FFA726" 
        strokeWidth="2"
        rx="2"
      />
      
      {/* Trend arrow */}
      <path 
        d="M 22 42 Q 30 38 37 32 L 52 22" 
        stroke="#FFA726" 
        strokeWidth="2" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Arrow head */}
      <path 
        d="M 48 24 L 52 22 L 50 26" 
        stroke="#FFA726" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
