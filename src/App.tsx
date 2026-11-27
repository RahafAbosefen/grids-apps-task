import { useState } from "react";
import type { AsyncState, User } from "./types/types.js";
import type { UserFormData } from "./forms/userFormSchema.js";
import { DataList } from "./components/DataList.js";
import { UserCard } from "./components/UserCard.js";
import { UserForm } from "./components/UserForm.js";

const MOCK_USERS: readonly User[] = [
  { id: "1", name: "Ahmad", email: "ahmad@example.com", role: "admin" },
  { id: "2", name: "Sara", email: "sara@example.com", role: "editor" },
];

export function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [users, setUsers] = useState<readonly User[]>(MOCK_USERS);

  const state: AsyncState<readonly User[]> = {
    status: "success",
    data: users,
  };

  function handleAddUser(formData: UserFormData) {
    const newUser: User = {
      id: String(Date.now()),
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };
    setUsers((prev) => [...prev, newUser]);
  }

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <UserForm onValidSubmit={handleAddUser} />

      <hr
        style={{
          margin: "2rem 0",
          border: "none",
          borderTop: "1px solid #e2e8f0",
        }}
      />

      <h1>Team Members</h1>
      <DataList
        state={state}
        keyExtractor={(user) => user.id}
        renderItem={(user) => (
          <UserCard
            user={user}
            isSelected={selectedId === user.id}
            onSelect={(id) => setSelectedId(id)}
          />
        )}
      />
    </main>
  );
}
