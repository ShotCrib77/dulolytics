import { getCompatibilityStats } from "@/app/lib/riot";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username1 = searchParams.get("username1");
    const tag1 = searchParams.get("tag1");
    const username2 = searchParams.get("username2");
    const tag2 = searchParams.get("tag2");

    if (!username1 || !tag1 || !username2 || !tag2) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        const { playerProfile1, playerProfile2, statRatings } = await getCompatibilityStats(username1, tag1, username2, tag2);
        return NextResponse.json({ playerProfile1, playerProfile2, statRatings }, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}