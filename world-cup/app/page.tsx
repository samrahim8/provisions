"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TEAMS, POSITIONS, type Team, type Position } from "@/lib/teams";
import { flagUrl } from "@/lib/flagIso";

type Step = "intro" | "team" | "name" | "position" | "number" | "rating" | "photo" | "result";
type Rarity = "standard" | "silver" | "gold" | "platinum" | "holo";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (p: string) => `${BASE_PATH}${p}`;

// Drop rates: standard 78% / silver 12% / gold 6% / platinum 3% / holo 1%
function rollRarity(): Rarity {
  const r = Math.random();
  if (r < 0.01) return "holo";
  if (r < 0.04) return "platinum";
  if (r < 0.10) return "gold";
  if (r < 0.22) return "silver";
  return "standard";
}

const RARITY_META: Record<Rarity, { label: string; odds: string; tint: string }> = {
  standard: { label: "STANDARD", odds: "", tint: "#2C2118" },
  silver:   { label: "SILVER FOIL", odds: "1 IN 8",  tint: "#8C97A3" },
  gold:     { label: "GOLD",        odds: "1 IN 17", tint: "#C8932E" },
  platinum: { label: "PLATINUM",    odds: "1 IN 33", tint: "#9BA4AE" },
  holo:     { label: "HOLOGRAPHIC", odds: "1 IN 100", tint: "#C8462E" },
};

export default function Page() {
  const [step, setStep] = useState<Step>("intro");
  const [team, setTeam] = useState<Team | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState<Position>("FWD");
  const [number, setNumber] = useState("10");
  const [rating, setRating] = useState("92");
  const [generating, setGenerating] = useState(false);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [rarity, setRarity] = useState<Rarity>("standard");

  async function generate() {
    if (!team) return;
    setGenerating(true);
    try {
      const rolled = rollRarity();
      const res = await fetch(asset("/api/card"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamCode: team.code,
          photo, // may be null; API falls back to default silhouette
          name: name || "Your Name",
          position,
          number,
          rating,
          rarity: rolled,
        }),
      });
      if (!res.ok) throw new Error("Card render failed");
      const blob = await res.blob();
      // Hold the press a beat longer on rare pulls so the reveal has weight
      if (rolled !== "standard") {
        await new Promise((r) => setTimeout(r, rolled === "holo" ? 1200 : 700));
      }
      setRarity(rolled);
      setCardUrl(URL.createObjectURL(blob));
      setStep("result");
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <main className="min-h-screen relative grain">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

      <Nav step={step} />

      <section className={`relative max-w-[1100px] mx-auto px-5 sm:px-8 ${step === "result" ? "min-h-[calc(100vh-72px)] flex flex-col justify-center py-4" : "py-0"}`}>
        {step === "intro" && (
          <IntroStep onStart={() => setStep("team")} />
        )}
        {step === "team" && (
          <TeamPicker
            onBack={() => setStep("intro")}
            onPick={(t) => {
              setTeam(t);
              setStep("name");
            }}
          />
        )}
        {step === "name" && team && (
          <NameStep
            team={team}
            name={name}
            setName={setName}
            onBack={() => setStep("team")}
            onNext={() => setStep("position")}
          />
        )}
        {step === "position" && team && (
          <PositionStep
            team={team}
            position={position}
            setPosition={setPosition}
            onBack={() => setStep("name")}
            onNext={() => setStep("number")}
          />
        )}
        {step === "number" && team && (
          <NumberStep
            team={team}
            number={number}
            setNumber={setNumber}
            onBack={() => setStep("position")}
            onNext={() => setStep("rating")}
          />
        )}
        {step === "rating" && team && (
          <RatingStep
            team={team}
            rating={rating}
            setRating={setRating}
            onBack={() => setStep("number")}
            onNext={() => setStep("photo")}
          />
        )}
        {step === "photo" && team && (
          <PhotoStep
            team={team}
            onBack={() => setStep("rating")}
            onPhoto={(src) => {
              setPhoto(src);
              generate();
            }}
            onSkip={() => {
              setPhoto(null);
              generate();
            }}
          />
        )}
        {step === "result" && cardUrl && team && (
          <ResultStep
            cardUrl={cardUrl}
            name={name || "Your Name"}
            team={team}
            rarity={rarity}
            onRestart={() => {
              setStep("team");
              setTeam(null);
              setPhoto(null);
              setCardUrl(null);
              setRarity("standard");
            }}
          />
        )}
      </section>

      <Footer />

      {generating && team && <PressingOverlay team={team} />}
    </main>
  );
}

