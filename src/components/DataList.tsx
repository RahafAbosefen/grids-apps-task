import type { ReactNode } from "react";
import type { AsyncState } from "../types/types.js";

export interface DataListProps<T> {
  readonly state: AsyncState<readonly T[]>;
  readonly keyExtractor: (item: T) => string;
  readonly renderItem: (item: T) => ReactNode;
  readonly emptyMessage?: string;
}

export function DataList<T>({
  state,
  keyExtractor,
  renderItem,
  emptyMessage = "No items found.",
}: DataListProps<T>) {
  switch (state.status) {
    case "idle":
      return <p>Ready to load data.</p>;

    case "loading":
      return <p aria-busy="true">Loading data...</p>;

    case "error":
      return <div role="alert">Error: {state.error}</div>;

    case "success": {
      if (state.data.length === 0) {
        return <p>{emptyMessage}</p>;
      }

      return (
        <ul>
          {state.data.map((item) => (
            <li key={keyExtractor(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      );
    }
  }
}
