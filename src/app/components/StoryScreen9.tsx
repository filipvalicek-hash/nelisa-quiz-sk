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
      Klient sa zastaví pri banneri v ukážke kampane. Chvíľu si ho prezerá, potom sa na teba pozrie a mierne ironickým tónom povie: „Počuj... toto by nám grafik urobil tiež." Na prvý pohľad má pravdu. Obrázok dnes zvládne urobiť skoro každý.
      <br /><br />
      Ty ale vieš, že tu nejde o to, ako banner vyzerá, ale <span style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(174, 84, 255, 0.18) 60%)', padding: '0 2px' }}>ako funguje v kampani</span> a čo má urobiť počas tých pár sekúnd, keď ho niekto zazrie vo feede.
    </p>
  );

  const illustration = <img src={discussionImage} alt="" style={{ width: '300px', height: 'auto' }} />;

  return (
    <StoryScreen
      questionNumber={9}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}