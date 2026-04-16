import { StoryScreen } from '@/app/components/StoryScreen';
import characterImage from 'figma:asset/a4bdf6806162839440f8c001b8c588dff85a1cef.png';

interface StoryScreen3Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen3({ onContinue, onBack, onLogoClick }: StoryScreen3Props) {
  const storyContent = (
    <>
      <p>
        Vybral/a si klienta, u ktorého Ti Nelisa dáva zmysel.
        Teraz už sedíš za stolom v ich kancelárii, notebook otvorený, poznámky pripravené. Vymeníte si pár viet o tom, čo je nové, a schôdzka sa prirodzene presúva k veci. <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>Je čas otvoriť tému Nelisy</span>.
      </p>
      <p>
        Práve teraz sa rozhoduje, <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>ako ju predstavíš</span> a ako zapôsobíš.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={characterImage} 
      alt="" 
      className="w-full h-auto object-contain"
    />
  );

  return (
    <StoryScreen
      questionNumber={3}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}