function PressingOverlay({ team }: { team: Team }) {
  const STAGES = [
    "Loading the press",
    "Setting the kit",
    "Inking your photo",
    "Stamping your number",
    "Almost there",
  ];
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStageIdx((i) => (i + 1) % STAGES.length);
    }, 700);
    return () => clearInterval(id);
  }, [STAGES.length]);

  const accent = team.secondary || team.accent || team.primary;
  const subtextColor = pickContrast(team);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{
        background: "rgba(245, 241, 235, 0.94)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center" style={{ gap: 28 }}>
        {/* Card silhouette being pressed */}
        <div className="press-card" style={{ ["--accent" as string]: accent, ["--primary" as string]: team.primary }}>
          <div className="press-card-inner">
            <div className="press-tape" />
            <div className="press-photo">
              <div className="press-photo-shimmer" />
            </div>
            <div className="press-name" />
            <div className="press-stats">
              <div /><div /><div />
            </div>
          </div>
          <div className="press-bar" aria-hidden="true" />
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center" }}>
          <h2
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em",
              color: "#2C2118",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Pressing your card.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: subtextColor,
              marginTop: 12,
              minHeight: 16,
              transition: "color 0.4s ease",
            }}
          >
            {STAGES[stageIdx]}…
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: 240,
            height: 2,
            background: "rgba(0,0,0,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: accent,
              animation: "press-progress 1.4s ease-in-out infinite",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      <style>{`
        .press-card {
          position: relative;
          width: 220px;
          height: 308px;
          background: var(--primary, #f0e9dc);
          border: 2.5px solid #2C2118;
          box-shadow: 0 24px 56px rgba(0,0,0,0.18), inset 0 0 0 6px var(--primary, #f0e9dc);
          padding: 12px;
          overflow: hidden;
        }
        .press-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f5efe0;
          padding: 14px 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .press-tape {
          height: 8px;
          background: var(--accent, #2C2118);
          opacity: 0.85;
        }
        .press-photo {
          flex: 1;
          background: rgba(0,0,0,0.08);
          border: 1.5px solid var(--accent, #2C2118);
          position: relative;
          overflow: hidden;
        }
        .press-photo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.5) 50%,
            transparent 100%);
          transform: translateX(-100%);
          animation: press-shimmer 1.6s ease-in-out infinite;
        }
        .press-name {
          height: 14px;
          background: rgba(0,0,0,0.12);
        }
        .press-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4px;
          height: 32px;
        }
        .press-stats > div {
          background: rgba(0,0,0,0.08);
        }
        .press-stats > div:nth-child(2) {
          background: var(--accent, #2C2118);
          opacity: 0.8;
        }
        .press-bar {
          position: absolute;
          left: -8px;
          right: -8px;
          height: 14px;
          background: #2C2118;
          box-shadow: 0 2px 0 rgba(0,0,0,0.3);
          animation: press-bar 2.1s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes press-bar {
          0%, 100% { top: -20px; opacity: 0; }
          15%, 85% { opacity: 1; }
          50% { top: calc(100% - 4px); }
        }
        @keyframes press-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes press-progress {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.01% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
}

function Nav({ step }: { step: Step }) {
  const labels: { id: Step; label: string }[] = [
    { id: "team", label: "Team" },
    { id: "name", label: "Name" },
    { id: "position", label: "Pos" },
    { id: "number", label: "No." },
    { id: "rating", label: "Rate" },
    { id: "photo", label: "Photo" },
    { id: "result", label: "Card" },
  ];
  const idx = labels.findIndex((l) => l.id === step);
  const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <header className="sticky top-0 z-50 bg-parchment-elevated border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 min-h-[72px] flex items-center justify-between gap-3">
          <a
            href="https://provisions.soccer"
            className="flex items-center gap-3 group flex-shrink-0"
            aria-label="Provisions"
          >
            <img
              src={`${BASE}/provisions-mark.png`}
              alt="Provisions"
              width={22}
              height={22}
              className="object-contain"
            />
            <strong className="font-display font-extrabold uppercase tracking-[0.18em] text-[14px] text-leather-mid">
              Provisions
            </strong>
          </a>
          <ol className="hidden lg:flex items-center gap-4">
            {labels.map((l, i) => (
              <li key={l.id} className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 grid place-items-center text-[10px] font-display font-bold rounded-sm transition-colors ${
                    i <= idx ? "bg-terracotta text-white" : "bg-border text-text-soft"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`font-display font-bold uppercase tracking-label text-[11px] transition-colors ${
                    i <= idx ? "text-leather-mid" : "text-text-soft"
                  }`}
                >
                  {l.label}
                </span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="p-2 inline-flex items-center justify-center text-leather-mid hover:text-terracotta transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <line x1="4" y1="19" x2="20" y2="19" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hamburger overlay — matches the static pages' menu */}
      <div
        className="fixed inset-0 z-[300] flex-col overflow-y-auto px-8 py-7 sm:px-10 sm:py-8"
        style={{
          display: menuOpen ? "flex" : "none",
          background: "#2C2118",
          color: "#F5F1EB",
        }}
      >
        <div className="flex items-center justify-between mb-12">
          <a href="https://provisions.soccer" className="flex items-center gap-3 text-inherit">
            <img src={`${BASE}/provisions-mark.png`} alt="" width={22} height={22} className="object-contain" style={{ filter: "invert(1)" }} />
            <strong className="font-display font-extrabold uppercase tracking-[0.18em] text-[14px]">Provisions</strong>
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="p-2 inline-flex items-center justify-center"
            style={{ color: "inherit" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col mx-auto w-full max-w-[720px]">
          {[
            { href: "https://provisions.soccer", label: "Home", num: "01" },
            { href: "https://provisions.soccer/daily", label: "The Daily", num: "02" },
            { href: "https://provisions.soccer/you-know-ball", label: "You Know Ball", num: "03" },
            { href: "https://provisions.soccer/kits", label: "The Kit Index", num: "04" },
            { href: "https://provisions.soccer/card", label: "The Player Card", num: "05", active: true },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between gap-4 py-[18px] font-display font-extrabold leading-none text-[clamp(28px,5.5vw,44px)] tracking-[-0.02em] transition-colors"
              style={{
                color: item.active ? "#E58769" : "#F5F1EB",
                borderBottom: "1px solid rgba(245,241,235,0.12)",
              }}
            >
              <span>{item.label}</span>
              <span className="font-mono font-semibold text-[12px] tracking-[0.18em]" style={{ color: "rgba(245,241,235,0.42)" }}>
                {item.num}
              </span>
            </a>
          ))}
        </nav>
        <div className="mx-auto w-full max-w-[720px] mt-9 pt-6 flex flex-col gap-3" style={{ borderTop: "1px solid rgba(245,241,235,0.12)" }}>
          <a href="https://provisions.work" className="font-display font-bold uppercase tracking-[0.22em] text-[11px]" style={{ color: "rgba(245,241,235,0.6)" }}>
            A Provisions joint →
          </a>
          <a href="mailto:sam@provisions.work?subject=World%20Cup" className="font-display font-bold uppercase tracking-[0.22em] text-[11px]" style={{ color: "rgba(245,241,235,0.6)" }}>
            Commission a piece →
          </a>
        </div>
      </div>
    </>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "32px 4px 80px",
        animation: "stepFadeIn 360ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      }}
    >
      <div className="grid lg:grid-cols-[1.25fr,1fr] gap-8 lg:gap-16 items-center">
        <div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--terracotta, #A0422A)",
              marginBottom: 14,
            }}
          >
            Provisions · Summer '26
          </div>
          <h1
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(38px, 7.4vw, 88px)",
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              color: "var(--leather-mid, #2C2118)",
              marginBottom: 20,
              maxWidth: "16ch",
            }}
          >
            The player card<br />for the rest of us.
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--text-soft, #6B6259)",
              maxWidth: "44ch",
              marginBottom: 28,
            }}
          >
            Seven quick steps. Pick a country, drop your name, grab your kit number. Walk away with a real-deal card you can share.
          </p>
          <button
            onClick={onStart}
            className="btn-primary inline-flex items-center gap-2"
            style={{ fontSize: 13 }}
          >
            Make my card
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 16,
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-soft, #6B6259)",
              opacity: 0.7,
            }}
          >
            <span>~ 60 seconds</span>
            <span>·</span>
            <span>Free for fans</span>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src={asset("/hero-card.png")}
              alt="Example player card"
              width={360}
              height={504}
              fetchPriority="high"
              className="rounded-md w-[220px] sm:w-[260px] lg:w-[360px] h-auto"
              style={{ boxShadow: "0 30px 60px -20px rgba(26,23,20,0.35), 0 8px 20px -8px rgba(26,23,20,0.18)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPicker({ onPick, onBack }: { onPick: (t: Team) => void; onBack: () => void }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      TEAMS.filter(
        (t) =>
          t.name.toLowerCase().includes(q.toLowerCase()) ||
          t.code.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );
  return (
    <div
      style={{
        padding: "32px 4px 80px",
        animation: "stepFadeIn 360ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      }}
    >
      <div
        className="flex items-center gap-3 mb-3"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--leather-mid, #2C2118)",
        }}
      >
        <span style={{ color: "var(--terracotta, #A0422A)" }}>01 / 07</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.8 }}>Your country</span>
      </div>
      <h1
        className="font-display"
        style={{
          fontWeight: 800,
          fontSize: "clamp(36px, 6.5vw, 72px)",
          lineHeight: 0.98,
          letterSpacing: "-0.03em",
          color: "var(--leather-mid, #2C2118)",
          marginBottom: 12,
          maxWidth: "18ch",
        }}
      >
        Pick your country.
      </h1>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          lineHeight: 1.5,
          color: "var(--text-soft, #6B6259)",
          marginBottom: 22,
          maxWidth: "44ch",
        }}
      >
        Any of the 48 in Summer '26. Search or scroll.
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search countries"
        className="input max-w-sm mb-6"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {filtered.map((t) => {
          const tilePrimary = isLightHex(t.primary) ? t.primary : t.primary;
          const onTile = isLightHex(t.primary) ? "#1a1a1a" : "#FFFFFF";
          const isLight = isLightHex(t.primary);
          const accent = pickContrast(t);
          const markSrc = isLight
            ? `${BASE_PATH}/provisions-mark.png`
            : `${BASE_PATH}/favicon-white.png`;
          return (
            <button
              key={t.code}
              onClick={() => onPick(t)}
              className="group relative rounded-card text-left overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-terracotta/40"
              style={{
                background: tilePrimary,
                color: onTile,
                border: `2px solid ${isLight ? "rgba(26,23,20,0.25)" : "rgba(255,255,255,0.18)"}`,
                boxShadow: "0 10px 28px rgba(26, 23, 20, 0.16), 0 2px 6px rgba(26, 23, 20, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 28px 56px rgba(26, 23, 20, 0.30), 0 6px 14px rgba(26, 23, 20, 0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 28px rgba(26, 23, 20, 0.16), 0 2px 6px rgba(26, 23, 20, 0.08)";
              }}
            >
              {/* Top accent stripe */}
              <div className="h-1 w-full" style={{ background: accent }} />
              <div className="px-5 pt-5 pb-6 relative">
                {/* Provisions mark, contrast-aware */}
                <img
                  src={markSrc}
                  alt=""
                  width={18}
                  height={18}
                  className="absolute top-4 right-4 opacity-70"
                  style={{ width: 18, height: 18 }}
                />
                {flagUrl(t.code) ? (
                  <div
                    className="mb-4 inline-block"
                    style={{
                      padding: 2,
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.22)",
                    }}
                  >
                    <img
                      src={flagUrl(t.code, 160)}
                      alt=""
                      width={48}
                      height={36}
                      loading="lazy"
                      className="block"
                      style={{ width: 48, height: 36, objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div
                    className="mb-4"
                    style={{
                      width: 52,
                      height: 40,
                      background: `linear-gradient(90deg, ${t.primary} 0 33%, ${t.secondary} 33% 66%, ${t.accent} 66% 100%)`,
                      border: "1px solid rgba(0,0,0,0.18)",
                    }}
                  />
                )}
                <div
                  className="font-display font-extrabold text-3xl tracking-[-0.02em] leading-none"
                  style={{ color: onTile }}
                >
                  {t.code}
                </div>
                <div
                  className="text-[0.95rem] leading-snug mt-3"
                  style={{ color: onTile, opacity: 0.92 }}
                >
                  {t.name}
                </div>
                <div
                  className="font-display font-bold uppercase tracking-[0.18em] text-[0.6rem] mt-5"
                  style={{ color: onTile, opacity: 0.65 }}
                >
                  {t.confederation}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <button onClick={onBack} className="text-text-soft hover:text-leather text-sm">
          ← Back
        </button>
      </div>
    </div>
  );
}

function PhotoStep({
  team,
  onPhoto,
  onBack,
  onSkip,
}: {
  team: Team;
  onPhoto: (src: string) => void;
  onBack: () => void;
  onSkip?: () => void;
}) {
  const [mode, setMode] = useState<"choose" | "camera">("choose");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // Crop editor state
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState(0);

  useEffect(() => {
    if (mode !== "camera") return;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1440 }, height: { ideal: 1440 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        alert("Camera access blocked. Try uploading instead.");
        setMode("choose");
      }
    })();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [mode]);

  // Measure viewport on mount / resize for crop math
  useEffect(() => {
    if (!srcUrl) return;
    const measure = () => setViewportSize(viewportRef.current?.clientWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [srcUrl]);

  function loadIntoEditor(dataUrl: string) {
    const img = new Image();
    img.onload = () => {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setScale(1);
      setTx(0);
      setTy(0);
      setSrcUrl(dataUrl);
    };
    img.src = dataUrl;
  }

  function snap() {
    const v = videoRef.current;
    if (!v) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(v, 0, 0);
    loadIntoEditor(canvas.toDataURL("image/jpeg", 0.92));
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => loadIntoEditor(String(reader.result));
    reader.readAsDataURL(f);
  }

  // ── Geometry helpers ──
  // At scale=1, image is rendered "cover": min dimension fills viewport.
  // coverScale = V / min(Iw, Ih). Rendered size in CSS px at user scale `scale`:
  //   W = Iw * coverScale * scale,  H = Ih * coverScale * scale.
  // Pan (tx, ty) shifts the centered image; clamp so it always fills viewport.
  const coverScale =
    natural && viewportSize ? viewportSize / Math.min(natural.w, natural.h) : 1;
  const renderedW = natural ? natural.w * coverScale * scale : 0;
  const renderedH = natural ? natural.h * coverScale * scale : 0;
  const maxTx = Math.max(0, (renderedW - viewportSize) / 2);
  const maxTy = Math.max(0, (renderedH - viewportSize) / 2);
  const clampedTx = Math.max(-maxTx, Math.min(maxTx, tx));
  const clampedTy = Math.max(-maxTy, Math.min(maxTy, ty));

  // ── Touch & pointer gestures ──
  const gesture = useRef<{
    mode: "none" | "pan" | "pinch";
    startX: number;
    startY: number;
    startTx: number;
    startTy: number;
    pinchStartDist: number;
    pinchStartScale: number;
  }>({
    mode: "none",
    startX: 0,
    startY: 0,
    startTx: 0,
    startTy: 0,
    pinchStartDist: 0,
    pinchStartScale: 1,
  });

  function dist(t1: React.Touch, t2: React.Touch) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      gesture.current = {
        mode: "pinch",
        startX: 0,
        startY: 0,
        startTx: clampedTx,
        startTy: clampedTy,
        pinchStartDist: dist(e.touches[0], e.touches[1]),
        pinchStartScale: scale,
      };
    } else if (e.touches.length === 1) {
      gesture.current = {
        mode: "pan",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startTx: clampedTx,
        startTy: clampedTy,
        pinchStartDist: 0,
        pinchStartScale: scale,
      };
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (gesture.current.mode === "pinch" && e.touches.length === 2) {
      const d = dist(e.touches[0], e.touches[1]);
      const ratio = d / gesture.current.pinchStartDist;
      const next = Math.max(1, Math.min(4, gesture.current.pinchStartScale * ratio));
      setScale(next);
      e.preventDefault();
    } else if (gesture.current.mode === "pan" && e.touches.length === 1) {
      const dx = e.touches[0].clientX - gesture.current.startX;
      const dy = e.touches[0].clientY - gesture.current.startY;
      setTx(gesture.current.startTx + dx);
      setTy(gesture.current.startTy + dy);
      e.preventDefault();
    }
  }

  function onTouchEnd() {
    gesture.current.mode = "none";
  }

  // Desktop drag
  const dragging = useRef(false);
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType === "touch") return; // touch handled separately
    dragging.current = true;
    gesture.current.startX = e.clientX;
    gesture.current.startY = e.clientY;
    gesture.current.startTx = clampedTx;
    gesture.current.startTy = clampedTy;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || e.pointerType === "touch") return;
    setTx(gesture.current.startTx + (e.clientX - gesture.current.startX));
    setTy(gesture.current.startTy + (e.clientY - gesture.current.startY));
  }
  function onPointerUp() {
    dragging.current = false;
  }

  function onWheel(e: React.WheelEvent) {
    const delta = -e.deltaY / 500;
    setScale((s) => Math.max(1, Math.min(4, s + delta)));
  }

  function bakeCrop() {
    if (!srcUrl || !natural || !viewportSize) return;
    const img = new Image();
    img.onload = () => {
      // Map viewport (0..V) back to natural image pixels.
      // Centered image top-left in viewport = (V/2 - W/2 + tx, V/2 - H/2 + ty)
      // where W = natural.w * coverScale * scale, H = natural.h * coverScale * scale.
      // Viewport.x=0 maps to natural x = (W/2 - V/2 - tx) / (coverScale * scale)
      const s = coverScale * scale;
      const sourceX = natural.w / 2 - (viewportSize / 2 + clampedTx) / s;
      const sourceY = natural.h / 2 - (viewportSize / 2 + clampedTy) / s;
      const sourceSize = viewportSize / s;
      const canvas = document.createElement("canvas");
      canvas.width = 720;
      canvas.height = 720;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 720, 720);
      onPhoto(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.src = srcUrl;
  }

  return (
    <div>
      <div className="label mb-4">Step Two · Your Photo</div>
      <h1 className="font-display font-bold text-leather text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] mb-3">
        Strike a pose for {team.name}.
      </h1>
      <p className="text-text-soft mb-10 max-w-xl text-lg">
        Upload a photo or use your camera. Drag to position, pinch or use the slider to zoom.
      </p>

      <div className="grid md:grid-cols-[1.1fr,1fr] gap-8">
        <div className="bg-parchment-elevated rounded-card border border-border shadow-card p-6">
          {mode === "choose" && !srcUrl && (
            <div className="space-y-3">
              <button onClick={() => fileRef.current?.click()} className="btn-primary w-full">
                Upload a photo
              </button>
              <button onClick={() => setMode("camera")} className="btn-ghost w-full">
                Use camera
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
            </div>
          )}
          {mode === "camera" && !srcUrl && (
            <div className="space-y-3">
              <div className="aspect-square rounded-nested overflow-hidden bg-leather">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              </div>
              <button onClick={snap} className="btn-primary w-full">
                Capture
              </button>
              <button onClick={() => setMode("choose")} className="text-text-soft hover:text-leather w-full text-sm py-2">
                Cancel
              </button>
            </div>
          )}
          {srcUrl && natural && (
            <div className="space-y-4">
              <div
                ref={viewportRef}
                className="relative aspect-square rounded-nested overflow-hidden border border-border bg-leather select-none touch-none"
                style={{ cursor: "grab" }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
              >
                {viewportSize > 0 && (
                  <img
                    src={srcUrl}
                    alt="crop preview"
                    draggable={false}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: renderedW,
                      height: renderedH,
                      transform: `translate(calc(-50% + ${clampedTx}px), calc(-50% + ${clampedTy}px))`,
                      maxWidth: "none",
                      pointerEvents: "none",
                    }}
                  />
                )}
                {/* Center guide */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-soft text-xs uppercase tracking-label">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={0.01}
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="flex-1 accent-terracotta"
                />
              </div>
              <button onClick={bakeCrop} className="btn-primary w-full">
                Use this photo
              </button>
              <button
                onClick={() => {
                  setSrcUrl(null);
                  setNatural(null);
                }}
                className="text-text-soft hover:text-leather w-full text-sm py-2"
              >
                Retake
              </button>
            </div>
          )}
        </div>

        <aside className="hidden md:block">
          <div className="label mb-4">Notes</div>
          <ul className="space-y-3 text-leather">
            <Tip>Drag to position. Pinch or use the slider to zoom.</Tip>
            <Tip>Even, natural light reads best.</Tip>
            <Tip>Plain backgrounds keep the focus on you.</Tip>
          </ul>
        </aside>
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        <button onClick={onBack} className="text-text-soft hover:text-leather text-sm">
          ← Back
        </button>
        {onSkip && (
          <button onClick={onSkip} className="text-text-soft hover:text-leather text-sm underline">
            Skip the photo →
          </button>
        )}
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-2 w-1.5 h-1.5 bg-terracotta rounded-sm shrink-0" />
      <span>{children}</span>
    </li>
  );
}

/* ─────────── Typeform-style step chrome ─────────── */

function StepShell({
  team,
  stepNum,
  stepTotal,
  eyebrow,
  question,
  sub,
  children,
  onBack,
  onNext,
  nextLabel = "Continue →",
  nextDisabled = false,
  hint,
}: {
  team: Team;
  stepNum: number;
  stepTotal: number;
  eyebrow: string;
  question: string;
  sub?: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hint?: string;
}) {
  const accent = safeAccent(team);
  const onAccent = onAccentText(accent);
  return (
    <div
      className="step-shell"
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "32px 4px 80px",
        position: "relative",
        ["--step-accent" as string]: accent,
        ["--on-step-accent" as string]: onAccent,
        animation: "stepFadeIn 360ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      }}
    >
      <div
        className="flex items-center gap-3 mb-3"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--leather-mid, #2C2118)",
        }}
      >
        <span style={{ color: accent }}>
          {String(stepNum).padStart(2, "0")} / {String(stepTotal).padStart(2, "0")}
        </span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.8 }}>{eyebrow}</span>
      </div>
      <h1
        className="font-display"
        style={{
          fontWeight: 800,
          fontSize: "clamp(36px, 6.5vw, 72px)",
          lineHeight: 0.98,
          letterSpacing: "-0.03em",
          color: "var(--leather-mid, #2C2118)",
          marginBottom: sub ? 12 : 24,
          maxWidth: "18ch",
        }}
      >
        {question}
      </h1>
      {sub && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.5,
            color: "var(--text-soft, #6B6259)",
            marginBottom: 28,
            maxWidth: "44ch",
          }}
        >
          {sub}
        </p>
      )}
      <div style={{ marginBottom: 24 }}>{children}</div>

      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-text-soft hover:text-leather text-sm">
          ← Back
        </button>
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="btn-primary"
            style={{
              opacity: nextDisabled ? 0.45 : 1,
              cursor: nextDisabled ? "not-allowed" : "pointer",
            }}
          >
            {nextLabel}
          </button>
        )}
        {hint && (
          <span
            className="hidden sm:inline-flex items-center gap-2"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-soft, #6B6259)",
              opacity: 0.7,
            }}
          >
            <kbd
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                padding: "2px 6px",
                border: "1px solid rgba(44,33,24,0.18)",
                borderRadius: 3,
                background: "rgba(245,241,235,0.7)",
                letterSpacing: 0,
              }}
            >
              {hint}
            </kbd>
          </span>
        )}
      </div>

      <style jsx>{`
        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function NameStep({
  team,
  name,
  setName,
  onBack,
  onNext,
}: {
  team: Team;
  name: string;
  setName: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const ok = name.trim().length > 0;
  return (
    <StepShell
      team={team}
      stepNum={2}
      stepTotal={7}
      eyebrow="Your name"
      question="What name's on the back?"
      sub="We use it on the card. We use it for your signature too."
      onBack={onBack}
      onNext={ok ? onNext : undefined}
      nextDisabled={!ok}
      hint="↵ Enter"
    >
      <input
        ref={inputRef}
        value={name}
        maxLength={22}
        onChange={(e) => setName(e.target.value.slice(0, 22))}
        onKeyDown={(e) => { if (e.key === "Enter" && ok) onNext(); }}
        placeholder="Lionel Rahim"
        style={{
          appearance: "none",
          width: "100%",
          maxWidth: 640,
          background: "transparent",
          border: "none",
          borderBottom: "3px solid var(--step-accent, #2C2118)",
          padding: "12px 4px",
          fontFamily: "Big Shoulders Display, Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(32px, 5.5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "var(--leather-mid, #2C2118)",
          outline: "none",
        }}
        autoComplete="off"
      />
    </StepShell>
  );
}

function PositionStep({
  team,
  position,
  setPosition,
  onBack,
  onNext,
}: {
  team: Team;
  position: Position;
  setPosition: (p: Position) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const POS_META: Record<Position, { label: string; full: string; tag: string }> = {
    GK:  { label: "GK",  full: "Goalkeeper",   tag: "A" },
    DEF: { label: "DEF", full: "Defender",     tag: "B" },
    MID: { label: "MID", full: "Midfielder",   tag: "C" },
    FWD: { label: "FWD", full: "Forward",      tag: "D" },
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const map: Record<string, Position> = { A: "GK", B: "DEF", C: "MID", D: "FWD" };
      if (map[key]) { setPosition(map[key]); setTimeout(onNext, 220); }
      if (e.key === "Enter") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onNext, setPosition]);
  return (
    <StepShell
      team={team}
      stepNum={3}
      stepTotal={7}
      eyebrow="Your position"
      question="Where do you play?"
      onBack={onBack}
      onNext={onNext}
      hint="A B C D"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
          maxWidth: 720,
        }}
      >
        {POSITIONS.map((p) => {
          const active = position === p;
          const meta = POS_META[p];
          return (
            <button
              key={p}
              type="button"
              onClick={() => { setPosition(p); setTimeout(onNext, 180); }}
              style={{
                appearance: "none",
                cursor: "pointer",
                background: active ? "var(--step-accent, #2C2118)" : "transparent",
                color: active ? "var(--on-step-accent, #fff)" : "var(--leather-mid, #2C2118)",
                border: `2px solid ${active ? "var(--step-accent, #2C2118)" : "rgba(44,33,24,0.18)"}`,
                borderRadius: 8,
                padding: "22px 18px",
                textAlign: "left",
                transition: "all 220ms ease",
                transform: active ? "translateY(-2px)" : "translateY(0)",
                boxShadow: active ? "0 12px 28px -14px rgba(0,0,0,0.45)" : "none",
                fontFamily: "Syne, sans-serif",
                position: "relative",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  marginBottom: 12,
                  border: `1.5px solid ${active ? "currentColor" : "rgba(44,33,24,0.3)"}`,
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.05,
                  opacity: 0.85,
                }}
              >
                {meta.tag}
              </span>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 28,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {meta.label}
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  marginTop: 6,
                  letterSpacing: "0.04em",
                  opacity: active ? 0.85 : 0.6,
                }}
              >
                {meta.full}
              </div>
            </button>
          );
        })}
      </div>
    </StepShell>
  );
}

