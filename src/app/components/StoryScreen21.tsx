import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/522a92b460d89648532d1593f645ab19eeefafa5.png';

interface StoryScreen21Props {
  onContinue: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen21({ onContinue, onLogoClick }: StoryScreen21Props) {
  const storyContent = (
    <p>
      Počas debaty o kampaniach klient poznamená: „My sme ponuku raz dali na Facebook. Pár dní to bežalo, nikto sa neozval, tak sme to vypli." Na chvíľu sa vrátite k tomu, ako tá kampaň vtedy vyzerala – kde presne bežala, aký mala cieľ, ako dlho bola spustená. Postupne sa ukazuje, že šlo skôr o jeden post než o riadenú kampaň. Teraz je priestor vysvetliť, v čom sa líši prístup Nelisy a prečo pri kampaniach na sociálnych sieťach hrá rolu čas a optimalizácia.
    </p>
  );

  const illustration = (
    <img 
      src={storyImage} 
      alt="" 
      className="w-full h-auto object-contain"
      style={{ maxHeight: '280px' }}
    />
  );

  return (
    <StoryScreen
      questionNumber={21}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onLogoClick={onLogoClick}
    />
  );
}