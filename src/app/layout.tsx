import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ReactLenis } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/shadcn-ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "QueryNex",
  description:
    "QueryNex is tool that helps you interacts with database with prompt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body className="antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </body>
      </ReactLenis>
    </html>
  );
}
