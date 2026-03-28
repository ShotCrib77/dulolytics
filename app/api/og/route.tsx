import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { DDRAGON_VERSION } from "@/app/lib/constants";

// Helper to fetch an image URL and convert to base64 data URI
async function imageToBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mimeType = res.headers.get("content-type") || "image/png";
  return `data:${mimeType};base64,${base64}`;
}

const CJK_FONT_FAMILY = "'Beaufort', 'NotoSC', 'NotoTC', 'NotoKR', 'NotoJP'";
 
const mainFont = fs.readFileSync(path.join(process.cwd(), "public/fonts/BeaufortforLOL-Bold.ttf")).buffer;
const notoSC = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSerifSC-Regular.ttf")).buffer;
const notoTC = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSerifTC-Regular.ttf")).buffer;
const notoKR = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSerifKR-Regular.ttf")).buffer;
const notoJP = fs.readFileSync(path.join(process.cwd(), "public/fonts/NotoSerifJP-Regular.ttf")).buffer;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
 
  const username1 = searchParams.get("username1") ?? "Player 1";
  const tag1 = searchParams.get("tag1") ?? "TAG1";
  const username2 = searchParams.get("username2") ?? "Player 2";  
  const tag2 = searchParams.get("tag2") ?? "TAG2";
  const score = searchParams.get("score") ?? "??";
 
  const profileIconId1 = searchParams.get("profileIconId1");
  const profileIconId2 = searchParams.get("profileIconId2");
	
  const profileIconUrl1 = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${profileIconId1}.png`	
  const profileIconUrl2 = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${profileIconId2}.png`

  const [icon1, icon2] = await Promise.all([
    profileIconId1 ? imageToBase64(profileIconUrl1) : null,
    profileIconId2 ? imageToBase64(profileIconUrl2) : null,
  ]);

  const scoreColor = !score ? "#f44336" : Number(score) >= 80 ? "#c89b3c" : Number(score) >= 60 ? "#4a8a6a" : Number(score) >= 40 ? "#5580b8" : "#f44336";
    
  const svg = await satori(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#0a0e1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 80px",
        fontFamily: "Beaufort",
        position: "relative",
      }}
    >
      {/* Player 1 */}
      <div
        style={{
          padding: "24px 30px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "rgba(7, 11, 22, 0.9)",
          border: "1px solid rgba(200, 155, 60, 0.18)",
        }}
      >
        {icon1 && (
					// eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon1}
            height={64}
            width={64}
            alt={`${username1} profile icon`}
            style={{
              borderRadius: "4px",
              border: "1px solid rgba(200,155,60,0.2)",
            }}
          />
        )}
        <div style={{ display: "flex", gap: "6px", alignItems: "center", fontFamily: CJK_FONT_FAMILY }}>
          <span style={{ color: "#e8e0d0", fontSize: "24px", fontWeight: 600 }}>
            {username1}
          </span>
          <span style={{ color: "rgba(200,155,60,0.6)", fontSize: "20px" }}>
            #{tag1}
          </span>
        </div>
      </div>
 
      {/* Center score */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
          <span
            style={{ color: scoreColor, fontSize: "96px", fontWeight: 700, lineHeight: 1 }}
          >
            {score}
          </span>
          <span style={{ color: scoreColor, fontSize: "48px", fontWeight: 700 }}>
            %
          </span>
        </div>
        <span
          style={{
            color: "#8a9bb5",
            fontSize: "18px",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Compatibility
        </span>
        <span style={{ color: "#c89b3c", fontSize: "14px", marginTop: "8px", letterSpacing: "2px" }}>
          duLOLytics.shotcrib.com
        </span>
      </div>
 
      {/* Player 2 */}
      <div
        style={{
          padding: "24px 32px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "rgba(7, 11, 22, 0.9)",
          border: "1px solid rgba(200, 155, 60, 0.18)",
        }}
      >
        {icon2 && (
					// eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon2}
            height={64}
            width={64}
            alt={`${username2} profile icon`}
            style={{
              borderRadius: "4px",
              border: "1px solid rgba(200,155,60,0.2)",
            }}
          />
        )}
        <div style={{ display: "flex", gap: "6px", alignItems: "center", fontFamily: CJK_FONT_FAMILY }}>
          <span style={{ color: "#e8e0d0", fontSize: "24px", fontWeight: 600 }}>
            {username2}
          </span>
          <span style={{ color: "rgba(200,155,60,0.6)", fontSize: "20px" }}>
            #{tag2}
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Beaufort", data: mainFont, weight: 700, style: "normal" },
        { name: "NotoSC",   data: notoSC,   weight: 400, style: "normal" },
        { name: "NotoTC",   data: notoTC,   weight: 400, style: "normal" },
        { name: "NotoKR",   data: notoKR,   weight: 400, style: "normal" },
        { name: "NotoJP",   data: notoJP,   weight: 400, style: "normal" },
      ],
    }
  );
 
  // Convert SVG to PNG with Sharp
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
 
  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}