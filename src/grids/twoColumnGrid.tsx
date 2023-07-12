import { useSpring, animated, easings } from "@react-spring/web";
import { ColumnTypes } from "./types";

interface TwoColumnGridTypes {
  column1: ColumnTypes;
  column2: ColumnTypes;
}
const TwoColumnGrid: React.FC<TwoColumnGridTypes> = ({ column1, column2 }) => {
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

  return (
    <div className="grid grid__two-col">
      <animated.div style={{ ...springs1 }} className="grid__col">
        {column1.header && (
          <div className="grid__col-header">{column1.header}</div>
        )}
        {column1.content && (
          <div className="grid__col-container">{column1.content}</div>
        )}
      </animated.div>
      <animated.div style={{ ...springs2 }} className="grid__col">
        {column2.header && (
          <div className="grid__col-header">{column2.header}</div>
        )}
        {column2.content && (
          <div className="grid__col-container">{column2.content}</div>
        )}
      </animated.div>
    </div>
  );
};

export default TwoColumnGrid;
