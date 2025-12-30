// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import p1 from "./assets/carehub_p1.png";
import p2 from "./assets/carehub_p2.png";
import p3 from "./assets/carehub_p3.png";
import p4 from "./assets/carehub_p4.png";
import p5 from "./assets/carehub_p5.png";

type Theme = "forest" | "ivory";

type Product = {
  name: string;
  tagline: string;
  img: string;
  chips: string[];
  line?: string;
};

const cn = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

const products: Product[] = [
  {
    name: "Moringa Powder",
    tagline: "Small leaf, Big relief",
    img: p2,
    chips: ["Rich in Antioxidants", "Boosts Energy", "Nutrient Dense", "Supports Immunity"],
  },
  {
    name: "Pureleaf Care Tulsi & Guava Powder",
    tagline: "Green and True, Care for You",
    img: p3,
    chips: ["Enhanced Immunity", "Digestive Health", "Stress Management", "Blood Sugar Control"],
    line: "100% Herbal • No Chemicals • Vegan Friendly",
  },
  {
    name: "Neem Powder",
    tagline: "One Neem, Many Dream",
    img: p4,
    chips: [
      "Helps promote clear skin",
      "Supports healthy scalp & hair",
      "Traditional Ayurvedic wellness",
      "Pure & natural formulation",
    ],
    line: "100% Natural • Made in India • Eco-Friendly Packaging",
  },
  {
    name: "Orange Peel Powder",
    tagline: "Zest so fine, Orange care Shine",
    img: p5,
    chips: ["Brighten Skin Tone", "Natural Exfoliator", "Boost Radiance"],
  },
];

const trust = [
  { t: "100% Natural", d: "Pure & herbal" },
  { t: "No Chemicals", d: "Clean choices" },
  { t: "Vegan Friendly", d: "Plant-based" },
  { t: "Eco-Friendly", d: "Packaging focus" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function Chip({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]">
      {text}
    </span>
  );
}

function PrimaryBtn(props: React.ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",
        "bg-[color:var(--acc)] text-[#1B1206] shadow-[0_18px_55px_rgba(183,139,53,0.25)]",
        "hover:brightness-95 active:scale-[0.99]",
        props.className
      )}
    />
  );
}

function GhostBtn(props: React.ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm",
        "border border-[color:var(--bd)] bg-[color:var(--card)] text-[color:var(--fg)]",
        "hover:bg-[color:var(--card2)] active:scale-[0.99]",
        props.className
      )}
    />
  );
}

