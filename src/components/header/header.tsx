import Image from "next/image";
import Logo from "@assets/DataBeast.svg";
const Header = () => {
  return (
    <header className="header">
      <div className="header__row">
        <Image src={Logo} alt="Databeast" />
        <p className="typography__display--3 typography__color--highlight">
          Analytics
        </p>
        <p className="typography__display--3 typography__color--white">
          {" "}
          Off-chain insights
        </p>
      </div>
      <div className="header__row">
        <p className="typography__display--4">Market Overview</p>
        <p className="typography__display--4">Marketplaces</p>
        <p className="typography__display--4">Interesting</p>
      </div>
    </header>
  );
};

export default Header;
