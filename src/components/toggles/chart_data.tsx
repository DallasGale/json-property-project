interface ChartDataTogglesProps {
  onClick: (arg1: React.MouseEvent, arg2: number | null) => void;
  title: string;
}

const ChartDataToggles: React.FC<ChartDataTogglesProps> = ({
  onClick,
  title,
}) => {
  return (
    <div className="chart__title">
      <h2 className="typography__display--1">{title}</h2>
      <div className="button-group">
        <button
          className="button typography__label--1"
          onClick={(e) => onClick(e, -7)}
        >
          7D
        </button>
        <button
          className="button typography__label--1"
          onClick={(e) => onClick(e, -30)}
        >
          30D
        </button>
        <button
          className="button typography__label--1"
          onClick={(e) => onClick(e, null)}
        >
          ALL
        </button>
      </div>
    </div>
  );
};

export default ChartDataToggles;
