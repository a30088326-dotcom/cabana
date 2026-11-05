"use client";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { bookingLabels } from "../config/labels";
import { useReserveStay } from "../hooks/use-reserve-stay";
export function ReserveButton({
  children = bookingLabels.reserveYourStay,
  className = "button",
  cabanaId,
  onReserved,
}: {
  children?: ReactNode;
  className?: string;
  cabanaId?: string;
  onReserved?: () => void;
}) {
  const reserveStay = useReserveStay(cabanaId, onReserved);
  return (
    <button type="button" className={className} onClick={reserveStay}>
      {children}
      <ArrowUpRight size={17} />
    </button>
  );
}
