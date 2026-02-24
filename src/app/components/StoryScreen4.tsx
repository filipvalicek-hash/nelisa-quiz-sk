import { StoryScreen } from '@/app/components/StoryScreen';
import { motion } from 'motion/react';
import storyImage from 'figma:asset/2fb472db8fda9dc651f7bd3578b3cb115631895b.png';

interface StoryScreen4Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen4({ onContinue, onBack, onLogoClick }: StoryScreen4Props) {
  const storyContent = (
    <>
      <p>
        Chvíli mluvíte o jejich náboru, o tom, jaké role řeší teď a které se jim <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>dlouhodobě nedaří obsadit</span>. Klient Tě chvíli poslouchá, pak se otočí k notebooku, párkrát klikne a ukáže Ti otevřený inzerát.
      </p>
      <p>
        „My už inzerujeme," říká. „Tohle je naše aktuální nabídka, takhle to děláme už roky. Takže… <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>v čem je rozdíl</span>?"
      </p>
      <p>
        Je důležité se teď nezaseknout u nástrojů – ale elegantně přesměrovat debatu k tomu, koho tenhle inzerát vůbec nezasáhne.
      </p>
    </>
  );

  const illustration = (
    <motion.img
      src={storyImage}
      alt="HR recruiting illustration"
      className="w-full h-auto object-contain"
      style={{ maxHeight: '280px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
  );

  return (
    <StoryScreen
      questionNumber={4}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}