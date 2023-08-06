import Link from "next/link";
// Types
import { INavLinkProps } from "@/app/types";
const NavLink: React.FC<INavLinkProps> = ({ name, link, activeClassName }) => {
  return (
    <Link
      href={link}
      className={`typography__display--4 tab ${
        activeClassName ? "active" : ""
      }`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
