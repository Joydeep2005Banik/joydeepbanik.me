import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/lib/theme-context";
import Dock from "./components/Dock";
import KonamiCode from "./components/KonamiCode";
import ClickSound from "./components/ClickSound";
import { inter, jetbrainsMono, geist } from "@/lib/fonts";
import "./globals.css";

const themeInit = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://joydeepbanik.me/#person",
      "name": "Joydeep Banik",
      "url": "https://joydeepbanik.me",
      "image": "https://joydeepbanik.me/avatar.png",
      "jobTitle": "Back-end & Applied AI/ML Developer",
      "description":
        "Back-end and Applied AI/ML developer focused on building clean, performant products, distributed systems, and AI tooling.",
      "sameAs": [
        "https://github.com/Joydeep2005Banik",
        "https://linkedin.com/in/joydeep-banik",
        "https://www.instagram.com/joy.deep_banik/"
      ],
      "knowsAbout": [
        "Back-end Engineering",
        "Applied Machine Learning",
        "Computer Vision",
        "Distributed Systems",
        "Python",
        "TypeScript",
        "Next.js",
        "Docker",
        "Kubernetes"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Jadavpur University"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://joydeepbanik.me/#website",
      "url": "https://joydeepbanik.me",
      "name": "Joydeep Banik — Portfolio",
      "description":
        "Personal developer portfolio of Joydeep Banik, featuring projects like CTFy and KubeSense, research experiences, and technical work.",
      "publisher": {
        "@id": "https://joydeepbanik.me/#person"
      }
    }
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://joydeepbanik.me"),
  title: {
    default: "Joydeep Banik — Back-end & Applied AI/ML Developer",
    template: "%s | Joydeep Banik",
  },
  description:
    "Personal portfolio of Joydeep Banik, a Back-end & Applied AI/ML Developer. Explore projects like CTFy and KubeSense, research experiences, and technical work.",
  keywords: [
    "Joydeep Banik",
    "Joydeep",
    "Back-end Developer",
    "Applied AI/ML",
    "Machine Learning Engineer",
    "Software Engineer",
    "Next.js",
    "Python",
    "TypeScript",
    "CTFy",
    "KubeSense",
    "Jadavpur University"
  ],
  authors: [{ name: "Joydeep Banik", url: "https://joydeepbanik.me" }],
  creator: "Joydeep Banik",
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
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://joydeepbanik.me",
  },
  openGraph: {
    title: "Joydeep Banik — Back-end & Applied AI/ML Developer",
    description:
      "Personal portfolio of Joydeep Banik, a Back-end & Applied AI/ML Developer. Explore projects like CTFy and KubeSense, research experiences, and technical work.",
    url: "https://joydeepbanik.me",
    siteName: "Joydeep Banik",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/preview.png",
        width: 1280,
        height: 1000,
        alt: "Joydeep Banik Portfolio Preview",
      },
    ],
  },
  twitter: {
    title: "Joydeep Banik — Back-end & Applied AI/ML Developer",
    card: "summary_large_image",
    creator: "@joydeepbanik",
    site: "@joydeepbanik",
    description:
      "Personal portfolio of Joydeep Banik, a Back-end & Applied AI/ML Developer. Explore projects like CTFy and KubeSense, research experiences, and technical work.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen pb-28 sm:pb-32">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14">
              {children}
            </div>
          </div>
          <Dock />
          <KonamiCode />
          <ClickSound />
        </ThemeProvider>
      </body>
    </html>
  );
}
