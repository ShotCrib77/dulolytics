import Image from "next/image";
import { DDRAGON_VERSION } from "../lib/constants";

interface PlayerCardProps {
  gameName: string;
  tagLine: string;
  profileIconId: number;
}

export default function PlayerCard({ gameName, tagLine, profileIconId }: PlayerCardProps) {
  return (
    <div
      className="relative px-5 py-4 h-fit rounded-sm flex items-center gap-4 overflow-hidden"
      style={{
        background: "rgba(7, 11, 22, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(200, 155, 60, 0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="relative rounded-sm overflow-hidden" style={{ border: "1px solid rgba(200,155,60,0.2)" }}>
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${profileIconId}.png`}
          height={64}
          width={64}
          alt={`${gameName} profile icon`}
        />
      </div>
      <h2 className="text-xl font-semibold" style={{ color: "#e8e0d0", fontFamily: "Georgia, serif" }}>
        {gameName}{" "}
        <span className="text-base font-normal" style={{ color: "rgba(200,155,60,0.6)" }}>
          #{tagLine}
        </span>
      </h2>
    </div>
  );
}