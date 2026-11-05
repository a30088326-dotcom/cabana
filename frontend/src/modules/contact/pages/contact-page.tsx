import { ReserveButton } from "@/modules/booking";
import { contactLabels } from "@/modules/contact/config/labels";
import { getSite } from "@/shared/lib/data";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
export const metadata = { title: "Find us" };
export default async function Contact() {
  const site = await getSite();
  return (
    <main id="main" className="inner-page">
      <section className="page-intro section-wrap">
        <p className="eyebrow">THE FIRST STEP TO SWITCHING OFF</p>
        <h1>
          Let’s get
          <br />
          you <em>here.</em>
        </h1>
        <p>We’d love to help you plan a little time away.</p>
      </section>
      <section className="contact-layout section-wrap">
        <div>
          <h2>
            A conversation
            <br />
            <em>starts a journey.</em>
          </h2>
          <p>
            Tell us your preferred dates, who’s coming along and what makes a
            perfect escape for you.
          </p>
          <ReserveButton>{contactLabels.sendAStayEnquiry}</ReserveButton>
        </div>
        <div className="contact-card">
          <p className="eyebrow">FIND YOUR WAY</p>
          <h3>
            <MapPin />
            {site.location}
          </h3>
          {site.email && (
            <a href={"mailto:" + site.email}>
              <Mail size={18} />
              {site.email}
            </a>
          )}
          {site.phone && (
            <a href={"tel:" + site.phone.replace(/\s/g, "")}>
              <Phone size={18} />
              {site.phone}
            </a>
          )}
          {site.whatsapp && (
            <a
              href={"https://wa.me/" + site.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              {contactLabels.chatOnWhatsApp}
              <ArrowUpRight size={18} />
            </a>
          )}
          <p>
            Arrival details and directions are shared when your stay is
            confirmed.
          </p>
        </div>
      </section>
    </main>
  );
}
