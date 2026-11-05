"use client";
import { navigationLabels } from "@/modules/navigation/config/labels";

import { ReserveButton } from "@/modules/booking";
import { BrandMark } from "@/shared/components/brand";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navigationLinks } from "../config/navigation";
import { useNavigation } from "../hooks/use-navigation";
export function Header({ name }: { name: string }) {
  const { scrolled, menu, closeMenu, toggleMenu } = useNavigation();
  return (
    <header
      className={
        "site-header " +
        (scrolled ? "is-scrolled " : "") +
        (menu ? "menu-is-open" : "")
      }
    >
      <Link href="/" className="brand" aria-label={name + " home"}>
        <BrandMark />
        <span>
          {name}
          <small>{navigationLabels.brandTagline}</small>
        </span>
      </Link>
      <nav aria-label="Main navigation" className={menu ? "nav-open" : ""}>
        {navigationLinks.map(({ label: text, href }) => (
          <Link key={href} href={href} onClick={closeMenu}>
            {text}
          </Link>
        ))}
        <Link className="mobile-contact" href="/contact" onClick={closeMenu}>
          {navigationLabels.findUs}
        </Link>
      </nav>
      <div className="header-actions">
        <ReserveButton className="header-reserve" onReserved={closeMenu} />
        <button
          className="menu-toggle icon-button"
          aria-label={
            menu
              ? navigationLabels.closeNavigation
              : navigationLabels.openNavigation
          }
          aria-expanded={menu}
          onClick={toggleMenu}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
