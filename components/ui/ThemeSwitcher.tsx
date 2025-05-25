"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";

/**
 * A button that toggles between light and dark theme.
 *
 * @remarks
 * It uses {@link https://next-themes.vercel.app/docs/use-theme | useTheme} to get the current theme and change it.
 * It also uses the Moon and Sun icons from Lucide to represent the theme.
 * The button is rotated when the theme changes to make it look like the moon/sun is rotating.
 * The button is also absolutely positioned to make it look like it's floating on the page.
 * The button has a z-index of 99 to make sure it's always on top of other elements.
 * The button has a class of "sr-only" to make it invisible to screen readers.
 */
export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="z-[99]"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
