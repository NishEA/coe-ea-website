import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await readFile(
    join(
      process.cwd(),
      "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"
    )
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060d2e",
          borderRadius: "50%",
        }}
      >
        {/* Monogram */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 220,
              fontFamily: "Geist",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            EA
          </div>
          {/* Cerulean rule */}
          <div
            style={{
              width: 120,
              height: 6,
              background: "#00a4e4",
              borderRadius: 3,
              marginTop: 16,
            }}
          />
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
