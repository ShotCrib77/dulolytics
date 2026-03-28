"use client";
import { useState } from "react";

interface ShareButtonProps {
  profileIconId1: number;
  profileIconId2: number;
  score: number;
}

export function ShareButton({ profileIconId1, profileIconId2, score }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const base = window.location.href;
    const url = `${base}&score=${score}&profileIconId1=${profileIconId1}&profileIconId2=${profileIconId2}`;
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-md border border-[#c8aa6e]/30 bg-[#c8aa6e]/10 px-4 py-2 text-sm font-medium text-[#c8aa6e] transition hover:bg-[#c8aa6e]/20 hover:border-[#c8aa6e]/60 cursor-pointer"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Copied!
        </>
      ) : (
        "Share result"
      )}
    </button>
  );
}