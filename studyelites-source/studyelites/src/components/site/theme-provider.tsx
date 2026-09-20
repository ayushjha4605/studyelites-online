"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps the app with next-themes so the user's theme preference (light / dark
 * / system) is persisted to localStorage and applied via a `class` on <html>.
 *
 * The class strategy is used because our `globals.css` defines `.dark` variant
 * tokens. `defaultTheme="system"` follows the OS preference, and
 * `disableTransitionOnChange` prevents the jarring flash when switching.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
