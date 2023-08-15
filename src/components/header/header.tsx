// Components
import Image from "next/image";
import Link from "next/link";
import Logo from "@assets/DataBeastBeta.svg";
import Navigation from "@components/navigation/navigation";

const Header: React.FC = ({}) => {
  return (
    <header className="header">
      <div className="header__cell">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
