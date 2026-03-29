import { withCache } from "./cache";
import { Platform } from "./constants";
import { calculateData } from "./duoStats";
import { redis } from "./redis";
import { batchFetch, regionalFromPlatform } from "./utility";

const riotApiKey = process.env.RIOT_API_KEY;

if (!riotApiKey) {
    throw new Error("Missing environment variable: RIOT_API_KEY");
}

export async function getUser(username: string, tag: string, platform: Platform = "euw1"): Promise<RiotAccount> {
    const regional = regionalFromPlatform(platform);
    const data = await withCache(
        `account:${username}:${tag}`,
        async () => {
            const res = await fetch(`https://${regional}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}`, {
                headers: { "X-Riot-Token": riotApiKey! }
            });
            if (!res.ok) throw new Error("Error getting user");
            return res.json();
        }
    );
    return {
        puuid: data.puuid as string,
        gameName: data.gameName as string,
        tagLine: data.tagLine as string,
    };
}

export async function getProfile(puuid: string, platform: Platform = "euw1"): Promise<SummonerProfile> {
    const data = await withCache(
        `profile:${puuid}`,
        async () => {
            const res = await fetch(`https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
                headers: { "X-Riot-Token": riotApiKey! }
            });
            if (!res.ok) throw new Error("Error getting profile");
            return res.json();
        }
    );
    return {
        profileIconId: data.profileIconId as number,
        revisionDate: data.revisionDate as number,
        summonerLevel: data.summonerLevel as number,
    };
}

export async function getMatchIds(puuid: string, platform: Platform = "euw1"): Promise<string[]> {
    const regional = regionalFromPlatform(platform);
    const res = await fetch(`https://${regional}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=100`, {
        headers: { "X-Riot-Token": riotApiKey! }
    });
    if (!res.ok) throw new Error("Error getting match ids");
    return res.json();
}

export async function getPlayerData(username: string, tag: string, platform: Platform = "euw1") {
    const account = await getUser(username, tag, platform);

    const [profile, matchIds] = await Promise.all([
        getProfile(account.puuid, platform),
        getMatchIds(account.puuid, platform),
    ]);

    return { account, profile, matchIds };
}

export async function getMatchData(matchId: string, platform: Platform = "euw1"): Promise<Match> {
    const regional = regionalFromPlatform(platform);
    return withCache(
        `match:${matchId}`,
        async () => {
            const res = await fetch(`https://${regional}.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
                headers: { "X-Riot-Token": riotApiKey! }
            });
            if (!res.ok) throw new Error("Error getting match");
            const data = await res.json();
            return {
                metadata: {
                    matchId: data.metadata.matchId,
                    participants: data.metadata.participants,
                },
                info: {
                    gameVersion: data.info.gameVersion,
                    queueId: data.info.queueId,
                    gameDuration: data.info.gameDuration,
                    participants: data.info.participants.map((p: Participant & Record<string, unknown>) => ({
                        puuid: p.puuid,
                        championName: p.championName,
                        teamPosition: p.teamPosition,
                        teamId: p.teamId,
                        win: p.win,
                        kills: p.kills,
                        deaths: p.deaths,
                        assists: p.assists,
                        summonerName: p.summonerName,
                        totalMinionsKilled: p.totalMinionsKilled,
                        totalDamageDealtToChampions: p.totalDamageDealtToChampions,
                        goldEarned: p.goldEarned,
                        visionScore: p.visionScore,
                        individualPosition: p.individualPosition,
                    })),
                },
            };
        }
    );
}

export async function getCompatibilityStats(username1: string, tag1: string, username2: string, tag2: string, platform: Platform = "euw1") {
    const [player1, player2] = await Promise.all([
        getPlayerData(username1, tag1, platform),
        getPlayerData(username2, tag2, platform)
    ]);

    const sharedMatchIds = player1.matchIds.filter(id => player2.matchIds.includes(id));

    if (sharedMatchIds.length < 3) throw new Error(`Not enough matches played together (${sharedMatchIds.length}), need at least 3`);

    const cached = await Promise.all(sharedMatchIds.map(id => redis.get(`match:${id}`)));
    const cachedMatches = cached
        .filter(Boolean)
        .map(m => JSON.parse(m!));

    const missIds = sharedMatchIds.filter((_, i) => !cached[i]);
    const freshMatches = await batchFetch(missIds, id => getMatchData(id, platform));

    const matches = [...cachedMatches, ...freshMatches];

    const stats = processStats(matches, player1.account.puuid, player2.account.puuid);
    const statRatings = calculateData(stats);

    return {
        playerProfile1: { gameName: player1.account.gameName, tagLine: player1.account.tagLine, summonerLevel: player1.profile.summonerLevel, profileIconId: player1.profile.profileIconId },
        playerProfile2: { gameName: player2.account.gameName, tagLine: player2.account.tagLine, summonerLevel: player2.profile.summonerLevel, profileIconId: player2.profile.profileIconId },
        statRatings
    };
}

export function processStats(matchStats: Match[], puuid1: string, puuid2: string): ProcessedMatchStats[] {
    return matchStats.map(match => {
        const player1 = match.info.participants.find(p => p.puuid === puuid1)
        const player2 = match.info.participants.find(p => p.puuid === puuid2)
        if (!player1 || !player2) return null;

        const duoTeamId = player1.teamId;

        const teammates = match.info.participants.filter(p => (
            p.teamId === duoTeamId &&
            p.puuid !== puuid1 &&
            p.puuid !== puuid2
        ));

        const enemies = match.info.participants.filter(p => (
            p.teamId !== duoTeamId
        ))

        return {
            matchId: match.metadata.matchId,
            queueId: match.info.queueId,
            gameDuration: match.info.gameDuration,
            player1,
            player2,
            teammates,
            enemies, 
            win: player1.win
        }
    }).filter(match => match !== null);
}