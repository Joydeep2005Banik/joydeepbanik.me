import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume",
  alternates: {
    canonical: "https://joydeepbanik.me/resume",
  },
  openGraph: {
    title: "Resume | Joydeep Banik",
    url: "https://joydeepbanik.me/resume",
  },
  twitter: {
    title: "Resume | Joydeep Banik",
  },
};

export default function Resume() {
  return (
    <div className="space-y-6 mt-2">
      <Link href="/" className="btn-ghost">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <p className="section-header">Resume</p>

      <div
        className="card relative w-full overflow-hidden"
        style={{ height: "80vh" }}
      >
        <iframe
          src="/resume.pdf"
          className="w-full h-full"
          title="Joydeep Banik Resume"
        />
      </div>
      <Footer />
    </div>
  );
}
