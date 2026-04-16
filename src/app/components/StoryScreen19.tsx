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
      Dostanete sa k tomu, kde kampane bežia. Padne téma Meta.<br />
      Klient sa nakrátko pozrie na obrazovku a povie:<br />
      „Dobre, chápem kanály. Ale keď to beží na Mete… <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>kto to vlastne vidí</span>? <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Ako sa rozhoduje</span>, komu sa tá ponuka ukáže?"<br /><br />
      Chceš mu jednoducho vysvetliť fungovanie Meta kampaní.
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
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}