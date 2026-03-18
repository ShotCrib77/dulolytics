import Footer from "./components/Footer";
import SearchCard from "./components/SearchCard";

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b12] bg-[url(https://nexus.leagueoflegends.com/wp-content/uploads/2018/11/poros_banner-1_slno1owbdsxulmdvqomp.jpg)] bg-cover">
      
      <div className="relative w-full max-w-lg px-6 my-16 lg:my-0">

        <div className="text-center mb-4">
<h1
  className="text-5xl md:text-6xl font-bold tracking-wide"
  style={{
    color: "#c89b3c",
    fontFamily: "'Georgia', serif",
    textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.7)",
    
  }}
>
  DuLOLytics
</h1>
          <p
            className="mt-2 text-xl tracking-widest uppercase text-[#e8e0d0]"
            style={{
              textShadow: "0 1px 4px #000, 0 1px 4px #000"
            }}
          >
            Duo compatibility checker
          </p>
        </div>

        <SearchCard />
      </div>

      <Footer />
    </div>
  );
}