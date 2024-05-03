import type {Metadata, Viewport} from "next"
import {Inter} from "next/font/google"
// import "./globals.scss";
import BottomNavigation from "@/layout/BottomNavigation/BottomNavigation"
import {useEffect} from "react"
import App from "./_app"

const APP_NAME = "Plac PWA";
const APP_DEFAULT_TITLE = "Plac PWA";
const APP_TITLE_TEMPLATE = "%s - PWA Plac";
const APP_DESCRIPTION = "Lorem ipusm dolor sit";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main>{children}</main>
        <BottomNavigation />
      </body>
    </html>
  );
}
