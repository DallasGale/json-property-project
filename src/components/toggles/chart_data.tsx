interface ChartDataTogglesProps {
  onClick: (arg1: React.MouseEvent, arg2: number | null) => void;
}

const ChartDataToggles: React.FC<ChartDataTogglesProps> = ({ onClick }) => {
  return (
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
  );
};

export default ChartDataToggles;
