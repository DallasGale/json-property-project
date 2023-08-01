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
    <div className="hero-banner__underline">
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
          d="M1 17C17 9 165 -3.00002 237 4.99999"
          stroke="#D5F415"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <animated.div
        className="hero-banner__underline-cloak"
        style={{
          ...springs1,
        }}
      />
    </div>
  );
};

export default UnderlineSvg;
