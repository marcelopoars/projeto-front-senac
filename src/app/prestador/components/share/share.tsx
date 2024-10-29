"use client";

import { usePathname } from "next/navigation";
import { ShareFat } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

export function Share() {
  const pathname = usePathname();

  const [fullUrl, setFullUrl] = useState("");

  const shareData = {
    url: fullUrl,
    title: "Dá uma olhada nisso",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  function handleShare() {
    if (navigator.canShare(shareData)) {
      try {
        navigator.share(shareData);
        console.log(fullUrl);
      } catch (error) {
        console.error("Error sharing the post:", error);
      }
    }
  }

  return (
    <button className="flex items-center gap-1" onClick={handleShare}>
      <span className="">Compartilhar</span>
      <ShareFat size={24} className="text-sky-500" />
    </button>
  );
}
