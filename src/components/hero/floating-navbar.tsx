"use client";

import { Home, MoreHorizontal, Search, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import QueryNex from "../common/querynex";
import { ThemeSwitch } from "../common/theme-switch";

export default function PillNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home" },
    { icon: <Search className="h-5 w-5" />, label: "Search" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  return (
    <>
      {/* ===== Navbar Container ===== */}
      <div
        className={cn(
          "fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
          "border-border bg-background/60 border shadow-lg backdrop-blur-xl",
          "flex items-center justify-between",
          "rounded-full sm:w-[60%] sm:px-6 sm:py-2",
          "w-[90%] px-4 py-3",
          isScrolled && "bg-background/70 border-border/70 backdrop-blur-2xl",
        )}
      >
        {/* Logo */}
        <h1
          className={cn(
            "font-semibold transition-all select-none",
            isScrolled ? "text-base" : "text-lg",
          )}
        >
          <QueryNex />
        </h1>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-3 sm:flex">
          {navItems.map((item, i) => (
            <Button
              key={i}
              variant="ghost"
              className="hover:bg-accent flex items-center gap-1 rounded-full text-sm"
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
          <ThemeSwitch />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center sm:hidden">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => setMenuOpen(true)}
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* ===== Mobile Fullscreen Menu ===== */}
      {menuOpen && (
        <div
          className={cn(
            "bg-background/80 fixed inset-0 z-50 backdrop-blur-xl",
            "flex flex-col items-center justify-center gap-6 transition-all",
          )}
        >
          {/* Close Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-6 right-6 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Menu Items */}
          {navItems.map((item, i) => (
            <Button
              key={i}
              variant="ghost"
              className="hover:bg-accent flex w-3/4 items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}

          {/* Theme Switch */}
          <ThemeSwitch />
        </div>
      )}
    </>
  );
}
