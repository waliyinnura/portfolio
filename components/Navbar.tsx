"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/ResizableNavBar";
import dynamic from "next/dynamic";
import { navItems } from "@/data";
import { useCallback, useState } from "react";
const ThemeSwitcher = dynamic(() => import("./ui/ThemeSwitcher"));
import { ModalProvider } from "./ui/modal/AnimatedModal";

/**
 * A responsive navigation bar that adapts to different screen sizes.
 *
 * When the screen size is below the medium breakpoint (md), the navigation bar
 * will be hidden and replaced with a mobile navigation menu. The mobile
 * navigation menu is toggle-able by clicking on the hamburger icon in the top
 * right corner.
 *
 * The navigation bar contains a logo, a list of navigation items, and a theme
 * switcher. The mobile navigation menu contains the same list of navigation
 * items as the desktop navigation bar, but with a different layout.
 *
 * The navigation bar is also wrapped in a ModalProvider component, which
 * provides a context for modal windows to be opened and closed.
 */
export function ResizableNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(
    () => setIsMobileMenuOpen((open) => !open),
    []
  );

  const handleCloseMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <div className="relative w-full max-w-7xl z-[999]">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex gap-4">
            <ThemeSwitcher />
            <NavbarButton variant="secondary">My CV</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav visible={isMobileMenuOpen}>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={handleToggleMenu}
              aria-label={
                isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
              }
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={handleCloseMenu}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={handleCloseMenu}
                className="relative text-neutral-700 dark:text-neutral-400"
                aria-label={item.name}
                tabIndex={0}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <ModalProvider>
                <NavbarButton variant="secondary" className="w-full">
                  My CV
                </NavbarButton>
              </ModalProvider>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
