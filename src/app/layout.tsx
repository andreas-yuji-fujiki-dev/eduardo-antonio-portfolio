// global styles importation are here
import "@/styles/globals.css";

// next
import type { Metadata } from "next";

// fonts import
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";

import localFont from 'next/font/local';

// providers
import { ThemeProvider } from "@/providers/ThemeProvider";

// fonts
const sugarpunch = localFont({
  src: '../../public/fonts/SugarpunchDEMO.otf',
  display: 'swap',
  variable: '--font-sugarpunch'
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DEV Edward",
  description: "Backend Software Engi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`
        ${geistSans.variable} 
        ${geistMono.variable}
        ${sugarpunch.variable} 
        ${robotoSlab.variable} 
        antialiased
      `}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}