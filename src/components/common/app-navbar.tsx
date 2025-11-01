"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../shadcn-ui/button";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavItems,
} from "./navbar";
import { ThemeSwitch } from "./theme-switch";

export function AppNavbar() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="z-10 flex items-center gap-4">
          <Link href={"/sign-in"}>Login </Link>
          <Link href={"/sign-up"}>Sign up</Link>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton href="/sign-in" variant="primary" className="w-full">
              Login
            </NavbarButton>
            <NavbarButton href="sign-up" variant="primary" className="w-full">
              Sign up
            </NavbarButton>
            <ThemeSwitch />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
