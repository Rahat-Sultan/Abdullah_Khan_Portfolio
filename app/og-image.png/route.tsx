/**
 * GET /og-image.png
 * Dynamically generated Open Graph image using Next.js ImageResponse.
 * 1200×630 px — dark galactic theme to match the portfolio.
 */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #070308 0%, #2a0610 50%, #0b0418 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,77,109,0.25) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Initials badge */}
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff4d6d, #c81d4a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.8rem",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "28px",
            boxShadow: "0 0 60px rgba(255,77,109,0.5)",
          }}
        >
          AK
        </div>

        <p
          style={{
            fontSize: "52px",
            fontWeight: "700",
            color: "#f6e9ee",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Abdullah Khan
        </p>

        <p
          style={{
            fontSize: "26px",
            color: "#ff4d6d",
            margin: "0 0 20px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Digital Marketing Specialist
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#c9a8b4",
            margin: 0,
          }}
        >
          Gulberg, Islamabad &nbsp;·&nbsp; Meta Ads &nbsp;·&nbsp; Social Media &nbsp;·&nbsp; WordPress
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
