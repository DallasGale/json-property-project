import { useSpring, animated, easings } from "@react-spring/web";

const HeroBanner = () => {
  // Animations
  const springs1 = useSpring({
    from: { x: 0, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: 0,
    config: {
      tension: 30,
      friction: 3,
      duration: 450,
      easing: easings.easeInOutCubic,
    },
  });

  const springs2 = useSpring({
    from: { x: 0, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: 150,
    config: {
      tension: 30,
      friction: 3,
      duration: 450,
      easing: easings.easeInOutCubic,
    },
  });
  const springs3 = useSpring({
    from: { x: 0, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: 300,
    config: {
      tension: 30,
      friction: 3,
      duration: 450,
      easing: easings.easeInOutCubic,
    },
  });

  return (
    <section className="hero-banner">
      <div className="hero-banner__content-grid">
        <div className="hero-banner__content-grid-cell">
          <animated.h2
            style={{ ...springs1 }}
            className="typography__display--7 typography__color--highlight"
          >
            Get the real story
          </animated.h2>
          <animated.h3
            style={{ ...springs2 }}
            className="typography__display--1"
          >
            Understand the Ethereum NFT Market, without the manipulation.
          </animated.h3>
        </div>

        <div className="hero-banner__content-grid-cell">
          <animated.div
            style={{ ...springs3 }}
            className="hero-banner__did-you-know"
          >
            <h4 className="typography__display--1 typography__color--highlight">
              Did you know?
            </h4>
            <p className="typography__paragraph--2">
              Other marketplaces have been reporting Blur Loans + Wash Trading
              as actual volume! At DataBeast we show you an unbiased look at the
              NFT Market so you can see what’s actually gaining traction.
            </p>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
