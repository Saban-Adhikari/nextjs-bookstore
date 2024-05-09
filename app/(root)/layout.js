import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <section>
      <Navbar />
      {children}
      <SpeedInsights />
      <Analytics />
      <Footer />
    </section>
  );
}
