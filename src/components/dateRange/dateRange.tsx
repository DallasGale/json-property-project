import Moment from "react-moment";

const DateRange = () => {
  const today = new Date().toDateString();
  return (
    <p className="typography__caption--medium">
      <Moment format="D MMM" subtract={{ days: 90, hours: 0 }} date={today} />
      {" - "}
      <Moment format="D MMM YYYY" date={today} />
    </p>
  );
};

export default DateRange;
