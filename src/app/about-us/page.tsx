import TwitterIcon from "@assets/icons/twitter.svg";
import Link from "next/link";
const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="about-page__intro">
        <h1 className="typography__display--1 typography__color--highlight">
          OUR MISSION
        </h1>
        <p className="typography__display--7  typography__color--highlight">
          Empower the NFT community with unparalleled data insights
        </p>
        <p className="typography__display--1">
          For hobbyists and whales, to web3 consultants and enterprise;
          DataBeast shows you uniquely helpful insights to ensure a true picture
          of the ecosystem. We’ve sourced data from the raw events on the
          blockchain in order to deliver you a comprehensive market overview,
          without the manipulation.
        </p>
      </div>
      <div className="about-page__callout">
        <p className="typography__paragraph--3 typography__color--dark-high-emphasis">
          At Databeast, we strive for a more transparent and equitable
          investment landscape, and we’ve gone to great lengths to ensure
          maximum accuracy of information.
        </p>
        <Link
          href="https://twitter.com/nftdb_ai"
          className="button button__twitter"
          style={{ backgroundImage: `url(${TwitterIcon.src})` }}
        >
          Stay Informed
        </Link>
      </div>
      <p className="typography__display--9 typography__color--highlight">
        We are engineers, creatives and problem solvers.
      </p>
      <p className="typography__display--1">
        Together we are able to help investors, collectors and traders perform
        their due diligence, discover opportunities and stay safe.
      </p>
    </section>
  );
};

export default AboutPage;
