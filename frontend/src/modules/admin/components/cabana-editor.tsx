"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import type { Cabana } from "@elara/contracts";
import { Check } from "lucide-react";
import { useState } from "react";
import { ImageUpload } from "./image-upload";
export function CabanaEditor({
  cabana,
  onSave,
  upload,
  busy,
  onError,
}: {
  cabana: Cabana;
  onSave: (c: Cabana) => Promise<void>;
  upload: (f: File) => Promise<string>;
  busy: boolean;
  onError: (s: string) => void;
}) {
  const [value, setValue] = useState(cabana),
    [uploading, setUploading] = useState(false);
  return (
    <details className="cabana-editor">
      <summary>
        {value.name}
        <span>
          {value.active ? "Published" : "Hidden"} · LKR{" "}
          {value.price.toLocaleString()}
        </span>
      </summary>
      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(value);
        }}
      >
        <div className="form-grid">
          <label>
            Name
            <input
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
          </label>
          <label>
            Category / short line
            <input
              value={value.category}
              onChange={(e) => setValue({ ...value, category: e.target.value })}
            />
          </label>
        </div>
        <label>
          Description
          <textarea
            rows={3}
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
          />
        </label>
        <div className="form-grid">
          <label>
            Nightly rate (LKR)
            <input
              type="number"
              min={0}
              value={value.price}
              onChange={(e) =>
                setValue({ ...value, price: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Guest capacity
            <input
              type="number"
              min={1}
              max={8}
              value={value.capacity}
              onChange={(e) =>
                setValue({ ...value, capacity: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Area (m²)
            <input
              type="number"
              value={value.area}
              onChange={(e) =>
                setValue({ ...value, area: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Image tag
            <input
              value={value.tag}
              onChange={(e) => setValue({ ...value, tag: e.target.value })}
            />
          </label>
        </div>
        <label>
          Amenities (one per line)
          <textarea
            value={value.amenities.join("\n")}
            onChange={(e) =>
              setValue({ ...value, amenities: e.target.value.split("\n") })
            }
          />
        </label>
        <label>
          Photo path
          <input
            value={value.image}
            onChange={(e) => setValue({ ...value, image: e.target.value })}
          />
        </label>
        <ImageUpload
          onUpload={async (file) => {
            setUploading(true);
            try {
              setValue({ ...value, image: await upload(file) });
            } catch (err) {
              onError((err as Error).message);
            } finally {
              setUploading(false);
            }
          }}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={value.active}
            onChange={(e) => setValue({ ...value, active: e.target.checked })}
          />
          Publish this cabana
        </label>
        <button className="button" disabled={busy || uploading}>
          {adminLabels.saveCabana}
          <Check size={16} />
        </button>
      </form>
    </details>
  );
}
