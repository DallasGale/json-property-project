"use client";

import { useSpring, animated } from "@react-spring/web";
import { config, toFrom } from "@constants/animationSettings";
import TwitterIcon from "@assets/icons/twitter.svg";
import Link from "next/link";
import Avatar from "@components/avatar/avatar";

const people = [
  {
    avatar: "",
    name: "Alida Tomaszewski",
    position: "CCO / Co-Founder",
  },
  {
    avatar: "",
    name: "Daniel Bertram",
    position: "CEO / Co-Founder",
  },
];

const AboutView = () => {
  // Animations
  const animation1 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 0,
    config,
  });
  const animation2 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 150,
    config,
  });
  const animation3 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 300,
    config,
  });
  const animation4 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 450,
    config,
  });
  const animation5 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 700,
    config,
  });
  const animation6 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1200,
    config: {
      ...config,
      duration: 850,
    },
  });
  const animation7 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 900,
    config: {
      ...config,
    },
  });
  const animation8 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 1050,
    config: {
      ...config,
    },
  });
  const animation9 = useSpring({
    from: toFrom.from,
    to: toFrom.to,
    delay: 1200,
    config: {
      ...config,
    },
  });
  return (
    <>
      <div className="about-page__intro">
        <animated.h1
          style={{ ...animation1 }}
          className="typography__display--1 typography__color--highlight"
        >
          OUR MISSION
        </animated.h1>
        <animated.p
          style={{ ...animation2 }}
          className="typography__display--7  typography__color--highlight"
        >
          Empower the NFT community with unparalleled data insights
        </animated.p>
        <animated.p
          style={{ ...animation3 }}
          className="typography__display--1"
        >
          For hobbyists and whales, to web3 consultants and enterprise;
          DataBeast shows you uniquely helpful insights to ensure a true picture
          of the ecosystem. We’ve sourced data from the raw events on the
          blockchain in order to deliver you a comprehensive market overview,
          without the manipulation.
        </animated.p>
      </div>
      <animated.div style={{ ...animation4 }} className="about-page__callout">
        <animated.p
          style={{ ...animation5 }}
          className="typography__paragraph--3 typography__color--dark-high-emphasis"
        >
          At Databeast, we strive for a more transparent and equitable
          investment landscape, and we’ve gone to great lengths to ensure
          maximum accuracy of information.
        </animated.p>
        <animated.div style={{ ...animation6 }}>
          <Link
            href="https://twitter.com/nftdb_ai"
            className="button button__twitter"
            style={{ backgroundImage: `url(${TwitterIcon.src})` }}
            target="_blank"
          >
            Stay Informed
          </Link>
        </animated.div>
      </animated.div>
      <animated.p
        style={{ ...animation7 }}
        className="typography__display--9 typography__color--highlight"
      >
        We are engineers, creatives and problem solvers.
      </animated.p>
      <animated.p style={{ ...animation8 }} className="typography__display--1">
        Together we are able to help investors, collectors and traders perform
        their due diligence, discover opportunities and stay safe.
      </animated.p>

      <div className="about__people">
        <ol className="about__people-list">
          {people.map((person) => {
            return (
              <animated.li
                style={{ ...animation9 }}
                key={person.name}
                className="about__people-list-item"
              >
                <Avatar />
                <p className="typography__display--5 typography__color--white">
                  {person.name}
                </p>
                <p className="typography__display--6 typography__color--dark-high-emphasis typography__weight--300">
                  {person.position}
                </p>
              </animated.li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default AboutView;
