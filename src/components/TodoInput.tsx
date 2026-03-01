import { useState } from "react";
import type { FormEvent } from "react";
import type { Priority } from "../types";

interface Props {
  onAdd: (text: string, priority: Priority, dueDate: string | null) => void;
}

const priorities: { key: Priority; label: string }[] = [
  { key: "high", label: "高" },
  { key: "medium", label: "中" },
  { key: "low", label: "低" },
];

const priorityActiveClass: Record<Priority, string> = {
  high: "bg-red-500 text-white",
  medium: "bg-amber-400 text-white",
  low: "bg-emerald-500 text-white",
};

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, dueDate || null);
    setText("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを追加..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          追加
        </button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex gap-1">
          {priorities.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPriority(p.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                priority === p.key
                  ? priorityActiveClass[p.key]
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
      </div>
    </form>
  );
}
