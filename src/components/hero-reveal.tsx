"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type HeroRevealProps = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
};

export default function HeroReveal({
  children,
  y = 50,
  delay = 0,
  className = "",
}: HeroRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}