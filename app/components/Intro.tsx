"use client";

import Link from "next/link";
import Image from "next/image";
import Skills from "./Skills";
import Age from "./Age";
import ScrambleHeading from "./ScrambleHeading";
import FloatingAvatar from "./FloatingAvatar";
import ScrollReveal from "./ScrollReveal";

export default function Intro() {
  return (
    <section className="py-4 sm:py-8 md:py-12 relative overflow-hidden">
      <div className="ambient-glow" />

      {/* Mobile: small avatar + name row */}
      <div className="flex items-center gap-3.5 md:hidden">
        <div
          className="shrink-0 w-14 h-14 rounded-full overflow-hidden border relative"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="avatar-glow" />
          <Image
            src="/avatar.png"
            alt="Joydeep Banik"
            width={512}
            height={512}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-tight text-primary">
            Joydeep Banik
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            @joydeepbanik
          </p>
          <p className="text-xs mt-0.5 flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: "var(--green-muted)" }}
            />
            <span style={{ color: "var(--green-muted)" }}>open for opportunities</span>
          </p>
        </div>
      </div>

      {/* Desktop: full layout with FloatingAvatar */}
      <div className="hidden md:flex max-w-5xl flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-left">
          <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-primary heading-shimmer">
            Hi, I&apos;m <ScrambleHeading />
          </h1>
          <p className="mt-4 max-w-xl text-xl leading-relaxed text-secondary">
            Full stack developer &amp; software enthusiast.
          </p>
          <p className="mt-4 text-base" style={{ color: "var(--text-tertiary)" }}>
            @joydeepbanik
            <span className="mx-2">·</span>
            <span style={{ color: "var(--green-muted)" }}>
              open for opportunities
            </span>
          </p>
        </div>

        <FloatingAvatar />
      </div>

      <div className="mt-4 md:mt-16 max-w-3xl space-y-4 md:space-y-5">
        <ScrollReveal>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            I&apos;m a <Age /> year old software developer focused on architecting distributed backend services,
            cloud systems, and applied machine learning pipelines.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            I build high-performance systems with{" "}
            <span className="font-medium text-primary">
              <Skills />
            </span>{" "}
            and other developer tooling. I also publish research in computer vision.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Currently engineering event-driven tournament engines, building asynchronous terminal tools with
            multi-LLM runtime abstractions, and working with cloud telemetry.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
