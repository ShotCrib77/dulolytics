export default function LoadingSpinner() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-[#070b12]">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"/>
    </div>
  );
}