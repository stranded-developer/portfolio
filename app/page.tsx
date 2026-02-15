"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";


type MediaItem = { src: string; alt: string };

type Project = {
  title: string;
  subtitle: string;
  buildClaim: string;
  highlights: string[];
  videoSrc: string;
  screenshots: MediaItem[];
};

const PROFILE = {
  name: "Wilson Husen",
  age: 23,
  location: "Sydney",
  role: "Full-Stack & Mobile Developer",
  email: "wilsonhusen78@gmail.com",
  phone: "+61448408585",
};

export default function Home() {
  const projects: Project[] = useMemo(
    () => [
      {
        title: "Eatzy",
        subtitle: "Full-stack restaurant voucher platform across mobile and web.",
        buildClaim:
          "Designed, built, and deployed entirely by me — features 2 mobile apps (User and Merchant) with proper backend architecture, Firestore schema, Admin tooling, Cloud Functions, and Scaling.",
        highlights: [
          "End-to-end authentication and data architecture using Firebase.",
          "Restaurant admin system for menus, promotions, and pricing.",
          "Natively built production-grade mobile UX built with SwiftUI and Jetpack Compose.",
        ],
        videoSrc: "/videos/eatzy-demo.mp4",
        screenshots: [
          { src: "/images/eatzy-1.png", alt: "Eatzy screenshot" },
          { src: "/images/eatzy-2.png", alt: "Eatzy screenshot" },
          { src: "/images/eatzy-3.png", alt: "Eatzy screenshot" },
          { src: "/images/eatzy-4.png", alt: "Eatzy screenshot" },
        ],
      },
      {
        title: "JubeJam NFC",
        subtitle: "NFC identity platform for physical product authenticity.",
        buildClaim:
          "Built full system solo — NFC integration, public product pages, admin portal, secure linking system, and deployment.",
        highlights: [
          "Hashed identity linking with Cloud Functions.",
          "Public verification pages deployed on Vercel.",
          "Admin dashboard with Firebase-backed product management.",
          "Developed using flutter cross platform framework"
        ],
        videoSrc: "/videos/jubejam-demo.mp4",
        screenshots: [
          { src: "/images/jubejam-1.png", alt: "JubeJam screenshot" },
          { src: "/images/jubejam-2.png", alt: "JubeJam screenshot" },
          { src: "/images/jubejam-3.png", alt: "JubeJam screenshot" },
          { src: "/images/jubejam-4.png", alt: "JubeJam screenshot" },
        ],
      },
    ],
    []
  );

  return (
    <main className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.shell}>
        <Header />

        <div className={styles.projectsWrap}>
          {projects.map((p) => (
            <ProjectShowcase key={p.title} project={p} />
          ))}
        </div>

        <ContactFooter />
      </div>
    </main>
  );
}

