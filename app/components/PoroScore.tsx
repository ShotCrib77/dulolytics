"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const POROS = [
  { min: 80, src: "/poros/poro-love.webp" },
  { min: 60, src: "/poros/poro-happy.webp" },
  { min: 40, src: "/poros/poro-ok.webp" },
  { min: 20, src: "/poros/poro-sad.webp" },
  { min: 0,  src: "/poros/poro-crying.png" },
];

function getPoro(score: number) {
  return POROS.find(p => score >= p.min) ?? POROS[4];
}

function scoreColor(score: number) {
  if (score >= 80) return "#c89b3c";
  if (score >= 60) return "#4a8a6a";
  if (score >= 40) return "#5580b8";
  return "#f44336";
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);
  return count;
}

export default function PoroScore({ score }: { score: number }) {
  const count = useCountUp(score);
  const poro = getPoro(score);
  const color = scoreColor(score);

  return (
    <div className="flex flex-col items-center gap-1">
      <Image src={poro.src} width={72} height={72} alt="poro" className="order-2 lg:order-1" />
      <div className="flex flex-col items-center gap-0.5 order-1 lg:order-2">
        <span
          className="tabular-nums leading-none"
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            color,
            textShadow: `0 0 40px ${color}55`,
          }}
        >
          {count}
          <span style={{ fontSize: "2rem", color: "rgba(200,155,60,0.6)" }}>%</span>
        </span>
        <span className="text-[10px] tracking-widest uppercase my-1" style={{ color: "#4a6080" }}>
          compatibility
        </span>
      </div>
    </div>
  );
}