function NumberStep({
  team,
  number,
  setNumber,
  onBack,
  onNext,
}: {
  team: Team;
  number: string;
  setNumber: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); ref.current?.select(); }, []);
  const n = parseInt(number || "0", 10);
  const ok = n >= 1 && n <= 99;
  return (
    <StepShell
      team={team}
      stepNum={4}
      stepTotal={7}
      eyebrow="Your number"
      question="Pick a number, 1 to 99."
      sub="The one stitched on your back. Captains tend to go 10. Goalkeepers tend to go 1."
      onBack={onBack}
      onNext={ok ? onNext : undefined}
      nextDisabled={!ok}
      hint="↵ Enter"
    >
      <input
        ref={ref}
        inputMode="numeric"
        pattern="[0-9]*"
        value={number}
        onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
        onKeyDown={(e) => { if (e.key === "Enter" && ok) onNext(); }}
        placeholder="10"
        style={{
          appearance: "none",
          width: "100%",
          maxWidth: 280,
          background: "transparent",
          border: "none",
          borderBottom: "3px solid var(--step-accent, #2C2118)",
          padding: "12px 4px",
          fontFamily: "Big Shoulders Display, Syne, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(72px, 14vw, 160px)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "var(--leather-mid, #2C2118)",
          textAlign: "left",
          outline: "none",
        }}
        autoComplete="off"
      />
    </StepShell>
  );
}

