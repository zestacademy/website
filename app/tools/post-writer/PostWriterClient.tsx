"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Loader2, Sparkles, PenTool, ExternalLink } from "lucide-react";

declare global {
  interface Window {
    mountPostWriter?: (element: HTMLElement | null) => void;
  }
}

export function PostWriterClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const mountTool = () => {
    if (typeof window !== "undefined" && typeof window.mountPostWriter === "function") {
      const container = document.getElementById("aup-post-writer-root");
      if (container) {
        // Clear previous instances if re-mounting
        container.innerHTML = "";
        window.mountPostWriter(container);
        setHasMounted(true);
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      mountTool();
    }
  }, [isLoaded]);

  // Handle case where script might already be loaded on window
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.mountPostWriter === "function" && !hasMounted) {
      setIsLoaded(true);
      mountTool();
    }
  }, [hasMounted]);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <Script
        src="https://files.authoredup.com/aup-post-writer.js"
        onLoad={() => {
          setIsLoaded(true);
          mountTool();
        }}
        strategy="afterInteractive"
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Free Content Creation Tool
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Post Writer
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Format, preview, and refine high-converting posts for LinkedIn and social platforms right inside Zest Academy.
          </p>
        </div>

        {/* Tool Canvas Container */}
        <div className="relative min-h-[600px] w-full rounded-2xl border bg-card text-card-foreground shadow-xl overflow-hidden p-2 sm:p-6">
          {!hasMounted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-10 space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Loading Post Writer Tool...</p>
            </div>
          )}

          <div id="aup-post-writer-root" className="w-full min-h-[550px]" />
        </div>
      </div>
    </div>
  );
}
