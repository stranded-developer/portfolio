export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Header */}
        <header className="border-b border-zinc-800 pb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your Name
          </h1>
          <p className="mt-2 text-zinc-300">
            Graduate Software Engineer · Full-Stack / Mobile Developer
          </p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-300">
            <a className="underline decoration-zinc-700 hover:text-white" href="mailto:you@email.com">you@email.com</a>
            <span>·</span>
            <a className="underline decoration-zinc-700 hover:text-white" href="https://www.linkedin.com/in/yourhandle" target="_blank">LinkedIn</a>
            <span>·</span>
            <a className="underline decoration-zinc-700 hover:text-white" href="https://github.com/yourhandle" target="_blank">GitHub</a>
          </div>

          <p className="mt-6 max-w-2xl text-zinc-200 leading-relaxed">
            I build production-grade mobile and web apps end-to-end: UI, APIs, databases,
            auth, and deployment. Recent work includes Firebase-based platforms, admin portals,
            and public web experiences optimized for performance and reliability.
          </p>
        </header>

        {/* Sections */}
        <Section title="Skills">
          <ul className="grid gap-2 sm:grid-cols-2 text-zinc-200">
            <li><b>Languages:</b> Swift, Kotlin, TypeScript, JavaScript, Python</li>
            <li><b>Mobile:</b> SwiftUI, Jetpack Compose</li>
            <li><b>Web:</b> Next.js, React, Tailwind CSS</li>
            <li><b>Backend:</b> Firebase (Auth/Firestore/Storage), Node.js</li>
            <li><b>DevOps:</b> Vercel, GitHub, CI basics</li>
            <li><b>Practices:</b> REST, security rules, testing mindset, clean architecture</li>
          </ul>
        </Section>

        <Section title="Projects">
          <Project
            name="Eatzy — Mobile + Web Platform"
            bullets={[
              "Built full-stack app workflows: authentication, Firestore data modeling, and admin tooling.",
              "Implemented promotions and menu management features with secure access controls.",
              "Optimized UX and performance for real-world usage (fast loads, clean UI, predictable state).",
            ]}
            links={[
              { label: "GitHub", href: "https://github.com/yourhandle/yourrepo" },
              { label: "Live", href: "https://yourliveurl.com" },
            ]}
          />
          <Project
            name="JubeJam — NFC Identity Platform"
            bullets={[
              "Designed public watch pages and admin portal with Firebase-backed data + Cloud Functions.",
              "Implemented secure server-side endpoints and hashed user-key linking for privacy.",
              "Deployed public web experience on Vercel with production-grade routing.",
            ]}
            links={[
              { label: "Live", href: "https://yourliveurl.com" },
            ]}
          />
        </Section>

        <Section title="Experience">
          <div className="space-y-6">
            <Role
              title="Business NSW Analyst"
              meta="Jan 2024 – Dec 2025"
              bullets={[
                "Delivered analysis and reporting with a focus on stakeholder clarity and measurable outcomes.",
                "Worked cross-functionally to support data-driven planning and decision-making.",
              ]}
            />
            <Role
              title="Full-Stack Mobile App Developer — Independent"
              meta="Dec 2024 – Present"
              bullets={[
                "Built and shipped end-to-end app features across mobile + web.",
                "Implemented Firebase Auth, Firestore schemas, Storage uploads, and secure Cloud Functions.",
              ]}
            />
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-2 text-zinc-200">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="font-medium">Your University — Your Degree</div>
              <div className="text-sm text-zinc-300">WAM: 81</div>
            </div>
            <p className="text-zinc-300">
              Coursework: Data Structures & Algorithms, Databases, Software Engineering, Networks.
              Built multiple production-style projects with modern mobile and web stacks.
            </p>
          </div>
        </Section>

        <Section title="Contact">
          <p className="text-zinc-200">
            Email me at{" "}
            <a className="underline decoration-zinc-700 hover:text-white" href="mailto:you@email.com">
              you@email.com
            </a>{" "}
            or message me on{" "}
            <a className="underline decoration-zinc-700 hover:text-white" href="https://www.linkedin.com/in/yourhandle" target="_blank">
              LinkedIn
            </a>.
          </p>
        </Section>

        <footer className="mt-14 border-t border-zinc-800 pt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} Your Name. Built with Next.js + Vercel.
        </footer>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Project({
  name,
  bullets,
  links,
}: {
  name: string;
  bullets: string[];
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-medium">{name}</div>
        {links?.length ? (
          <div className="flex gap-3 text-sm text-zinc-300">
            {links.map((l) => (
              <a key={l.href} className="underline decoration-zinc-700 hover:text-white" href={l.href} target="_blank">
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-200">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Role({
  title,
  meta,
  bullets,
}: {
  title: string;
  meta: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-zinc-400">{meta}</div>
      </div>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-200">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
