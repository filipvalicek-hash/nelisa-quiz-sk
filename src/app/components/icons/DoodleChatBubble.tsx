export function DoodleChatBubble() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main bubble */}
      <path 
        d="M 18 20 Q 15 20 15 23 L 15 48 Q 15 51 18 51 L 28 51 L 28 60 Q 28 62 30 60 L 38 51 L 62 51 Q 65 51 65 48 L 65 23 Q 65 20 62 20 Z" 
        fill="#E1BEE7" 
        stroke="#AB47BC" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Dots inside */}
      <circle cx="30" cy="35" r="3" fill="#AB47BC" />
      <circle cx="40" cy="35" r="3" fill="#AB47BC" />
      <circle cx="50" cy="35" r="3" fill="#AB47BC" />
    </svg>
  );
}
