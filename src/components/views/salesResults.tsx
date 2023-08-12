// Components
import { ISalesResultsTypes } from "@/app/types";
import PropertyTable from "@components/propertyTable/propertyTable";

const SalesResults: React.FC<ISalesResultsTypes> = ({ propertyData }) => {
  return (
    <section className="sales-results">
      <div>
        <PropertyTable propertyData={{ ...propertyData }} />
      </div>
      <div>
        {/* Charts */}
        <h1>Charts</h1>
      </div>
    </section>
  );
};

export default SalesResults;
