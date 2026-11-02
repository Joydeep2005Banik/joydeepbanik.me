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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://joydeepbanik.me"),
  title: {
    default: "Joydeep Banik",
    template: "%s | Joydeep Banik",
  },
  description: "Full stack developer & software enthusiast.",
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
    title: "Joydeep Banik",
    description: "Full stack developer & software enthusiast.",
    url: "https://joydeepbanik.me",
  },
  twitter: {
    title: "Joydeep Banik",
    card: "summary_large_image",
    creator: "@joydeepbanik",
    site: "@joydeepbanik",
    description: "Full stack developer & software enthusiast.",
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
