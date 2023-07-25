import Link from "next/link";
export interface TabProps {
  name: string;
  id: string;
}

const Tab: React.FC<TabProps> = ({ active, name, id }) => {
  return (
    <Link
      href={id}
      className={`typography__display--4 tab ${active === id ? "active" : ""}`}
    >
      {name}
    </Link>
  );
};

export default Tab;
