interface ChartDataTogglesProps {
  onClick: (arg1: React.MouseEvent, arg2: number | null) => void;
  title: string;
  active: number | null;
}

const ChartDataToggles: React.FC<ChartDataTogglesProps> = ({
  onClick,
  title,
  active,
}) => {
  console.log({ active });
  return (
    <div className="chart__title">
      <h2 className="typography__display--1">{title}</h2>
      <div className="button-group">
        <button
          className={`button typography__label--1 ${
            active === 1 ? "active" : ""
          }`}
          onClick={(e) => onClick(e, 1)}
        >
          24H
        </button>
        <button
          className={`button typography__label--1 ${
            active === 7 ? "active" : ""
          }`}
          onClick={(e) => onClick(e, 7)}
        >
          7D
        </button>
        <button
          className={`button typography__label--1 ${
            active === 30 ? "active" : ""
          }`}
          onClick={(e) => onClick(e, 30)}
        >
          30D
        </button>
        <button
          className={`button typography__label--1 ${
            active === 0 ? "active" : ""
          }`}
          onClick={(e) => onClick(e, 0)}
        >
          ALL
        </button>
      </div>
    </div>
  );
};

export default ChartDataToggles;
