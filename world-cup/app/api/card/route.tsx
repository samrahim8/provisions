import { ImageResponse } from "next/og";
import { teamByCode, type Team } from "@/lib/teams";
import { flagUrl } from "@/lib/flagIso";

export const runtime = "edge";

const FONT_URLS = {
  bigShoulders800: "https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-800-normal.ttf",
  bigShoulders900: "https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-900-normal.ttf",
  bebas: "https://cdn.jsdelivr.net/fontsource/fonts/bebas-neue@latest/latin-400-normal.ttf",
  plexMono: "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf",
  homemade: "https://cdn.jsdelivr.net/fontsource/fonts/homemade-apple@latest/latin-400-normal.ttf",
  garamond: "https://cdn.jsdelivr.net/fontsource/fonts/eb-garamond@latest/latin-700-normal.ttf",
  garamondItalic: "https://cdn.jsdelivr.net/fontsource/fonts/eb-garamond@latest/latin-500-italic.ttf",
  playfairSc: "https://cdn.jsdelivr.net/fontsource/fonts/playfair-display-sc@latest/latin-700-normal.ttf",
};

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error("Font fetch failed: " + url);
  return res.arrayBuffer();
}

async function loadImageDataUrl(req: Request, path: string): Promise<string> {
  const url = new URL(path, req.url).toString();
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error("Image fetch failed: " + path);
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return `data:image/png;base64,${btoa(bin)}`;
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
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  // sRGB → linear, then relative luminance (WCAG)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  // 0.55 threshold: yellow, light blue, pale colors → light; saturated reds, navy, forest green → dark
  return L > 0.55;
}

