import Footer from "./components/Footer";
import SearchCard from "./components/SearchCard";

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b12] bg-[url(https://nexus.leagueoflegends.com/wp-content/uploads/2018/11/poros_banner-1_slno1owbdsxulmdvqomp.jpg)] bg-cover">
      
    <div className="relative w-full max-w-lg px-6 my-16 lg:my-0">

        {/* Title */}
        <div className="text-center mb-4">
          <h1
            className="text-4xl font-bold tracking-wide"
            style={{ color: "#c89b3c", fontFamily: "'Georgia', serif", textShadow: "0 0 40px rgba(200,155,60,0.25)" }}
          >
            DuLOLytics
          </h1>
          <p className="mt-2 text-[11px] tracking-widest uppercase text-gray-200">
            Duo compatibility checker
          </p>
        </div>

        <SearchCard />
      </div>

      <Footer />
    </div>
  );
}