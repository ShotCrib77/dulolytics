export const DDRAGON_VERSION = "16.5.1"

export const POSITION_ORDER: Record<string, number> = {
    TOP: 0,
    JUNGLE: 1,
    MIDDLE: 2,
    BOTTOM: 3,
    UTILITY: 4,
};

export const RATING_BENCHMARKS = {
  kda:               [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0],
  kp:                [20,  28,  35,  42,  48,  54,  60,  67,  75 ],
  deathShare:        [0.60, 0.55, 0.50, 0.40, 0.35, 0.30, 0.25, 0.20, 0.15 ],
  visionScorePerMin: [0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.6, 2.0, 2.5],
  csPerMin:          [3.0, 4.0, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
  goldPerMin:        [250, 300, 340, 370, 400, 430, 460, 490, 530],
  winRate:           [0.3, 0.4, 0.45, 0.48, 0.5, 0.52, 0.55, 0.6, 0.7],
};

export type Platform = "euw1" | "eun1" | "na1" | "kr" | "br1" | "la1" | "la2" | "oc1" | "tr1" | "ru" | "jp1" | "sg2" | "tw2" | "vn2";
export type Regional = "europe" | "americas" | "asia" | "sea";

export const PLATFORM_TO_REGIONAL: Record<Platform, Regional> = {
  euw1: "europe",
  eun1: "europe",
  tr1:  "europe",
  ru:   "europe",
  na1:  "americas",
  br1:  "americas",
  la1:  "americas",
  la2:  "americas",
  kr:   "asia",
  jp1:  "asia",
  oc1:  "sea",
  sg2:  "sea",
  tw2:  "sea",
  vn2:  "sea",
};

export const REGION_TO_PLATFORM: Record<string, Platform> = {
  "EUW":  "euw1",
  "EUNE": "eun1",
  "NA":   "na1",
  "KR":   "kr",
  "BR":   "br1",
  "LAN":  "la1",
  "LAS":  "la2",
  "OCE":  "oc1",
  "TR":   "tr1",
  "RU":   "ru",
  "JP":   "jp1",
  "SG":   "sg2",
  "TW":   "tw2",
  "VN":   "vn2",
};