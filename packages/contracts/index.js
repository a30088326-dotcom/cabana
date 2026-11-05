const { z } = require("zod");
const localImage = z
  .string()
  .max(240)
  .regex(/^\/(images|uploads)\/[a-zA-Z0-9_.-]+$/);
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose valid arrival and departure dates")
  .refine(
    (v) =>
      !Number.isNaN(Date.parse(v)) &&
      new Date(v).toISOString().slice(0, 10) === v,
    "Choose a valid date",
  );
const enquirySchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.email().max(200),
    phone: z
      .string()
      .trim()
      .min(7)
      .max(30)
      .regex(/^[+\d ()-]+$/),
    cabanaId: z.string().min(1).max(80),
    checkIn: isoDate,
    checkOut: isoDate,
    guests: z.number().int().min(1).max(8),
    message: z.string().trim().max(2000).default(""),
    website: z.string().max(0).optional(),
    consent: z.literal(true),
  })
  .refine((v) => v.checkOut > v.checkIn, {
    message: "Departure must be after arrival",
    path: ["checkOut"],
  })
  .refine(
    (v) =>
      v.checkIn >=
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Colombo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date()),
    { message: "Arrival cannot be in the past", path: ["checkIn"] },
  )
  .refine(
    (v) => (Date.parse(v.checkOut) - Date.parse(v.checkIn)) / 86400000 <= 60,
    {
      message: "For stays over 60 nights, please contact us",
      path: ["checkOut"],
    },
  );
const cabanaSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{2,80}$/),
  name: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(60),
  description: z.string().trim().min(10).max(1500),
  image: localImage,
  capacity: z.number().int().min(1).max(8),
  area: z.number().min(10).max(500),
  price: z.number().int().min(0).max(10000000),
  amenities: z.array(z.string().trim().min(1).max(70)).max(15),
  tag: z.string().max(50),
  active: z.boolean(),
});
const settingsSchema = z.object({
  name: z.string().trim().min(2).max(60),
  location: z.string().trim().min(2).max(150),
  headline: z.string().trim().min(5).max(140),
  subheading: z.string().trim().min(10).max(300),
  story: z.string().trim().min(20).max(2000),
  email: z.union([z.email(), z.literal("")]),
  phone: z.string().max(30),
  whatsapp: z.string().regex(/^\d{7,15}$|^$/),
  hero: localImage,
  gallery: z
    .array(
      z.object({
        src: localImage,
        title: z.string().min(2).max(100),
        category: z.enum(["Stay", "Nature", "Dining"]),
        credit: z.string().max(200),
      }),
    )
    .min(1)
    .max(30),
});
const seedSettings = {
  name: "ELARA",
  location: "Sri Lanka",
  headline: "Somewhere to just be.",
  subheading: "Secluded cabanas. Slow mornings. A little closer to nature.",
  story:
    "Leave the everyday behind. Find a quiet corner of Sri Lanka, where timber cabanas open to green horizons and mornings arrive with birdsong. Take your time over breakfast, wander beneath the trees, and settle into a slower rhythm.",
  email: "",
  phone: "",
  whatsapp: "",
  hero: "/images/hero.webp",
  gallery: [
    {
      src: "/images/exterior.webp",
      title: "Your own little hideaway",
      category: "Stay",
      credit: "AI architectural visualisation",
    },
    {
      src: "/images/interior.webp",
      title: "Mornings, unhurried",
      category: "Stay",
      credit: "AI architectural visualisation",
    },
    {
      src: "/images/dining.webp",
      title: "A taste of the island",
      category: "Dining",
      credit: "AI architectural visualisation",
    },
    {
      src: "/images/sri-lanka-pool.webp",
      title: "Sabaragamuwa, Sri Lanka",
      category: "Nature",
      credit: "Reference photograph · Bogala Village Eco Resort",
    },
    {
      src: "/images/sri-lanka-treehouse.webp",
      title: "Among the Sri Lankan canopy",
      category: "Nature",
      credit: "Reference photograph · Back of Beyond, Pidurangala",
    },
    {
      src: "/images/hero.webp",
      title: "When the world slows down",
      category: "Stay",
      credit: "AI architectural visualisation",
    },
  ],
};
const seedCabanas = [
  {
    id: "forest-cabana",
    name: "The Forest Cabana",
    category: "A quiet escape for two",
    description:
      "A warm timber hideaway with a private veranda, soft linen and a front-row seat to the green. Wake slowly, open the doors, and let the day come to you.",
    image: "/images/exterior.webp",
    capacity: 2,
    area: 42,
    price: 38000,
    amenities: [
      "King bed",
      "Private veranda",
      "Rain shower",
      "Breakfast included",
      "Wi-Fi",
      "Air conditioning",
    ],
    tag: "CLOSE TO NATURE",
    active: true,
  },
  {
    id: "canopy-suite",
    name: "The Canopy Suite",
    category: "Room to linger a little longer",
    description:
      "Generous spaces, natural textures and wide-open views. A secluded suite designed for lazy mornings, long conversations and doing very little at all.",
    image: "/images/interior.webp",
    capacity: 3,
    area: 58,
    price: 48000,
    amenities: [
      "King bed + daybed",
      "Forest views",
      "Private deck",
      "Breakfast included",
      "Wi-Fi",
      "Air conditioning",
    ],
    tag: "SLOW LIVING",
    active: true,
  },
  {
    id: "pool-hideaway",
    name: "The Pool Hideaway",
    category: "A little extra seclusion",
    description:
      "Your own pool, your own pace. Watch the light move across the hills from a private timber deck, then slip into cool water as the evening settles in.",
    image: "/images/hero.webp",
    capacity: 2,
    area: 76,
    price: 62000,
    amenities: [
      "Private plunge pool",
      "King bed",
      "Mountain views",
      "Breakfast included",
      "Wi-Fi",
      "Air conditioning",
    ],
    tag: "SIGNATURE STAY",
    active: true,
  },
];
module.exports = {
  enquirySchema,
  cabanaSchema,
  settingsSchema,
  seedSettings,
  seedCabanas,
};
