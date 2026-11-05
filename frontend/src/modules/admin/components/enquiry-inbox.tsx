"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import { Inbox } from "lucide-react";
import { type AdminModel } from "../hooks/use-admin-dashboard";
export function EnquiryInbox({ model }: { model: AdminModel }) {
  const { cabanas, enquiries, refresh, updateEnquiryStatus } = model;
  return (
    <div>
      <div className="admin-section-title">
        <h2>Stay enquiries</h2>
        <button className="text-link" onClick={refresh}>
          {adminLabels.refreshInbox}
        </button>
      </div>
      {!enquiries.length ? (
        <div className="empty-state">
          <Inbox size={32} />
          <h3>A quiet inbox.</h3>
          <p>
            Guest enquiries will appear here when the stay form is submitted.
          </p>
        </div>
      ) : (
        <div className="enquiry-list">
          {enquiries.map((e) => (
            <article key={e.id} className="enquiry-card">
              <div className="enquiry-heading">
                <div>
                  <span className="eyebrow">
                    {e.id} · {new Date(e.createdAt).toLocaleDateString()}
                  </span>
                  <h3>{e.name}</h3>
                </div>
                <select
                  aria-label={"Status of " + e.id}
                  value={e.status}
                  onChange={(event) =>
                    updateEnquiryStatus(e.id, event.target.value)
                  }
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <p>
                {cabanas.find((c) => c.id === e.cabanaId)?.name || e.cabanaId} ·{" "}
                {e.checkIn} → {e.checkOut} · {e.guests} guests
              </p>
              <div className="enquiry-contact">
                <a href={"mailto:" + e.email}>{e.email}</a>
                <a href={"tel:" + e.phone}>{e.phone}</a>
              </div>
              {e.message && <p className="enquiry-message">{e.message}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