// Stricter check — only true for near-white. Used by displayPrimary so yellow/light-blue
// teams still paint themselves and only ENG/GHA/etc. fall through to a contrast color.
function isNearWhite(hex: string): boolean {
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

// The "team color" used for visible elements. Falls back when primary is white-ish.
function displayPrimary(team: Team): string {
  return isNearWhite(team.primary) ? contrastColor(team) : team.primary;
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

function BrandMark({ markUrl }: { markUrl: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={markUrl}
        width={px(20)}
        height={px(20)}
        style={{ display: "block", objectFit: "contain" }}
      />
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

type BrandOverlay = {
  mode: "stamp" | "footer" | "stripe";
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
} | null;

// --- Arch (B) ---
type Rarity = "standard" | "silver" | "gold" | "platinum" | "holo";

// ── Foil backgrounds: each is a stack of (top→bottom):
//   1) bright specular highlight (upper-left)
//   2) softer secondary highlight (lower-right)
//   3) brushed-metal striations (subtle diagonal pearl streaks)
//   4) base metallic gradient (palette oscillates for polished-metal look)
const GOLD_BG =
  // White-hot specular highlight (upper left, intense)
  "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.95) 0%, rgba(255,250,210,0.45) 10%, rgba(255,255,255,0) 32%)," +
  // Secondary specular (upper right)
  "radial-gradient(circle at 78% 22%, rgba(255,245,200,0.6) 0%, rgba(255,255,255,0) 22%)," +
  // Warm copper glow (lower middle)
  "radial-gradient(ellipse at 50% 82%, rgba(255,205,110,0.5) 0%, rgba(255,205,110,0) 50%)," +
  // Edge darkening (vignette) — makes highlights pop harder
  "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)," +
  // Crosshatch pearl streaks — primary diagonal
  "repeating-linear-gradient(112deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 7px, rgba(255,255,255,0.22) 9px, rgba(255,255,255,0) 12px)," +
  // Crosshatch pearl streaks — perpendicular (creates faceted shimmer)
  "repeating-linear-gradient(22deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 16px, rgba(255,255,255,0.1) 17px, rgba(255,255,255,0) 20px)," +
  // Rose-gold warm tint band (adds color variation across the metal)
  "linear-gradient(160deg, rgba(255,170,120,0) 0%, rgba(255,170,120,0.28) 50%, rgba(255,170,120,0) 100%)," +
  // Base metallic — full dynamic range, deep mahogany shadows to white-hot peak
  "linear-gradient(135deg, #2E1A05 0%, #6B3F0A 8%, #9F6B14 16%, #D49733 26%, #F0C04A 36%, #FFE49A 44%, #FFFAE0 50%, #FFE49A 56%, #F0C04A 64%, #D49733 74%, #9F6B14 84%, #6B3F0A 92%, #2E1A05 100%)";

const SILVER_BG =
  "radial-gradient(ellipse at 22% 14%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 45%)," +
  "radial-gradient(ellipse at 82% 88%, rgba(210,225,240,0.45) 0%, rgba(210,225,240,0) 45%)," +
  "repeating-linear-gradient(112deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 10px, rgba(255,255,255,0.18) 12px, rgba(255,255,255,0) 16px)," +
  "linear-gradient(135deg, #3E4751 0%, #79858F 10%, #B5BEC7 22%, #E2E7EC 34%, #FAFBFC 44%, #E2E7EC 54%, #B5BEC7 66%, #79858F 78%, #3E4751 100%)";

const PLATINUM_BG =
  "radial-gradient(ellipse at 22% 14%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 48%)," +
  "radial-gradient(ellipse at 82% 88%, rgba(225,235,250,0.4) 0%, rgba(225,235,250,0) 45%)," +
  "repeating-linear-gradient(112deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 12px, rgba(255,255,255,0.2) 14px, rgba(255,255,255,0) 18px)," +
  "linear-gradient(135deg, #6E7884 0%, #9BA4AE 10%, #C9D0D7 22%, #E8ECF1 32%, #F6F8FA 42%, #FFFFFF 50%, #F6F8FA 58%, #E8ECF1 68%, #C9D0D7 78%, #9BA4AE 88%, #6E7884 100%)";

const HOLO_BG =
  "radial-gradient(ellipse at 22% 16%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 50%)," +
  "radial-gradient(ellipse at 80% 88%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 45%)," +
  "repeating-linear-gradient(112deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 14px, rgba(255,255,255,0.16) 16px, rgba(255,255,255,0) 20px)," +
  "linear-gradient(135deg, #FF5FA3 0%, #FFB061 12%, #FFE56D 24%, #8AF2A1 38%, #5FD2FF 52%, #B58AFF 66%, #FF6BD2 80%, #FFB061 100%)";

function paperBg(rarity: Rarity): string {
  switch (rarity) {
    case "gold": return GOLD_BG;
    case "silver": return SILVER_BG;
    case "platinum": return PLATINUM_BG;
    case "holo": return HOLO_BG;
    default: return PAPER;
  }
}

function ArchCard({
  team,
  photo,
  name,
  position,
  number,
  rating,
  signature,
  markUrl,
  brand,
  rarity = "standard",
  holoSerial,
}: {
  team: Team;
  photo: string;
  name: string;
  position: string;
  number: string;
  rating: string;
  signature: string;
  markUrl: string;
  brand?: BrandOverlay;
  rarity?: Rarity;
  holoSerial?: string;
}) {
  const accentColor = contrastColor(team);
  const teamColor = displayPrimary(team);
  const lightPrimary = isLight(teamColor);
  const fullCountry = fullName(team);
  const longCountry = fullCountry.length > 8;

  return (
    <div
      style={{
        width: px(500),
        height: px(700),
        background: paperBg(rarity),
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
          background: paperBg(rarity),
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
        <BrandMark markUrl={markUrl} />
        {brand?.mode === "stamp" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: `2px solid ${INK}`,
              padding: `${px(6)}px ${px(10)}px`,
              transform: "rotate(-4deg)",
              background: PAPER,
            }}
          >
            <div
              style={{
                fontFamily: "Bebas",
                fontSize: px(14),
                letterSpacing: "0.18em",
                color: INK,
                lineHeight: 1,
                display: "flex",
              }}
            >
              {brand.name.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "Plex Mono",
                fontSize: px(7),
                letterSpacing: "0.22em",
                color: INK,
                opacity: 0.75,
                marginTop: px(3),
                display: "flex",
              }}
            >
              {brand.tagline}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
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
              {team.confederation}
            </div>
            <FedBadge team={team} size={22} />
          </div>
        )}
      </div>

      {/* Edge stripe (Fellow direction) */}
      {brand?.mode === "stripe" && (
        <div
          style={{
            position: "absolute",
            left: px(22),
            top: px(170),
            bottom: px(22),
            width: px(28),
            background: brand.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              transform: "rotate(-90deg)",
              fontFamily: "Bebas",
              fontSize: px(13),
              letterSpacing: "0.36em",
              color: brand.accent,
              whiteSpace: "nowrap",
              display: "flex",
            }}
          >
            {brand.name.toUpperCase()} · {brand.tagline}
          </div>
        </div>
      )}

      {/* Country banner — flat ribbon with edge stripes + flanking stars */}
      {(() => {
        const onTeam = isLight(teamColor) ? INK : "#FFFFFF";
        const bannerTop = px(74);
        const bannerHeight = px(50);
        const stripeColor = accentColor;
        const bannerFontSize = px(longCountry ? 24 : 30);
        return (
          <div
            style={{
              position: "absolute",
              left: px(30),
              right: px(30),
              top: bannerTop,
              height: bannerHeight,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: px(4), background: stripeColor, display: "flex" }} />
            <div
              style={{
                flex: 1,
                background: teamColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: `0 ${px(14)}px`,
                position: "relative",
              }}
            >
              {(() => {
                const fUrl = flagUrl(team.code, 80);
                return fUrl ? (
                  <div
                    style={{
                      width: px(32),
                      height: px(24),
                      border: `1px solid ${onTeam}`,
                      overflow: "hidden",
                      display: "flex",
                      background: "#fff",
                    }}
                  >
                    <img
                      src={fUrl}
                      width={px(32)}
                      height={px(24)}
                      style={{ width: px(32), height: px(24), objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: px(6) }}>
                    <Star size={10} color={onTeam} />
                    <Star size={10} color={onTeam} />
                  </div>
                );
              })()}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Bebas",
                    fontSize: bannerFontSize,
                    letterSpacing: "0.18em",
                    color: onTeam,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    display: "flex",
                  }}
                >
                  {fullCountry.toUpperCase()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: px(6) }}>
                <Star size={10} color={onTeam} />
                <Star size={10} color={onTeam} />
              </div>
            </div>
            <div style={{ height: px(4), background: stripeColor, display: "flex" }} />
          </div>
        );
      })()}

      {/* Photo in stadium-shape frame */}
      <div
        style={{
          position: "absolute",
          left: px(40),
          top: px(144),
          width: px(500 - 80),
          height: px(320),
          background: teamColor,
          borderRadius: `${px(120)}px ${px(120)}px ${px(6)}px ${px(6)}px`,
          padding: px(8),
          display: "flex",
        }}
      >
        <div
          style={{
            width: px(500 - 80 - 16),
            height: px(320 - 16),
            borderRadius: `${px(110)}px ${px(110)}px ${px(2)}px ${px(2)}px`,
            overflow: "hidden",
            position: "relative",
            border: `2px solid ${INK}`,
            background: teamColor,
            display: "flex",
          }}
        >
          <Photo src={photo} w={px(500 - 80 - 16 - 4)} h={px(320 - 16 - 4)} />
          <Signature name={signature} color={INK} tilt={-5} size={30} />
        </div>
      </div>

      {/* Name plate */}
      <div
        style={{
          position: "absolute",
          left: px(40),
          right: px(40),
          top: px(484),
          height: px(44),
          background: "#fff",
          border: `3px solid ${INK}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `${px(4)}px ${px(4)}px 0 0 ${teamColor}`,
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
          top: px(546),
          height: px(96),
          display: "flex",
          gap: px(8),
          alignItems: "stretch",
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
            boxShadow: `${px(3)}px ${px(3)}px 0 0 ${teamColor}`,
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
              color: lightPrimary ? accentColor : teamColor,
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
            flex: 1.3,
            alignSelf: "flex-end",
            height: px(108),
            background: teamColor,
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
              color: lightPrimary ? INK : "#FFFFFF",
              opacity: lightPrimary ? 0.7 : 0.95,
              marginTop: px(4),
              display: "flex",
            }}
          >
            NUMBER
          </div>
          <div
            style={{
              fontFamily: "Bebas",
              fontSize: px(86),
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
            boxShadow: `${px(3)}px ${px(3)}px 0 0 ${teamColor}`,
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
      {brand?.mode === "footer" ? (
        <div
          style={{
            position: "absolute",
            left: px(40),
            right: px(40),
            bottom: px(28),
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: px(8) }}>
            <div
              style={{
                fontFamily: "Garamond",
                fontWeight: 700,
                fontSize: px(20),
                letterSpacing: "0.02em",
                color: brand.primary,
                lineHeight: 1,
                display: "flex",
              }}
            >
              {brand.name.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "Plex Mono",
                fontSize: px(8),
                letterSpacing: "0.22em",
                color: INK,
                opacity: 0.6,
                display: "flex",
              }}
            >
              · {brand.tagline}
            </div>
          </div>
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: px(8),
              letterSpacing: "0.2em",
              color: INK,
              opacity: 0.65,
              display: "flex",
            }}
          >
            SUMMER '26
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: px(40),
            right: px(40),
            bottom: px(30),
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Plex Mono",
            fontSize: px(8),
            letterSpacing: "0.2em",
            color: INK,
            opacity: 0.65,
          }}
        >
          <span>SERIES ONE · {todayStamp()}</span>
          <span>SUMMER '26</span>
        </div>
      )}

    </div>
  );
}


type BrandKitDef = {
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  defaultTeam: string;
  mode: "stamp" | "footer" | "stripe";
};
const BRAND_KITS: Record<string, BrandKitDef> = {
  guinness: {
    name: "Guinness",
    tagline: "EST. 1759",
    primary: "#1A1A1A",
    secondary: "#E8DFC9",
    accent: "#C8A24B",
    defaultTeam: "ENG",
    mode: "stamp",
  },
  mundial: {
    name: "Mundial",
    tagline: "ISSUE XXVI",
    primary: "#D32027",
    secondary: "#F2EFE8",
    accent: "#0F0F0F",
    defaultTeam: "BRA",
    mode: "footer",
  },
  fellow: {
    name: "Fellow",
    tagline: "BREW · PLAY",
    primary: "#1F1F1F",
    secondary: "#E8E0D6",
    accent: "#C9785F",
    defaultTeam: "JPN",
    mode: "stripe",
  },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const brandKey = (url.searchParams.get("brand") || "").toLowerCase();
  const kit = BRAND_KITS[brandKey];
  const teamCode = (url.searchParams.get("team") || (kit ? kit.defaultTeam : "USA")).toUpperCase();
  const baseTeam = teamByCode(teamCode) || teamByCode("USA");
  if (!baseTeam) return new Response("Unknown team", { status: 400 });

  // Keep the country's own colors — brand sits as a subtle overlay, not a repaint
  const team: Team = baseTeam;
  const brandOverlay: BrandOverlay = kit
    ? { mode: kit.mode, name: kit.name, tagline: kit.tagline, primary: kit.primary, secondary: kit.secondary, accent: kit.accent }
    : null;

  const [bs8, bs9, bebas, plex, sig, garamond, garamondItalic, playfairSc, photoData] = await Promise.all([
    loadFont(FONT_URLS.bigShoulders800),
    loadFont(FONT_URLS.bigShoulders900),
    loadFont(FONT_URLS.bebas),
    loadFont(FONT_URLS.plexMono),
    loadFont(FONT_URLS.homemade),
    loadFont(FONT_URLS.garamond),
    loadFont(FONT_URLS.garamondItalic),
    loadFont(FONT_URLS.playfairSc),
    loadImageDataUrl(req, "/world-cup/card-generator/sam.png"),
  ]);

  const W = px(500);
  const H = px(700);
  const fonts = [
    { name: "Big Shoulders", data: bs8, weight: 800 as const, style: "normal" as const },
    { name: "Big Shoulders", data: bs9, weight: 900 as const, style: "normal" as const },
    { name: "Bebas", data: bebas, weight: 400 as const, style: "normal" as const },
    { name: "Plex Mono", data: plex, weight: 600 as const, style: "normal" as const },
    { name: "Homemade Apple", data: sig, weight: 400 as const, style: "normal" as const },
    { name: "Garamond", data: garamond, weight: 700 as const, style: "normal" as const },
    { name: "GaramondItalic", data: garamondItalic, weight: 500 as const, style: "italic" as const },
    { name: "PlayfairSc", data: playfairSc, weight: 700 as const, style: "normal" as const },
  ];

  const [markDark, markLight] = await Promise.all([
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark.png"),
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark-white.png"),
  ]);
  const markUrl = isLight(PAPER) ? markDark : markLight;

  const rarity = (url.searchParams.get("rarity") || "standard").toLowerCase() as Rarity;
  const holoSerial = url.searchParams.get("serial") || undefined;

  const props = {
    team,
    photo: photoData,
    name: "Sam Rahim",
    position: "MID",
    number: "8",
    rating: "92",
    signature: "Sam Rahim",
    markUrl,
    brand: brandOverlay,
    rarity,
    holoSerial,
  };

  return new ImageResponse(<ArchCard {...props} />, {
    width: W,
    height: H,
    fonts,
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return new Response("Bad JSON", { status: 400 });
  const { teamCode, photo, name, position, number, rating, rarity: rarityIn } = body as {
    teamCode: string;
    photo: string;
    name: string;
    position: string;
    number: string;
    rating: string;
    rarity?: string;
  };

  const team = teamByCode(teamCode);
  if (!team) return new Response("Unknown team", { status: 400 });
  const hasUserPhoto = typeof photo === "string" && photo.startsWith("data:image");

  const [bs8, bs9, bebas, plex, sig, markDark, markLight, defaultPhoto] = await Promise.all([
    loadFont(FONT_URLS.bigShoulders800),
    loadFont(FONT_URLS.bigShoulders900),
    loadFont(FONT_URLS.bebas),
    loadFont(FONT_URLS.plexMono),
    loadFont(FONT_URLS.homemade),
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark.png"),
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark-white.png"),
    hasUserPhoto ? Promise.resolve("") : loadImageDataUrl(req, "/world-cup/card-generator/sam.png"),
  ]);
  const photoToUse = hasUserPhoto ? photo : defaultPhoto;

  const markUrl = isLight(PAPER) ? markDark : markLight;
  const validRarities: Rarity[] = ["standard", "silver", "gold", "platinum", "holo"];
  const rarity: Rarity = (validRarities.includes(rarityIn as Rarity) ? rarityIn : "standard") as Rarity;

  const props = {
    team,
    photo: photoToUse,
    name: name || "Your Name",
    position,
    number,
    rating,
    signature: name || "Your Name",
    markUrl,
    rarity,
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
