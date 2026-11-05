"use client";
import { adminLabels } from "@/modules/admin/config/labels";

import { ArrowUpRight } from "lucide-react";
import { type AdminModel } from "../hooks/use-admin-dashboard";
export function AdminLogin({ model }: { model: AdminModel }) {
  const { error, loading, login } = model;
  return (
    <div className="admin-login">
      <p className="eyebrow">RETREAT MANAGEMENT</p>
      <h1>
        Welcome <em>back.</em>
      </h1>
      <p>Sign in to manage your cabanas, content and enquiries.</p>
      <form onSubmit={login}>
        <label>
          Username
          <input
            name="username"
            autoComplete="username"
            required
            defaultValue="admin"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button full" disabled={loading}>
          {loading ? adminLabels.signingIn : adminLabels.signIn}
          <ArrowUpRight size={18} />
        </button>
      </form>
      <p className="muted">
        Your local credentials are in the project’s .admin-credentials file.
      </p>
    </div>
  );
}
