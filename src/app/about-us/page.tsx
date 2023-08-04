import { Metadata } from "next";
import AboutView from "@/components/views/about";

export const metadata: Metadata = {
  title: "DataBeast - Powered by nftDb",
  description: "Powered by nftDb",
};
const AboutPage = () => {
  return (
    <section className="about-page">
      <AboutView />
    </section>
  );
};

export default AboutPage;
