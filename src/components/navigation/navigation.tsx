import Tab from "@components/tab/tab";
import navigation from "@/constants/navigation";

const Navigation: React.FC = () => {
  return (
    <>
      {navigation.map((nav) => {
        return <Tab key={nav.id} {...nav} />;
      })}
    </>
  );
};

export default Navigation;
