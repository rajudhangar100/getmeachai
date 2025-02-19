import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me a Chai-A Website for funding",
  description: "It is a platform where creators could raise funds for their projects from their fans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
        <div className={inter.className}>
        <SessionWrapper>
        <Navbar/>
        <div>
        {children}
        </div>
        <Footer/>
        </SessionWrapper>
        </div>
        </body>
    </html>
  );
}
