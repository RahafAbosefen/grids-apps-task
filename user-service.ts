import { z } from "zod";

// 1. Define a strict Schema for runtime validation
const UserSchema = z.object({
  id: z.string().uuid({ message: "User ID must be a valid UUID" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address format" }),
  role: z.enum(["admin", "user", "guest"]).default("user"),
  age: z.number().int().positive().optional(),
});

// 2. Automatically infer the TypeScript type from the Schema
export type User = z.infer<typeof UserSchema>;

// 3. Process untrusted external input (using unknown instead of any)
export function processIncomingUser(rawInput: unknown): User {
  const result = UserSchema.safeParse(rawInput);

  if (!result.success) {
    const formattedErrors = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(" | ");
    throw new Error(`User validation failed: ${formattedErrors}`);
  }

  return result.data;
}

// --- Quick verification test ---
const validPayload: unknown = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  name: "Ahmad",
  email: "ahmad@example.com",
};

const user = processIncomingUser(validPayload);
console.log("User validated successfully:", user);
