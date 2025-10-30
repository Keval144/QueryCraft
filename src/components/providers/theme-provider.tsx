"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <React.Suspense fallback={<div>Loading theme...</div>}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    </React.Suspense>
  );
}
