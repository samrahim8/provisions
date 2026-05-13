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

function lum(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
function onColor(hex: string): string {
  return lum(hex) > 0.55 ? "#1A1A1A" : "#F0E9DC";
}

function dayContext(): string {
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const team = (url.searchParams.get("team") || "USA").toUpperCase();
  const tInfo = TEAMS[team] || { name: team, primary: "#1A1A1A" };
  const bg = tInfo.primary;
  const text = onColor(bg);
  const accentText = lum(bg) > 0.55 ? "rgba(26,33,24,0.7)" : "rgba(240,233,220,0.78)";

  const [bs900, plex, cardImg, mark] = await Promise.all([
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-900-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf"),
    loadImageDataUrl(req, `/world-cup/card-generator/api/card?team=${encodeURIComponent(team)}`).catch(() => ""),
    loadImageDataUrl(req, lum(bg) > 0.55
      ? "/world-cup/card-generator/provisions-mark.png"
      : "/world-cup/card-generator/provisions-mark-white.png").catch(() => ""),
  ]);

  const TOP = 100;
  const FOOTER = 140;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1920,
          display: "flex",
          flexDirection: "column",
          background: bg,
          color: text,
          fontFamily: "BigShoulders",
          position: "relative",
        }}
      >
        {/* Top strip — team name, centered */}
        <div
          style={{
            height: TOP,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 56px",
            flexShrink: 0,
            fontFamily: "PlexMono",
            fontSize: 24,
            letterSpacing: "0.32em",
            fontWeight: 600,
            borderBottom: `2px solid ${accentText}`,
          }}
        >
          <span style={{ color: text, opacity: 0.95, display: "flex" }}>{tInfo.name.toUpperCase()}</span>
        </div>

        {/* Card area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Subtle radial vignette using a stacked dim div — keeps satori happy */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.18) 100%)`,
              display: "flex",
            }}
          />
          {cardImg ? (
            <img
              src={cardImg}
              width={820}
              height={1148}
              style={{
                width: 820,
                height: 1148,
                boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 16px 32px rgba(0,0,0,0.22)",
              }}
            />
          ) : null}
        </div>

        {/* Bottom strip — single centered mark + URL */}
        <div
          style={{
            height: FOOTER,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "0 56px",
            flexShrink: 0,
            borderTop: `2px solid ${accentText}`,
          }}
        >
          {mark ? (
            <img src={mark} width={36} height={36} style={{ width: 36, height: 36 }} />
          ) : null}
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 24,
              letterSpacing: "0.28em",
              color: text,
              opacity: 0.95,
              fontWeight: 600,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            PROVISIONS.WORK/WORLD-CUP
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
      ],
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    },
  );
}
