import React from "react";
import type { Metadata } from "next";
import { ZestNotesClient } from "./ZestNotesClient";

export const metadata: Metadata = {
  title: "Zest Notes - AI Single-Page Revision & Key Notes Generator | Zest Academy",
  description:
    "Make last-minute single page key notes and exam cheat sheets using Zest Notes, our custom AI GPT powered by ChatGPT.",
  openGraph: {
    title: "Zest Notes - AI Single-Page Key Notes Generator | Zest Academy",
    description:
      "Craft high-yield single-page revision notes, formulas, and last-minute exam cheat sheets in seconds with Zest Notes AI.",
    url: "https://zestacademy.tech/tools/zest-notes",
    siteName: "Zest Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zest Notes - AI Single-Page Revision & Key Notes",
    description:
      "Craft high-yield single-page revision notes, formulas, and last-minute exam cheat sheets in seconds with Zest Notes AI.",
  },
};

export default function ZestNotesPage() {
  return <ZestNotesClient />;
}
