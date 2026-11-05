"use client";
import { ImagePlus } from "lucide-react";
export function ImageUpload({
  onUpload,
}: {
  onUpload: (file: File) => Promise<void>;
}) {
  return (
    <label className="upload-label">
      <ImagePlus size={16} />
      Upload photograph
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onUpload(file);
          e.target.value = "";
        }}
      />
    </label>
  );
}
