import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";

export default function NoDataFound({errorMessage}: {errorMessage?: string}) {
  return (
    <div className="flex flex-col h-screen bg-[#070b12] text-white px-4 overflow-hidden">
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="absolute inset-0 -z-10 rounded-full bg-[#1a3a5c] opacity-10 blur-3xl scale-150 pointer-events-none" />
          <div className="relative mt-2">
            <Image
              src="/amumu-sad.webp"
              width={108}
              height={108}
              alt="Sad Amumu"
              className="relative drop-shadow-[0_0_12px_rgba(74,139,181,0.5)]"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1
              className="text-4xl font-semibold tracking-wide text-[#c8aa6e]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              No Data Found
            </h1>
          {errorMessage && errorMessage.startsWith("Not enough matches played together") && (
            <p className="text-sm text-[#7a8fa6] max-w-xs leading-relaxed">
              {errorMessage}
            </p>
          )}
          </div>
          <div className="mt-2 flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-white/4 px-6 py-5 backdrop-blur-sm">
            <p className="text-sm text-[#8fa3b8]">
              Double-check that the summoner names and tags are correct.
            </p>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md border border-[#c8aa6e]/30 bg-[#c8aa6e]/10 px-4 py-2 text-sm font-medium text-[#c8aa6e] transition hover:bg-[#c8aa6e]/20 hover:border-[#c8aa6e]/60"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}