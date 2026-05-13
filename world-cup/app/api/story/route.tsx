import { ImageResponse } from "next/og";

export const runtime = "edge";

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

async function loadFlag(code: string): Promise<string | null> {
  const iso = FIFA_TO_ISO[code];
  if (!iso) return null;
  try {
    const res = await fetch(`https://flagcdn.com/w320/${iso}.png`, { cache: "force-cache" });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return `data:image/png;base64,${btoa(bin)}`;
  } catch {
    return null;
  }
}

// ── Team data: primary kit color + full name (mirror of hub WC_TEAMS) ──
const TEAMS: Record<string, { name: string; primary: string }> = {
  USA: { name: "United States", primary: "#0A2D5C" },
  MEX: { name: "Mexico", primary: "#006847" },
  CAN: { name: "Canada", primary: "#D52B1E" },
  ENG: { name: "England", primary: "#C8102E" },
  FRA: { name: "France", primary: "#0055A4" },
  GER: { name: "Germany", primary: "#000000" },
  ESP: { name: "Spain", primary: "#AA151B" },
  POR: { name: "Portugal", primary: "#C8102E" },
  NED: { name: "Netherlands", primary: "#E55A1C" },
  BEL: { name: "Belgium", primary: "#C8102E" },
  CRO: { name: "Croatia", primary: "#D90F1B" },
  SUI: { name: "Switzerland", primary: "#D52B1E" },
  AUT: { name: "Austria", primary: "#ED2939" },
  NOR: { name: "Norway", primary: "#BA0C2F" },
  SCO: { name: "Scotland", primary: "#0A2D5C" },
  SWE: { name: "Sweden", primary: "#FECC00" },
  TUR: { name: "Türkiye", primary: "#E30A17" },
  BIH: { name: "Bosnia & Herzegovina", primary: "#002395" },
  CZE: { name: "Czechia", primary: "#D7141A" },
  MAR: { name: "Morocco", primary: "#C1272D" },
  SEN: { name: "Senegal", primary: "#00853F" },
  TUN: { name: "Tunisia", primary: "#E70013" },
  ALG: { name: "Algeria", primary: "#006233" },
  EGY: { name: "Egypt", primary: "#CE1126" },
  GHA: { name: "Ghana", primary: "#CE1126" },
  CIV: { name: "Côte d'Ivoire", primary: "#F77F00" },
  CPV: { name: "Cape Verde", primary: "#6CACDE" },
  RSA: { name: "South Africa", primary: "#FFB81C" },
  COD: { name: "DR Congo", primary: "#4FA8DC" },
  JPN: { name: "Japan", primary: "#0A2D5C" },
  IRN: { name: "Iran", primary: "#239F40" },
  KOR: { name: "South Korea", primary: "#CD2E3A" },
  AUS: { name: "Australia", primary: "#FFCD00" },
  KSA: { name: "Saudi Arabia", primary: "#006C35" },
  QAT: { name: "Qatar", primary: "#8A1538" },
  UZB: { name: "Uzbekistan", primary: "#0099B5" },
  JOR: { name: "Jordan", primary: "#CE1126" },
  IRQ: { name: "Iraq", primary: "#007A3D" },
  ARG: { name: "Argentina", primary: "#74ACDF" },
  BRA: { name: "Brazil", primary: "#FFCB05" },
  URU: { name: "Uruguay", primary: "#5DA9DD" },
  COL: { name: "Colombia", primary: "#FCD116" },
  ECU: { name: "Ecuador", primary: "#FFD100" },
  PAR: { name: "Paraguay", primary: "#D52B1E" },
  PAN: { name: "Panama", primary: "#D32B1E" },
  CUW: { name: "Curaçao", primary: "#002B7F" },
  HAI: { name: "Haiti", primary: "#00209F" },
  NZL: { name: "New Zealand", primary: "#000000" },
};

