import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import ThemeProvider from "@/components/theme-provider";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { template: "%s | mhc111", default: "Home | App Name" },
  description: "Personal Site",
  // metadataBase: new URL(`https://basedurl.vercel.app`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* theme wrapper */}

      <body
        className={cn(
          "min-h-screen flex flex-col justify-between font-sans antialiased",
          fontSans.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* header */}
          <SiteHeader />

          {/* nav */}

          {/* main */}
          <main className="flex-1">{children}</main>

          {/* footer */}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
