import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/522a92b460d89648532d1593f645ab19eeefafa5.png';

interface StoryScreen21Props {
  onContinue: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen21({ onContinue, onLogoClick }: StoryScreen21Props) {
  const storyContent = (
    <p>
      Během debaty o kampaních klient poznamená: „My jsme nabídku jednou dali na Facebook. Pár dní to běželo, nikdo se neozval, tak jsme to vypnuli." Na chvíli se vrátíte k tomu, jak ta kampaň tehdy vypadala – kde přesně běžela, jaký měla cíl, jak dlouho byla spuštěná. Postupně se ukazuje, že šlo spíš o jeden post než o řízenou kampaň. Teď je prostor vysvětlit, v čem se liší přístup Nelisy a proč u kampaní na sociálních sítích hraje roli čas a optimalizace.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onLogoClick={onLogoClick}
    />
  );
}