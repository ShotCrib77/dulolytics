import { getCompatibilityStats } from "@/app/lib/riot";
import { NextRequest, NextResponse } from "next/server";
import { REGION_TO_PLATFORM } from "@/app/lib/constants";
import { redis } from "@/app/lib/redis";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username1 = searchParams.get("username1");
    const tag1 = searchParams.get("tag1");
    const username2 = searchParams.get("username2");
    const tag2 = searchParams.get("tag2");
    const region = searchParams.get("region");

    if (!username1 || !tag1 || !username2 || !tag2 || !region) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        const { playerProfile1, playerProfile2, statRatings } = await getCompatibilityStats(username1, tag1, username2, tag2, REGION_TO_PLATFORM[region]);
        
        const cacheKey = `counted:${username1}:${tag1}:${username2}:${tag2}:${region}`;
        const alreadyCounted = await redis.get(cacheKey);
        if (!alreadyCounted) {
            await redis.incr("duo:total_searches");
            await redis.set(cacheKey, "1", "EX", 300);
        }

        return NextResponse.json({ playerProfile1, playerProfile2, statRatings }, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        console.error(err)
        return NextResponse.json({ error: message }, { status: 500 });
    }
}