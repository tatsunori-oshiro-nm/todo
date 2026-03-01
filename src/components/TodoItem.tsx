import { useState } from "react";
import type { Todo, Priority } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    text: string,
    priority: Priority,
    dueDate: string | null
  ) => void;
}

const priorityConfig: Record<Priority, { label: string; badge: string; active: string }> = {
  high: { label: "高", badge: "bg-red-100 text-red-700", active: "bg-red-500 text-white" },
  medium: { label: "中", badge: "bg-amber-100 text-amber-700", active: "bg-amber-400 text-white" },
  low: { label: "低", badge: "bg-emerald-100 text-emerald-700", active: "bg-emerald-500 text-white" },
};

const allPriorities: Priority[] = ["high", "medium", "low"];

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${year}/${month}/${day}`;
}

function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? "");

  const overdue = isOverdue(todo.dueDate, todo.completed);

  const handleSave = () => {
    if (!editText.trim()) return;
    onUpdate(todo.id, editText, editPriority, editDueDate || null);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate ?? "");
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="px-4 py-3 border-b border-gray-100 last:border-b-0 bg-indigo-50">
        <div className="flex flex-col gap-2">
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="border border-indigo-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-3 items-center">
            <div className="flex gap-1">
              {allPriorities.map((p) => (
                <button
                  key={p}
                  onClick={() => setEditPriority(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    editPriority === p
                      ? priorityConfig[p].active
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {priorityConfig[p].label}
                </button>
              ))}
            </div>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="ml-auto flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
              >
                保存
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`group px-4 py-3 border-b border-gray-100 last:border-b-0 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      {/* チェックボタン */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? "bg-indigo-500 border-indigo-500"
            : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* テキスト・バッジ */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-relaxed break-words ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </p>

        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
              priorityConfig[todo.priority].badge
            }`}
          >
            {priorityConfig[todo.priority].label}
          </span>

          {todo.dueDate && (
            <span
              className={`text-xs ${
                overdue ? "text-red-600 font-semibold" : "text-gray-400"
              }`}
            >
              {overdue && "⚠ "}期限: {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* 編集・削除ボタン */}
      <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
          title="編集"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
          title="削除"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
