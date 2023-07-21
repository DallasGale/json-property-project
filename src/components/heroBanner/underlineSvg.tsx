import { useSpring, animated, easings } from "@react-spring/web";

const UnderlineSvg = () => {
  // Animations
  const springs1 = useSpring({
    from: { left: 0 },
    to: { left: 236 },
    delay: 750,
    config: {
      tension: 30,
      friction: 3,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  return (
    <div
      style={{
        width: 237,
        height: 60,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        position: "absolute",
        top: 62,
        right: 0,
        overflow: "hidden",
      }}
    >
      <svg
        width="238"
        height="19"
        viewBox="0 0 238 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeDasharray={0}
          pathLength={0}
          // style={{ ...springs1 }}
          d="M1 17C17 9 165 -3.00002 237 4.99999"
          stroke="#D5F415"
          stroke-width="3"
          stroke-linejoin="round"
        />
      </svg>
      <animated.div
        style={{
          ...springs1,
          backgroundColor: "rgb(20, 21, 23)",
          top: 21,
          width: "100%",
          position: "absolute",
          height: 30,
        }}
      />
    </div>
  );
};

export default UnderlineSvg;
