import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/d0e2f78dbf1cdd2a3ce4e658b6b6d676805bf5ea.png';

interface StoryScreen23Props {
  onContinue: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen23({ onContinue, onLogoClick }: StoryScreen23Props) {
  const storyContent = (
    <p>
      Klient si zhrnuje poznámky, má pocit, že to dáva zmysel, ale nechce sa rozhodnúť hneď. Povie: „Pošlite mi podklady a ja to preberiem interne." Je kľúčové uzavrieť stretnutie profesionálne a posunúť ho, alebo to vyšumí.
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
      questionNumber={23}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onLogoClick={onLogoClick}
    />
  );
}