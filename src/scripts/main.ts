import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

function setLock(locked: boolean) {
  document.body.classList.toggle("is-locked", locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

function initNav() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (!header || !toggle || !nav) return;

  const desktop = window.matchMedia("(min-width: 901px)");

  const close = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    setLock(false);
    if (!desktop.matches) nav.setAttribute("inert", "");
  };

  const open = () => {
    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    nav.removeAttribute("inert");
    setLock(true);
  };

  const sync = () => {
    if (desktop.matches) {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      nav.removeAttribute("inert");
      setLock(false);
      return;
    }
    if (!header.classList.contains("is-open")) nav.setAttribute("inert", "");
  };

  toggle.addEventListener("click", () => {
    if (header.classList.contains("is-open")) close();
    else open();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  desktop.addEventListener("change", sync);
  sync();

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a[href^='#']");
    if (!(link instanceof HTMLAnchorElement)) return;
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    const dest = document.querySelector(hash);
    if (!(dest instanceof HTMLElement)) return;
    event.preventDefault();
    close();
    if (lenis) lenis.scrollTo(dest);
    else dest.scrollIntoView();
    history.pushState(null, "", hash);
  });
}

function initMotion() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
    hero
      .fromTo("[data-hero='kicker']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 })
      .fromTo("[data-hero='logo']", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1.05 }, "-=0.5")
      .fromTo("[data-hero='note']", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.7")
      .fromTo("[data-hero='title']", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.45")
      .fromTo("[data-hero='lead']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.65")
      .fromTo(
        "[data-hero='meta']",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.5",
      )
      .fromTo(
        "[data-hero='actions']",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.4",
      )
      .fromTo("[data-hero='scroll']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, "-=0.2");

    gsap.fromTo(
      "[data-hero-visual] img",
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-root]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((photo) => {
      const img = photo.querySelector("img");
      if (!img) return;
      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photo,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(ticker);
      lenis?.destroy();
      lenis = null;
    };
  });
}

function initHeaderState() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  ScrollTrigger.create({
    start: 24,
    onToggle: (self) => header.classList.toggle("is-scrolled", self.isActive),
  });
}

initNav();
initMotion();
initHeaderState();
