import { z } from "zod";
export interface Cabana {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  capacity: number;
  area: number;
  price: number;
  amenities: string[];
  tag: string;
  active: boolean;
}
export interface GalleryItem {
  src: string;
  title: string;
  category: "Stay" | "Nature" | "Dining";
  credit: string;
}
export interface SiteSettings {
  name: string;
  location: string;
  headline: string;
  subheading: string;
  story: string;
  email: string;
  phone: string;
  whatsapp: string;
  hero: string;
  gallery: GalleryItem[];
}
export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  cabanaId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  consent: true;
  website?: string;
}
export interface Enquiry extends EnquiryInput {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "closed";
}
export const enquirySchema: z.ZodType<EnquiryInput>;
export const cabanaSchema: z.ZodType<Cabana>;
export const settingsSchema: z.ZodType<SiteSettings>;
export const seedSettings: SiteSettings;
export const seedCabanas: Cabana[];
