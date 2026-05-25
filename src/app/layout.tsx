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
  metadataBase: new URL("https://nishantrankawat.dev"),
  title: "Nishant Rankawat | Full Stack Developer & System Builder",
  description: "Building scalable web applications, high-performance systems, and digital experiences.",
  keywords: [
    "Nishant Rankawat",
    "Full Stack Developer",
    "Nigris",
    "System Builder",
    "Next.js Portfolio",
    "Software Engineer",
    "Systems Architect",
    "React Developer",
    "Python Developer",
    "Node.js Developer"
  ],
  authors: [{ name: "Nishant Rankawat" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nishant Rankawat | Full Stack Developer & System Builder",
    description: "Building scalable web applications, high-performance systems, and digital experiences.",
    url: "https://nishantrankawat.dev",
    siteName: "Nishant Rankawat Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Rankawat | Full Stack Developer & System Builder",
    description: "Building scalable web applications, high-performance systems, and digital experiences.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nishant Rankawat",
  "url": "https://nishantrankawat.dev",
  "jobTitle": "Full Stack Developer & System Builder",
  "sameAs": [
    "https://github.com/nishant4086"
  ],
  "knowsAbout": [
    "Full Stack Development",
    "Systems Architecture",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "OpenCV",
    "Web3Forms"
  ],
  "description": "Nishant Rankawat is a Full Stack Developer and System Builder specializing in high-performance web applications, scalable systems, and interactive digital experiences."
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className="min-h-full bg-[#030303] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-[#00f0ff]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
