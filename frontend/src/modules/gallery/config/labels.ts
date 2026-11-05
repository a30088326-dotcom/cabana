/** Change button names here. Change behavior in this module's hooks/services. */
export const galleryLabels = {
  previousPhoto: "Previous photo",
  nextPhoto: "Next photo",
  allMoments: "All moments",
} as const;

export const galleryFilters = [
  { value: "All", label: galleryLabels.allMoments },
  { value: "Stay", label: "Stay" },
  { value: "Nature", label: "Nature" },
  { value: "Dining", label: "Dining" },
] as const;
