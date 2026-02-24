import { StoryScreen } from '@/app/components/StoryScreen';
import discussionImage from 'figma:asset/acdd6fea069ad08d1ad221e9ef7e1cfb92326bcb.png';

interface StoryScreen9Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen9({ onContinue, onBack, onLogoClick }: StoryScreen9Props) {
  const storyContent = (
    <p>
      Klient se zastaví u banneru v ukázce kampaně. Chvíli si ho prohlíží, pak se na tebe podívá a lehce ironickým tónem řekne: „Hele… tohle by nám grafik udělal taky." Na první pohled má pravdu. Obrázek dnes zvládne udělat skoro každý.
      <br /><br />
      Ty ale víš, že tady nejde o to, jak banner vypadá, ale <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>jak funguje v kampani</span> a co má udělat během těch pár vteřin, když ho někdo zahlédne ve feedu.
    </p>
  );

  const illustration = <img src={discussionImage} alt="" style={{ width: '300px', height: 'auto' }} />;

  return (
    <StoryScreen
      questionNumber={9}
      storyLabel="PŘÍBĚH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}