import React from "react";
import type { Metadata } from "next";
import { PostWriterClient } from "./PostWriterClient";

export const metadata: Metadata = {
  title: "Post Writer | Zest Academy Tools",
  description:
    "Write, preview, and format engaging posts for LinkedIn and social platforms with our free interactive Post Writer tool on Zest Academy.",
  openGraph: {
    title: "Post Writer | Zest Academy Tools",
    description:
      "Write, preview, and format engaging posts for LinkedIn and social platforms with our free interactive Post Writer tool on Zest Academy.",
  },
};

export default function PostWriterPage() {
  return <PostWriterClient />;
}
