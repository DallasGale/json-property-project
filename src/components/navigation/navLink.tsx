import { NavigationTypes } from "@/constants/navigation";
import Link from "next/link";

interface NavLinkProps extends NavigationTypes {
  activeClassName: boolean;
}
const NavLink: React.FC<NavLinkProps> = ({ name, link, activeClassName }) => {
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
