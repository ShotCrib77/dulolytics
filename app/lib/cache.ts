import { redis } from './redis';

export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached) as T;

  const fresh = await fetchFn();
  
  if (ttlSeconds) {
    await redis.set(key, JSON.stringify(fresh), 'EX', ttlSeconds);
  } else {
    await redis.set(key, JSON.stringify(fresh));  // no expiry
  }

  return fresh;
}