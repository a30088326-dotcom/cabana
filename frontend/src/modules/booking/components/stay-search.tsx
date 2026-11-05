"use client";
import { bookingLabels } from "@/modules/booking/config/labels";

import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import { useStaySearch } from "../hooks/use-stay-search";
export function StaySearch() {
  const {
    arrival,
    departure,
    guests,
    today,
    changeArrival,
    setDeparture,
    setGuests,
    submitSearch,
  } = useStaySearch();
  return (
    <form className="stay-search" onSubmit={submitSearch}>
      <div className="search-intro">
        <span className="eyebrow">A LITTLE TIME AWAY</span>
        <span>Make it yours.</span>
      </div>
      <label>
        <span>
          <CalendarDays size={14} />
          CHECK IN
        </span>
        <input
          type="date"
          name="arrival"
          aria-label="Check in"
          value={arrival}
          min={today}
          onChange={(event) => changeArrival(event.target.value)}
          required
        />
      </label>
      <label>
        <span>
          <CalendarDays size={14} />
          CHECK OUT
        </span>
        <input
          type="date"
          name="departure"
          aria-label="Check out"
          value={departure}
          min={arrival || today}
          onChange={(e) => setDeparture(e.target.value)}
          required
        />
      </label>
      <label>
        <span>
          <Users size={14} />
          GUESTS
        </span>
        <select
          aria-label="Number of guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
        </select>
      </label>
      <button className="button">
        {bookingLabels.planYourStay}
        <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