function RatingStep({
  team,
  rating,
  setRating,
  onBack,
  onNext,
}: {
  team: Team;
  rating: string;
  setRating: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const n = Math.max(50, Math.min(99, parseInt(rating || "0", 10) || 0));
  useEffect(() => { if (rating === "") setRating("92"); }, [rating, setRating]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter") onNext(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onNext]);
  const tier = n >= 92 ? "Generational" : n >= 87 ? "Elite" : n >= 80 ? "Top of the league" : n >= 70 ? "Honest pro" : n >= 60 ? "Solid Sunday-leaguer" : "Pub squad legend";
  return (
    <StepShell
      team={team}
      stepNum={5}
      stepTotal={7}
      eyebrow="Your rating"
      question="How good are you, really?"
      sub="Be honest. The cards remember."
      onBack={onBack}
      onNext={onNext}
      hint="↵ Enter"
    >
      <div style={{ maxWidth: 720 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontFamily: "Big Shoulders Display, Syne, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(96px, 18vw, 200px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "var(--step-accent, #2C2118)",
              transition: "color 280ms ease",
            }}
          >
            {n}
          </span>
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.4vw, 18px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--leather-mid, #2C2118)",
            }}
          >
            {tier}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={99}
          value={n}
          onChange={(e) => setRating(String(e.target.value))}
          style={{
            width: "100%",
            maxWidth: 640,
            accentColor: safeAccent(team),
            cursor: "pointer",
          }}
          aria-label="Rating"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 640,
            marginTop: 10,
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-soft, #6B6259)",
            opacity: 0.75,
          }}
        >
          <span>50</span><span>75</span><span>99</span>
        </div>
      </div>
    </StepShell>
  );
}


