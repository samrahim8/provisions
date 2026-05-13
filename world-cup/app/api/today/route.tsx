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
    const res = await fetch(`https://flagcdn.com/w160/${iso}.png`, { cache: "force-cache" });
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

type Match = [string, string, string, string, string, string, string];

const SCHEDULE: Match[] = [
  ["MEX","RSA","Estadio Banorte","Mexico City","2026-06-11T19:00:00Z","Matchday 1","A"],
  ["KOR","CZE","Estadio Akron","Guadalajara","2026-06-12T02:00:00Z","Matchday 1","A"],
  ["CAN","BIH","BMO Field","Toronto","2026-06-12T19:00:00Z","Matchday 1","B"],
  ["USA","PAR","SoFi Stadium","Inglewood","2026-06-13T01:00:00Z","Matchday 1","D"],
  ["QAT","SUI","Levi's Stadium","Santa Clara","2026-06-13T19:00:00Z","Matchday 1","B"],
  ["BRA","MAR","MetLife Stadium","East Rutherford","2026-06-13T22:00:00Z","Matchday 1","C"],
  ["HAI","SCO","Gillette Stadium","Foxborough","2026-06-14T01:00:00Z","Matchday 1","C"],
  ["AUS","TUR","BC Place","Vancouver","2026-06-14T04:00:00Z","Matchday 1","D"],
  ["GER","CUW","NRG Stadium","Houston","2026-06-14T17:00:00Z","Matchday 1","E"],
  ["NED","JPN","AT&T Stadium","Arlington","2026-06-14T20:00:00Z","Matchday 1","F"],
  ["CIV","ECU","Lincoln Financial Field","Philadelphia","2026-06-14T23:00:00Z","Matchday 1","E"],
  ["SWE","TUN","Estadio BBVA","Guadalupe","2026-06-15T02:00:00Z","Matchday 1","F"],
  ["ESP","CPV","Mercedes-Benz Stadium","Atlanta","2026-06-15T16:00:00Z","Matchday 1","H"],
  ["BEL","EGY","Lumen Field","Seattle","2026-06-15T19:00:00Z","Matchday 1","G"],
  ["KSA","URU","Hard Rock Stadium","Miami Gardens","2026-06-15T22:00:00Z","Matchday 1","H"],
  ["IRN","NZL","SoFi Stadium","Inglewood","2026-06-16T01:00:00Z","Matchday 1","G"],
  ["FRA","SEN","MetLife Stadium","East Rutherford","2026-06-16T19:00:00Z","Matchday 1","I"],
  ["IRQ","NOR","Gillette Stadium","Foxborough","2026-06-16T22:00:00Z","Matchday 1","I"],
  ["ARG","ALG","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-17T01:00:00Z","Matchday 1","J"],
  ["AUT","JOR","Levi's Stadium","Santa Clara","2026-06-17T04:00:00Z","Matchday 1","J"],
  ["POR","COD","NRG Stadium","Houston","2026-06-17T17:00:00Z","Matchday 1","K"],
  ["ENG","CRO","AT&T Stadium","Arlington","2026-06-17T20:00:00Z","Matchday 1","L"],
  ["GHA","PAN","BMO Field","Toronto","2026-06-17T23:00:00Z","Matchday 1","L"],
  ["UZB","COL","Estadio Banorte","Mexico City","2026-06-18T02:00:00Z","Matchday 1","K"],
  ["CZE","RSA","Mercedes-Benz Stadium","Atlanta","2026-06-18T16:00:00Z","Matchday 2","A"],
  ["SUI","BIH","SoFi Stadium","Inglewood","2026-06-18T19:00:00Z","Matchday 2","B"],
  ["CAN","QAT","BC Place","Vancouver","2026-06-18T22:00:00Z","Matchday 2","B"],
  ["MEX","KOR","Estadio Akron","Guadalajara","2026-06-19T01:00:00Z","Matchday 2","A"],
  ["USA","AUS","Lumen Field","Seattle","2026-06-19T19:00:00Z","Matchday 2","D"],
  ["SCO","MAR","Gillette Stadium","Foxborough","2026-06-19T22:00:00Z","Matchday 2","C"],
  ["BRA","HAI","Lincoln Financial Field","Philadelphia","2026-06-20T00:30:00Z","Matchday 2","C"],
  ["TUR","PAR","Levi's Stadium","Santa Clara","2026-06-20T03:00:00Z","Matchday 2","D"],
  ["NED","SWE","NRG Stadium","Houston","2026-06-20T17:00:00Z","Matchday 2","F"],
  ["GER","CIV","BMO Field","Toronto","2026-06-20T20:00:00Z","Matchday 2","E"],
  ["ECU","CUW","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-21T00:00:00Z","Matchday 2","E"],
  ["TUN","JPN","Estadio BBVA","Guadalupe","2026-06-21T04:00:00Z","Matchday 2","F"],
  ["ESP","KSA","Mercedes-Benz Stadium","Atlanta","2026-06-21T16:00:00Z","Matchday 2","H"],
  ["BEL","IRN","SoFi Stadium","Inglewood","2026-06-21T19:00:00Z","Matchday 2","G"],
  ["URU","CPV","Hard Rock Stadium","Miami Gardens","2026-06-21T22:00:00Z","Matchday 2","H"],
  ["NZL","EGY","BC Place","Vancouver","2026-06-22T01:00:00Z","Matchday 2","G"],
  ["ARG","AUT","AT&T Stadium","Arlington","2026-06-22T17:00:00Z","Matchday 2","J"],
  ["FRA","IRQ","Lincoln Financial Field","Philadelphia","2026-06-22T21:00:00Z","Matchday 2","I"],
  ["NOR","SEN","MetLife Stadium","East Rutherford","2026-06-23T00:00:00Z","Matchday 2","I"],
  ["JOR","ALG","Levi's Stadium","Santa Clara","2026-06-23T03:00:00Z","Matchday 2","J"],
  ["POR","UZB","NRG Stadium","Houston","2026-06-23T17:00:00Z","Matchday 2","K"],
  ["ENG","GHA","Gillette Stadium","Foxborough","2026-06-23T20:00:00Z","Matchday 2","L"],
  ["PAN","CRO","BMO Field","Toronto","2026-06-23T23:00:00Z","Matchday 2","L"],
  ["COL","COD","Estadio Akron","Guadalajara","2026-06-24T02:00:00Z","Matchday 2","K"],
  ["SUI","CAN","BC Place","Vancouver","2026-06-24T19:00:00Z","Matchday 3","B"],
  ["BIH","QAT","Lumen Field","Seattle","2026-06-24T19:00:00Z","Matchday 3","B"],
  ["SCO","BRA","Hard Rock Stadium","Miami Gardens","2026-06-24T22:00:00Z","Matchday 3","C"],
  ["MAR","HAI","Mercedes-Benz Stadium","Atlanta","2026-06-24T22:00:00Z","Matchday 3","C"],
  ["CZE","MEX","Estadio Azteca","Mexico City","2026-06-25T01:00:00Z","Matchday 3","A"],
  ["RSA","KOR","Estadio BBVA","Guadalupe","2026-06-25T01:00:00Z","Matchday 3","A"],
  ["CUW","CIV","Lincoln Financial Field","Philadelphia","2026-06-25T20:00:00Z","Matchday 3","E"],
  ["ECU","GER","MetLife Stadium","East Rutherford","2026-06-25T20:00:00Z","Matchday 3","E"],
  ["JPN","SWE","AT&T Stadium","Arlington","2026-06-25T23:00:00Z","Matchday 3","F"],
  ["TUN","NED","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-25T23:00:00Z","Matchday 3","F"],
  ["TUR","USA","SoFi Stadium","Inglewood","2026-06-26T02:00:00Z","Matchday 3","D"],
  ["PAR","AUS","Levi's Stadium","Santa Clara","2026-06-26T02:00:00Z","Matchday 3","D"],
  ["NOR","FRA","Gillette Stadium","Foxborough","2026-06-26T19:00:00Z","Matchday 3","I"],
  ["SEN","IRQ","BMO Field","Toronto","2026-06-26T19:00:00Z","Matchday 3","I"],
  ["EGY","IRN","Lumen Field","Seattle","2026-06-27T03:00:00Z","Matchday 3","G"],
  ["NZL","BEL","BC Place","Vancouver","2026-06-27T03:00:00Z","Matchday 3","G"],
  ["CPV","KSA","NRG Stadium","Houston","2026-06-27T00:00:00Z","Matchday 3","H"],
  ["URU","ESP","Estadio Akron","Guadalajara","2026-06-27T00:00:00Z","Matchday 3","H"],
  ["PAN","ENG","MetLife Stadium","East Rutherford","2026-06-27T21:00:00Z","Matchday 3","L"],
  ["CRO","GHA","Lincoln Financial Field","Philadelphia","2026-06-27T21:00:00Z","Matchday 3","L"],
  ["COL","POR","Hard Rock Stadium","Miami Gardens","2026-06-27T23:30:00Z","Matchday 3","K"],
  ["COD","UZB","Mercedes-Benz Stadium","Atlanta","2026-06-27T23:30:00Z","Matchday 3","K"],
  ["ALG","AUT","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-28T02:00:00Z","Matchday 3","J"],
  ["JOR","ARG","AT&T Stadium","Arlington","2026-06-28T02:00:00Z","Matchday 3","J"],
];

