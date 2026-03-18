import { Platform, PLATFORM_TO_REGIONAL, Regional } from "./constants";

export async function batchFetch<T>(items: string[], fetchFn: (id: string) => Promise<T>, batchSize = 5, delayMs = 1000): Promise<T[]> {
    const results: T[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(fetchFn));
        results.push(...batchResults);
        if (i + batchSize < items.length) await new Promise(r => setTimeout(r, delayMs));
    }
    
    return results;
}

export function platformFromTag(tag: string): Platform {
    const normalised = tag.replace("#", "").toLowerCase();
    const known = Object.keys(PLATFORM_TO_REGIONAL) as Platform[];
    return known.find(p => p === normalised || normalised.startsWith(p.replace("1", ""))) ?? "euw1";
}

export function regionalFromPlatform(platform: Platform): Regional {
    return PLATFORM_TO_REGIONAL[platform];
}