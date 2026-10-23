import { ImageResponse } from "next/og";
import { getDishById } from "@/lib/dishes";

export const alt = "Addis Eats Ethiopian dish";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  const name = dish?.name ?? "Ethiopian Favorites";
  const description =
    dish?.description ?? "Discover Ethiopian favorites at Addis Eats.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #451a03, #b45309, #fef3c7)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#fde68a" }}>
          ADDIS EATS
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            marginTop: 28,
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 29,
            marginTop: 24,
            maxWidth: "950px",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
        <div style={{ fontSize: 25, marginTop: 35, color: "#fde68a" }}>
          Ethiopian flavor, served with love
        </div>
      </div>
    ),
    size
  );
}
