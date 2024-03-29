import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/layout/BottomNavigation/BottomNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plac",
  description: "Plac project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
        <head>
            <link rel="manifest" href="manifest.webmanifest" />
        </head>
        <body className={inter.className}>
        <main>{children}</main>
        <BottomNavigation />
        </body>
    </html>
  );
}
