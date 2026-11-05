"use client";
import { useState } from "react";
export function useExperience() {
  const [active, setActive] = useState(0);
  return { active, selectExperience: setActive };
}
