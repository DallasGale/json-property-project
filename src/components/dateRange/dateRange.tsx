import Moment from "react-moment";

interface DateRangeProps {
  timeframe: number;
}
const DateRange: React.FC<DateRangeProps> = ({ timeframe }) => {
  const today = new Date().toDateString();
  return (
    <p className="typography__caption--medium">
      {(timeframe === 7 || timeframe === 30 || timeframe === 90) && (
        <>
          <Moment
            format="D MMM"
            subtract={{ days: timeframe, hours: 0 }}
            date={today}
          />
          {" - "}
        </>
      )}
      <Moment format="D MMM YYYY" date={today} />
    </p>
  );
};

export default DateRange;
