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