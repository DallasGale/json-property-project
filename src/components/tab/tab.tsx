export interface TabProps {
  active: string;
  name: string;
  id: string;
  onClick: (e: string) => void;
}

const Tab: React.FC<TabProps> = ({ active, name, id, onClick }) => {
  return (
    <button
      key={id}
      id={id}
      onClick={(e) => onClick(e.currentTarget.id)}
      className={`typography__display--4 tab ${active === id ? "active" : ""}`}
    >
      {name}
    </button>
  );
};

export default Tab;
