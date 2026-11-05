"use client";
import type { GalleryItem } from "@elara/contracts";
import { useState } from "react";
export function useGallery(items: GalleryItem[]) {
  const [filter, setFilter] = useState("All"),
    [selected, setSelected] = useState<number | null>(null);
  const filtered = items.filter(
    (i) => filter === "All" || i.category === filter,
  );
  function openPhoto(item: GalleryItem) {
    setSelected(items.indexOf(item));
  }
  function closePhoto() {
    setSelected(null);
  }
  function previousPhoto() {
    setSelected((current) =>
      current === null ? null : (current - 1 + items.length) % items.length,
    );
  }
  function nextPhoto() {
    setSelected((current) =>
      current === null ? null : (current + 1) % items.length,
    );
  }
  return {
    filter,
    setFilter,
    filtered,
    selected,
    openPhoto,
    closePhoto,
    previousPhoto,
    nextPhoto,
  };
}
