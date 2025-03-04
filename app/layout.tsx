import type { Metadata } from "next";
// import { Fira_Code } from "next/font/google";
import Header from "./_components/Header";
import "./globals.css";

// const firaCode = Fira_Code({
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: { template: "%s - wild oasis", default: "Wild Oasis" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ${firaCode?.className}
  return (
    <html lang="en">
      <body
        className={`antialiased bg-primary-950 min-h-screen flex flex-col relative`}
      >
        <Header />
        <main className="flex-1 px-8 py-12 grid">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
