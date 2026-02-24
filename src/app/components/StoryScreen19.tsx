import { StoryScreen } from '@/app/components/StoryScreen';
import storyImage from 'figma:asset/ebd0fe1f83f47b8441903f087cb4446a1705600a.png';

interface StoryScreen19Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen19({ onContinue, onBack, onLogoClick }: StoryScreen19Props) {
  const storyContent = (
    <p>
      Dostanete se k tomu, kde kampaně běží. Padne téma Meta.<br />
      Klient se krátce podívá na obrazovku a řekne:<br />
      „Dobře, chápu kanály. Ale když to běží na Metě… <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>kdo to vlastně vidí</span>? <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Jak se rozhoduje</span>, komu se ta nabídka ukáže?"<br /><br />
      Chceš mu jednoduše vysvětlit fungování Meta kampaní.
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
      questionNumber={19}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}