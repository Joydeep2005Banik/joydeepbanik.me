"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function FloatingAvatar() {
  const [active, setActive] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
  const returning = useRef(false);
  const running = useRef(false);

  useEffect(() => {
    if (!avatarRef.current || !spacerRef.current) return;

    // Skip on touch devices or reduced motion
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function getOrigin() {
      const s = spacerRef.current;
      if (s && s.offsetParent !== null) {
        const r = s.getBoundingClientRect();
        return { x: r.left, y: r.top };
      }
      const a = avatarRef.current;
      if (a) {
        const r = a.getBoundingClientRect();
        return { x: r.left, y: r.top };
      }
      return { x: 0, y: 0 };
    }

    function tick() {
      const tickEl = avatarRef.current;
      if (!tickEl) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      if (!running.current) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;

      tickEl.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

      if (returning.current) {
        const dx = pos.current.x - target.current.x;
        const dy = pos.current.y - target.current.y;
        const dist = Math.abs(dx) + Math.abs(dy);

        tickEl.style.opacity = String(Math.min(1, Math.max(0.08, dist / 50)));

        if (dist < 1.5) {
          returning.current = false;
          running.current = false;
          tickEl.style.opacity = "1";
          tickEl.style.transform = "";
          tickEl.style.position = "static";
          tickEl.style.top = "";
          tickEl.style.left = "";
          tickEl.style.pointerEvents = "auto";
          tickEl.style.willChange = "auto";
          setActive(false);
          rafId.current = requestAnimationFrame(tick);
          return;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    function activate(e: MouseEvent) {
      const actEl = avatarRef.current;
      if (!actEl || running.current) return;

      const rect = actEl.getBoundingClientRect();
      const ox = rect.left;
      const oy = rect.top;
      const w = actEl.offsetWidth;
      const h = actEl.offsetHeight;

      pos.current = { x: ox, y: oy };
      target.current = { x: e.clientX - w / 2, y: e.clientY - h / 2 };

      actEl.style.position = "fixed";
      actEl.style.top = "0";
      actEl.style.left = "0";
      actEl.style.pointerEvents = "none";
      actEl.style.willChange = "transform";
      actEl.style.transform = `translate(${ox}px, ${oy}px)`;
      actEl.style.opacity = "1";

      running.current = true;
      setActive(true);
    }

    function follow(e: MouseEvent) {
      const folEl = avatarRef.current;
      if (!folEl || !running.current) return;

      const folSpacer = spacerRef.current;
      if (!folSpacer) return;
      const section = folSpacer.closest("section");
      if (!section) return;
      const sr = section.getBoundingClientRect();

      if (e.clientY < sr.top || e.clientY > sr.bottom) {
        target.current = getOrigin();
        return;
      }

      const h = folEl.offsetHeight;
      let y = e.clientY - h / 2;
      y = Math.max(sr.top, Math.min(sr.bottom - h, y));
      target.current = { x: e.clientX - folEl.offsetWidth / 2, y };
    }

    function reset() {
      if (!running.current || returning.current) return;
      returning.current = true;
      target.current = getOrigin();
    }

    rafId.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", activate);
    window.addEventListener("mousemove", follow);
    window.addEventListener("resize", reset);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", activate);
      window.removeEventListener("mousemove", follow);
      window.removeEventListener("resize", reset);
    };
  }, []);

  return (
    <>
      {/* Spacer to hold layout space when avatar detaches */}
      <div
        ref={spacerRef}
        className={`shrink-0 w-32 h-32 lg:w-36 lg:h-36 ${active ? "block" : "hidden"}`}
        aria-hidden="true"
      />

      {/* Interactive Avatar */}
      <div
        ref={avatarRef}
        className="shrink-0 w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border relative z-20 transition-shadow duration-300 hover:shadow-lg"
        style={{
          borderColor: "var(--border)",
          boxShadow: active ? "var(--shadow-lg)" : "var(--shadow-sm)",
        }}
      >
        <div className="avatar-glow" />
        <Image
          src="/avatar.png"
          alt="Joydeep Banik"
          width={512}
          height={512}
          priority
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
    </>
  );
}
