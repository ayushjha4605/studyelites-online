"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Dark / light mode toggle. Uses next-themes — the actual theme class is
 * applied on <html> by the ThemeProvider in layout.tsx.
 *
 * `mounted` is used to avoid hydration mismatch: theme is only known on the
 * client, so we render a placeholder button until mounted to keep SSR
 * markup stable.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-foreground/80 hover:text-blue-700 hover:bg-accent"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : (
        <div className="size-5" />
      )}
    </Button>
  );
}
