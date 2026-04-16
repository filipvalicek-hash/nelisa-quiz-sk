import { StoryScreen } from '@/app/components/StoryScreen';
import illustrationImage from 'figma:asset/cb01d360f7f76cbf2b443bf7e01ad22ddf2f301d.png';

interface StoryScreen15Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen15({ onContinue, onBack, onLogoClick }: StoryScreen15Props) {
  const storyContent = (
    <>
      <p className="mb-4">
        V prezentácii posunieš slide ďalej a na obrazovke sa objaví prehľad kanálov.
      </p>
      <p className="mb-4">
        Klient sa na chvíľu zahľadí, potom zdvihne obočie:
      </p>
      <p className="mb-4">
        „Takže Facebook, Instagram, Google… To už začína byť dosť vecí naraz."
      </p>
      <p>
        Teraz potrebuješ vysvetliť, prečo to v skutočnosti nie je zložité riešenie, ale jeden prepojený celok, ktorý dáva zmysel práve dohromady.
      </p>
    </>
  );

  const illustration = (
    <img 
      src={illustrationImage} 
      alt="Discussion" 
      className="w-full h-auto object-contain"
      style={{ maxHeight: '280px' }}
    />
  );

  return (
    <StoryScreen
      questionNumber={15}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}