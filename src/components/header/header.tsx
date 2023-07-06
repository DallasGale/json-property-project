// Components
import Image from "next/image";
import Logo from "@assets/DataBeast.svg";
import navigation from "@/constants/navigation";
import Tab from "@components/header/tab";

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
        <p className="typography__display--3 typography__color--white">
          Off-chain insights
        </p>
      </div>
      <div className="header__row">
        {navigation.map((nav) => {
          return (
            <Tab
              // active={}
              key={nav.id}
              {...nav}
              onClick={(e) => handleTabClick(e)}
            />
          );
        })}
      </div>
    </header>
  );
};

export default Header;
