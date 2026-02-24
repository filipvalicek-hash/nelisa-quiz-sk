interface SmallStarProps {
  size?: number;
  opacity?: number;
}

export function SmallStar({ size = 16, opacity = 0.3 }: SmallStarProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M8 2 L9 6 L13 7 L9 9 L8 14 L7 9 L3 7 L7 6 Z" 
        fill="currentColor" 
        opacity={opacity}
      />
    </svg>
  );
}

export function SparkStar({ size = 12, opacity = 0.4 }: SmallStarProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={opacity} />
      <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={opacity} />
    </svg>
  );
}
