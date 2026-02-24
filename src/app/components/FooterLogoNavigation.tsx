import { motion } from 'motion/react';
import logoImage from 'figma:asset/df61b6f2193a78afb780969de31b920fd241cf00.png';

interface FooterLogoNavigationProps {
  onLogoClick?: () => void;
}

export function FooterLogoNavigation({ onLogoClick }: FooterLogoNavigationProps) {
  return (
    <footer 
      className="w-full flex items-center justify-center"
      style={{
        marginTop: '60px',
        paddingBottom: '40px',
        backgroundColor: 'transparent'
      }}
    >
      <motion.button
        onClick={onLogoClick}
        className="transition-all"
        style={{
          opacity: 0.7,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0
        }}
        whileHover={{ opacity: 1 }}
        whileTap={{ scale: 0.98 }}
      >
        <img 
          src={logoImage} 
          alt="Nelisa" 
          style={{ 
            width: '100px',
            height: 'auto',
            display: 'block'
          }}
        />
      </motion.button>
    </footer>
  );
}