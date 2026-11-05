"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import { ArrowUpRight } from "lucide-react";
import { type AdminModel } from "../hooks/use-admin-dashboard";
import { ImageUpload } from "./image-upload";
export function SiteSettingsEditor({ model }: { model: AdminModel }) {
  const { loading, settings, setSettings, saveSettings, uploadHero } = model;
  if (!settings) return null;
  return (
    <form
      className="admin-form"
      onSubmit={(e) => {
        e.preventDefault();
        saveSettings(settings);
      }}
    >
      <h2>Website & contact details</h2>
      <div className="form-grid">
        <label>
          Brand name
          <input
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
          />
        </label>
        <label>
          Location
          <input
            value={settings.location}
            onChange={(e) =>
              setSettings({ ...settings, location: e.target.value })
            }
          />
        </label>
      </div>
      <label>
        Hero headline
        <input
          value={settings.headline}
          onChange={(e) =>
            setSettings({ ...settings, headline: e.target.value })
          }
        />
      </label>
      <label>
        Hero subheading
        <input
          value={settings.subheading}
          onChange={(e) =>
            setSettings({ ...settings, subheading: e.target.value })
          }
        />
      </label>
      <label>
        Retreat story
        <textarea
          rows={5}
          value={settings.story}
          onChange={(e) => setSettings({ ...settings, story: e.target.value })}
        />
      </label>
      <div className="form-grid">
        <label>
          Contact email
          <input
            type="email"
            value={settings.email}
            onChange={(e) =>
              setSettings({ ...settings, email: e.target.value })
            }
          />
        </label>
        <label>
          Contact phone
          <input
            value={settings.phone}
            onChange={(e) =>
              setSettings({ ...settings, phone: e.target.value })
            }
          />
        </label>
      </div>
      <label>
        WhatsApp number (country code + digits, no +)
        <input
          value={settings.whatsapp}
          placeholder="947..."
          onChange={(e) =>
            setSettings({ ...settings, whatsapp: e.target.value })
          }
        />
      </label>
      <label>
        Hero image path
        <input
          value={settings.hero}
          onChange={(e) => setSettings({ ...settings, hero: e.target.value })}
        />
      </label>
      <ImageUpload onUpload={uploadHero} />
      <button className="button" disabled={loading}>
        {adminLabels.publishChanges}
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
