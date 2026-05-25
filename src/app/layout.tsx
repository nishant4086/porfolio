import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nishant Rankawat | Full Stack Developer & System Builder",
  description: "Building scalable web applications, high-performance systems, and digital experiences.",
  keywords: ["Nishant Rankawat", "Full Stack Developer", "Nigris", "System Builder", "Next.js Portfolio", "Software Engineer", "Systems Architect"],
  authors: [{ name: "Nishant Rankawat" }],
  openGraph: {
    title: "Nishant Rankawat | Full Stack Developer & System Builder",
    description: "Building scalable web applications, high-performance systems, and digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Rankawat | Full Stack Developer & System Builder",
    description: "Building scalable web applications, high-performance systems, and digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full bg-[#030303] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-[#00f0ff]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
