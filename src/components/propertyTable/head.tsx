// Components
import Image from "next/image";

// Assets
import ChevronDown from "@assets/icons/chevron-down.svg";

// Types
import { DataTableHeadTypes } from "@/app/types";

const Head: React.FC<DataTableHeadTypes> = ({
  labels,
  active,
  handleSortByClick,
}) => {
  return (
    <thead>
      <tr>
        {labels.map(({ name, id, hasChevronDown }) => {
          return (
            <td
              id={id}
              key={id}
              onClick={() => handleSortByClick(id)}
              className={`property-table__cell property-table__cell--${name.toLowerCase()}`}
            >
              {hasChevronDown ? (
                <div className="property-table__cell-content">
                  <Image
                    src={ChevronDown}
                    alt="Crypto Icon"
                    className="property-table__icon property-table__icon--chevron"
                  />
                  <p
                    className={`typography__display--2 ${
                      active === id
                        ? "typography__color--black typography__weight--700"
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
          );
        })}
      </tr>
    </thead>
  );
};

export default Head;
