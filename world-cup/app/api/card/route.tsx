import { ImageResponse } from "next/og";
import { teamByCode, type Team } from "@/lib/teams";

export const runtime = "edge";

const FONT_URLS = {
  bigShoulders800: "https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-800-normal.ttf",
  bigShoulders900: "https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-900-normal.ttf",
  bebas: "https://cdn.jsdelivr.net/fontsource/fonts/bebas-neue@latest/latin-400-normal.ttf",
  plexMono: "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf",
  homemade: "https://cdn.jsdelivr.net/fontsource/fonts/homemade-apple@latest/latin-400-normal.ttf",
};

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error("Font fetch failed: " + url);
  return res.arrayBuffer();
}

const SCALE = 2;
const px = (n: number) => n * SCALE;

const PAPER = "#F5EFE0";
const INK = "#1a1a1a";

function fullName(t: Team): string {
  return t.name.toUpperCase();
}

function isLight(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length !== 6) return false;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return r > 220 && g > 220 && b > 220;
}

// Pick a bold contrasting color for borders/name plate.
// teams.ts stores primary/secondary/accent as the 3 flag colors; for some teams
// secondary is white. We need a non-light contrast color.
function contrastColor(team: Team): string {
  if (!isLight(team.secondary)) return team.secondary;
  if (!isLight(team.accent)) return team.accent;
  if (!isLight(team.primary)) return team.primary;
  return INK;
}

