import { api } from "@/shared/lib/api";
import type { EnquiryInput } from "@elara/contracts";
export function submitEnquiry(input: EnquiryInput) {
  return api<{ id: string; message: string }>("/enquiries", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
