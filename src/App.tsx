import { useState } from "react";
import type { AsyncState, User } from "./types/types.js";
import { DataList } from "./components/DataList.js";
import { UserCard } from "./components/UserCard.js";

const MOCK_USERS: readonly User[] = [
  { id: "1", name: "Ahmad", email: "ahmad@example.com", role: "admin" },
  { id: "2", name: "Sara", email: "sara@example.com", role: "editor" },
];

export function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [state] = useState<AsyncState<readonly User[]>>({
    status: "success",
    data: MOCK_USERS,
  });

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
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
