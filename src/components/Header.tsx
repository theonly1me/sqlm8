import Image from 'next/image';
import Logo from '../../public/logo.png';

const Header = () => {
  return (
    <header className="flex flex-row mx-8 h-16 px-4 items-center">
      <div className="flex flex-col justify-end pointer-events-none">
        <Image
          data-testid="logo"
          src={Logo}
          width={190}
          height={190}
          alt="SQLM8 logo"
        />
      </div>
    </header>
  );
};

export default Header;
