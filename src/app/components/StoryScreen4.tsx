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
        Chvíľu sa rozprávate o ich nábore, o tom, aké roly riešia teraz a ktoré sa im <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>dlhodobo nedarí obsadiť</span>. Klient Ťa chvíľu počúva, potom sa otočí k notebooku, párkrát klikne a ukáže Ti otvorený inzerát.
      </p>
      <p>
        „My už inzerujeme," hovorí. „Toto je naša aktuálna ponuka, takto to robíme už roky. Takže… <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>v čom je rozdiel</span>?"
      </p>
      <p>
        Je dôležité sa teraz nezaseknúť pri nástrojoch – ale elegantne presmerovať debatu k tomu, koho tento inzerát vôbec nezasiahne.
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
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}