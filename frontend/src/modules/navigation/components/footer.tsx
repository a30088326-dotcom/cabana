import { ReserveButton } from "@/modules/booking";
import { navigationLabels } from "@/modules/navigation/config/labels";
import { BrandMark } from "@/shared/components/brand";
import type { SiteSettings } from "@elara/contracts";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">MAKE ROOM FOR A LITTLE STILLNESS</p>
          <h2>The forest is calling.</h2>
        </div>
        <ReserveButton className="button button-light">
          {navigationLabels.findYourHideaway}
        </ReserveButton>
      </div>
      <div className="footer-main">
        <div>
          <Link href="/" className="brand">
            <BrandMark />
            <span>
              {settings.name}
              <small>{navigationLabels.brandTagline}</small>
            </span>
          </Link>
          <p>
            A quieter way to discover Sri Lanka.
            <br />A little closer to the things that matter.
          </p>
        </div>
        <div>
          <p className="footer-label">WANDER</p>
          <Link href="/cabanas">{navigationLabels.ourCabanas}</Link>
          <Link href="/experiences">{navigationLabels.experiences}</Link>
          <Link href="/gallery">{navigationLabels.theGallery}</Link>
        </div>
        <div>
          <p className="footer-label">LET’S CONNECT</p>
          <Link href="/contact">
            <MapPin size={13} />
            {settings.location}
          </Link>
          {settings.email && (
            <a href={"mailto:" + settings.email}>{settings.email}</a>
          )}
          {settings.phone && (
            <a href={"tel:" + settings.phone.replace(/\s/g, "")}>
              {settings.phone}
            </a>
          )}
          {settings.whatsapp && (
            <a
              href={"https://wa.me/" + settings.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              {navigationLabels.whatsappUs}
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {settings.name}. A slower kind of stay.
        </span>
        <div>
          <Link href="/privacy">{navigationLabels.privacy}</Link>
          <Link href="/terms">{navigationLabels.stayTerms}</Link>
          <Link href="/credits">{navigationLabels.photoCredits}</Link>
        </div>
      </div>
      <p className="concept-note">
        An illustrative retreat concept. Cabana visuals and indicative rates are
        sample content; Sri Lankan reference photography is credited separately.
      </p>
    </footer>
  );
}
