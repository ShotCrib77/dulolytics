import { RATING_BENCHMARKS } from "./constants";

function getPlayerStatsPerGame(p: Participant, teamKills: number, teamDeaths: number, gameDuration: number) {
    const kda = (p.kills + p.assists) / p.deaths;
    const kp = (p.kills + p.assists) / teamKills;
    const deathShare = p.deaths / teamDeaths;
    const visionScorePerMin = p.visionScore / (gameDuration / 60);
    const csPerMin = p.totalMinionsKilled / (gameDuration / 60);
    const goldPerMin = p.goldEarned / (gameDuration / 60);
    return { kda, kp, deathShare, visionScorePerMin, csPerMin, goldPerMin };
}

export function calculateData(processedMatchStats: ProcessedMatchStats[]) {
    
    // Process and combined the individual stats for each game
    const individualStats = processedMatchStats.map((match) => {
        const teammateKills = match.teammates.reduce((sum, t) => sum + t.kills, 0);
        const teammateDeaths = match.teammates.reduce((sum, t) => sum + t.deaths, 0);
        const totalKills = teammateKills + match.player1.kills + match.player2.kills;
        const totalDeaths = teammateDeaths + match.player1.deaths + match.player2.deaths;

        const statsPlayer1 = getPlayerStatsPerGame(match.player1, totalKills, totalDeaths, match.gameDuration);
        const statsPlayer2 = getPlayerStatsPerGame(match.player2, totalKills, totalDeaths, match.gameDuration);

        return { statsPlayer1, statsPlayer2, won: match.win };
    });

    const combinedIndividualStats = individualStats.reduce((acc, match) => {
        acc.kda += (match.statsPlayer1.kda + match.statsPlayer2.kda) / 2;
        acc.kp += (match.statsPlayer1.kp + match.statsPlayer2.kp) / 2;
        acc.deathShare += match.statsPlayer1.deathShare + match.statsPlayer2.deathShare;
        acc.visionScorePerMin += (match.statsPlayer1.visionScorePerMin + match.statsPlayer2.visionScorePerMin);
        acc.csPerMin += (match.statsPlayer1.csPerMin + match.statsPlayer2.csPerMin) / 2;
        acc.goldPerMin += (match.statsPlayer1.goldPerMin + match.statsPlayer2.goldPerMin) / 2;
        acc.wins += match.won ? 1 : 0
        return acc;
    }, { kda: 0, kp: 0, deathShare: 0, visionScorePerMin: 0, csPerMin: 0, goldPerMin: 0, wins: 0 });

    const matchCount = individualStats.length;

    const averagedStats = {
        kda: Math.round(combinedIndividualStats.kda / matchCount * 10) / 10,
        kp: Math.round(combinedIndividualStats.kp / matchCount * 100 * 10) / 10,
        deathShare: Math.round(combinedIndividualStats.deathShare / matchCount * 10) / 10,
        visionScorePerMin: Math.round(combinedIndividualStats.visionScorePerMin / matchCount * 10) / 10,
        csPerMin: Math.round(combinedIndividualStats.csPerMin / matchCount * 10) / 10,
        goldPerMin: Math.round(combinedIndividualStats.goldPerMin / matchCount * 10) / 10,
        winRate: Math.round((combinedIndividualStats.wins / matchCount) * 10) / 10,
        matchCount: matchCount,
    };

    const ratings = {
        kda: getRating('kda', averagedStats.kda),
        kp: getRating('kp', averagedStats.kp),
        deathShare: getRating('deathShare', averagedStats.deathShare),
        visionScorePerMin: getRating('visionScorePerMin', averagedStats.visionScorePerMin),
        csPerMin: getRating('csPerMin', averagedStats.csPerMin),
        goldPerMin: getRating('goldPerMin', averagedStats.goldPerMin),
        winRate: getRating('winRate', averagedStats.winRate),
    };

    const statRatings = {
        ...ratings,
        totalScore: Math.round(Object.values(ratings).reduce((sum, v) => sum! + v!, 0)! * 1.25),
        gameCount: matchCount,
    };

    return statRatings;
}

function getRating(stat: keyof typeof RATING_BENCHMARKS, value: number) {
  const breakpoints = RATING_BENCHMARKS[stat];
  if (!breakpoints) return null;

  // Count how many breakpoints the value exceeds
  const ascending = breakpoints[0] < breakpoints[breakpoints.length - 1];
  const score = breakpoints.filter(bp => ascending ? value > bp : value < bp).length;
  return score + 1; // 0 breakpoints exceeded = rating 1, all 9 = rating 10
}