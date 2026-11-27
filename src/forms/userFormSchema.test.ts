import { describe, it, expect } from "vitest";
import { validateUserForm } from "./userFormSchema.js";

describe("validateUserForm", () => {
  it("accepts valid user input and trims whitespace", () => {
    const result = validateUserForm({
      name: "  Ahmad Ali  ",
      email: "ahmad@example.com",
      age: 25,
      role: "admin",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        name: "Ahmad Ali",
        email: "ahmad@example.com",
        age: 25,
        role: "admin",
      });
    }
  });

  it("rejects short names and invalid emails", () => {
    const result = validateUserForm({
      name: "A",
      email: "not-an-email",
      age: 22,
      role: "editor",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe(
        "Name must be at least 2 characters long",
      );
      expect(result.errors.email).toBe("Please enter a valid email address");
    }
  });

  it("rejects underage users and invalid roles", () => {
    const result = validateUserForm({
      name: "Sara",
      email: "sara@example.com",
      age: 15,
      role: "superadmin",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.age).toBe("User must be at least 18 years old");
      expect(result.errors.role).toBeDefined();
    }
  });
});
