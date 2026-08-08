import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nafisur Rahman — Senior Software Engineer",
  description:
    "Senior Software Engineer at WellDev with 4+ years of experience in .NET Core, Azure, Next.js, Power Platform, and workflow automation.",
  keywords: [
    "Nafisur Rahman",
    "Senior Software Engineer",
    "WellDev",
    ".NET Core",
    "Azure",
    "Next.js",
    "Power Automate",
    "Azure DevOps",
  ],
  authors: [{ name: "Nafisur Rahman" }],
  openGraph: {
    title: "Nafisur Rahman — Senior Software Engineer",
    description:
      "Senior Software Engineer at WellDev with 4+ years of experience in .NET Core, Azure, Next.js, and Power Platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafisur Rahman — Senior Software Engineer",
    description:
      "Senior Software Engineer at WellDev with 4+ years of experience in .NET Core, Azure, Next.js, and Power Platform.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