function isLightHex(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length !== 6) return false;
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.55;
}

function pickContrast(team: Team): string {
  if (!isLightHex(team.secondary)) return team.secondary;
  if (!isLightHex(team.accent)) return team.accent;
  return "#1a1a1a";
}

// Returns the team's strongest non-white color. Used as the live accent
// in step UI (underline, slider, active tile bg, step counter). Avoids picking
// pure white from teams like CAN/KSA/SUI where secondary is "#FFFFFF" and
// would otherwise paint controls invisible on parchment.
function safeAccent(team: Team): string {
  const cands = [team.secondary, team.accent, team.primary].filter(Boolean) as string[];
  const nonWhite = cands.find((c) => c.replace("#", "").toUpperCase() !== "FFFFFF");
  return nonWhite || "#2C2118";
}

// Choose readable text on top of the given accent background.
function onAccentText(hex: string): string {
  return isLightHex(hex) ? "#1A1A1A" : "#FFFFFF";
}


function ArchPreview({
  team,
  photo,
  name,
  position,
  number,
  rating,
}: {
  team: Team;
  photo: string;
  name: string;
  position: string;
  number: string;
  rating: string;
}) {
  const accent = pickContrast(team);
  const headerInk = isLightHex(team.primary) ? "#1a1a1a" : "#fff";
  const full = team.name.toUpperCase();
  return (
    <div className="flex items-start justify-center">
      <div className="relative w-full max-w-[260px] aspect-[5/7]" style={{ boxShadow: "0 18px 40px -18px rgba(0,0,0,0.3)" }}>
        <div className="absolute inset-0 rounded-md" style={{ background: "#F5EFE0", padding: 8 }}>
          <div className="absolute inset-1.5 rounded-sm" style={{ background: accent }} />
          <div className="absolute inset-2.5 rounded-sm" style={{ background: "#F5EFE0" }} />
        </div>
        {/* content */}
        <div className="absolute inset-3 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border-2 border-leather" />
              <span className="font-display font-black text-leather text-[9px] tracking-[0.18em]">PROVISIONS</span>
            </div>
            <span className="font-mono text-leather/60 text-[7px] tracking-[0.22em]">SERIES ONE</span>
          </div>
          {/* Arched country name (simplified — single line, the real card arches) */}
          <div className="text-center mt-2 mb-1 font-display font-black tracking-[0.1em]" style={{ color: team.primary, fontSize: full.length > 8 ? 16 : 22, lineHeight: 1 }}>
            {full}
          </div>
          {/* Photo stadium */}
          <div className="mx-auto w-[88%] flex-1 my-1 relative" style={{ background: team.primary, borderRadius: "50% 50% 4px 4px / 30% 30% 4px 4px", padding: 3 }}>
            <div className="w-full h-full overflow-hidden border border-leather relative" style={{ borderRadius: "50% 50% 2px 2px / 30% 30% 2px 2px" }}>
              <img src={photo} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-2 font-[cursive] text-leather" style={{ fontSize: 14, transform: "rotate(-5deg)" }}>
                {name || "Your Name"}
              </div>
            </div>
          </div>
          {/* Name plate */}
          <div className="bg-white border-2 border-leather h-7 flex items-center justify-center" style={{ boxShadow: `3px 3px 0 0 ${team.primary}` }}>
            <span className="font-display font-bold text-leather text-[12px] tracking-[0.06em] whitespace-nowrap">
              {(name || "Your Name").toUpperCase()}
            </span>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-[1fr,1.2fr,1fr] gap-1.5 mt-1.5 h-12">
            <div className="bg-white border-2 border-leather flex flex-col items-center justify-center" style={{ boxShadow: `2px 2px 0 0 ${team.primary}` }}>
              <span className="font-mono text-leather/60 text-[6px] tracking-[0.22em]">POS</span>
              <span className="font-display font-extrabold text-[18px] leading-none" style={{ color: team.primary }}>{position}</span>
            </div>
            <div className="border-2 border-leather flex flex-col items-center justify-center" style={{ background: team.primary, color: headerInk, boxShadow: "2px 2px 0 0 #1a1a1a" }}>
              <span className="font-mono text-[6px] tracking-[0.22em] opacity-80">NUMBER</span>
              <span className="font-display font-black text-[24px] leading-none">{number}</span>
            </div>
            <div className="bg-white border-2 border-leather flex flex-col items-center justify-center" style={{ boxShadow: `2px 2px 0 0 ${team.primary}` }}>
              <span className="font-mono text-leather/60 text-[6px] tracking-[0.22em]">RATING</span>
              <span className="font-display font-black text-leather text-[22px] leading-none">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultStep({
  cardUrl,
  name,
  team,
  rarity,
  onRestart,
}: {
  cardUrl: string;
  name: string;
  team: Team;
  rarity: Rarity;
  onRestart: () => void;
}) {
  const [storyBusy, setStoryBusy] = useState(false);
  const rarityMeta = RARITY_META[rarity];
  const isRare = rarity !== "standard";
  const headlineMap: Record<Rarity, string> = {
    standard: "On the team sheet.",
    silver:   "Man of the Match.",
    gold:     "Golden Boot.",
    platinum: "Player of the Tournament.",
    holo:     "1 of 1.",
  };
  const subMap: Record<Rarity, string> = {
    standard: "You made the eleven. Pack-fresh.",
    silver:   "Solid shift. Roughly 1 in 8 rips.",
    gold:     "Top scorer pull. ~1 in 17 packs.",
    platinum: "Golden Ball. ~1 in 33 packs.",
    holo:     "Legend pull. 1 in 100 ever lands here.",
  };

  async function save() {
    const filename = `${name.replace(/\s+/g, "-")}-${team.code}-story.png`;
    const isTouch = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    try {
      const blob = await buildStoryBlob();
      const file = new File([blob], filename, { type: "image/png" });
      // Mobile: native share sheet → user picks "Save Image" → goes to Photos
      if (isTouch && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], title: `${name} · ${team.name}`, text: `My Summer '26 card` });
        return;
      }
      // Desktop: download to Downloads folder
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
    } catch (e) {
      if (e && (e as Error).name !== "AbortError") console.error("Save failed:", e);
    }
  }

  function _lum(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  async function buildStoryBlob(): Promise<Blob> {
    // Make sure the typeface is loaded so canvas text renders correctly
    try { await (document as Document & { fonts?: FontFaceSet }).fonts?.load("700 24px Syne"); } catch {}
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.crossOrigin = "anonymous";
      i.src = cardUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2D context");

    const primary = team.primary;
    const textColor = _lum(primary) > 0.55 ? "#1A1A1A" : "#F0E9DC";
    const ruleColor = _lum(primary) > 0.55 ? "rgba(26,33,24,0.35)" : "rgba(240,233,220,0.45)";

    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, 1080, 1920);

    const grad = ctx.createRadialGradient(540, 960, 200, 540, 960, 1000);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.22)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.fillStyle = textColor;
    ctx.font = "700 26px Syne, sans-serif";
    try { (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "6px"; } catch {}
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(team.name.toUpperCase(), 540, 300);

    ctx.strokeStyle = ruleColor;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(56, 340); ctx.lineTo(1024, 340); ctx.stroke();

    const cardW = 820;
    const cardH = 1148;
    ctx.save();
    ctx.translate(540, 960);
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 30;
    ctx.drawImage(img, -cardW / 2, -cardH / 2, cardW, cardH);
    ctx.restore();
    ctx.shadowColor = "transparent";

    ctx.strokeStyle = ruleColor;
    ctx.beginPath(); ctx.moveTo(56, 1580); ctx.lineTo(1024, 1580); ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = "700 24px Syne, sans-serif";
    ctx.fillText("PROVISIONS.SOCCER", 540, 1620);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png");
    });
  }

  async function shareStory() {
    if (storyBusy) return;
    setStoryBusy(true);
    try {
      const blob = await buildStoryBlob();
      const file = new File([blob], `${name.replace(/\s+/g, "-")}-${team.code}-story.png`, { type: "image/png" });
      const isTouch = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      if (isTouch && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({
          files: [file],
          title: `${name} · ${team.name}`,
          text: `My Summer '26 card`,
        });
      } else {
        // Desktop: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name.replace(/\s+/g, "-")}-${team.code}-story.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
      }
    } catch (e) {
      console.error("Story share failed:", e);
    } finally {
      setStoryBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center gap-4 pt-4 md:pt-2">
      <div className="relative">
        <img
          src={cardUrl}
          alt="Your card"
          className="w-auto max-w-[240px] sm:max-w-[280px] max-h-[58vh] rounded-card shadow-card border border-border"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={shareStory} disabled={storyBusy} className="btn-primary">
          {storyBusy ? "Pressing…" : "Share to Story"}
        </button>
        <button onClick={save} className="btn-ghost">Save</button>
        <button onClick={onRestart} className="btn-ghost">Make another</button>
      </div>
      <div className="max-w-md">
        <h1
          className="font-display font-bold text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.05] tracking-[-0.02em] mb-1"
          style={{ color: isRare ? rarityMeta.tint : "#2C2118" }}
        >
          {headlineMap[rarity]}
        </h1>
        <p className="text-text-soft text-sm">{subMap[rarity]}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-leather-mid text-white mt-24">
      <div className="max-w-[1280px] mx-auto px-8 sm:px-16 py-5 flex items-center justify-between gap-4 flex-wrap font-display font-semibold uppercase tracking-label text-[10px] opacity-75">
        <span>Provisions · Summer ’26</span>
        <span>Set in Syne + Inter</span>
        <a
          href="https://provisions.work"
          className="text-terracotta-light hover:text-white transition-colors"
        >
          provisions.work →
        </a>
      </div>
    </footer>
  );
}
