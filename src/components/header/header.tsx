"use client";
import { useState } from "react";
// Components
import Image from "next/image";
import Logo from "@assets/DataBeast.svg";
import navigation from "@/constants/navigation";
import Tab from "@components/header/tab";

interface HeaderProps {
  active: string;
  handleTabClick: (e: string) => void;
}
const Header: React.FC<HeaderProps> = ({ active, handleTabClick }) => {
  const [activeTab, setActiveTab] = useState("market-overview");

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
              active={activeTab}
              key={nav.id}
              {...nav}
              onClick={(e) => (setActiveTab(e), handleTabClick(e))}
            />
          );
        })}
      </div>
    </header>
  );
};

export default Header;