const FIFA_TO_ISO: Record<string, string> = {
  MEX: "mx", RSA: "za", KOR: "kr", CZE: "cz", CAN: "ca", BIH: "ba", QAT: "qa", SUI: "ch",
  USA: "us", PAR: "py", AUS: "au", TUR: "tr", BRA: "br", MAR: "ma", HAI: "ht", SCO: "gb-sct",
  GER: "de", CUW: "cw", CIV: "ci", ECU: "ec", NED: "nl", JPN: "jp", SWE: "se", TUN: "tn",
  BEL: "be", EGY: "eg", IRN: "ir", NZL: "nz", ESP: "es", CPV: "cv", KSA: "sa", URU: "uy",
  FRA: "fr", SEN: "sn", IRQ: "iq", NOR: "no", ARG: "ar", ALG: "dz", AUT: "at", JOR: "jo",
  POR: "pt", COD: "cd", UZB: "uz", COL: "co", ENG: "gb-eng", CRO: "hr", GHA: "gh", PAN: "pa",
};

// ── Color helpers ──
function lum(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
function onColor(hex: string): string {
  return lum(hex) > 0.55 ? "#1A1A1A" : "#FFFFFF";
}

// ── Urgency + day-of-tournament strings ──
function urgencyText(iso: string): string {
  const now = Date.now();
  const kickoff = new Date(iso).getTime();
  const diff = kickoff - now;
  if (diff < 0) {
    const hoursAgo = Math.floor((now - kickoff) / 3600000);
    if (hoursAgo < 3) return "LIVE";
    return "FULL TIME";
  }
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `KICKS OFF IN ${mins}M`;
  if (hours < 24) return `KICKS OFF IN ${hours}H`;
  if (days === 1) return "KICKS OFF TOMORROW";
  return `KICKS OFF IN ${days}D`;
}

function dayContext(iso: string): string {
  const opener = new Date("2026-06-11T19:00:00Z").getTime();
  const final = new Date("2026-07-19T23:00:00Z").getTime();
  const now = Date.now();
  const dayMs = 86400000;
  if (now < opener) {
    const days = Math.max(1, Math.ceil((opener - now) / dayMs));
    return `DAY ${days} OF THE WAIT`;
  }
  if (now <= final) {
    const days = Math.floor((now - opener) / dayMs) + 1;
    return `DAY ${days} OF THE TOURNAMENT`;
  }
  return "MMXXVI · IN THE BOOKS";
}

function formatKickoff(iso: string): { time: string; date: string } {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    hour12: true,
  });
  const date = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
  return { time: `${time} ET`, date: date.toUpperCase() };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const h = (url.searchParams.get("h") || "MEX").toUpperCase();
  const a = (url.searchParams.get("a") || "RSA").toUpperCase();
  const iso = url.searchParams.get("iso") || "2026-06-11T19:00:00Z";
  const venue = url.searchParams.get("venue") || "Estadio Banorte";
  const city = url.searchParams.get("city") || "Mexico City";
  const group = url.searchParams.get("group") || "";
  const round = url.searchParams.get("round") || "Matchday 1";

  const home = TEAMS[h] || { name: h, primary: "#1A1A1A" };
  const away = TEAMS[a] || { name: a, primary: "#1A1A1A" };
  const homeText = onColor(home.primary);
  const awayText = onColor(away.primary);

  const [bs900, plex, garamondItalic, hFlag, aFlag, mark] = await Promise.all([
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-900-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/eb-garamond@latest/latin-500-italic.ttf"),
    loadFlag(h),
    loadFlag(a),
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark-white.png").catch(() => ""),
  ]);

  const kick = formatKickoff(iso);
  const urgency = urgencyText(iso);
  const dayCtx = dayContext(iso);
  const contextLine = group ? `GROUP ${group} · ${round.toUpperCase()}` : round.toUpperCase();

  const STRIP_H = 80;
  const VS_H = 110;
  const FOOT_H = 240;
  const LEATHER = "#1A1A1A";
  const CREAM = "#F0E9DC";
  const TERRACOTTA = "#C8462E";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1920,
          display: "flex",
          flexDirection: "column",
          fontFamily: "BigShoulders",
          position: "relative",
        }}
      >
        {/* Urgency strip (top) */}
        <div
          style={{
            height: STRIP_H,
            background: LEATHER,
            color: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 56px",
            fontFamily: "PlexMono",
            fontSize: 22,
            letterSpacing: "0.28em",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <span style={{ color: TERRACOTTA, display: "flex" }}>{urgency}</span>
          <span style={{ opacity: 0.7, display: "flex" }}>{contextLine}</span>
        </div>

        {/* HOME half */}
        <div
          style={{
            flex: 1,
            background: home.primary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "40px 60px",
          }}
        >
          {hFlag ? (
            <img
              src={hFlag}
              width={240}
              height={160}
              style={{
                width: 240,
                height: 160,
                objectFit: "cover",
                border: `4px solid ${homeText}`,
                marginBottom: 28,
                display: "flex",
              }}
            />
          ) : null}
          <div
            style={{
              fontFamily: "BigShoulders",
              fontWeight: 900,
              fontSize: 360,
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              color: homeText,
              display: "flex",
            }}
          >
            {h}
          </div>
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 26,
              letterSpacing: "0.32em",
              color: homeText,
              opacity: 0.85,
              fontWeight: 600,
              marginTop: 28,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {home.name}
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            height: VS_H,
            background: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: `3px solid ${LEATHER}`,
            borderBottom: `3px solid ${LEATHER}`,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "GaramondItalic",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 88,
              letterSpacing: "0.02em",
              color: LEATHER,
              lineHeight: 1,
              display: "flex",
            }}
          >
            vs
          </div>
        </div>

        {/* AWAY half */}
        <div
          style={{
            flex: 1,
            background: away.primary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "40px 60px",
          }}
        >
          {aFlag ? (
            <img
              src={aFlag}
              width={240}
              height={160}
              style={{
                width: 240,
                height: 160,
                objectFit: "cover",
                border: `4px solid ${awayText}`,
                marginBottom: 28,
                display: "flex",
              }}
            />
          ) : null}
          <div
            style={{
              fontFamily: "BigShoulders",
              fontWeight: 900,
              fontSize: 360,
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              color: awayText,
              display: "flex",
            }}
          >
            {a}
          </div>
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 26,
              letterSpacing: "0.32em",
              color: awayText,
              opacity: 0.85,
              fontWeight: 600,
              marginTop: 28,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {away.name}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            height: FOOT_H,
            background: LEATHER,
            color: CREAM,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
            <div
              style={{
                fontFamily: "BigShoulders",
                fontWeight: 900,
                fontSize: 108,
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
                color: CREAM,
                display: "flex",
              }}
            >
              {kick.time}
            </div>
            <div
              style={{
                fontFamily: "PlexMono",
                fontSize: 24,
                letterSpacing: "0.24em",
                color: TERRACOTTA,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {kick.date}
            </div>
          </div>
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 22,
              letterSpacing: "0.18em",
              color: CREAM,
              opacity: 0.7,
              fontWeight: 600,
              textTransform: "uppercase",
              marginTop: 16,
              display: "flex",
            }}
          >
            {venue} · {city}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                width: "100%",
              }}
            >
              {mark ? (
                <img src={mark} width={24} height={24} style={{ width: 24, height: 24 }} />
              ) : null}
              <div
                style={{
                  fontFamily: "PlexMono",
                  fontSize: 18,
                  letterSpacing: "0.24em",
                  color: CREAM,
                  opacity: 0.78,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                PROVISIONS.WORK/WORLD-CUP
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        { name: "BigShoulders", data: bs900, style: "normal", weight: 900 },
        { name: "PlexMono", data: plex, style: "normal", weight: 600 },
        { name: "GaramondItalic", data: garamondItalic, style: "italic", weight: 500 },
      ],
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    },
  );
}
