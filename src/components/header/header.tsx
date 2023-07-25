// Components
import Image from "next/image";
import Logo from "@assets/DataBeastBeta.svg";
import Navigation from "@components/navigation/navigation";

const Header: React.FC = ({}) => {
  return (
    <header className="header">
      <div className="header__cell">
        <Image src={Logo} alt="Databeast" />
      </div>
      <div className="header__cell">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
