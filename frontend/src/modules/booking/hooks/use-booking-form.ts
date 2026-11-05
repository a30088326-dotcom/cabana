"use client";
import { enquirySchema, type Cabana } from "@elara/contracts";
import { useState } from "react";
import { submitEnquiry } from "../services/booking-api";
import type { BookingPrefill as Prefill } from "../types";
export function useBookingForm(cabanas: Cabana[], initial: Prefill) {
  const initialCabana =
    cabanas.find((c) => c.id === initial.cabanaId) ||
    cabanas.find((c) => c.capacity >= (initial.guests || 2)) ||
    cabanas[0];
  const [selected, setSelected] = useState(initialCabana?.id || ""),
    [guests, setGuests] = useState(
      Math.min(initial.guests || 2, initialCabana?.capacity || 2),
    ),
    [arrival, setArrival] = useState(initial.checkIn || ""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [reference, setReference] = useState("");
  const cabana = cabanas.find((c) => c.id === selected),
    today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget),
      data = {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        cabanaId: selected,
        checkIn: form.get("checkIn"),
        checkOut: form.get("checkOut"),
        guests,
        message: form.get("message"),
        website: form.get("website"),
        consent: form.get("consent") === "on",
      };
    const result = enquirySchema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      const response = await submitEnquiry(result.data);
      setReference(response.id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return {
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
  };
}
