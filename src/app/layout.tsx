"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    setInterval(() => {
      console.log("refreshed window");
      router.refresh();
    }, 300000);
  });
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
