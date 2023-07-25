import { useSpring, animated } from "@react-spring/web";
import Moment from "react-moment";
import "moment-timezone";

import TimeIcon from "@assets/icons/time.svg";
import { config, toFrom } from "@/constants/animationSettings";

const StatusBar: React.FC = () => {
  // Animations
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config,
    delay: 1200,
  });

  const today = new Date();
  const date = new Date("1976-04-19T00:30-0000");
  const clientsTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <animated.section style={{ ...animation }} className="status-bar">
      <div className="status-bar__cell">
        <p className="typography__display--8 typography__color--black status-bar__daily-report">
          Daily Report
        </p>
        <p className="typography__display--6 typography__color--white">
          <Moment
            format="dddd, MMMM Do YYYY"
            subtract={{ days: 1, hours: 0 }}
            date={today.toDateString()}
          />
        </p>
      </div>

      <div className="status-bar__cell">
        <img src={TimeIcon.src} />
        <p className="typography__display--2 typography__color--dark-medium-emphasis">
          Updates daily at <Moment format="hh:mma" date={date} />{" "}
          {clientsTimeZone}
        </p>
      </div>
    </animated.section>
  );
};

export default StatusBar;
