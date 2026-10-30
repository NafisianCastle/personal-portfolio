import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nafisurrahman.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nafisur Rahman — Senior Software Engineer",
    template: "%s — Nafisur Rahman",
  },
  description:
    "Senior Software Engineer at WellDev with 4+ years of experience in .NET Core, Azure, Next.js, Power Platform, and workflow automation.",
  keywords: [
    "Nafisur Rahman",
    "Senior Software Engineer",
    "WellDev",
    "ASP.NET Core",
    "Azure",
    "Next.js",
    "Power Automate",
    "Azure DevOps",
    "Azure Logic Apps",
    "Workflow Automation",
    "Cross-Tenant Deployment",
    "PostgreSQL",
    "Shopify Development",
  ],
  authors: [{ name: "Nafisur Rahman", url: SITE_URL }],
  creator: "Nafisur Rahman",
  openGraph: {
    title: "Nafisur Rahman — Senior Software Engineer",
    description:
      "Senior Software Engineer at WellDev with 4+ years of experience in .NET Core, Azure, Next.js, and Power Platform.",
    url: SITE_URL,
    siteName: "Nafisur Rahman",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nafisur Rahman — Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nafisur Rahman — Senior Software Engineer",
    description:
      "Senior Software Engineer at WellDev with 4+ years of experience in .NET Core, Azure, Next.js, and Power Platform.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nafisur Rahman",
    url: SITE_URL,
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "WellDev",
      url: "https://welldev.io",
    },
    description:
      "Senior Software Engineer with 4+ years of experience in .NET Core, Azure, Next.js, and workflow automation.",
    knowsAbout: [
      "ASP.NET Core",
      "Azure",
      "Next.js",
      "Power Automate",
      "Azure DevOps",
      "Workflow Automation",
    ],
    sameAs: [
      "https://github.com/nafisurrahman",
      "https://linkedin.com/in/nafisurrahman",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        {/* Skip to main content — accessibility */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
