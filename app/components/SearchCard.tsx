"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });

const REGIONS = ["EUW", "EUNE", "NA", "KR", "BR", "LAN", "LAS", "OCE", "TR", "RU", "JP", "SG", "TW", "VN"];
const TAG_REGEX = /^[a-zA-Z0-9]{3,5}$/;

interface SummonerInput {
  name: string;
  tag: string;
}

export default function SearchCard() {
  const router = useRouter();
  const [region, setRegion] = useState("EUW");
  const [player1, setPlayer1] = useState<SummonerInput>({ name: "", tag: "" });
  const [player2, setPlayer2] = useState<SummonerInput>({ name: "", tag: "" });

  useEffect(() => {
		const getSaveNames = () => {
			const savedNames = localStorage.getItem("players");
			if (savedNames) {
				const [p1, p2] = JSON.parse(savedNames);
				setPlayer1(p1);
				setPlayer2(p2);
			}
      const savedRegion = localStorage.getItem("region");
      if (savedRegion) {
        setRegion(savedRegion)
      }
		}
		getSaveNames();
  }, []);

  const isValid = !!(
    player1.name.trim() &&
    player2.name.trim() &&
    TAG_REGEX.test(player1.tag) &&
    TAG_REGEX.test(player2.tag)
  );

  const handleSubmit = () => {
    if (!isValid) return;
    localStorage.setItem(
      "players",
      JSON.stringify([
        { name: player1.name, tag: player1.tag },
        { name: player2.name, tag: player2.tag },
      ])
    );
    localStorage.setItem(
      "region",
      region
    )
    router.push(
      `/stats?region=${region.toLowerCase()}&username1=${player1.name}&tag1=${player1.tag}&username2=${player2.name}&tag2=${player2.tag}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) handleSubmit();
  };

  const inputStyle = {
    background: "rgba(4, 7, 14, 0.6)",
    border: "1px solid rgba(30, 58, 95, 0.8)",
    color: "#e8e0d0",
    caretColor: "#c89b3c",
  };

  const players = [
    { label: "Player One", value: player1, set: setPlayer1 },
    { label: "Player Two", value: player2, set: setPlayer2 },
  ] as const;

  return (
    <div
      className="relative overflow-hidden rounded-sm p-6 flex flex-col gap-5"
      style={{
        background: "rgba(7, 11, 22, 0.90)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(200, 155, 60, 0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Region selector */}
      <div>
        <label
          className="text-[10px] tracking-widest uppercase block mb-2"
          style={{ color: "#4a6080" }}
        >
          Region
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className={`w-full text-sm px-3 py-2.5 rounded-sm outline-none transition-all duration-150 ${rajdhani.className}`}
          style={{ background: "rgba(4, 7, 14, 0.6)", border: "1px solid rgba(30, 58, 95, 0.8)", color: "#e8e0d0" }}
          onFocus={(e) => (e.target.style.borderColor = "#c89b3c66")}
          onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
        >
          {REGIONS.map((r) => (
            <option key={r} value={r} style={{ background: "#0d1117" }}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Divider */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, #1e3a5f, transparent)" }}
      />

      {/* Player inputs */}
      {players.map(({ label, value, set }) => (
        <div key={label}>
          <label
            className="text-[10px] tracking-widest uppercase block mb-2"
            style={{ color: "#4a6080" }}
          >
            {label}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Summoner Name"
              value={value.name}
              onChange={(e) => set((prev) => ({ ...prev, name: e.target.value }))}
              onKeyDown={handleKeyDown}
              className={`flex-1 text-sm px-3 py-2.5 rounded-sm outline-none transition-all duration-150 ${rajdhani.className}`}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#c89b3c66")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
            <div className="flex items-center text-sm font-bold" style={{ color: "#1e3a5f" }}>
              #
            </div>
            <input
              type="text"
              placeholder="TAG"
              value={value.tag}
              maxLength={5}
              onChange={(e) => set((prev) => ({ ...prev, tag: e.target.value }))}
              onKeyDown={handleKeyDown}
              className={`w-20 text-sm px-3 py-2.5 rounded-sm outline-none transition-all duration-150 ${rajdhani.className}`}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#c89b3c66")}
              onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
            />
          </div>
        </div>
      ))}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`w-full py-3 text-sm font-bold tracking-widest uppercase rounded-sm ${rajdhani.className} ${
          isValid
            ? "bg-[#c89b3c] border border-[#c89b3c] text-[#0a0e1a] cursor-pointer shadow-[0_4px_20px_rgba(200,155,60,0.2)]"
            : "bg-[#0a0e1a] border border-[#1e3a5f] text-[#2a3a4a] cursor-not-allowed"
        }`}
      >
        Search
      </button>
    </div>
  );
}