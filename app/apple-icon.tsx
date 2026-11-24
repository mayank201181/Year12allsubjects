import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -2 }}>IB DP</div>
        <div
          style={{
            marginTop: 8,
            padding: "4px 16px",
            borderRadius: 999,
            background: "#fbbf24",
            color: "#0f172a",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          Year 12–13 Hub
        </div>
      </div>
    ),
    { ...size },
  );
}
