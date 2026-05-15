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

export async function GET(req: Request) {
  const PAPER = "#F5F0E0";
  const INK = "#1a1a1a";
  const TERRACOTTA = "#C8462E";

  const [bigShoulders900, plexMono, mark, cardImage] = await Promise.all([
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/big-shoulders-display@latest/latin-900-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf"),
    loadImageDataUrl(req, "/world-cup/card-generator/provisions-mark.png"),
    loadImageDataUrl(req, "/world-cup/card-generator/api/card?team=USA").catch(() => ""),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: PAPER,
          display: "flex",
          fontFamily: "BigShoulders",
          position: "relative",
        }}
      >
        {/* Subtle grid backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(120,108,92,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,108,92,0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            display: "flex",
          }}
        />

        {/* Left: typography */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 56px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={mark} width={28} height={28} style={{ width: 28, height: 28 }} />
            <div
              style={{
                fontFamily: "PlexMono",
                fontSize: 14,
                letterSpacing: "0.22em",
                color: INK,
                opacity: 0.7,
                display: "flex",
              }}
            >
              PROVISIONS · SUMMER '26
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 132,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                color: INK,
                fontWeight: 900,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ display: "flex" }}>A lineup</span>
              <span style={{ display: "flex" }}>of goods</span>
              <span style={{ display: "flex" }}>
                for <span style={{ color: TERRACOTTA, marginLeft: 16, display: "flex" }}>'26.</span>
              </span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: INK,
                opacity: 0.78,
                display: "flex",
                marginTop: 8,
              }}
            >
              Summer '26 products for brands, agencies + fans.
            </div>
          </div>

          <div
            style={{
              fontFamily: "PlexMono",
              fontSize: 12,
              letterSpacing: "0.22em",
              color: INK,
              opacity: 0.55,
              display: "flex",
            }}
          >
            PROVISIONS.WORK/WORLD-CUP
          </div>
        </div>

        {/* Right: card preview */}
        <div
          style={{
            width: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            position: "relative",
          }}
        >
          {cardImage ? (
            <img
              src={cardImage}
              width={400}
              height={560}
              style={{
                width: 400,
                height: 560,
                boxShadow: "0 30px 60px rgba(26,23,20,0.30), 0 8px 20px rgba(26,23,20,0.18)",
                transform: "rotate(3deg)",
              }}
            />
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "BigShoulders", data: bigShoulders900, style: "normal", weight: 900 },
        { name: "PlexMono", data: plexMono, style: "normal", weight: 600 },
      ],
    },
  );
}
