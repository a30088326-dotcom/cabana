"use client";
import {
  cabanaSchema,
  settingsSchema,
  type Cabana,
  type Enquiry,
  type SiteSettings,
} from "@elara/contracts";
import { useEffect, useState, type FormEvent } from "react";
import { adminApi, upload } from "../services/admin-api";
export type Tab = "enquiries" | "cabanas" | "settings" | "gallery";
export function useAdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false),
    [checking, setChecking] = useState(true),
    [tab, setTab] = useState<Tab>("enquiries"),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [loading, setLoading] = useState(false),
    [cabanas, setCabanas] = useState<Cabana[]>([]),
    [settings, setSettings] = useState<SiteSettings | null>(null),
    [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  async function refresh() {
    try {
      const [c, s, e] = await Promise.all([
        adminApi.cabanas(),
        adminApi.site(),
        adminApi.enquiries(),
      ]);
      setCabanas(c);
      setSettings(s);
      setEnquiries(e);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  useEffect(() => {
    adminApi
      .me()
      .then(() => {
        setAuthenticated(true);
        refresh();
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      await adminApi.login(data.get("username"), data.get("password"));
      setAuthenticated(true);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    await adminApi.logout();
    setAuthenticated(false);
    setCabanas([]);
    setEnquiries([]);
    setSettings(null);
  }
  async function saveSettings(data: SiteSettings) {
    const parsed = settingsSchema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const saved = await adminApi.saveSite(parsed.data);
      setSettings(saved);
      setNotice("Published. Reload the guest website to see your updates.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }
  async function saveCabana(cabana: Cabana) {
    const parsed = cabanaSchema.safeParse(cabana);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    setError("");
    setNotice("");
    try {
      await adminApi.saveCabana(parsed.data);
      setNotice("Cabana saved.");
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateEnquiryStatus(id: string, status: string) {
    try {
      await adminApi.updateStatus(id, status);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function addCabana() {
    setCabanas((current) => [
      ...current,
      {
        id: "cabana-" + Date.now(),
        name: "New cabana",
        category: "Your private escape",
        description:
          "Describe your cabana, its setting and the experience it offers.",
        image: "/images/exterior.webp",
        price: 0,
        capacity: 2,
        area: 40,
        tag: "NEW HIDEAWAY",
        amenities: [],
        active: false,
      },
    ]);
  }

  async function uploadHero(file: File) {
    if (!settings) return;
    setLoading(true);
    try {
      setSettings({ ...settings, hero: await upload(file) });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function addGalleryPhoto(file: File) {
    if (!settings) return;
    setLoading(true);
    try {
      const src = await upload(file);
      setSettings({
        ...settings,
        gallery: [
          ...settings.gallery,
          {
            src,
            title: "A new moment",
            category: "Stay",
            credit: "Property photography",
          },
        ],
      });
      setNotice("Photo added. Set the caption and publish the gallery.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function selectTab(next: Tab) {
    setTab(next);
    setError("");
    setNotice("");
  }
  async function signOut() {
    try {
      await logout();
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return {
    selectTab,
    signOut,
    authenticated,
    checking,
    tab,
    setTab,
    error,
    setError,
    notice,
    setNotice,
    loading,
    setLoading,
    cabanas,
    setCabanas,
    settings,
    setSettings,
    enquiries,
    refresh,
    login,
    logout,
    saveSettings,
    saveCabana,
    upload,
    updateEnquiryStatus,
    addCabana,
    uploadHero,
    addGalleryPhoto,
  };
}
export type AdminModel = ReturnType<typeof useAdminDashboard>;
