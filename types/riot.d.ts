type Participant = {
    puuid: string;
    championName: string;
    teamPosition: string;
    teamId: number;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
    champLevel: number;
    summonerName: string;
    totalMinionsKilled: number;
    totalDamageDealtToChampions: number;
    goldEarned: number;
    visionScore: number;
    // summoner1Id: number;
    // summoner2Id: number;
    // item0: number;
    // item1: number;
    // item2: number;
    // item3: number;
    // item4: number;
    // item5: number;
    // item6: number;
    // rank?: {
    //     tier: string;
    //     division: string;
    // };
    isDuo?: boolean
}

type Match = {
    metadata: {
        matchId: string;
        participants: string[];
    };
    info: {
        gameVersion: string;
        queueId: number;
        gameDuration: number;
        participants: Participant[];
    };
}

type ProcessedMatchStats = {
    matchId: string;
    queueId: number; 
    gameDuration: number;
    player1: Participant
    player2: Participant;
    teammates: Participant[];
    enemies: Participant[];
    win: boolean;
}

type PlayerProfile = {
    gameName: string;
    tagLine: string;
    summonerLevel: number;
    profileIconId: number;
}

type StatRatings = {
    kda: number;
    kp: number;
    deathShare: number;
    visionScorePerMin: number;
    csPerMin: number;
    goldPerMin: number;
    winRate: number;
    totalScore: number;
    gameCount: number;
}

type RiotAccount = {
    puuid: string;
    gameName: string;
    tagLine: string;
}

type SummonerProfile = {
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}