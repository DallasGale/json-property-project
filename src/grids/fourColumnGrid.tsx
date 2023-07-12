import { useSpring, animated, easings } from "@react-spring/web";
import { ColumnTypes } from "./types";

interface FourColumnGridTypes {
  gridHeading?: string;
  column1: ColumnTypes;
  column2: ColumnTypes;
  column3: ColumnTypes;
  column4: ColumnTypes;
}
const FourColumnGrid: React.FC<FourColumnGridTypes> = ({
  gridHeading,
  column1,
  column2,
  column3,
  column4,
}) => {
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 450,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs2 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 600,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs3 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 750,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs4 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 900,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  return (
    <>
      <animated.div
        style={{ ...springs1 }}
        className="chart__grid chart__grid--one-col"
      >
        <div className="chart__chart-actions-lockup">
          {gridHeading && (
            <h2 className="typography__display--1">{gridHeading}</h2>
          )}
        </div>
      </animated.div>
      <div className="grid grid__four-col">
        <animated.div style={{ ...springs1 }} className="grid__col">
          {column1.header && (
            <div className="grid__col-header">{column1.header}</div>
          )}
          {column1.content && (
            <div className="grid__col-container">
              <div className="grid__col-content">{column1.content}</div>
            </div>
          )}
        </animated.div>
        <animated.div style={{ ...springs2 }} className="grid__col">
          {column2.header && (
            <div className="grid__col-header">{column2.header}</div>
          )}
          {column2.content && (
            <div className="grid__col-container">
              <div className="grid__col-content">{column2.content}</div>
            </div>
          )}
        </animated.div>
        <animated.div style={{ ...springs3 }} className="grid__col">
          {column3.header && (
            <div className="grid__col-header">{column3.header}</div>
          )}
          {column3.content && (
            <div className="grid__col-container">
              <div className="grid__col-content">{column3.content}</div>
            </div>
          )}
        </animated.div>
        <animated.div style={{ ...springs4 }} className="grid__col">
          {column4.header && (
            <div className="grid__col-header">{column4.header}</div>
          )}
          {column4.content && (
            <div className="grid__col-container">
              <div className="grid__col-content">{column4.content}</div>
            </div>
          )}
        </animated.div>
      </div>
    </>
  );
};

export default FourColumnGrid;
