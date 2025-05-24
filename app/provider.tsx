"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";

/**
 * A wrapper around `next-themes`'s `ThemeProvider` that fixes the children
 * prop type.
 *
 * @see https://github.com/pacocoursey/next-themes/issues/242
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
