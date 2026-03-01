export type Priority = "high" | "medium" | "low";
export type Status = "pending" | "in-review" | "in-progress" | "done";

export interface Todo {
  id: string;
  shortId: string;
  text: string;
  status: Status;
  priority: Priority;
  dueDate: string | null;
  createdAt: number;
}

export const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
  pending: { label: "In Pending", color: "#6b7280" },
  "in-review": { label: "In Review", color: "#22c55e" },
  "in-progress": { label: "In Progress", color: "#f59e0b" },
  done: { label: "Done", color: "#a855f7" },
};

export const STATUS_ORDER: Status[] = ["pending", "in-review", "in-progress", "done"];
