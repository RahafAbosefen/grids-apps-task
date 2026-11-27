import { useState, type FormEvent } from "react";
import {
  validateUserForm,
  type UserFormData,
} from "../forms/userFormSchema.js";
import "./UserForm.css";

export interface UserFormProps {
  readonly onValidSubmit: (data: UserFormData) => void;
}

export function UserForm({ onValidSubmit }: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("18");
  const [role, setRole] = useState<UserFormData["role"]>("viewer");
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateUserForm({
      name,
      email,
      age: Number(age),
      role,
    });

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onValidSubmit(result.data);
  }

  return (
    <form className="user-form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="user-form-title">Create New User</h2>

      <div className="user-form-group">
        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          type="text"
          placeholder="e.g. Ahmad Ali"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name !== undefined && (
          <p className="user-form-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="user-form-group">
        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          placeholder="ahmad@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email !== undefined && (
          <p className="user-form-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="user-form-group">
        <label htmlFor="user-age">Age</label>
        <input
          id="user-age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {errors.age !== undefined && (
          <p className="user-form-error" role="alert">
            {errors.age}
          </p>
        )}
      </div>

      <div className="user-form-group">
        <label htmlFor="user-role">Role</label>
        <select
          id="user-role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserFormData["role"])}
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role !== undefined && (
          <p className="user-form-error" role="alert">
            {errors.role}
          </p>
        )}
      </div>

      <button className="user-form-submit" type="submit">
        Create User
      </button>
    </form>
  );
}
