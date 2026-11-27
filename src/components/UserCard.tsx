import type { User } from "../types/types.js";

export interface UserCardProps {
  readonly user: User;
  readonly isSelected?: boolean;
  readonly onSelect: (userId: string) => void;
}

export function UserCard({
  user,
  isSelected = false,
  onSelect,
}: UserCardProps) {
  return (
    <article
      style={{
        border: isSelected ? "2px solid #2563eb" : "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
      }}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span>Role: {user.role.toUpperCase()}</span>

      {user.avatarUrl !== undefined && (
        <img
          src={user.avatarUrl}
          alt={`${user.name} avatar`}
          width={40}
          height={40}
        />
      )}

      <div>
        <button type="button" onClick={() => onSelect(user.id)}>
          {isSelected ? "Selected" : "Select User"}
        </button>
      </div>
    </article>
  );
}
