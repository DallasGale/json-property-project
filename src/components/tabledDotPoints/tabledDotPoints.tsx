import DecimalFormatter from "@utils/decimalFormatter";

interface DotPointProps {
  dotpoints: DotPointTypes[];
  onClick: (e: string) => void;
}

type DotPointTypes = {
  name: string;
  value?: number;
  color: string;
  id: string;
};

function valueColor(value: number) {
  if (value < 0) return "red";
  else return "green";
}
const TabledDotPoints: React.FC<DotPointProps> = ({ dotpoints, onClick }) => {
  return (
    <div className="tabled-dot-points">
      <ul className="tabled-dot-point__list">
        {dotpoints.map(({ name, value, color, id }) => {
          return (
            <li
              id={id}
              key={name}
              className={`tabled-dot-point__list-item ${color}`}
              onClick={(e) => onClick(e.currentTarget.id)}
            >
              <p className="tabled-dot-point__title typography__label--5">
                {name}
              </p>
              {value && (
                <p
                  className={`tabled-dot-point__value typography__display--2 typography__color--${valueColor(
                    value
                  )}`}
                >
                  {DecimalFormatter(value)}%
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabledDotPoints;
