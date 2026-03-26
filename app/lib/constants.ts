export const DDRAGON_VERSION = "16.5.1"

export const POSITION_ORDER: Record<string, number> = {
  TOP: 0,
  JUNGLE: 1,
  MIDDLE: 2,
  BOTTOM: 3,
  UTILITY: 4,
};

export const RATING_BENCHMARKS = {
  //        1          2      3      4      5      6      7      8     9    10
  kda:               [0.5,  0.85,  1.25,  1.70,  2.20,  2.75,  3.35,  4.0,  5.0 ],
  kp:                [20,   26,    32,    38,    44,    50,    56,    63,   72  ],
  deathShare:        [0.60, 0.545, 0.49,  0.435, 0.38,  0.345, 0.325, 0.31, 0.275 ],
  visionScorePerMin: [0.50, 0.65,  0.75,  0.80,  0.9,  0.95,  1.0,  1.1,  1.2 ],
  csPerMin:          [3.0,  3.6,   4.25,  4.9,   5.5,   6.0,   6.5,   7.1,  8.0 ],
  goldPerMin:        [250,  285,   322,   358,   394,   422,   452,   484,  530 ],
  winRate:           [0.30, 0.38,  0.44,  0.47,  0.50,  0.525, 0.55,  0.60, 0.65],
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