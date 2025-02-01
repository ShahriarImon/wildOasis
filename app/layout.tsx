import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Fira_Code } from "next/font/google";
import Header from "./_components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s - wild oasis", default: "Wild Oasis" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode?.className} antialiased bg-primary-950 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
