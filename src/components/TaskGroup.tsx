import { useState, useRef, useEffect } from "react";
import type { Todo, Status, Priority } from "../types";
import { STATUS_CONFIG } from "../types";
import TaskRow from "./TaskRow";
import StatusIcon from "./StatusIcon";

interface Props {
  status: Status;
  todos: Todo[];
  onAddTodo: (
    text: string,
    priority: Priority,
    dueDate: string | null,
    status: Status
  ) => void;
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    text: string,
    priority: Priority,
    dueDate: string | null
  ) => void;
}

export default function TaskGroup({
  status,
  todos,
  onAddTodo,
  onUpdateStatus,
  onDelete,
  onUpdate,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  const handleAdd = () => {
    if (newText.trim()) {
      onAddTodo(newText, "medium", null, status);
    }
    setNewText("");
    setAdding(false);
  };

  const { label } = STATUS_CONFIG[status];

  return (
    <div>
      {/* グループヘッダー */}
      <div className="group/header flex items-center gap-2 px-4 py-2 hover:bg-[#181818] sticky top-0 bg-[#111111] z-10 border-b border-[#1c1c1c]">
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className={`text-[#4b5563] transition-transform flex-shrink-0 ${
              collapsed ? "-rotate-90" : ""
            }`}
            fill="none"
          >
            <path
              d="M2.5 4.5l3.5 3.5 3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <StatusIcon status={status} size={13} />
          <span className="text-[#9ca3af] text-[13px] font-medium">{label}</span>
          <span className="text-[#3f3f46] text-xs">{todos.length}</span>
        </button>

        <button
          onClick={() => {
            setAdding(true);
            setCollapsed(false);
          }}
          className="opacity-0 group-hover/header:opacity-100 text-[#4b5563] hover:text-[#9ca3af] transition-all p-1 rounded hover:bg-[#222]"
          title="タスクを追加"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* タスク一覧 */}
      {!collapsed && (
        <>
          {/* インライン追加フォーム */}
          {adding && (
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1c1c1c] bg-[#161616]">
              <div className="w-[14px] opacity-30">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="9" width="3" height="4" rx="0.5" fill="#f97316" />
                  <rect x="5.5" y="5.5" width="3" height="7.5" rx="0.5" fill="#2d2d2d" />
                  <rect x="10" y="2" width="3" height="11" rx="0.5" fill="#2d2d2d" />
                </svg>
              </div>
              <div className="w-[68px]" />
              <StatusIcon status={status} size={14} />
              <input
                ref={inputRef}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                  if (e.key === "Escape") {
                    setNewText("");
                    setAdding(false);
                  }
                }}
                onBlur={handleAdd}
                placeholder="タスク名を入力..."
                className="flex-1 bg-transparent text-[#e2e2e2] text-sm outline-none placeholder-[#3f3f46]"
              />
            </div>
          )}

          {todos.map((todo) => (
            <TaskRow
              key={todo.id}
              todo={todo}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </>
      )}
    </div>
  );
}
