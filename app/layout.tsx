import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const thFont = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-thai",
});

const enFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: "Harustatus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${thFont.variable} ${enFont.variable} h-full dark`}
      suppressHydrationWarning
    >
      <body>
        {children}

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
