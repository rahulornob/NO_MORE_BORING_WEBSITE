"use client";

import { useEffect, useState } from "react";

const TITLE = "NO MORE BORING WEBSITE";

function getMotionValues(scrollY: number) {
  const endAt = 820;
  const progress = Math.min(scrollY / endAt, 1);
  const eased = progress * progress * (3 - 2 * progress);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const startY = typeof window !== "undefined" ? window.innerHeight * (isMobile ? 0.3 : 0.32) : 260;
  const endY = isMobile ? 18 : 20;
  const endScale = isMobile ? 0.34 : 0.15;
  const y = startY + (endY - startY) * eased;
  const scale = 1 + (endScale - 1) * eased;

  return { y, scale, progress };
}

export function ScrollHero() {
  const [motion, setMotion] = useState(() => ({ y: 260, scale: 1, progress: 0 }));
  const marqueeDuration = 22 + motion.progress * 18;

  useEffect(() => {
    let frame = 0;

    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setMotion(getMotionValues(window.scrollY));
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="relative min-h-[72vh] border-b border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 overflow-hidden px-4 text-center"
        style={{
          transform: `translate3d(0, ${motion.y}px, 0) scale(${motion.scale})`,
          transformOrigin: "center top",
          opacity: 1 - motion.progress * 0.02,
        }}
      >
        <div className="relative h-[clamp(3.2rem,12vw,10.7rem)] w-screen">
          <div
            className="hero-title-marquee absolute left-0 top-0 flex w-max whitespace-nowrap text-[clamp(3.05rem,12vw,10.5rem)] font-semibold uppercase leading-none tracking-[-0.035em] text-white"
            style={{ animationDuration: `${marqueeDuration}s` }}
          >
            <MarqueeGroup />
            <MarqueeGroup ariaHidden />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-14 mx-auto max-w-[680px] px-6 text-center">
        <p className="text-sm leading-6 text-muted">
          Extremely curated website inspiration for designers who care about taste,
          motion, and modern web craft.
        </p>
      </div>
    </section>
  );
}

function MarqueeGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 gap-[0.36em] pr-[0.36em]">
      {Array.from({ length: 4 }).map((_, index) => (
        <span key={index}>{TITLE}</span>
      ))}
    </div>
  );
}
