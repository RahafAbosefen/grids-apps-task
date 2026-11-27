import { z } from "zod";

export const UserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.string().trim().email("Please enter a valid email address"),
  age: z
    .number({ error: "Age must be a number" })
    .int("Age must be a whole number")
    .min(18, "User must be at least 18 years old")
    .max(120, "Age cannot exceed 120"),
  role: z.enum(["admin", "editor", "viewer"]),
});

export type UserFormData = z.infer<typeof UserFormSchema>;

export type FormValidationResult =
  | { readonly success: true; readonly data: UserFormData }
  | {
      readonly success: false;
      readonly errors: Partial<Record<keyof UserFormData, string>>;
    };

export function validateUserForm(rawInput: unknown): FormValidationResult {
  const parsed = UserFormSchema.safeParse(rawInput);

  if (parsed.success) {
    return { success: true, data: parsed.data };
  }

  const fieldErrors: Partial<Record<keyof UserFormData, string>> = {};
  for (const issue of parsed.error.issues) {
    const fieldName = issue.path[0] as keyof UserFormData | undefined;
    if (fieldName !== undefined && fieldErrors[fieldName] === undefined) {
      fieldErrors[fieldName] = issue.message;
    }
  }

  return { success: false, errors: fieldErrors };
}
