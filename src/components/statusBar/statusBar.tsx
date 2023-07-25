import { useSpring, animated } from "@react-spring/web";
import Moment from "react-moment";
import "moment-timezone";

import TimeIcon from "@assets/icons/time.svg";
import { config, toFrom } from "@/constants/animationSettings";

const StatusBar: React.FC = () => {
  const today = new Date();
  // Animations
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config,
    delay: 1200,
  });
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
          Updates daily at 10:30AM AEST
        </p>
      </div>
    </animated.section>
  );
};

export default StatusBar;
