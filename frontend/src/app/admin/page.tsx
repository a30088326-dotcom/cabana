import { AdminDashboard } from "@/modules/admin/components/admin-dashboard";
export const metadata = {
  title: "Retreat management",
  robots: { index: false, follow: false },
};
export default function Admin() {
  return (
    <main id="main" className="inner-page admin-page">
      <AdminDashboard />
    </main>
  );
}
