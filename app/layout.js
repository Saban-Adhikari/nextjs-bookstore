import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book store",
  description: "Your online book haven",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <SessionProvider>{children}</SessionProvider>
        </>
      </body>
    </html>
  );
}
