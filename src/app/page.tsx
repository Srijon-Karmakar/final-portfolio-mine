"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Circle,
  GitBranch,
  Globe,
  Mail,
} from "lucide-react";
import HeroReveal from "@/components/hero-reveal";
import { portfolioData } from "@/lib/portfolio-data";

const servicePanels = [
  {
    title: "Clean & scalable code",
    copy:
      "Build systems that stay maintainable as products grow. Structure, reusability, and performance are handled from the start.",
    number: "01",
    tone: "bg-[#8eb28e] text-[#131313]",
  },
  {
    title: "Modern UI & UX",
    copy:
      "Interfaces are designed with clarity, spacing, and motion in mind so the product feels sharp on every screen.",
    number: "02",
    tone: "bg-[#f2f0ec] text-[#131313]",
  },
  {
    title: "SEO & best practices",
    copy:
      "Semantic structure, accessibility, optimized delivery, and production discipline are built into the process.",
    number: "03",
    tone: "bg-[#8eb28e] text-[#131313]",
  },
  {
    title: "Reliable delivery",
    copy:
      "From concept to launch, the focus stays on clean execution, stable releases, and a site that actually works.",
    number: "04",
    tone: "bg-[#f2f0ec] text-[#131313]",
  },
];

export default function HomePage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loaderCountRef = useRef<HTMLSpanElement | null>(null);
  const loaderLinesRef = useRef<HTMLDivElement | null>(null);
  const transitionSectionRef = useRef<HTMLElement | null>(null);
  const transitionStageRef = useRef<HTMLDivElement | null>(null);
  const transitionCrossXRef = useRef<HTMLDivElement | null>(null);
  const transitionCrossYRef = useRef<HTMLDivElement | null>(null);
  const transitionWhiteRef = useRef<HTMLDivElement | null>(null);
  const transitionCenterBlockRef = useRef<HTMLDivElement | null>(null);
  const transitionTitleRef = useRef<HTMLDivElement | null>(null);
  const transitionStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const loaderEl = loaderRef.current;
      const loaderCountEl = loaderCountRef.current;
      const loaderLinesEl = loaderLinesRef.current;
      const heroWords = heroHeadlineRef.current?.querySelectorAll("[data-word]");
      const heroMeta = document.querySelectorAll("[data-hero-meta]");

      if (loaderEl && loaderCountEl && loaderLinesEl && heroWords?.length) {
        const lines = loaderLinesEl.querySelectorAll("[data-loader-line]");
        const counter = { value: 0 };

        gsap.set([...heroWords, ...heroMeta], { autoAlpha: 0, y: 24 });
        gsap.set(lines, { autoAlpha: 0.3 });

        const introTl = gsap.timeline();
        introTl
          .to(counter, {
            value: 100,
            duration: 1.6,
            ease: "none",
            onUpdate: () => {
              loaderCountEl.textContent = `${Math.round(counter.value)}%`;
            },
          })
          .to(
            lines,
            {
              left: "50%",
              duration: 0.8,
              ease: "power4.inOut",
              stagger: 0.04,
            },
            "-=0.45",
          )
          .to(
            loaderEl,
            {
              autoAlpha: 0,
              duration: 0.45,
              pointerEvents: "none",
            },
            "-=0.1",
          )
          .to(
            heroWords,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              ease: "power4.out",
              stagger: 0.08,
            },
            "-=0.05",
          )
          .to(
            heroMeta,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.06,
            },
            "-=0.55",
          );
      }

      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroBgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (panelsRef.current) {
        const cards = Array.from(
          panelsRef.current.querySelectorAll<HTMLElement>("[data-service-card]"),
        );

        gsap.set(cards, { transformOrigin: "50% 0%" });

        cards.forEach((card, index) => {
          const nextCard = cards[index + 1];

          if (!nextCard) {
            return;
          }

          gsap.to(card, {
            yPercent: -28,
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 85%",
              end: "top 22%",
              scrub: true,
            },
          });
        });
      }

      if (
        transitionSectionRef.current &&
        transitionStageRef.current &&
        transitionCrossXRef.current &&
        transitionCrossYRef.current &&
        transitionWhiteRef.current &&
        transitionCenterBlockRef.current &&
        transitionTitleRef.current &&
        transitionStripRef.current &&
        panelsRef.current
      ) {
        const panelItems = Array.from(panelsRef.current.children);
        const titleParts = transitionTitleRef.current.querySelectorAll(
          "[data-transition-title]",
        );

        gsap.set(transitionCrossXRef.current, {
          scaleX: 0,
          transformOrigin: "50% 50%",
        });
        gsap.set(transitionCrossYRef.current, {
          scaleY: 0,
          transformOrigin: "50% 50%",
        });
        gsap.set(transitionWhiteRef.current, { autoAlpha: 0 });
        gsap.set(transitionCenterBlockRef.current, {
          scale: 0.06,
          autoAlpha: 1,
          transformOrigin: "50% 50%",
        });
        gsap.set(titleParts, { autoAlpha: 0, y: 30 });
        gsap.set(transitionStripRef.current, { yPercent: 50 });

        const transitionTl = gsap.timeline({
          scrollTrigger: {
            trigger: transitionSectionRef.current,
            start: "top top",
            end: "+=170%",
            scrub: 1,
            pin: transitionStageRef.current,
          },
        });

        transitionTl
          .to(
            panelItems,
            {
              yPercent: -100,
              ease: "none",
              stagger: 0.04,
            },
            0,
          )
          .to(
            transitionCrossXRef.current,
            {
              scaleX: 1,
              duration: 0.25,
              ease: "power2.out",
            },
            0.08,
          )
          .to(
            transitionCrossYRef.current,
            {
              scaleY: 1,
              duration: 0.25,
              ease: "power2.out",
            },
            0.12,
          )
          .to(
            transitionWhiteRef.current,
            {
              autoAlpha: 1,
              duration: 0.28,
              ease: "none",
            },
            0.34,
          )
          .to(
            transitionCenterBlockRef.current,
            {
              scale: 9,
              duration: 0.52,
              ease: "power2.inOut",
            },
            0.4,
          )
          .to(
            titleParts,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              stagger: 0,
              overwrite: "auto",
            },
            0.52,
          )
          .to(
            transitionStripRef.current,
            {
              yPercent: 0,
              duration: 0.45,
              ease: "power3.out",
            },
            0.56,
          );
      }
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="relative overflow-x-clip bg-[#11110f] text-white">
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[100] bg-[#1d1f23]"
        aria-hidden="true"
      >
        <div ref={loaderLinesRef} className="absolute inset-0">
          {[6, 18, 30, 42, 54, 66, 78, 90].map((left) => (
            <span
              key={left}
              data-loader-line
              className="absolute bottom-0 top-0 w-px bg-white/20"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
        <span
          ref={loaderCountRef}
          className="absolute bottom-10 right-10 font-display text-[clamp(4rem,12vw,8rem)] leading-none tracking-[-0.02em] text-white"
        >
          0%
        </span>
      </div>

      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 border border-white/10 bg-black px-4 py-6 lg:block">
        <div className="flex items-center gap-4">
          <span className="font-display text-3xl leading-none">W.</span>
          <span className="text-[0.62rem] uppercase tracking-[0.28em] text-zinc-300 [writing-mode:vertical-rl]">
            Nominee
          </span>
        </div>
      </div>

      <section
        id="top"
        className="site-grid relative min-h-screen border-b border-white/10"
      >
        <div ref={heroBgRef} className="contour-bg absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.2),rgba(17,17,15,0.72))]" />

        <header className="relative z-10 flex items-start justify-between px-4 pb-6 pt-8 sm:px-6 lg:px-8">
          <HeroReveal>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-xl font-display leading-none">
              SK
            </div>
          </HeroReveal>

          <HeroReveal delay={0.08}>
            <button className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black">
              Menu
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#9ec89e]" />
            </button>
          </HeroReveal>
        </header>

        <div className="relative z-10 px-4 pb-10 sm:px-6 lg:px-8">
          <HeroReveal delay={0.12}>
            <div
              data-hero-meta
              className="mb-8 grid gap-3 border-t border-white/20 pt-3 text-[0.62rem] uppercase tracking-[0.18em] text-zinc-300 md:grid-cols-3"
            >
              <span>50+ projects completed</span>
              <span className="md:text-center">2+ years of experience</span>
              <span className="md:text-right">Full-stack product developer</span>
            </div>
          </HeroReveal>

          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <h1
                ref={heroHeadlineRef}
                className="font-display flex flex-col gap-2 uppercase text-white text-[clamp(4.5rem,13vw,13rem)] leading-[0.92] tracking-[-0.02em] sm:gap-3"
              >
                <span className="block overflow-hidden">
                  <span data-word className="block">
                    I build modern
                  </span>
                </span>
                <span className="block overflow-hidden text-[#8eb28e]">
                  <span data-word className="block">
                    websites
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-word className="block">
                    that work
                  </span>
                </span>
              </h1>
            </div>

            <HeroReveal delay={0.24}>
              <div
                data-hero-meta
                className="max-w-sm pb-4 text-sm leading-6 text-zinc-300 lg:justify-self-end"
              >
                <p className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/60">
                  About
                </p>
                <p>{portfolioData.intro}</p>
                <a
                  href="#services"
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white"
                >
                  Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </HeroReveal>
          </div>
        </div>
      </section>

      <section
        id="services"
        ref={servicesSectionRef}
        className="site-grid relative bg-[#1b1b19] px-4 py-12 sm:px-6 lg:px-8"
      >
        <div ref={panelsRef} className="space-y-0">
          {servicePanels.map((panel, index) => (
            <article
              key={panel.title}
              data-service-card
              className={`sticky top-0 relative isolate overflow-hidden border border-black/10 ${panel.tone}`}
              style={{ zIndex: 10 + index }}
            >
              <span className="pointer-events-none absolute right-4 top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(6rem,14vw,12rem)] leading-none tracking-[-0.01em] text-black/12">
                {panel.number}
              </span>

              <div className="relative z-10 grid min-h-[15rem] gap-8 p-6 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-12">
                <div className="pr-4">
                  <h2 className="font-display uppercase text-[clamp(2.4rem,7vw,5.8rem)] leading-[0.95] tracking-[-0.01em]">
                    {panel.title}
                  </h2>
                </div>

                <div className="max-w-xl justify-self-end pt-1 text-sm leading-7 text-black/75">
                  <div className="mb-6 flex justify-center lg:justify-start">
                    <Circle className="h-5 w-5 stroke-[1.25]" />
                  </div>
                  <p>{panel.copy}</p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black"
                  >
                    View approach <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={transitionSectionRef} className="relative h-[220vh] bg-[#1b1b19]">
        <div ref={transitionStageRef} className="relative h-screen overflow-hidden">
          <div className="site-grid absolute inset-0 bg-[#1f2125]" />

          <div
            ref={transitionCrossXRef}
            className="absolute left-1/2 top-1/2 z-20 h-[30vh] w-[180vw] -translate-x-1/2 -translate-y-1/2 bg-[#ececec]"
          />
          <div
            ref={transitionCrossYRef}
            className="absolute left-1/2 top-1/2 z-20 h-[180vh] w-[30vw] -translate-x-1/2 -translate-y-1/2 bg-[#ececec]"
          />

          <div
            ref={transitionWhiteRef}
            className="site-grid-light absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_40%,rgba(236,236,236,0.86),rgba(236,236,236,0.6)_45%,rgba(236,236,236,0.18)_100%)]"
          />
          <div
            ref={transitionCenterBlockRef}
            className="absolute left-1/2 top-1/2 z-[35] h-[22vmax] w-[22vmax] -translate-x-1/2 -translate-y-1/2 bg-[#efece7]"
          />

          <div className="pointer-events-none absolute inset-x-0 top-[14%] z-50 flex justify-center">
            <div
              ref={transitionTitleRef}
              className="text-center font-display uppercase leading-[0.94] tracking-[-0.01em] text-[#131313]"
            >
              <p data-transition-title className="text-[clamp(2.5rem,6.7vw,6.2rem)]">
                What you get
              </p>
              <p
                data-transition-title
                className="text-[clamp(2.5rem,6.7vw,6.2rem)]"
              >
                When clarity
              </p>
              <p data-transition-title className="text-[clamp(2.5rem,6.7vw,6.2rem)]">
                Meets
              </p>
              <p
                data-transition-title
                className="font-['Times_New_Roman'] text-[clamp(2.6rem,6.2vw,6rem)] italic normal-case tracking-[0.02em]"
              >
                Performance
              </p>
            </div>
          </div>

          <div
            ref={transitionStripRef}
            className="absolute inset-x-[-2%] bottom-[-14%] z-40 rotate-[2deg] bg-[#b08f79] px-8 pb-20 pt-10 sm:px-10 lg:px-12"
          >
            <div className="max-w-xl border-l border-white/50 pl-4 text-base leading-8 text-white/92">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/70">
                01
              </p>
              <p>
                I work closely with brands to craft thoughtful, scalable design
                systems that translate strategy into refined digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-grid-light bg-[#f4f2ed] px-4 py-24 text-[#161616] sm:px-6 lg:px-8 lg:py-32">
        <HeroReveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[clamp(3.2rem,9vw,6.4rem)] uppercase leading-[0.9] tracking-[-0.02em]">
              Ready to build something that actually works?
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-black/70">
              Clear design, solid engineering, and focused strategy working
              together as one system.
            </p>
            <a
              href={portfolioData.socials.email}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#e9e7e3] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            >
              Let&apos;s talk
            </a>
          </div>
        </HeroReveal>
      </section>

      <footer
        id="contact"
        className="border-t border-white/10 bg-[#1a1a18] px-4 pb-10 pt-14 sm:px-6 lg:px-8"
      >
        <HeroReveal>
          <div className="grid gap-10 border-b border-[#8eb28e]/70 pb-8 text-sm text-zinc-300 md:grid-cols-4">
            <div className="space-y-3">
              <a href={portfolioData.socials.email} className="block hover:text-white">
                {portfolioData.socials.email.replace("mailto:", "")}
              </a>
              <p>{portfolioData.location}</p>
            </div>
            <div className="space-y-3">
              <a href="#top" className="block hover:text-white">
                Overview
              </a>
              <a href="#contact" className="block hover:text-white">
                Contact
              </a>
              <a href="#services" className="block hover:text-white">
                Services
              </a>
              <a href="#work" className="block hover:text-white">
                Work
              </a>
            </div>
            <div className="space-y-3">
              <a
                href={portfolioData.socials.github}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <GitBranch className="h-4 w-4" /> GitHub
              </a>
              <a
                href={portfolioData.socials.linkedin}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={portfolioData.socials.website}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Globe className="h-4 w-4" /> Website
              </a>
              <a
                href={portfolioData.socials.email}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
            <div className="space-y-3 md:text-right">
              <p>Privacy Policy</p>
              <p>©2026 All Rights Reserved</p>
            </div>
          </div>
        </HeroReveal>

        <div
          id="work"
          className="overflow-hidden pt-6 font-display text-[clamp(6rem,18vw,17rem)] uppercase leading-[0.88] tracking-[-0.02em] text-[#f3f1eb]"
        >
          {portfolioData.name.split(" ")[0]}
        </div>
      </footer>
    </main>
  );
}
