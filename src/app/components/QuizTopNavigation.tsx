import logoImage from 'figma:asset/df61b6f2193a78afb780969de31b920fd241cf00.png';

interface QuizTopNavigationProps {
  onLogoClick?: () => void;
}

export function QuizTopNavigation({ onLogoClick }: QuizTopNavigationProps) {
  return (
    <nav className="flex items-center justify-center px-8 bg-white border-b border-gray-200" style={{ height: '72px' }}>
      {/* Centered: Nelisa Learning Logo */}
      <button 
        onClick={onLogoClick}
        className="flex items-center cursor-pointer transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-lg px-2 py-1"
        style={{ gap: '14px' }}
        aria-label="Vrátiť sa na úvodnú stránku"
        disabled={!onLogoClick}
      >
        <img src={logoImage} alt="Nelisa" className="h-8" />
        <span className="text-lg text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Learning</span>
      </button>
    </nav>
  );
}