function lum(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
function onColor(hex: string): string {
  return lum(hex) > 0.55 ? "#1A1A1A" : "#FFFFFF";
}

function dayKeyET(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date(iso));
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit",
    timeZone: "America/New_York", hour12: true
  });
}

function formatHeaderDate(dateKey: string): string {
  const d = new Date(dateKey + "T12:00:00-05:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long", month: "short", day: "numeric",
    timeZone: "America/New_York",
  }).toUpperCase();
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

function findMatches(dateKey: string, team: string): Match[] {
  let matches = SCHEDULE.filter((m) => dayKeyET(m[4]) === dateKey);
  if (team && TEAMS[team]) {
    matches = matches.filter((m) => m[0] === team || m[1] === team);
  }
  return matches.sort((a, b) => new Date(a[4]).getTime() - new Date(b[4]).getTime());
}

function findNextDateWithMatches(fromKey: string, team: string): string | null {
  const sorted = [...SCHEDULE].sort((a, b) => new Date(a[4]).getTime() - new Date(b[4]).getTime());
  for (const m of sorted) {
    const k = dayKeyET(m[4]);
    if (k <= fromKey) continue;
    if (team && TEAMS[team] && m[0] !== team && m[1] !== team) continue;
    return k;
  }
  return null;
}

function todayKeyET(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const team = (url.searchParams.get("team") || "").toUpperCase();
  const requested = url.searchParams.get("date") || todayKeyET();

  let dateKey = requested;
  let matches = findMatches(dateKey, team);
  let isFallback = false;
  if (!matches.length) {
    const nextKey = findNextDateWithMatches(dateKey, team);
    if (nextKey) {
      dateKey = nextKey;
      matches = findMatches(dateKey, team);
      isFallback = true;
    }
  }

  // Load flags for all teams in shown matches
  const codes = Array.from(new Set(matches.flatMap((m) => [m[0], m[1]])));
  const flags: Record<string, string | null> = {};
  await Promise.all(codes.map(async (c) => {
    flags[c] = await loadFlag(c);
  }));

  const [bs900, plex, mark] = await Promise.all([
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-900-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf"),
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark-white.png").catch(() => ""),
  ]);

  const LEATHER = "#1A1A1A";
  const CREAM = "#F0E9DC";
  const PARCHMENT = "#F5F1EB";
  const TERRACOTTA = "#C8462E";
  const TEXT = "#2C2118";

  const headerLabel = isFallback ? "NEXT MATCHDAY" : "TODAY";
  const subLabel = `${matches.length} match${matches.length === 1 ? "" : "es"} · ${formatHeaderDate(dateKey)} · ALL TIMES ET`;
  const teamLine = team && TEAMS[team] ? `${TEAMS[team].name.toUpperCase()} · ` : "";

  // Heights — keep total = 1920
  const TOP = 80;
  const HEADER = matches.length <= 3 ? 380 : matches.length <= 5 ? 320 : 280;
  const FOOTER = 120;
  const rowsTotal = 1920 - TOP - HEADER - FOOTER;
  const ROW_H = Math.floor(rowsTotal / Math.max(matches.length, 1));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1920,
          display: "flex",
          flexDirection: "column",
          background: PARCHMENT,
          fontFamily: "BigShoulders",
        }}
      >
        {/* Top context strip — centered tournament + optional team */}
        <div
          style={{
            height: TOP,
            background: LEATHER,
            color: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 56px",
            flexShrink: 0,
            fontFamily: "PlexMono",
            fontSize: 24,
            letterSpacing: "0.32em",
            fontWeight: 600,
          }}
        >
          <span style={{ opacity: 0.95, display: "flex" }}>{teamLine}WORLD CUP '26</span>
        </div>

        {/* Big header */}
        <div
          style={{
            height: HEADER,
            background: PARCHMENT,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 56px",
            flexShrink: 0,
            borderBottom: `3px solid ${TEXT}`,
          }}
        >
          <div
            style={{
              fontFamily: "BigShoulders",
              fontWeight: 900,
              fontSize: matches.length <= 3 ? 280 : 220,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: TEXT,
              display: "flex",
            }}
          >
            {headerLabel}
          </div>
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 22,
              letterSpacing: "0.22em",
              color: TEXT,
              opacity: 0.7,
              fontWeight: 600,
              marginTop: 24,
              textTransform: "uppercase",
              display: "flex",
              textAlign: "center",
            }}
          >
            {subLabel}
          </div>
        </div>

        {/* Match rows */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: PARCHMENT,
          }}
        >
          {matches.map((m, idx) => {
            const [h, a, , , iso, , group] = m;
            const home = TEAMS[h] || { name: h, primary: "#1A1A1A" };
            const away = TEAMS[a] || { name: a, primary: "#1A1A1A" };
            const homeText = onColor(home.primary);
            const awayText = onColor(away.primary);
            const time = formatTime(iso);
            const isLast = idx === matches.length - 1;

            return (
              <div
                key={idx}
                style={{
                  height: ROW_H,
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: isLast ? "none" : `1px dashed rgba(44,33,24,0.18)`,
                }}
              >
                {/* HOME half */}
                <div
                  style={{
                    flex: 1,
                    background: home.primary,
                    color: homeText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 28,
                    gap: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "BigShoulders",
                        fontWeight: 900,
                        fontSize: 110,
                        letterSpacing: "-0.01em",
                        lineHeight: 0.85,
                        color: homeText,
                        display: "flex",
                      }}
                    >
                      {h}
                    </div>
                  </div>
                  {flags[h] ? (
                    <img
                      src={flags[h] as string}
                      width={80}
                      height={56}
                      style={{
                        width: 80,
                        height: 56,
                        objectFit: "cover",
                        border: `2px solid ${homeText}`,
                      }}
                    />
                  ) : null}
                </div>

                {/* Center */}
                <div
                  style={{
                    width: 220,
                    background: PARCHMENT,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    borderLeft: `2px solid ${TEXT}`,
                    borderRight: `2px solid ${TEXT}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "BigShoulders",
                      fontWeight: 900,
                      fontSize: ROW_H < 200 ? 36 : 48,
                      letterSpacing: "-0.01em",
                      color: TEXT,
                      lineHeight: 1,
                      display: "flex",
                    }}
                  >
                    {time}
                  </div>
                  {group ? (
                    <div
                      style={{
                        fontFamily: "PlexMono",
                        fontSize: 12,
                        letterSpacing: "0.22em",
                        color: TERRACOTTA,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        border: `1px solid ${TERRACOTTA}`,
                        display: "flex",
                      }}
                    >
                      GROUP {group}
                    </div>
                  ) : null}
                </div>

                {/* AWAY half */}
                <div
                  style={{
                    flex: 1,
                    background: away.primary,
                    color: awayText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: 28,
                    gap: 18,
                  }}
                >
                  {flags[a] ? (
                    <img
                      src={flags[a] as string}
                      width={80}
                      height={56}
                      style={{
                        width: 80,
                        height: 56,
                        objectFit: "cover",
                        border: `2px solid ${awayText}`,
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "BigShoulders",
                        fontWeight: 900,
                        fontSize: 110,
                        letterSpacing: "-0.01em",
                        lineHeight: 0.85,
                        color: awayText,
                        display: "flex",
                      }}
                    >
                      {a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer — single centered mark + URL */}
        <div
          style={{
            height: FOOTER,
            background: LEATHER,
            color: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "0 56px",
            flexShrink: 0,
          }}
        >
          {mark ? (
            <img src={mark} width={32} height={32} style={{ width: 32, height: 32 }} />
          ) : null}
          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 24,
              letterSpacing: "0.28em",
              color: CREAM,
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
