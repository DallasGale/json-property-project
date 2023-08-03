// Components
import Header from "@components/header/header";
import Footer from "@components/footer/footer";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Inter } from "next/font/google";

// CSS
import "./styles/app.scss";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "🧌 DataBeast 🧌 - Powered by nftDb",
  description: "Powered by nftDb",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="main-container">
          <div className="content">
            <section className="wrapper">{children}</section>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
