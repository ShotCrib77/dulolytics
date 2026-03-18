import { DDRAGON_VERSION } from "./constants";

export function getChampImage(champName: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champName}.png`;
}

export function getItemImage(itemId: number) {
    return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${itemId}.png`;
}

export function getSpellImage(spellId: number) {
    const SPELL_ID_TO_NAME: Record<number, string> = {
        1:  "SummonerBoost",
        3:  "SummonerExhaust",
        4:  "SummonerFlash",
        6:  "SummonerHaste",
        7:  "SummonerHeal",
        11: "SummonerSmite",
        12: "SummonerTeleport",
        13: "SummonerMana",
        14: "SummonerDot",
        21: "SummonerBarrier",
        32: "SummonerSnowball",
    };
    const name = SPELL_ID_TO_NAME[spellId] ?? "SummonerFlash";
    return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/spell/${name}.png`;
}