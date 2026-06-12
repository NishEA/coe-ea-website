import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Centre of Excellence on Efficiency Augmentation — A STPI · KITS · HPE Initiative, Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fontData, logoData] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"
      )
    ),
    readFile(join(process.cwd(), "public/logos/coe-ea.png"), "base64"),
  ]);

  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#060d2e",
          padding: "56px 72px",
        }}
      >
        {/* Top row: logo + initiative tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} height={44} style={{ objectFit: "contain" }} />
          <div
            style={{
              color: "#00a4e4",
              fontSize: 12,
              letterSpacing: "0.22em",
              fontFamily: "Geist",
              textTransform: "uppercase",
            }}
          >
            STPI · KITS · HPE Initiative
          </div>
        </div>

        {/* Cerulean rule */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(0,164,228,0.5) 0%, rgba(0,164,228,0.05) 100%)",
            marginTop: 36,
            marginBottom: 60,
          }}
        />

        {/* Main headline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#b7cfe8",
              fontSize: 14,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontFamily: "Geist",
              marginBottom: 22,
            }}
          >
            Centre of Excellence
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.05,
              fontFamily: "Geist",
              letterSpacing: "-0.025em",
            }}
          >
            <div style={{ color: "#ffffff", fontSize: 80 }}>Efficiency</div>
            <div style={{ color: "#00a4e4", fontSize: 80 }}>Augmentation</div>
          </div>
          <div
            style={{
              color: "rgba(183,207,232,0.55)",
              fontSize: 18,
              fontFamily: "Geist",
              marginTop: 28,
              letterSpacing: "0.02em",
            }}
          >
            Accelerating I4.0 adoption across Indian industry
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: "1px solid rgba(183,207,232,0.1)",
          }}
        >
          <div
            style={{
              color: "rgba(183,207,232,0.4)",
              fontSize: 13,
              fontFamily: "Geist",
              letterSpacing: "0.12em",
            }}
          >
            coe-ea-website.vercel.app
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,164,228,0.12)",
              border: "1px solid rgba(0,164,228,0.35)",
              padding: "9px 22px",
              borderRadius: 3,
              color: "#00a4e4",
              fontSize: 12,
              fontFamily: "Geist",
              letterSpacing: "0.18em",
            }}
          >
            APPLY NOW ›
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
