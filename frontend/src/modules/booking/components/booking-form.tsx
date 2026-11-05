"use client";
import { bookingLabels } from "@/modules/booking/config/labels";

import { money } from "@/shared/lib/format";
import type { Cabana, SiteSettings } from "@elara/contracts";
import { ArrowUpRight, Leaf } from "lucide-react";
import { useBookingForm } from "../hooks/use-booking-form";
import type { BookingPrefill as Prefill } from "../types";
import { BookingSuccess } from "./booking-success";
export function BookingForm({
  cabanas,
  settings,
  initial,
}: {
  cabanas: Cabana[];
  settings: SiteSettings;
  initial: Prefill;
}) {
  const {
    selected,
    setSelected,
    guests,
    setGuests,
    arrival,
    setArrival,
    busy,
    error,
    reference,
    cabana,
    today,
    submit,
  } = useBookingForm(cabanas, initial);
  if (reference)
    return <BookingSuccess reference={reference} settings={settings} />;
  return (
    <div className="booking-form">
      <p className="eyebrow">
        <Leaf size={14} /> YOUR NEXT CHAPTER
      </p>
      <h2>A little time away.</h2>
      <p className="muted">
        Tell us about your stay. We’ll take care of the details.
      </p>
      <form onSubmit={submit}>
        <label>
          Your hideaway
          <select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              const c = cabanas.find((c) => c.id === e.target.value);
              if (c) setGuests((g) => Math.min(g, c.capacity));
            }}
            required
          >
            {cabanas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form-grid">
          <label>
            Arrival
            <input
              type="date"
              name="checkIn"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              min={today}
              required
            />
          </label>
          <label>
            Departure
            <input
              type="date"
              name="checkOut"
              defaultValue={initial.checkOut}
              min={arrival || today}
              required
            />
          </label>
        </div>
        <label>
          Guests
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {Array.from({ length: cabana?.capacity || 2 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} {i ? "guests" : "guest"}
              </option>
            ))}
          </select>
        </label>
        <div className="form-grid">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
              placeholder="Full name"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label>
          Phone / WhatsApp
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            minLength={7}
            maxLength={30}
            placeholder="+94 ..."
            required
          />
        </label>
        <label>
          Anything we should know?
          <textarea
            name="message"
            rows={2}
            maxLength={2000}
            placeholder="A special occasion, dietary needs, or a question…"
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" required />I agree to be
          contacted about this enquiry and have read the{" "}
          <a href="/privacy" target="_blank">
            {bookingLabels.privacyPolicy}
          </a>
          .
        </label>
        {cabana && (
          <p className="rate-note">
            Indicative rate from LKR {money(cabana.price)} / night. Final rate
            and availability confirmed by our team.
          </p>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button full" disabled={busy || !cabanas.length}>
          {busy
            ? bookingLabels.sendingYourEnquiry
            : bookingLabels.sendStayEnquiry}
          <ArrowUpRight size={18} />
        </button>
        <p className="form-footnote">
          No payment required. This is a booking enquiry.
        </p>
      </form>
    </div>
  );
}