function Header() {
  const [copied, setCopied] = useState<null | "email" | "phone">(null);

  async function copy(value: string, type: "email" | "phone") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      window.setTimeout(() => setCopied(null), 1100);
    } catch {
      // ignore
    }
  }

  return (
    <header className={styles.headerCard}>
      <div className={styles.headerTop}>
        <p className={styles.kicker}>PORTFOLIO</p>
        <div className={styles.availability}>
          <span className={styles.pulseDot} aria-hidden="true" />
          <span>Open to graduate SWE roles</span>
        </div>
      </div>

      <h1 className={styles.name}>{PROFILE.name}</h1>

      <div className={styles.metaRow}>
        <span>{PROFILE.role}</span>
        <span className={styles.metaSep}>-</span>
        <span>{PROFILE.location}</span>
        <span className={styles.metaSep}>-</span>
        <span>Age {PROFILE.age}</span>
      </div>

      <p className={styles.summary}>
        This page features 2 flagship builds — <b>Eatzy</b> and <b>JubeJam NFC</b>. Both apps and functionality features are created 
        end-to-end by me:
        <br />1. product design
        <br />2. UI UX
        <br />3. backend systems
        <br />4. testing and security
        <br />5. deployment
      </p>

      <div className={styles.actionRow}>
        <a className={styles.chip} href={`mailto:${PROFILE.email}`} title="Send email">
          <span className={styles.chipIcon} aria-hidden="true">✉</span>
          <span className={styles.chipText}>{PROFILE.email}</span>
          <span className={styles.chipHint}>Email</span>
        </a>

        <a className={styles.chip} href={`tel:${PROFILE.phone}`} title="Call phone">
          <span className={styles.chipIcon} aria-hidden="true">☎</span>
          <span className={styles.chipText}>{PROFILE.phone}</span>
          <span className={styles.chipHint}>Call</span>
        </a>

        <button
          type="button"
          className={styles.chipButton}
          onClick={() => copy(PROFILE.email, "email")}
          title="Copy email"
        >
          <span className={styles.chipIcon} aria-hidden="true">⧉</span>
          <span className={styles.chipText}>
            {copied === "email" ? "Copied email" : "Copy email"}
          </span>
        </button>

        <button
          type="button"
          className={styles.chipButton}
          onClick={() => copy(PROFILE.phone, "phone")}
          title="Copy phone"
        >
          <span className={styles.chipIcon} aria-hidden="true">⧉</span>
          <span className={styles.chipText}>
            {copied === "phone" ? "Copied phone" : "Copy phone"}
          </span>
        </button>
      </div>

      <div className={styles.proofStrip}>
        <span className={styles.proofBadge}>Built Solo</span>
        <span className={styles.proofText}>
          Full ownership: UI - backend - database - security - deployment
        </span>
      </div>
    </header>
  );
}

function ProjectShowcase({ project }: { project: Project }) {
  const { ref, inView } = useInViewOnce({ rootMargin: "-12% 0px -12% 0px" });

  return (
    <section
      ref={ref}
      className={[styles.section, inView ? styles.revealIn : styles.revealStart].join(" ")}
    >
      <div className={styles.projectHead}>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <p className={styles.projectSubtitle}>{project.subtitle}</p>
      </div>

      <div className={styles.mediaCard}>
        <div className={styles.mediaTop}>
          <span className={styles.mediaDot} />
          <span className={styles.mediaDot} />
          <span className={styles.mediaDot} />
          <span className={styles.mediaLabel}>DEMO VIDEO</span>
        </div>

        <div className={styles.videoWrap}>
          <video className={styles.video} src={project.videoSrc} controls playsInline preload="metadata" />
          <div className={styles.videoHint}>
            Replace later: <span className={styles.mono}>{project.videoSrc}</span>
          </div>
        </div>
      </div>

      <div className={styles.projectBody}>
        <p className={styles.buildClaim}>{project.buildClaim}</p>

        <ul className={styles.highlights}>
          {project.highlights.map((h) => (
            <li key={h} className={styles.highlightItem}>
              <span className={styles.bulletDot} aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.shotsGrid}>
        {project.screenshots.map((img) => (
          <div key={img.src} className={styles.shot}>
            <Image
              src={img.src}
              alt={img.alt}
              width={720}
              height={1280}
              className={styles.shotImg}
            />
            <div className={styles.shotOverlay} />
          </div>
        ))}
      </div>

      <p className={styles.helperLine}>
        Drop PNGs into <span className={styles.mono}>/public/images</span> and videos into{" "}
        <span className={styles.mono}>/public/videos</span>.
      </p>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerRow}>
        <div className={styles.footerLeft}>
          <span className={styles.footerLabel}>Contact</span>
          <span className={styles.footerSep}>-</span>
          <a className={styles.footerLink} href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <span className={styles.footerSep}>-</span>
          <a className={styles.footerLink} href={`tel:${PROFILE.phone}`}>
            {PROFILE.phone}
          </a>
        </div>

        <div className={styles.footerRight}>
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
      </div>
    </footer>
  );
}

function useInViewOnce({ rootMargin = "0px" }: { rootMargin?: string } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
