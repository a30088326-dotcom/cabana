import { api } from "@/shared/lib/api";
import type { Cabana, Enquiry, SiteSettings } from "@elara/contracts";
export const adminApi = {
  me: () => api("/auth/me"),
  login: (
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
  ) =>
    api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => api("/auth/logout", { method: "POST" }),
  cabanas: () => api<Cabana[]>("/admin/cabanas"),
  site: () => api<SiteSettings>("/site"),
  enquiries: () => api<Enquiry[]>("/admin/enquiries"),
  saveSite: (value: SiteSettings) =>
    api<SiteSettings>("/admin/site", {
      method: "PUT",
      body: JSON.stringify(value),
    }),
  saveCabana: (value: Cabana) =>
    api("/admin/cabanas/" + value.id, {
      method: "PUT",
      body: JSON.stringify(value),
    }),
  updateStatus: (id: string, status: string) =>
    api("/admin/enquiries/" + id, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
export async function upload(file: File): Promise<string> {
  if (file.size > 4 * 1024 * 1024)
    throw new Error("Choose an image under 4 MB");
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return (
    await api<{ src: string }>("/admin/media", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  ).src;
}
