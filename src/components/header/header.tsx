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
      <div className="header__row">
        {/* <div> */}
        <Image src={Logo} alt="Databeast" />
      </div>
      {/* </div>
      <div> */}
      {/* <div className="header__row"> */}
      <Navigation handleTabClick={handleTabClick} />
      {/* </div> */}
      {/* </div> */}
    </header>
  );
};

export default Header;
