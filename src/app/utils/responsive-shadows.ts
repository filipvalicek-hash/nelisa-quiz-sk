/**
 * Responsive shadow utilities for mobile optimization
 * Desktop: Full shadows for depth
 * Mobile: Softer, subtler shadows for cleaner appearance
 */

// Default card shadow - subtle and clean
export const getCardShadow = (): string => {
  // Desktop: Standard shadow
  // Mobile: Lighter, more subtle
  return '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
};

export const getCardShadowStyle = () => {
  if (typeof window === 'undefined') {
    return {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
    };
  }

  const isMobile = window.innerWidth < 768;
  
  return {
    boxShadow: isMobile
      ? '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.03)' // Mobile: lighter
      : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'  // Desktop: standard
  };
};

// Enhanced card shadow with brand color accent
export const getEnhancedCardShadow = (): string => {
  return '0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(174, 84, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)';
};

export const getEnhancedCardShadowStyle = () => {
  if (typeof window === 'undefined') {
    return {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(174, 84, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)'
    };
  }

  const isMobile = window.innerWidth < 768;
  
  return {
    boxShadow: isMobile
      ? '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(174, 84, 255, 0.02), 0 1px 4px rgba(0, 0, 0, 0.02)' // Mobile: lighter
      : '0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(174, 84, 255, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)'  // Desktop: standard
  };
};

// CSS classes for responsive shadows (using Tailwind @media)
export const responsiveCardShadowClass = `
  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.03)]
  md:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]
`;

export const responsiveEnhancedCardShadowClass = `
  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(174,84,255,0.02),0_1px_4px_rgba(0,0,0,0.02)]
  md:shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(174,84,255,0.04),0_2px_8px_rgba(0,0,0,0.04)]
`;