function todayStamp(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}.${dd}.${yy}`;
}

function splitName(name: string): { first: string; last: string } {
  const idx = name.indexOf(" ");
  if (idx === -1) return { first: name, last: "" };
  return { first: name.slice(0, idx), last: name.slice(idx + 1) };
}

function BrandMark({ color, paperColor }: { color: string; paperColor: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: px(7), color }}>
      <div
        style={{
          width: px(12),
          height: px(12),
          background: color,
          position: "relative",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: px(2),
            left: px(2),
            right: px(2),
            bottom: px(2),
            background: paperColor,
            display: "flex",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "Big Shoulders",
          fontWeight: 900,
          fontSize: px(14),
          letterSpacing: "0.18em",
          display: "flex",
        }}
      >
        PROVISIONS
      </div>
    </div>
  );
}

function Star({ size, color }: { size: number; color: string }) {
  return (
    <svg width={px(size)} height={px(size)} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 L14.6 8.6 L21.5 9.3 L16.3 13.9 L17.8 20.7 L12 17.1 L6.2 20.7 L7.7 13.9 L2.5 9.3 L9.4 8.6 Z" />
    </svg>
  );
}

function FedBadge({ team, size }: { team: Team; size: number }) {
  return (
    <svg width={px(size)} height={px(size)} viewBox="0 0 40 40">
      <path
        d="M20 2 L36 8 L36 22 C 36 30, 28 36, 20 38 C 12 36, 4 30, 4 22 L 4 8 Z"
        fill={team.secondary}
        stroke={team.primary}
        strokeWidth="2"
      />
      <circle cx="20" cy="20" r="6" fill={team.primary} />
    </svg>
  );
}

function Photo({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <img
      src={src}
      alt=""
      width={w}
      height={h}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: w,
        height: h,
        objectFit: "cover",
      }}
    />
  );
}

function Signature({ name, color, tilt, size }: { name: string; color: string; tilt: number; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: px(14),
        right: px(18),
        display: "flex",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: "Homemade Apple",
          fontSize: px(size),
          color,
          transform: `rotate(${tilt}deg)`,
          lineHeight: 1,
          whiteSpace: "nowrap",
          display: "flex",
        }}
      >
        {name}
      </div>
    </div>
  );
}

// --- Arch (B) ---
function ArchCard({
  team,
  photo,
  name,
  position,
  number,
  rating,
  signature,
}: {
  team: Team;
  photo: string;
  name: string;
  position: string;
  number: string;
  rating: string;
  signature: string;
}) {
  const accentColor = contrastColor(team);
  const lightPrimary = isLight(team.primary);
  const fullCountry = fullName(team);
  const longCountry = fullCountry.length > 8;

  // Place letters along the design's Bezier curve: M 30 120 Q 230 -10 430 120
  // The SVG container is positioned at left:20, top:28 in card coordinates.
  const letters = fullCountry.split("");
  const bezier = (t: number) => {
    const u = 1 - t;
    return {
      x: u * u * 30 + 2 * u * t * 230 + t * t * 430,
      y: u * u * 120 + 2 * u * t * -10 + t * t * 120,
    };
  };
  const tangentDeg = (t: number) => {
    const dy = -260 + 520 * t;
    return (Math.atan2(dy, 400) * 180) / Math.PI;
  };
  const svgOffsetX = 20;
  const svgOffsetY = 28;
  const letterFontSize = px(longCountry ? 56 : 80);

  return (
    <div
      style={{
        width: px(500),
        height: px(700),
        background: PAPER,
        position: "relative",
        padding: px(18),
        display: "flex",
      }}
    >
      {/* Card mat */}
      <div
        style={{
          position: "absolute",
          top: px(12),
          left: px(12),
          right: px(12),
          bottom: px(12),
          background: accentColor,
          borderRadius: px(4),
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: px(22),
          left: px(22),
          right: px(22),
          bottom: px(22),
          background: PAPER,
          borderRadius: px(2),
          display: "flex",
        }}
      />

      {/* Brand masthead */}
      <div
        style={{
          position: "absolute",
          left: px(30),
          right: px(30),
          top: px(30),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BrandMark color={INK} paperColor={PAPER} />
        <div
          style={{
            fontFamily: "Plex Mono",
            fontSize: px(9),
            letterSpacing: "0.22em",
            color: INK,
            opacity: 0.7,
            display: "flex",
          }}
        >
          SERIES ONE · {todayStamp()}
        </div>
      </div>

      {/* Arched country name — letters placed along Bezier curve */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: px(180),
          display: "flex",
        }}
      >
        {letters.map((ch, i) => {
          const t = letters.length > 1 ? i / (letters.length - 1) : 0.5;
          const p = bezier(t);
          const angle = tangentDeg(t);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px(svgOffsetX + p.x),
                top: px(svgOffsetY + p.y),
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                fontFamily: "Bebas",
                fontSize: letterFontSize,
                color: team.primary,
                lineHeight: 1,
                display: "flex",
              }}
            >
              {ch === " " ? "·" : ch}
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: px(60), left: px(34), display: "flex" }}>
        <Star size={12} color={INK} />
      </div>
      <div style={{ position: "absolute", top: px(60), right: px(34), display: "flex" }}>
        <Star size={12} color={INK} />
      </div>

      {/* Photo in stadium-shape frame */}
      <div
        style={{
          position: "absolute",
          left: px(40),
          top: px(180),
          width: px(500 - 80),
          height: px(330),
          background: team.primary,
          borderRadius: `${px(120)}px ${px(120)}px ${px(6)}px ${px(6)}px`,
          padding: px(8),
          display: "flex",
        }}
      >
        <div
          style={{
            width: px(500 - 80 - 16),
            height: px(330 - 16),
            borderRadius: `${px(110)}px ${px(110)}px ${px(2)}px ${px(2)}px`,
            overflow: "hidden",
            position: "relative",
            border: `2px solid ${INK}`,
            background: team.primary,
            display: "flex",
          }}
        >
          <Photo src={photo} w={px(500 - 80 - 16 - 4)} h={px(330 - 16 - 4)} />
          <Signature name={signature} color={INK} tilt={-5} size={30} />
        </div>
      </div>

      {/* Name plate */}
      <div
        style={{
          position: "absolute",
          left: px(40),
          right: px(40),
          top: px(528),
          height: px(46),
          background: "#fff",
          border: `3px solid ${INK}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `${px(4)}px ${px(4)}px 0 0 ${team.primary}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "Bebas",
            fontSize: px(name.length > 12 ? 26 : 30),
            letterSpacing: "0.08em",
            color: INK,
            whiteSpace: "nowrap",
            display: "flex",
          }}
        >
          {name.toUpperCase()}
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          left: px(40),
          right: px(40),
          top: px(586),
          height: px(86),
          display: "flex",
          gap: px(8),
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: `3px solid ${INK}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `${px(3)}px ${px(3)}px 0 0 ${team.primary}`,
          }}
        >
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: px(9),
              letterSpacing: "0.25em",
              color: INK,
              opacity: 0.6,
              display: "flex",
            }}
          >
            POS
          </div>
          <div
            style={{
              fontFamily: "Bebas",
              fontSize: px(54),
              color: team.primary,
              lineHeight: 0.95,
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            {position}
          </div>
        </div>
        <div
          style={{
            flex: 1.2,
            background: team.primary,
            border: `3px solid ${INK}`,
            color: lightPrimary ? INK : "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `${px(3)}px ${px(3)}px 0 0 ${INK}`,
          }}
        >
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: px(9),
              letterSpacing: "0.25em",
              opacity: 0.85,
              marginTop: px(4),
              display: "flex",
            }}
          >
            NUMBER
          </div>
          <div
            style={{
              fontFamily: "Bebas",
              fontSize: px(78),
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {number}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: `3px solid ${INK}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `${px(3)}px ${px(3)}px 0 0 ${team.primary}`,
          }}
        >
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: px(9),
              letterSpacing: "0.25em",
              color: INK,
              opacity: 0.6,
              display: "flex",
            }}
          >
            RATING
          </div>
          <div
            style={{
              fontFamily: "Bebas",
              fontSize: px(60),
              color: INK,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            {rating}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          left: px(40),
          right: px(40),
          bottom: px(8),
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Plex Mono",
          fontSize: px(8),
          letterSpacing: "0.2em",
          color: INK,
          opacity: 0.6,
        }}
      >
        <span>{team.confederation}</span>
        <span>WORLD CUP '26</span>
      </div>
    </div>
  );
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return new Response("Bad JSON", { status: 400 });
  const { teamCode, photo, name, position, number, rating } = body as {
    teamCode: string;
    photo: string;
    name: string;
    position: string;
    number: string;
    rating: string;
  };

  const team = teamByCode(teamCode);
  if (!team) return new Response("Unknown team", { status: 400 });
  if (!photo?.startsWith("data:image")) return new Response("Bad photo", { status: 400 });

  const [bs8, bs9, bebas, plex, sig] = await Promise.all([
    loadFont(FONT_URLS.bigShoulders800),
    loadFont(FONT_URLS.bigShoulders900),
    loadFont(FONT_URLS.bebas),
    loadFont(FONT_URLS.plexMono),
    loadFont(FONT_URLS.homemade),
  ]);

  const props = {
    team,
    photo,
    name: name || "Your Name",
    position,
    number,
    rating,
    signature: name || "Your Name",
  };

  const W = px(500);
  const H = px(700);

  return new ImageResponse(<ArchCard {...props} />, {
    width: W,
    height: H,
    fonts: [
      { name: "Big Shoulders", data: bs8, weight: 800, style: "normal" },
      { name: "Big Shoulders", data: bs9, weight: 900, style: "normal" },
      { name: "Bebas", data: bebas, weight: 400, style: "normal" },
      { name: "Plex Mono", data: plex, weight: 600, style: "normal" },
      { name: "Homemade Apple", data: sig, weight: 400, style: "normal" },
    ],
    headers: { "Cache-Control": "no-store" },
  });
}
