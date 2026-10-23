import { ImageResponse } from "next/og";

export const alt = "Addis Eats — Ethiopian food and traditional favorites";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #451a03, #b45309, #fef3c7)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#fde68a", fontWeight: 700 }}>
          ETHIOPIAN FOOD
        </div>
        <div style={{ fontSize: 92, fontWeight: 800, marginTop: 24 }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 34, marginTop: 24 }}>
          Traditional flavors. Made for sharing.
        </div>
      </div>
    ),
    size
  );
}
