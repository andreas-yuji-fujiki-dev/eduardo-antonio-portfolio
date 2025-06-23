// global styles importation are here
import "@/styles/globals.css";

// next
import type { Metadata } from "next";

// fonts import
import { Geist, Geist_Mono } from "next/font/google";
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
        antialiased
      `}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}