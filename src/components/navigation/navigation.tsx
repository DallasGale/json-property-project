"use client";
import { usePathname } from "next/navigation";
import NavLink from "./navLink";
import navigation from "@/constants/navigation";

const Navigation: React.FC = () => {
  const activePathname = usePathname();

  return (
    <>
      {navigation.map((nav) => {
        return (
          <NavLink
            id={nav.id}
            link={nav.link}
            key={nav.id}
            name={nav.name}
            activeClassName={nav.link === activePathname}
          />
        );
      })}
    </>
  );
};

export default Navigation;
