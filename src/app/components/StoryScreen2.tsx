import { StoryScreen } from '@/app/components/StoryScreen';
import characterImage from 'figma:asset/9a07d579d0c1ab4539dec3e369a568a4de511cda.png';

interface StoryScreen2Props {
  onContinue: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

export function StoryScreen2({ onContinue, onBack, onLogoClick }: StoryScreen2Props) {
  const storyContent = (
    <>
      <p>
        Je rano a práve si dorazil do práce s úsmevom. Otváraš notebook a pri prvom rannom kávičku sa pripravuješ na dnešné schôdzky. V kalendári máš dve stretnutia s klientmi. Otváraš CRM a pozeráš sa na firmy, s ktorými sa dnes stretneš.
      </p>
      <p>
        Chcel/a by si, aby práve Teba tentoraz na Slacku vyhlásili ako Top obchodníka pre Nelisu, a premýšľaš, kde by sa Nelisa mohla hodiť. Vieš, že Nelisu možno ponúknuť takmer každej firme, ale najväčšiu pridanú hodnotu má v konkrétnych situáciách – tam, kde portály samé o sebe nestačia, kde dáva zmysel osloviť aj pasívnych kandidátov, alebo tam, kde HRista/HRistka nestíha, je na všetko sám/sama, nemá čas ani know-how a Nelisa je pre neho/ňu riešenie bez ďalšej práce.
      </p>
      <p>
        Potrebuješ si preto rýchlo ujasniť, ktorí klienti sú pre Nelisu ideálni a majú najvyššiu prioritu.
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
      questionNumber={1}
      storyLabel="PRÍBEH"
      storyContent={storyContent}
      illustration={illustration}
      onContinue={onContinue}
      onBack={onBack}
      onLogoClick={onLogoClick}
    />
  );
}