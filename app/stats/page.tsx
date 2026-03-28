import { Suspense } from "react";
import StatsPageComponent from "../components/StatsPageComponent";
import { SearchParams } from "next/dist/server/request/search-params";

export async function generateMetadata({ searchParams }: {searchParams: Promise<SearchParams>}) {
  const params = await searchParams;
  const username1 = (params.username1 as string) ?? "Player 1";
  const tag1 = (params.tag1 as string) ?? "";
  const username2 = (params.username2 as string) ?? "Player 2";
  const tag2 = (params.tag2 as string) ?? "";
  const region = (params.region as string) ?? "EUW";
  const score = (params.score as string) ?? "";
  const profileIconId1 = (params.profileIconId1 as string) ?? "";
  const profileIconId2 = (params.profileIconId2 as string) ?? "";

  const ogImageUrl = new URL("/api/og", "https://5363-188-120-173-147.ngrok-free.app");
  ogImageUrl.searchParams.set("username1", username1);
  ogImageUrl.searchParams.set("tag1", tag1);
  ogImageUrl.searchParams.set("username2", username2);
  ogImageUrl.searchParams.set("tag2", tag2);
  ogImageUrl.searchParams.set("region", region);
  ogImageUrl.searchParams.set("score", score);
  ogImageUrl.searchParams.set("profileIconId1", profileIconId1);
  ogImageUrl.searchParams.set("profileIconId2", profileIconId2);

  return {
    title: `${username1} & ${username2} — Duo Compatibility | DuLOLytics`,
    openGraph: {
      images: [{ url: ogImageUrl.toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl.toString()],
    },
  };
}
export default function StatsPage() {
  
  return (
    <Suspense>
      <StatsPageComponent />
    </Suspense>
  );
}