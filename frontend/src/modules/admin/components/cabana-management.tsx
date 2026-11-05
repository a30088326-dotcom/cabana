"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import { Plus } from "lucide-react";
import { type AdminModel } from "../hooks/use-admin-dashboard";
import { CabanaEditor } from "./cabana-editor";
export function CabanaManagement({ model }: { model: AdminModel }) {
  const { setError, loading, cabanas, saveCabana, upload, addCabana } = model;
  return (
    <div>
      <div className="admin-section-title">
        <h2>Cabanas & rates</h2>
        <button className="text-link" onClick={addCabana}>
          <Plus size={16} />
          {adminLabels.addCabana}
        </button>
      </div>
      {cabanas.map((c) => (
        <CabanaEditor
          key={c.id}
          cabana={c}
          onSave={saveCabana}
          upload={upload}
          busy={loading}
          onError={setError}
        />
      ))}
    </div>
  );
}
