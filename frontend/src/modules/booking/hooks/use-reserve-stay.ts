"use client";
import { useBooking } from "./use-booking";
// Change what the reservation button does here, independently of its caption/style.
export function useReserveStay(cabanaId?: string, onReserved?: () => void) {
  const openBooking = useBooking();
  return function reserveStay() {
    openBooking({ cabanaId });
    onReserved?.();
  };
}
