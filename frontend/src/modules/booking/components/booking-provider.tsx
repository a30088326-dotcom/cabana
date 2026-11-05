"use client";
import { Dialog } from "@/shared/components/dialog";
import type { Cabana, SiteSettings } from "@elara/contracts";
import { useState, type ReactNode } from "react";
import { BookingContext } from "../context";
import type { BookingPrefill as Prefill } from "../types";
import { BookingForm } from "./booking-form";
export function BookingProvider({
  children,
  cabanas,
  settings,
}: {
  children: ReactNode;
  cabanas: Cabana[];
  settings: SiteSettings;
}) {
  const [open, setOpen] = useState(false),
    [initial, setInitial] = useState<Prefill>({}),
    [version, setVersion] = useState(0);
  function show(prefill: Prefill = {}) {
    setInitial(prefill);
    setVersion((v) => v + 1);
    setOpen(true);
  }
  return (
    <BookingContext.Provider value={show}>
      {children}
      <Dialog open={open} onClose={() => setOpen(false)} label="Plan your stay">
        <BookingForm
          key={version}
          cabanas={cabanas}
          settings={settings}
          initial={initial}
        />
      </Dialog>
    </BookingContext.Provider>
  );
}
