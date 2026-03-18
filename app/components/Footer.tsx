export default function Footer() {
  return (
    <footer className="w-full bg-transparent pb-6 pt-4 bottom-0 absolute">
      <div className="h-px w-10/12 mx-auto mb-4" style={{ background: "rgba(200,155,60,0.12)" }} />
      <p className="text-center text-[10px] tracking-wide px-6 text-gray-200">
        Duolytics was created under Riot Games&apos; &ldquo;Legal Jibber Jabber&rdquo; policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.
      </p>
    </footer>
  );
}