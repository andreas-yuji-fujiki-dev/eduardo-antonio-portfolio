import type { Metadata } from "next";
import "@/styles/global.css";

import AppHeaderWithNav from "@/components/AppHeaderWithNav";

export const metadata: Metadata = {
  title: "Portfolio Management Panel",
  description: "Web application made to run locally specifically when user wants to update his own portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AppHeaderWithNav />
        
        <div>
          { children }
        </div>
      </body>
    </html>
  );
}
