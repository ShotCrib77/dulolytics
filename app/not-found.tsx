import Image from "next/image";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070b12] text-white px-4">
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
              404
            </h1>
            <p className="text-sm text-[#7a8fa6] max-w-xs leading-relaxed">
              Page Not Found
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}