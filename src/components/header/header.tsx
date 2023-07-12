// Components
import Image from "next/image";
import Logo from "@assets/DataBeast.svg";
import Navigation from "@components/navigation/navigation";

interface HeaderProps {
  handleTabClick: (e: string) => void;
}
const Header: React.FC<HeaderProps> = ({ handleTabClick }) => {
  return (
    <header className="header">
      <div className="header__row">
        <Image src={Logo} alt="Databeast" />
        <p className="typography__display--3 typography__color--highlight">
          Analytics
        </p>
      </div>
      <div className="header__row">
        <Navigation handleTabClick={handleTabClick} />
      </div>
    </header>
  );
};

export default Header;
