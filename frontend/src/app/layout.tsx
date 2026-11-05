import { BookingProvider } from "@/modules/booking";
import { Footer } from "@/modules/navigation/components/footer";
import { Header } from "@/modules/navigation/components/header";
import { getCabanas,getSite } from "@/shared/lib/data";
import type { Metadata } from "next";
import "./globals.css";
export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
    title: {
      default: site.name + " | Nature & Stillness · Sri Lanka",
      template: "%s | " + site.name,
    },
    description: site.subheading,
    openGraph: {
      title: site.name + " · A slower kind of stay",
      description: site.subheading,
      images: [site.hero],
    },
    robots: { index: false, follow: false },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, cabanas] = await Promise.all([getSite(), getCabanas()]);
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <BookingProvider settings={settings} cabanas={cabanas}>
          <Header name={settings.name} />
          {children}
          <Footer settings={settings} />
        </BookingProvider>
      </body>
    </html>
  );
}
