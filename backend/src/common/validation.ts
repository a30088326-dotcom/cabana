import { BadRequestException } from "@nestjs/common";
import type { ZodType } from "zod";
export function validate<T>(schema: ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success)
    throw new BadRequestException({
      message: result.error.issues.map((i) => i.message).join(". "),
      issues: result.error.issues,
    });
  return result.data;
}
