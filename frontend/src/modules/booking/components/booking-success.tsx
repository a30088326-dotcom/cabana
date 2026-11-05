import { bookingLabels } from "@/modules/booking/config/labels";
import type { SiteSettings } from "@elara/contracts";
import { ArrowUpRight, Check } from "lucide-react";
export function BookingSuccess({
  reference,
  settings,
}: {
  reference: string;
  settings: SiteSettings;
}) {
  return (
    <div className="booking-success">
      <span className="success-circle">
        <Check size={30} />
      </span>
      <p className="eyebrow">A SLOWER STAY STARTS HERE</p>
      <h2>We have your enquiry.</h2>
      <p>
        Your reference is <strong>{reference}</strong>. Our team will contact
        you to confirm availability and the final rate. Your stay is reserved
        only after confirmation.
      </p>
      {settings.whatsapp && (
        <a
          className="button"
          href={
            "https://wa.me/" +
            settings.whatsapp +
            "?text=" +
            encodeURIComponent(
              "Hello " +
                settings.name +
                ", my stay enquiry reference is " +
                reference,
            )
          }
          target="_blank"
          rel="noreferrer"
        >
          {bookingLabels.continueOnWhatsApp}
          <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
