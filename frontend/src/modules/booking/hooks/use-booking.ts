"use client";
import { useContext } from "react";
import { BookingContext } from "../context";
export function useBooking() {
  return useContext(BookingContext);
}
