"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import { ArrowUpRight } from "lucide-react";
import { type AdminModel } from "../hooks/use-admin-dashboard";
import { ImageUpload } from "./image-upload";
export function GalleryEditor({ model }: { model: AdminModel }) {
  const { loading, settings, setSettings, saveSettings, addGalleryPhoto } =
    model;
  if (!settings) return null;
  return (
    <div className="admin-form">
      <div className="admin-section-title">
        <h2>Gallery moments</h2>
        <ImageUpload onUpload={addGalleryPhoto} />
      </div>
      {settings.gallery.map((g, i) => (
        <div className="gallery-editor" key={g.src}>
          <img src={g.src} alt={g.title} />
          <div>
            <label>
              Caption
              <input
                value={g.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    gallery: settings.gallery.map((v, j) =>
                      i === j ? { ...v, title: e.target.value } : v,
                    ),
                  })
                }
              />
            </label>
            <label>
              Credit
              <input
                value={g.credit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    gallery: settings.gallery.map((v, j) =>
                      i === j ? { ...v, credit: e.target.value } : v,
                    ),
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Category
              <select
                value={g.category}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    gallery: settings.gallery.map((v, j) =>
                      i === j
                        ? {
                            ...v,
                            category: e.target.value as
                              "Stay" | "Nature" | "Dining",
                          }
                        : v,
                    ),
                  })
                }
              >
                <option>Stay</option>
                <option>Nature</option>
                <option>Dining</option>
              </select>
            </label>
            <button
              className="text-link"
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  gallery: settings.gallery.filter((_, j) => j !== i),
                })
              }
            >
              {adminLabels.removeFromGallery}
            </button>
          </div>
        </div>
      ))}
      <button
        className="button"
        onClick={() => saveSettings(settings)}
        disabled={loading}
      >
        {adminLabels.publishGallery}
        <ArrowUpRight size={17} />
      </button>
    </div>
  );
}
