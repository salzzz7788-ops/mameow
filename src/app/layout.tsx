import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAMEOW — WEFAM ORGANIZATION",
  description:
    "MAMEOW - Founder of GENZ BATTLEGROUND, GENZ FIGHTING (FiveM), GENZ HANGOUT (Roblox), COO of Render25.com, LEGENDARY TEAM & Fireball Games Studio.",
  keywords: [
    "MAMEOW",
    "MA MEOW",
    "GENZ BATTLEGROUND",
    "GENZ FIGHTING",
    "GENZ HANGOUT",
    "Render25",
    "Render25.com",
    "FiveM",
    "Roblox",
    "LEGENDARY TEAM",
    "Fireball Games Studio",
  ],
  authors: [{ name: "MAMEOW" }],
  openGraph: {
    title: "MAMEOW — WEFAM ORGANIZATION",
    description:
      "Owner of GENZ BATTLEGROUND & GENZ FIGHTING (FiveM), GENZ HANGOUT (Roblox), COO of Render25.com.",
    type: "website",
    siteName: "MAMEOW",
  },
  icons: {
    icon: "/assets/mameow_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@800;900&family=Outfit:wght@100..900&family=Pixelify+Sans:wght@400..700&family=Russo+One&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Unbounded:wght@800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen text-gray-100 antialiased selection:bg-[#ff003c] selection:text-white">
        {children}
      </body>
    </html>
  );
}
