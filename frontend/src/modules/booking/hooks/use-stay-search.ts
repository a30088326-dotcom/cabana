"use client";
import { useState, type FormEvent } from "react";
import { useBooking } from "../hooks/use-booking";
export function useStaySearch() {
  const book = useBooking(),
    [arrival, setArrival] = useState(""),
    [departure, setDeparture] = useState(""),
    [guests, setGuests] = useState(2);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    book({
      checkIn: String(form.get("arrival") || ""),
      checkOut: String(form.get("departure") || ""),
      guests,
    });
  };
  function changeArrival(value: string) {
    setArrival(value);
    if (departure <= value) setDeparture("");
  }
  return {
    arrival,
    departure,
    guests,
    today,
    changeArrival,
    setDeparture,
    setGuests,
    submitSearch,
  };
}
