"use client";
import { galleryFilters, galleryLabels } from "@/modules/gallery/config/labels";

import { Dialog } from "@/shared/components/dialog";
import type { GalleryItem } from "@elara/contracts";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useGallery } from "../hooks/use-gallery";
export function GalleryGrid({
  items,
  compact = false,
}: {
  items: GalleryItem[];
  compact?: boolean;
}) {
  const {
    filter,
    setFilter,
    filtered,
    selected,
    openPhoto,
    closePhoto,
    previousPhoto,
    nextPhoto,
  } = useGallery(items);
  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Filter gallery">
        {galleryFilters.map(({ value: f, label }) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "active" : ""}
            aria-pressed={filter === f}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={"gallery-grid " + (compact ? "gallery-compact" : "")}>
        {filtered.map((item, i) => (
          <button
            className="gallery-item"
            key={item.src}
            onClick={() => openPhoto(item)}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width:700px) 100vw, 50vw"
            />
            <span>
              {item.title}
              <ArrowUpRight size={20} />
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        label="Photo viewer"
        wide
        onClose={closePhoto}
      >
        {selected !== null && (
          <div className="lightbox">
            <div className="lightbox-image">
              <Image
                src={items[selected].src}
                alt={items[selected].title}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="lightbox-caption">
              <div>
                <h3>{items[selected].title}</h3>
                <p>{items[selected].credit}</p>
              </div>
              <div>
                <button
                  className="icon-button"
                  aria-label={galleryLabels.previousPhoto}
                  onClick={previousPhoto}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="icon-button"
                  aria-label={galleryLabels.nextPhoto}
                  onClick={nextPhoto}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
