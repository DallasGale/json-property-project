// Components
import Image from "next/image";

// Assets
import ChevronDown from "@assets/icons/chevron-down.svg";

// Types
import { ColumnLabelsTypes } from "@/constants/top100table";

interface HeadProps {
  labels: ColumnLabelsTypes[];
  active: string;
  handleSortByClick: (e: string) => void;
}
const Head: React.FC<HeadProps> = ({ labels, active, handleSortByClick }) => {
  return (
    <thead>
      <tr>
        {labels.map(({ name, id, hasChevronDown }) => (
          <td
            id={id}
            key={id}
            onClick={() => handleSortByClick(id)}
            className={`data-table__cell data-table__cell--${name.toLowerCase()}`}
          >
            {hasChevronDown ? (
              <div className="data-table__cell-content">
                <Image
                  src={ChevronDown}
                  alt="Crypto Icon"
                  className="data-table__icon data-table__icon--chevron"
                />
                <p
                  className={`typography__display--2 ${
                    active === id
                      ? "typography__color--white typography__weight--700"
                      : "typography__color--dark-medium-emphasis"
                  }`}
                >
                  {name}
                </p>
              </div>
            ) : (
              <p className="typography__display--2 typography__color--dark-medium-emphasis">
                {name}
              </p>
            )}
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default Head;
