import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ReadingProgressBar } from "@/components/ui/reading-progress-bar";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zestacademy.tech"),
  title: {
    default: "Zest Academy - Master Engineering Fundamentals & Ace Interviews",
    template: "%s | Zest Academy",
  },
  description: "Structured learning paths for engineering students. Master Data Structures, System Design, and interview preparation with expert-crafted courses, articles, and roadmaps.",
  keywords: [
    "Zest Academy",
    "Engineering",
    "Interview Preparation",
    "Data Structures",
    "System Design",
    "Python",
    "IoT",
    "Embedded Systems",
    "Career Growth",
    "Tech Education",
    "Placement Preparation"
  ],
  authors: [{ name: "Zest Academy Team" }],
  creator: "Zest Academy",
  publisher: "Zest Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Zest Academy - Master Engineering Fundamentals",
    description: "Structured learning paths for engineering students. Master Data Structures, System Design, and interview preparation.",
    url: "https://zestacademy.tech",
    siteName: "Zest Academy",
    images: [
      {
        url: "/logo.png", // Ideally this should be a larger OG image, but using logo as fallback
        width: 800,
        height: 600,
        alt: "Zest Academy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zest Academy - Master Engineering Fundamentals",
    description: "Structured learning paths for engineering students. Ace your interviews with Zest Academy.",
    images: ["/logo.png"], // Again, using logo as fallback
  },
  verification: {
    google: "XoGJcqQCUC6FagE9BnC-Rij2ju25_hn4ZrVu2fegn1I",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zest Academy",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <ReadingProgressBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
