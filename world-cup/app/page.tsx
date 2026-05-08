"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TEAMS, POSITIONS, type Team, type Position } from "@/lib/teams";
import { flagUrl } from "@/lib/flagIso";

type Step = "team" | "photo" | "details" | "result";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (p: string) => `${BASE_PATH}${p}`;

export default function Page() {
  const [step, setStep] = useState<Step>("team");
  const [team, setTeam] = useState<Team | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState<Position>("FWD");
  const [number, setNumber] = useState("10");
  const [rating, setRating] = useState("92");
  const [generating, setGenerating] = useState(false);
  const [cardUrl, setCardUrl] = useState<string | null>(null);

  async function generate() {
    if (!team || !photo) return;
    setGenerating(true);
    try {
      const res = await fetch(asset("/api/card"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamCode: team.code,
          photo,
          name: name || "Your Name",
          position,
          number,
          rating,
        }),
      });
      if (!res.ok) throw new Error("Card render failed");
      const blob = await res.blob();
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

      <section className="relative max-w-[1100px] mx-auto px-5 sm:px-8 py-8 sm:py-16">
        {step === "team" && (
          <TeamPicker
            onPick={(t) => {
              setTeam(t);
              setStep("photo");
            }}
          />
        )}
        {step === "photo" && team && (
          <PhotoStep
            team={team}
            onBack={() => setStep("team")}
            onPhoto={(src) => {
              setPhoto(src);
              setStep("details");
            }}
          />
        )}
        {step === "details" && team && photo && (
          <DetailsStep
            team={team}
            photo={photo}
            name={name}
            setName={setName}
            position={position}
            setPosition={setPosition}
            number={number}
            setNumber={setNumber}
            rating={rating}
            setRating={setRating}
            generating={generating}
            onBack={() => setStep("photo")}
            onGenerate={generate}
          />
        )}
        {step === "result" && cardUrl && team && (
          <ResultStep
            cardUrl={cardUrl}
            name={name || "Your Name"}
            team={team}
            onRestart={() => {
              setStep("team");
              setTeam(null);
              setPhoto(null);
              setCardUrl(null);
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
    { id: "photo", label: "Photo" },
    { id: "details", label: "Stats" },
    { id: "result", label: "Card" },
  ];
  const idx = labels.findIndex((l) => l.id === step);
  const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <header className="sticky top-0 z-50 bg-parchment-elevated border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 min-h-[72px] flex items-center justify-between gap-3">
        <a
          href="https://provisions.work/world-cup"
          className="flex items-center gap-3 group flex-shrink-0"
          aria-label="Provisions"
        >
          <img
            src={`${BASE}/provisions-mark.png`}
            alt="Provisions"
            width={26}
            height={26}
            className="object-contain"
          />
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
        <a
          href="https://provisions.work/world-cup"
          className="h-[40px] sm:h-[44px] inline-flex items-center bg-leather-mid text-white px-4 sm:px-5 font-display font-extrabold uppercase tracking-label text-[10px] sm:text-[12px] border border-leather-mid hover:bg-terracotta hover:border-terracotta transition-all"
          style={{ boxShadow: "0 3px 0 rgba(0,0,0,0.12)" }}
        >
          ← Back to the team sheet
        </a>
      </div>
    </header>
  );
}

function TeamPicker({ onPick }: { onPick: (t: Team) => void }) {
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
    <div>
      <div className="grid lg:grid-cols-[1.25fr,1fr] gap-8 lg:gap-16 items-center mb-10 sm:mb-12">
        <div>
          <div className="label mb-3 sm:mb-4">Summer '26</div>
          <h1 className="font-display font-bold text-leather text-[clamp(2rem,8vw,4.2rem)] leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-5">
            The player card<br />for the rest of us.
          </h1>
          <p className="text-text-soft max-w-xl text-base sm:text-lg leading-snug mb-6 sm:mb-7">
            Pick a country. Snap a photo. Share it with your squad.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#browse"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("browse")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Pick your country
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <span className="text-text-soft text-xs sm:text-sm">Or scroll to browse all 48.</span>
          </div>
        </div>
        <div className="hidden lg:flex justify-end">
          <div className="relative" style={{ transform: "rotate(3deg)" }}>
            <img
              src={asset("/api/card?team=USA")}
              alt="Example player card"
              width={360}
              className="rounded-md"
              style={{ boxShadow: "0 30px 60px -20px rgba(26,23,20,0.35), 0 8px 20px -8px rgba(26,23,20,0.18)" }}
            />
          </div>
        </div>
      </div>
      <div id="browse" className="scroll-mt-8">
        <div className="label mb-3">Step One · Pick a Nation</div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search countries"
          className="input max-w-sm mb-8"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filtered.map((t) => (
          <button
            key={t.code}
            onClick={() => onPick(t)}
            className="group relative rounded-card border-2 border-leather/25 text-left overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-leather focus:outline-none focus-visible:border-terracotta focus-visible:ring-2 focus-visible:ring-terracotta/30"
            style={{
              background: "rgba(248, 245, 239, 0.68)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxShadow: "0 10px 28px rgba(26, 23, 20, 0.10), 0 2px 6px rgba(26, 23, 20, 0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 22px 46px rgba(26, 23, 20, 0.18), 0 4px 10px rgba(26, 23, 20, 0.08)";
              e.currentTarget.style.background = "rgba(248, 245, 239, 0.82)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 10px 28px rgba(26, 23, 20, 0.10), 0 2px 6px rgba(26, 23, 20, 0.06)";
              e.currentTarget.style.background = "rgba(248, 245, 239, 0.68)";
            }}
          >
            <div className="px-5 pt-5 pb-6">
              {flagUrl(t.code) ? (
                <img
                  src={flagUrl(t.code, 160)}
                  alt=""
                  width={48}
                  height={36}
                  loading="lazy"
                  className="block mb-4"
                  style={{
                    width: 48,
                    height: 36,
                    objectFit: "cover",
                    border: "1px solid rgba(0,0,0,0.18)",
                  }}
                />
              ) : (
                <div
                  className="mb-4"
                  style={{
                    width: 48,
                    height: 36,
                    background: `linear-gradient(90deg, ${t.primary} 0 33%, ${t.secondary} 33% 66%, ${t.accent} 66% 100%)`,
                    border: "1px solid rgba(0,0,0,0.18)",
                  }}
                />
              )}
              <div className="font-display font-extrabold text-leather text-3xl tracking-[-0.02em] leading-none">
                {t.code}
              </div>
              <div className="text-leather text-[0.95rem] leading-snug mt-3">{t.name}</div>
              <div className="label text-[0.6rem] mt-5">{t.confederation}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PhotoStep({
  team,
  onPhoto,
  onBack,
}: {
  team: Team;
  onPhoto: (src: string) => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<"choose" | "camera">("choose");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "camera") return;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1080 } },
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

  function snap() {
    const v = videoRef.current;
    if (!v) return;
    const size = Math.min(v.videoWidth, v.videoHeight);
    const sx = (v.videoWidth - size) / 2;
    const sy = (v.videoHeight - size) / 2;
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 720;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(v, sx, sy, size, size, 0, 0, 720, 720);
    setPreview(canvas.toDataURL("image/jpeg", 0.9));
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = 720;
        canvas.height = 720;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 720, 720);
        setPreview(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(f);
  }

  return (
    <div>
      <div className="label mb-4">Step Two · Your Photo</div>
      <h1 className="font-display font-bold text-leather text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] mb-3">
        Strike a pose for {team.name}.
      </h1>
      <p className="text-text-soft mb-10 max-w-xl text-lg">
        Upload a photo or use your camera. We'll square-crop it for you.
      </p>

      <div className="grid md:grid-cols-[1.1fr,1fr] gap-8">
        <div className="bg-parchment-elevated rounded-card border border-border shadow-card p-6">
          {mode === "choose" && !preview && (
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
          {mode === "camera" && !preview && (
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
          {preview && (
            <div className="space-y-3">
              <div className="relative aspect-square rounded-nested overflow-hidden border border-border">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
              <button
                onClick={() => preview && onPhoto(preview)}
                className="btn-primary w-full"
              >
                Use this photo
              </button>
              <button
                onClick={() => setPreview(null)}
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
            <Tip>Center your face. Square crop.</Tip>
            <Tip>Even, natural light reads best.</Tip>
            <Tip>Plain backgrounds keep the focus on you.</Tip>
          </ul>
        </aside>
      </div>

      <div className="mt-10">
        <button onClick={onBack} className="text-text-soft hover:text-leather text-sm">
          ← Change team
        </button>
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

function DetailsStep(props: {
  team: Team;
  photo: string;
  name: string;
  setName: (s: string) => void;
  position: Position;
  setPosition: (p: Position) => void;
  number: string;
  setNumber: (s: string) => void;
  rating: string;
  setRating: (s: string) => void;
  generating: boolean;
  onBack: () => void;
  onGenerate: () => void;
}) {
  const { team, photo, name, setName, position, setPosition, number, setNumber, rating, setRating, generating, onBack, onGenerate } = props;
  return (
    <div>
      <div className="label mb-4">Step Three · Stats</div>
      <h1 className="font-display font-bold text-leather text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] mb-3">
        Fill in your kit.
      </h1>
      <p className="text-text-soft mb-10 max-w-xl text-lg">
        Name, position, number, rating. Live preview on the right.
      </p>
      <div className="grid md:grid-cols-[1fr,1.1fr] gap-10">
        <div>
          <div className="space-y-5">
            <Field label="Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 22))}
                placeholder="Lionel Rahim"
                className="input"
              />
            </Field>
            <div role="group" aria-label="Position">
              <div className="label mb-2">Position</div>
              <div className="flex gap-2">
                {POSITIONS.map((p) => {
                  const active = position === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPosition(p);
                      }}
                      aria-pressed={active}
                      style={{
                        flex: 1,
                        padding: "0.7rem 0",
                        borderRadius: 6,
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderColor: active ? "#2C2118" : "rgba(44, 33, 24, 0.15)",
                        background: active ? "#F8F5EF" : "rgba(248, 245, 239, 0.6)",
                        color: active ? "#2C2118" : "#6B6259",
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 200ms ease",
                        boxShadow: active ? "0 4px 12px rgba(26,23,20,0.08)" : "none",
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Number">
                <input
                  inputMode="numeric"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  className="input"
                />
              </Field>
              <Field label="Rating">
                <input
                  inputMode="numeric"
                  value={rating}
                  onChange={(e) => setRating(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  className="input"
                />
              </Field>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={onBack} className="btn-ghost">Back</button>
            <button onClick={onGenerate} disabled={generating} className="btn-primary">
              {generating ? "Pressing your card…" : "Make my card"}
            </button>
          </div>
        </div>

        <ArchPreview team={team} photo={photo} name={name || "Your Name"} position={position} number={number} rating={rating} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="label mb-2">{label}</div>
      {children}
    </label>
  );
}


function isLightHex(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length !== 6) return false;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return r > 220 && g > 220 && b > 220;
}

function pickContrast(team: Team): string {
  if (!isLightHex(team.secondary)) return team.secondary;
  if (!isLightHex(team.accent)) return team.accent;
  return "#1a1a1a";
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
      <div className="relative w-[340px] aspect-[5/7]" style={{ boxShadow: "0 18px 40px -18px rgba(0,0,0,0.3)" }}>
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
  onRestart,
}: {
  cardUrl: string;
  name: string;
  team: Team;
  onRestart: () => void;
}) {
  async function share() {
    try {
      const res = await fetch(cardUrl);
      const blob = await res.blob();
      const file = new File([blob], `${name.replace(/\s+/g, "-")}-${team.code}.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `${name} · ${team.name}`, text: `My World Cup '26 card.` });
      } else {
        download();
      }
    } catch {}
  }
  function download() {
    const a = document.createElement("a");
    a.href = cardUrl;
    a.download = `${name.replace(/\s+/g, "-")}-${team.code}.png`;
    a.click();
  }
  return (
    <div className="grid md:grid-cols-[1fr,1fr] gap-12 items-center">
      <div>
        <div className="label mb-4">Your Card</div>
        <h1 className="font-display font-bold text-leather text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] mb-3">
          You made the squad.
        </h1>
        <p className="text-text-soft mb-8 text-lg max-w-md">
          Save it, post it, dare a friend to make theirs.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={share} className="btn-primary">Share</button>
          <button onClick={download} className="btn-ghost">Download</button>
          <button onClick={onRestart} className="text-text-soft hover:text-leather px-2 py-3">
            Make another
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={cardUrl} alt="Your card" className="w-full max-w-sm rounded-card shadow-card border border-border" />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-leather-mid text-white mt-24">
      <div className="max-w-[1280px] mx-auto px-8 sm:px-16 py-5 flex items-center justify-between gap-4 flex-wrap font-display font-semibold uppercase tracking-label text-[10px] opacity-75">
        <span>Provisions · World Cup ’26</span>
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
