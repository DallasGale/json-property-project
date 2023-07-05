import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./styles/app.scss";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";

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
        {children}
      </body>
    </html>
  );
}
