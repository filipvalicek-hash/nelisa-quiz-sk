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
        V prezentaci posuneš slide dál a na obrazovce se objeví přehled kanálů.
      </p>
      <p className="mb-4">
        Klient se na chvíli zadívá, pak zvedne obočí:
      </p>
      <p className="mb-4">
        „Takže Facebook, Instagram, Google… To už začíná být dost věcí najednou."
      </p>
      <p>
        Teď potřebuješ vysvětlit, proč to ve skutečnosti není složité řešení, ale jeden propojený celek, který dává smysl právě dohromady.
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
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}