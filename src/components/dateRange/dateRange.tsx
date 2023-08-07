import Moment from "react-moment";

interface DateRangeProps {
  timeframe?: number;
}
const DateRange: React.FC<DateRangeProps> = ({ timeframe = 90 }) => {
  const today = new Date().toDateString();
  return (
    <p className="typography__caption--medium">
      {timeframe !== 1 && (
        <>
          <Moment
            format="D MMM"
            subtract={{ days: timeframe, hours: 0 }}
            date={today}
          />
          {" - "}
        </>
      )}
      <Moment format="D MMM YYYY" date={today} subtract={{ days: 1 }} />
    </p>
  );
};

export default DateRange;
