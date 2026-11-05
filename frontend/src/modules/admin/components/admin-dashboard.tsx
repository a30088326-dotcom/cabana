"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import {
  Check,
  ExternalLink,
  House,
  ImagePlus,
  Inbox,
  LogOut,
} from "lucide-react";
import { type Tab, useAdminDashboard } from "../hooks/use-admin-dashboard";
import { AdminLogin } from "./admin-login";
import { CabanaManagement } from "./cabana-management";
import { EnquiryInbox } from "./enquiry-inbox";
import { GalleryEditor } from "./gallery-editor";
import { SiteSettingsEditor } from "./site-settings-editor";
export function AdminDashboard() {
  const model = useAdminDashboard();
  const {
    selectTab,
    signOut,
    authenticated,
    checking,
    tab,
    error,
    notice,
    cabanas,
    settings,
    enquiries,
  } = model;
  if (checking)
    return (
      <div className="admin-login">
        <p>Opening retreat management…</p>
      </div>
    );
  if (!authenticated) return <AdminLogin model={model} />;
  return (
    <div className="admin-shell section-wrap">
      <div className="admin-title">
        <div>
          <p className="eyebrow">RETREAT MANAGEMENT</p>
          <h1>
            Your retreat, <em>at a glance.</em>
          </h1>
        </div>
        <button className="button button-outline" onClick={signOut}>
          <LogOut size={16} />
          {adminLabels.signOut}
        </button>
      </div>
      <div className="admin-stats">
        <div>
          <Inbox />
          <strong>{enquiries.filter((e) => e.status === "new").length}</strong>
          <span>New enquiries</span>
        </div>
        <div>
          <House />
          <strong>{cabanas.filter((c) => c.active).length}</strong>
          <span>Published cabanas</span>
        </div>
        <div>
          <ImagePlus />
          <strong>{settings?.gallery.length || 0}</strong>
          <span>Gallery moments</span>
        </div>
      </div>
      <div className="admin-tabs" role="group" aria-label="Management sections">
        {(["enquiries", "cabanas", "settings", "gallery"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => selectTab(t)}
            aria-pressed={tab === t}
            className={tab === t ? "active" : ""}
          >
            {t}
          </button>
        ))}
        <a href="/" target="_blank" rel="noreferrer">
          {adminLabels.viewWebsite}
          <ExternalLink size={14} />
        </a>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="form-notice" role="status">
          <Check size={16} />
          {notice}
        </p>
      )}
      {tab === "enquiries" && <EnquiryInbox model={model} />}
      {tab === "cabanas" && <CabanaManagement model={model} />}
      {tab === "settings" && <SiteSettingsEditor model={model} />}
      {tab === "gallery" && <GalleryEditor model={model} />}
    </div>
  );
}
