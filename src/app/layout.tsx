"use client";

// Hooks
import { usePathname } from "next/navigation";

// Components
import Header from "@components/header/header";
import HeroBanner from "@components/heroBanner/heroBanner";
import StatusBar from "@components/statusBar/statusBar";
import Footer from "@components/footer/footer";

// Fonts
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Inter } from "next/font/google";

// CSS
import "./styles/app.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activePathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="main-container">
          <div className="content">
            <section className="wrapper">
              {activePathname !== "/about-us" && (
                <>
                  <HeroBanner />
                  <StatusBar />
                </>
              )}
              {children}
            </section>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
