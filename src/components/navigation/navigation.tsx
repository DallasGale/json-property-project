"use client";

import { useState } from "react";
import Tab from "@components/tab/tab";
import navigation from "@/constants/navigation";

interface NavigationProps {
  handleTabClick: (e: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ handleTabClick }) => {
  const [activeTab, setActiveTab] = useState("market-overview");
  return (
    <>
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
    </>
  );
};

export default Navigation;
