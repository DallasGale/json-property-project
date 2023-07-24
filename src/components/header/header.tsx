// Components
import Image from "next/image";
import Logo from "@assets/DataBeastBeta.svg";
import Navigation from "@components/navigation/navigation";

interface HeaderProps {
  handleTabClick: (e: string) => void;
}
const Header: React.FC<HeaderProps> = ({ handleTabClick }) => {
  return (
    <header className="header">
      <div className="header__cell">
        {/* <div> */}
        <Image src={Logo} alt="Databeast" />
      </div>
      {/* </div>
      <div> */}
      <div className="header__cell">
        <Navigation handleTabClick={handleTabClick} />
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
