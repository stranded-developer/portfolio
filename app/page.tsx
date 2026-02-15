"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type MediaItem = { src: string; alt: string };

type ScreenshotGroup = {
  label: string;
  badge?: string;
  items: MediaItem[];
};

type Project = {
  title: string;
  subtitle: string;
  buildClaim: string;
  highlights: string[];
  videoSrc: string;

  // JubeJam uses this (unchanged)
  screenshots?: MediaItem[];

  // Eatzy uses this
  screenshotGroups?: ScreenshotGroup[];
};

const PROFILE = {
  name: "Wilson Husen",
  age: 23,
  location: "Jakarta",
  role: "Full-Stack & Mobile Developer",
  email: "wilsonhusen78@gmail.com",
  phone: "+61448408585",
};

type LightboxState =
  | null
  | {
      title: string; // "Customer App" / "Merchant App" (or project title)
      items: MediaItem[];
      index: number;
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
        videoSrc: "/videos/eatzy-demo-fixed.mp4",
        screenshotGroups: [
          {
            label: "Customer App",
            badge: "User",
            items: [
              { src: "/images/eatzy-user-1.png", alt: "Eatzy Customer App screenshot" },
              { src: "/images/eatzy-user-2.png", alt: "Eatzy Customer App screenshot" },
              { src: "/images/eatzy-user-3.png", alt: "Eatzy Customer App screenshot" },
              { src: "/images/eatzy-user-4.png", alt: "Eatzy Customer App screenshot" },
            ],
          },
          {
            label: "Merchant App",
            badge: "Merchant",
            items: [
              { src: "/images/eatzy-merchant-1.png", alt: "Eatzy Merchant App screenshot" },
              { src: "/images/eatzy-merchant-2.png", alt: "Eatzy Merchant App screenshot" },
              { src: "/images/eatzy-merchant-3.png", alt: "Eatzy Merchant App screenshot" },
              { src: "/images/eatzy-merchant-4.png", alt: "Eatzy Merchant App screenshot" },
            ],
          },
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
          "Developed using flutter cross platform framework",
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

  const [lightbox, setLightbox] = useState<LightboxState>(null);

  function openLightbox(title: string, items: MediaItem[], index: number) {
    setLightbox({ title, items, index });
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function next() {
    setLightbox((cur) => {
      if (!cur) return cur;
      return { ...cur, index: (cur.index + 1) % cur.items.length };
    });
  }

  function prev() {
    setLightbox((cur) => {
      if (!cur) return cur;
      return { ...cur, index: (cur.index - 1 + cur.items.length) % cur.items.length };
    });
  }

  // Lock background scroll + keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  return (
    <main className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.shell}>
        <Header />

        <div className={styles.projectsWrap}>
          {projects.map((p, i) => (
            <React.Fragment key={p.title}>
              {i !== 0 ? <div className={styles.projectDivider} aria-hidden="true" /> : null}
              <ProjectShowcase project={p} onOpenLightbox={openLightbox} />
            </React.Fragment>
          ))}
        </div>


        <ContactFooter />
      </div>

      {/* ✅ Fullscreen lightbox */}
      {lightbox ? (
        <Lightbox
          title={lightbox.title}
          items={lightbox.items}
          index={lightbox.index}
          onClose={closeLightbox}
          onNext={next}
          onPrev={prev}
          onSetIndex={(i) => setLightbox((cur) => (cur ? { ...cur, index: i } : cur))}
        />
      ) : null}
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
        This page features 2 flagship builds — <b>Eatzy</b> and <b>JubeJam NFC</b>. Both apps and functionality
        features are created end-to-end by me:
        <br />
        1. product design
        <br />
        2. UI UX
        <br />
        3. backend systems
        <br />
        4. testing and security
        <br />
        5. deployment
      </p>

      <div className={styles.actionRow}>
        <a className={styles.chip} href={`mailto:${PROFILE.email}`} title="Send email">
          <span className={styles.chipIcon} aria-hidden="true">
            ✉
          </span>
          <span className={styles.chipText}>{PROFILE.email}</span>
          <span className={styles.chipHint}>Email</span>
        </a>

        <a className={styles.chip} href={`tel:${PROFILE.phone}`} title="Call phone">
          <span className={styles.chipIcon} aria-hidden="true">
            ☎
          </span>
          <span className={styles.chipText}>{PROFILE.phone}</span>
          <span className={styles.chipHint}>Call</span>
        </a>

        <button type="button" className={styles.chipButton} onClick={() => copy(PROFILE.email, "email")} title="Copy email">
          <span className={styles.chipIcon} aria-hidden="true">
            ⧉
          </span>
          <span className={styles.chipText}>{copied === "email" ? "Copied email" : "Copy email"}</span>
        </button>

        <button type="button" className={styles.chipButton} onClick={() => copy(PROFILE.phone, "phone")} title="Copy phone">
          <span className={styles.chipIcon} aria-hidden="true">
            ⧉
          </span>
          <span className={styles.chipText}>{copied === "phone" ? "Copied phone" : "Copy phone"}</span>
        </button>
      </div>

      <div className={styles.proofStrip}>
        <span className={styles.proofBadge}>Built Solo</span>
        <span className={styles.proofText}>Full ownership: UI - backend - database - security - deployment</span>
      </div>
    </header>
  );
}

