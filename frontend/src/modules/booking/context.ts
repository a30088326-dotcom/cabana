"use client";
import { createContext } from "react";
import type { BookingPrefill } from "./types";
export const BookingContext = createContext<(prefill?: BookingPrefill) => void>(
  () => {},
);
