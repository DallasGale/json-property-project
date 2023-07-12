import DecimalFormatter from "@/utils/decimalFormatter";

interface DotPointProps {
  dotpoints: DotPointTypes[];
}

type DotPointTypes = {
  title: string;
  value: number;
  color: string;
};

function valueColor(value: number) {
  if (value < 0) return "red";
  else return "green";
}
const TabledDotPoints: React.FC<DotPointProps> = ({ dotpoints }) => {
  return (
    <div className="tabled-dot-points">
      <ul className="tabled-dot-point__list">
        {dotpoints.map(({ title, value, color }) => {
          return (
            <li key={title} className={`tabled-dot-point__list-item ${color}`}>
              <p className="tabled-dot-point__title typography__label--5">
                {title}
              </p>
              <p
                className={`tabled-dot-point__value typography__display--2 typography__color--${valueColor(
                  value
                )}`}
              >
                {DecimalFormatter(value)}%
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabledDotPoints;
