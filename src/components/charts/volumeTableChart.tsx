interface TableChartProps {
  title: string;
  pillTheme: string;
  col1data: React.ReactNode;
  col2data: React.ReactNode;
  col3data?: React.ReactNode;
}

const VolumeTableChart: React.FC<TableChartProps> = ({
  title,
  pillTheme,
  col1data,
  col2data,
  col3data,
}) => {
  return (
    <div className="volume-table-chart">
      <div className={`volume-table-chart__title ${pillTheme}`}>
        <p className="typography__label--4 typography__weight--700">{title}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ flex: "1", minWidth: "60%", maxWidth: "60%" }}>
          <table cellPadding={0} cellSpacing={0} width="100%">
            {col1data}
          </table>
        </div>
        <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
          <table cellPadding={0} cellSpacing={0} width="100%">
            {col2data}
          </table>
        </div>
        {col3data && (
          <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
            <table cellPadding={0} cellSpacing={0} width="100%">
              {col3data}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default VolumeTableChart;