export default function App() {
  const reduce = useReducedMotion();

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("carehub_theme") as Theme | null;
    return saved ?? "ivory";
  });
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("carehub_theme", theme);
  }, [theme]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenu(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const bgGlow = useMemo(
    () =>
      "radial-gradient(1200px circle at 18% 18%, rgba(183,139,53,.22), transparent 55%)," +
      "radial-gradient(900px circle at 82% 28%, rgba(28,124,84,.18), transparent 55%)," +
      "radial-gradient(900px circle at 52% 88%, rgba(183,139,53,.14), transparent 58%)",
    []
  );

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--fg)]">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: bgGlow }} />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(183,139,53,.16), rgba(28,124,84,.12), rgba(183,139,53,.16))",
            backgroundSize: "200% 200%",
            animation: reduce ? undefined : "gradientMove 14s ease infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"220\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"220\" height=\"220\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="sticky top-0 z-50 border-b border-[color:var(--bd)] bg-[color:var(--bg)]/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--acc2)]" />
            <span className="text-sm font-semibold tracking-[0.18em]">CAREHUB</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-[color:var(--muted)] md:flex">
            <a className="hover:text-[color:var(--fg)]" href="#products">
              Products
            </a>
            <a className="hover:text-[color:var(--fg)]" href="#why">
              Why
            </a>
            <a className="hover:text-[color:var(--fg)]" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((t) => (t === "ivory" ? "forest" : "ivory"))}
              className="hidden rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] px-3 py-2 text-xs text-[color:var(--muted)] hover:bg-[color:var(--card2)] md:inline-flex"
            >
              Theme: {theme === "ivory" ? "Ivory" : "Forest"}
            </button>

            <a
              href="#contact"
              className="hidden rounded-full bg-[color:var(--acc)] px-4 py-2 text-sm font-semibold text-[#1B1206] hover:brightness-95 md:inline-flex"
            >
              Get in touch
            </a>

            <button
              onClick={() => setMenu(true)}
              className="inline-flex rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] p-2 md:hidden"
              aria-label="Open menu"
            >
              <div className="grid gap-1">
                <span className="h-0.5 w-5 bg-[color:var(--fg)]/80" />
                <span className="h-0.5 w-5 bg-[color:var(--fg)]/60" />
                <span className="h-0.5 w-5 bg-[color:var(--fg)]/80" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenu(false)}
          >
            <motion.div
              className="absolute right-3 top-3 w-[92%] max-w-sm rounded-[1.6rem] border border-[color:var(--bd)] bg-[color:var(--card2)] p-4 shadow-[var(--shadow)]"
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold tracking-[0.18em]">CAREHUB</div>
                <button
                  onClick={() => setMenu(false)}
                  className="rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 grid gap-2 text-sm">
                <a
                  className="rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] px-4 py-3"
                  href="#products"
                  onClick={() => setMenu(false)}
                >
                  Products
                </a>
                <a
                  className="rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] px-4 py-3"
                  href="#why"
                  onClick={() => setMenu(false)}
                >
                  Why
                </a>
                <a
                  className="rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] px-4 py-3"
                  href="#contact"
                  onClick={() => setMenu(false)}
                >
                  Contact
                </a>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setTheme((t) => (t === "ivory" ? "forest" : "ivory"))}
                  className="flex-1 rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] px-4 py-3 text-xs text-[color:var(--muted)]"
                >
                  Switch Theme
                </button>
                <a
                  href="#contact"
                  onClick={() => setMenu(false)}
                  className="flex-1 rounded-2xl bg-[color:var(--acc)] px-4 py-3 text-center text-xs font-semibold text-[#1B1206]"
                >
                  Get in touch
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO (UNCHANGED) */}
      <section id="top" className="mx-auto max-w-6xl px-4 pt-10 md:pt-14 scroll-mt-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--acc2)]" />
              Premium Herbal Powders for Natural Beauty & Wellness
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.65, delay: 0.06 }}
              className="mt-4 text-4xl font-semibold leading-tight md:text-5xl"
            >
              From Skin to Hair,{" "}
              <span
                className="bg-gradient-to-r from-[color:var(--acc)] via-[#F3E2B7] to-[color:var(--acc2)] bg-[length:200%_200%] bg-clip-text text-transparent"
                style={{ animation: reduce ? undefined : "gradientMove 10s ease infinite" }}
              >
                We Truly Care
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--muted)] md:text-base"
            >
              Clean, herbal powders inspired by your posters — Moringa, Tulsi & Guava, Neem, and Orange Peel.
              Simple, premium, and made for daily rituals.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <PrimaryBtn href="#products">Explore Products</PrimaryBtn>
              <GhostBtn href="#contact">Contact</GhostBtn>
            </motion.div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trust.map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.05 * i }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-xs text-[color:var(--muted)]">{x.d}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(600px circle at 30% 20%, rgba(183,139,53,.25), transparent 55%), radial-gradient(600px circle at 70% 80%, rgba(28,124,84,.22), transparent 55%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="glass-strong overflow-hidden rounded-[2.4rem] shadow-[var(--shadow)]"
            >
              <div className="relative">
                <img
                  src={p1}
                  alt="CareHub poster"
                  className="h-[420px] w-full object-cover"
                  draggable={false}
                  style={{ animation: reduce ? undefined : "floaty 7s ease-in-out infinite" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold tracking-wide">CAREHUB</div>
                    <div className="text-xs text-[color:var(--muted)]">Premium Herbal Powders</div>
                  </div>
                  <span className="rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]">
                    Natural • Pure • Herbal
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3">
                {[p2, p4, p5].map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={reduce ? undefined : { y: -3 }}
                    className="overflow-hidden rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)]"
                  >
                    <img src={img} alt="CareHub product" className="h-[110px] w-full object-cover" draggable={false} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS (FIXED: contain, no crop) */}
      <section id="products" className="mx-auto mt-14 max-w-6xl px-4 md:mt-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold md:text-3xl">Herbal Powders Range</h2>
          <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]">
            Product posters are shown fully (no over-fit/crop) inside clean frames.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="glass overflow-hidden rounded-[2.4rem] shadow-[var(--shadow)]"
            >
              <div className="relative">
                {/* frame */}
                <div className="bg-[color:var(--card2)] p-3">
                  <motion.img
                    src={p.img}
                    alt={p.name}
                    className="h-[320px] w-full object-contain sm:h-[360px] md:h-[400px]"
                    whileHover={reduce ? undefined : { scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                    draggable={false}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="text-sm text-[color:var(--muted)]">{p.tagline}</div>
                    </div>
                    <span className="rounded-full border border-[color:var(--bd)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]">
                      CareHub
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <Chip key={c} text={c} />
                  ))}
                </div>

                {p.line ? (
                  <div className="mt-4 rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] p-4 text-xs text-[color:var(--muted)]">
                    {p.line}
                  </div>
                ) : null}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <a
                    href="#contact"
                    className="rounded-full bg-[color:var(--acc)] px-4 py-2 text-xs font-semibold text-[#1B1206] hover:brightness-95"
                  >
                    Ask for details
                  </a>
                  <span className="text-xs text-[color:var(--muted)]">Natural Beauty & Wellness</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* WHY (FIXED: contain, no crop) */}
      <section id="why" className="mx-auto mt-14 max-w-6xl px-4 md:mt-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[2.6rem] p-6 md:p-10 shadow-[var(--shadow)]"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Green and True, Care for You</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                Pure herbal powders, no chemicals, vegan friendly, and eco-friendly packaging — simple, premium, and clean.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "100% Natural • Pure • Herbal",
                  "No Chemicals",
                  "Vegan Friendly",
                  "Eco-Friendly Packaging",
                  "Made in India",
                  "From Skin to Hair, We Truly Care",
                ].map((t) => (
                  <Chip key={t} text={t} />
                ))}
              </div>

              <div className="mt-6">
                <PrimaryBtn href="#contact" className="w-full sm:w-auto">
                  Partner with CareHub
                </PrimaryBtn>
              </div>
            </div>

            <div className="glass-strong overflow-hidden rounded-[2.4rem]">
              <div className="bg-[color:var(--card2)] p-3">
                <img
                  src={p3}
                  alt="CareHub poster"
                  className="h-[340px] w-full object-contain sm:h-[420px] md:h-[460px]"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONTACT (FIXED: contain, no crop) */}
      <section id="contact" className="mx-auto mt-14 max-w-6xl px-4 pb-16 md:mt-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[2.6rem] p-6 md:p-10 shadow-[var(--shadow)]"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Contact CareHub</h3>
              <p className="mt-3 text-sm text-[color:var(--muted)]">Website and email as shown on the posters:</p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] p-4">
                  <span className="text-[color:var(--muted)]">Website</span>
                  <span className="font-semibold">www.carehub.com</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[color:var(--bd)] bg-[color:var(--card)] p-4">
                  <span className="text-[color:var(--muted)]">Email</span>
                  <span className="font-semibold">carehub@gmail.com</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-[color:var(--muted)]">
                Tip: switch theme from the navbar for a different brand vibe.
              </div>
            </div>

            <div className="glass-strong overflow-hidden rounded-[2.4rem]">
              <div className="bg-[color:var(--card2)] p-3">
                <img
                  src={p4}
                  alt="Neem poster"
                  className="h-[340px] w-full object-contain sm:h-[420px] md:h-[460px]"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[color:var(--bd)] pt-6 text-center text-xs text-[color:var(--muted)]">
            © {new Date().getFullYear()} CareHub • Premium Herbal Powders for Natural Beauty & Wellness
          </div>
        </motion.div>
      </section>
    </div>
  );
}
