type StatKeys = keyof Omit<StatRatings, "totalScore" | "gameCount">;

const STAT_LABELS: Record<StatKeys, string> = {
  kda:               "KDA",
  kp:                "Kill participation",
  deathShare:        "Death share",
  visionScorePerMin: "Vision / min",
  csPerMin:          "CS / min",
  goldPerMin:        "Gold / min",
  winRate:           "Win rate",
};

function barColor(v: number) {
  if (v >= 9) return "#c89b3c";
  if (v >= 6) return "#4a8a6a";
  if (v >= 4) return "#5580b8";
  return "#f44336";
}

export default function StatsOverview({ ratings }: { ratings: StatRatings }) {
  const { totalScore: _1, gameCount, ...statView } = ratings;
  const entries = Object.entries(statView) as [StatKeys, number][];
  const ranked = entries.filter(([key]) => key !== "winRate");
  const best  = ranked.reduce((a, b) => b[1] > a[1] ? b : a);
  const worst = ranked.reduce((a, b) => b[1] < a[1] ? b : a);

  const summary = [
    { label: "Best stat",  value: STAT_LABELS[best[0]],  color: "#c89b3c" },
    { label: "Needs work", value: STAT_LABELS[worst[0]], color: "#5580b8" },
    { label: "Games",      value: String(gameCount),     color: "#e8e0d0" },
  ];

  return (
    <div
      className="rounded-sm w-full max-w-xl"
      style={{
        background: "rgba(7, 11, 22, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(200, 155, 60, 0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4">
        <p className="text-[10px] tracking-widest uppercase mb-5" style={{ color: "#4a6080" }}>
          Stat ratings
        </p>
        <div className="grid grid-cols-2 gap-x-8">
          {entries.map(([key, value]) => (
            <div key={key} className="py-2.5" style={{ borderBottom: "1px solid rgba(30,58,95,0.5)" }}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs" style={{ color: "#8a9ab0" }}>{STAT_LABELS[key]}</span>
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: barColor(value), fontFamily: "Georgia, serif" }}
                >
                  {value.toFixed(1)}
                </span>
              </div>
              <div className="h-0.5 rounded-full" style={{ background: "rgba(13,27,42,0.8)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(value / 10) * 100}%`,
                    background: barColor(value),
                    opacity: 0.8,
                    transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px" style={{ background: "rgba(200,155,60,0.12)" }} />

      {/* Footer */}
      <div className="px-6 py-4 flex gap-10">
        {summary.map(({ label, value, color }) => (
          <div key={label}>
            <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#4a6080" }}>
              {label}
            </p>
            <p
              className="text-lg font-bold"
              style={{ color, fontFamily: "Georgia, serif" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}