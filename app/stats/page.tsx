"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PlayerCard from "../components/PlayerCards";
import PoroScore from "../components/PoroScore";
import StatsOverview from "../components/StatsOverview";
import NoDataFound from "../components/NoDataFound";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

export default function StatsPage() {
	const searchParams = useSearchParams();
	const username1 = searchParams.get("username1");
	const tag1 = searchParams.get("tag1");
	const username2 = searchParams.get("username2");
	const tag2 = searchParams.get("tag2");
			
	const [error, setError] = useState("");

  const [data, setData] = useState<{
    playerProfile1: PlayerProfile, 
    playerProfile2: PlayerProfile, 
    statRatings: StatRatings
  } |null>(null);

  useEffect(() => {
    const getData = async () => {
		if (!username1 || !tag1 || !username2 || !tag2) {setError("No users"); return};

		const res = await fetch(`/api/duo?username1=${username1}&tag1=${tag1}&username2=${username2}&tag2=${tag2}`);
      
      if (!res.ok) {
        const data = await res.json()
        setError(data.error)
        return;
      }

      const data = await res.json();
      console.log(data)
      setData(data)

    }
    getData();
  }, [username1, tag1, username2, tag2]);
  
	if (error) return <NoDataFound error={error} />

	if (!data) return <LoadingSpinner />

	return (
		<div className="flex flex-col min-h-screen items-center justify-center font-sans bg-[#070b12] gap-8">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2 L36 11 L36 29 L20 38 L4 29 L4 11 Z' fill='none' stroke='%23c89b3c' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: "40px 40px"
      }} />
	  
      <h1
        className="text-4xl font-semibold tracking-wide text-[#c8aa6e]"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Your compatibility
      </h1>

			<div className="grid grid-rows-3 lg:flex lg:gap-16 items-center">

				<PlayerCard
					gameName={data.playerProfile1.gameName}
					tagLine={data.playerProfile1.tagLine}
					profileIconId={data.playerProfile1.profileIconId}
				/>

				<PoroScore score={data.statRatings.totalScore} />
				
				<PlayerCard
					gameName={data.playerProfile2.gameName}
					tagLine={data.playerProfile2.tagLine}
					profileIconId={data.playerProfile2.profileIconId}
				/>
				
			</div>

			<StatsOverview ratings={data.statRatings} />
      
      <Footer />
		</div>
	);
}