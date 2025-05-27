import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { ModalProvider } from "@/components/ui/modal/AnimatedModal";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Well Portfolio",
  description: "Welcome on my portfolio",
};

/**
 * The root layout component. It renders the HTML document, and wraps the
 * children with the ThemeProvider and ModalProvider components.
 *
 * @param {{ children: React.ReactNode }} props The component props.
 * @returns {JSX.Element} The RootLayout component.
 * @example
 * <RootLayout>
 *   <App />
 * </RootLayout>
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={openSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
