// Components
import Header from "@components/header/header";
import HeroBanner from "@components/heroBanner/heroBanner";
import StatusBar from "@components/statusBar/statusBar";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Inter } from "next/font/google";

// CSS
import "./styles/app.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "🧌 DataBeast 🧌 - Powered by NFTdb",
  description: "Powered by NFTdb",
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
        <HeroBanner />
        <StatusBar date="Thursday 20, July 2023" />
        {children}
      </body>
    </html>
  );
}
