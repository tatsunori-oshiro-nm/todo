import { useState, useEffect } from "react";
import type { Todo, Priority, Status } from "../types";

const STORAGE_KEY = "todo-app-todos";

function loadFromStorage(): Todo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    // 旧フォーマット (completed: boolean) からマイグレーション
    return parsed.map((t: Record<string, unknown>, i: number) => {
      if (!("status" in t)) {
        return {
          ...t,
          shortId: `TODO-${i + 1}`,
          status: (t.completed as boolean) ? "done" : "pending",
        };
      }
      return t;
    });
  } catch {
    return [];
  }
}

function getNextShortId(todos: Todo[]): string {
  const nums = todos
    .map((t) => parseInt(t.shortId?.replace("TODO-", "") ?? "0"))
    .filter((n) => !isNaN(n));
  const max = nums.length > 0 ? Math.max(...nums) : 0;
  return `TODO-${max + 1}`;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    text: string,
    priority: Priority,
    dueDate: string | null,
    status: Status = "pending"
  ) => {
    setTodos((prev) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        shortId: getNextShortId(prev),
        text: text.trim(),
        status,
        priority,
        dueDate,
        createdAt: Date.now(),
      };
      return [newTodo, ...prev];
    });
  };

  const updateStatus = (id: string, status: Status) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (
    id: string,
    text: string,
    priority: Priority,
    dueDate: string | null
  ) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: text.trim(), priority, dueDate } : t
      )
    );
  };

  return { todos, addTodo, updateStatus, deleteTodo, updateTodo };
}
