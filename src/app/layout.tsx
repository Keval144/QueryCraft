import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="QueryNex_" />
      </head>
      <ReactLenis root>
        <body>
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