function ProjectShowcase({
  project,
  onOpenLightbox,
}: {
  project: Project;
  onOpenLightbox: (title: string, items: MediaItem[], index: number) => void;
}) {
  const { ref, inView } = useInViewOnce({ rootMargin: "-12% 0px -12% 0px" });

  return (
    <section ref={ref} className={[styles.section, inView ? styles.revealIn : styles.revealStart].join(" ")}>
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

      {/* ✅ Eatzy grouped screenshots */}
      {project.screenshotGroups?.length ? (
        <div className={styles.groupWrap}>
          {project.screenshotGroups.map((group) => (
            <div key={group.label} className={styles.groupBlock}>
              <div className={styles.groupHeader}>
                <div className={styles.groupTitle}>{group.label}</div>
                {group.badge ? <div className={styles.groupBadge}>{group.badge}</div> : null}
              </div>

              <div className={styles.shotsGrid6}>
                {group.items.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    className={styles.shotButton}
                    onClick={() => onOpenLightbox(group.label, group.items, idx)}
                    aria-label={`Open ${group.label} screenshot ${idx + 1}`}
                  >
                    <div className={styles.shot}>
                      <Image src={img.src} alt={img.alt} width={720} height={1280} className={styles.shotImg} />
                      <div className={styles.shotOverlay} />
                      <div className={styles.tapHint}>Tap</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // ✅ JubeJam unchanged layout, but still clickable (same fullscreen UX)
        <div className={styles.shotsGrid}>
          {project.screenshots?.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              className={styles.shotButton}
              onClick={() => onOpenLightbox(project.title, project.screenshots ?? [], idx)}
              aria-label={`Open ${project.title} screenshot ${idx + 1}`}
            >
              <div className={styles.shot}>
                <Image src={img.src} alt={img.alt} width={720} height={1280} className={styles.shotImg} />
                <div className={styles.shotOverlay} />
                <div className={styles.tapHint}>Tap</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function Lightbox({
  title,
  items,
  index,
  onClose,
  onNext,
  onPrev,
  onSetIndex,
}: {
  title: string;
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSetIndex: (i: number) => void;
}) {
  const startX = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const dragging = useRef(false);

  function onTouchStart(e: React.TouchEvent) {
    if (!e.touches[0]) return;
    dragging.current = true;
    startX.current = e.touches[0].clientX;
    lastX.current = e.touches[0].clientX;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!dragging.current || !e.touches[0]) return;
    lastX.current = e.touches[0].clientX;
  }

  function onTouchEnd() {
    if (!dragging.current) return;
    dragging.current = false;

    const sx = startX.current;
    const lx = lastX.current;
    startX.current = null;
    lastX.current = null;

    if (sx == null || lx == null) return;
    const dx = lx - sx;

    // swipe threshold
    if (Math.abs(dx) < 42) return;

    if (dx < 0) onNext();
    else onPrev();
  }

  const active = items[index];

  return (
    <div className={styles.lightboxBackdrop} role="dialog" aria-modal="true" aria-label={`${title} screenshots`}>
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close fullscreen">
        ✕
      </button>

      <div className={styles.lightboxTop}>
        <div className={styles.lightboxTitle}>{title}</div>
        <div className={styles.lightboxCount}>
          {index + 1} / {items.length}
        </div>
      </div>

      <button type="button" className={styles.lightboxNavLeft} onClick={onPrev} aria-label="Previous image">
        ‹
      </button>
      <button type="button" className={styles.lightboxNavRight} onClick={onNext} aria-label="Next image">
        ›
      </button>

      <div
        className={styles.lightboxStage}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.lightboxFrame}>
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="100vw"
            className={styles.lightboxImg}
            priority
          />
        </div>
      </div>

      <div className={styles.lightboxThumbs} aria-label="Thumbnails">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            className={[styles.lightboxThumb, i === index ? styles.lightboxThumbActive : ""].join(" ")}
            onClick={() => onSetIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          >
            <Image src={it.src} alt="" width={120} height={200} className={styles.lightboxThumbImg} />
          </button>
        ))}
      </div>
    </div>
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
