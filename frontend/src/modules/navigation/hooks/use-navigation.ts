"use client";
import { useEffect, useState } from "react";

export function useNavigation() {
  const [scrolled, setScrolled] = useState(false),
    [menu, setMenu] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  function closeMenu() {
    setMenu(false);
  }
  function toggleMenu() {
    setMenu((value) => !value);
  }

  return { scrolled, menu, closeMenu, toggleMenu };
}
