import { useState, useEffect, useRef } from "react";
import type { Todo, Priority, Status } from "../types";
import { STATUS_CONFIG, STATUS_ORDER } from "../types";
import PriorityIcon from "./PriorityIcon";
import StatusIcon from "./StatusIcon";

interface Props {
  todo: Todo;
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    text: string,
    priority: Priority,
    dueDate: string | null
  ) => void;
}

const PRIORITY_CYCLE: Priority[] = ["high", "medium", "low"];

const PRIORITY_BADGE: Record<Priority, string> = {
  high: "text-[#f97316] bg-[#f97316]/10",
  medium: "text-[#94a3b8] bg-[#94a3b8]/10",
  low: "text-[#6b7280] bg-[#6b7280]/10",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("ja-JP", { month: "short", day: "numeric" });
}

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

export default function TaskRow({ todo, onUpdateStatus, onDelete, onUpdate }: Props) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const statusRef = useRef<HTMLDivElement>(null);
  const overdue = isOverdue(todo.dueDate);

  // ステータスメニューの外側クリックで閉じる
  useEffect(() => {
    if (!showStatusMenu) return;
    const handler = (e: MouseEvent) => {
      if (!statusRef.current?.contains(e.target as Node)) {
        setShowStatusMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showStatusMenu]);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, todo.priority, todo.dueDate);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  };

  const cyclePriority = () => {
    const next =
      PRIORITY_CYCLE[(PRIORITY_CYCLE.indexOf(todo.priority) + 1) % PRIORITY_CYCLE.length];
    onUpdate(todo.id, todo.text, next, todo.dueDate);
  };

  return (
    <div className="group flex items-center gap-2 px-4 py-2 hover:bg-[#181818] border-b border-[#1c1c1c] text-sm relative min-h-[38px]">
      {/* 優先度アイコン (クリックで循環) */}
      <button
        onClick={cyclePriority}
        className="flex-shrink-0 opacity-40 group-hover:opacity-80 hover:!opacity-100 transition-opacity"
        title="クリックで優先度を変更"
      >
        <PriorityIcon priority={todo.priority} />
      </button>

      {/* ショートID */}
      <span className="flex-shrink-0 text-[#3f3f46] text-xs w-[68px] font-mono select-none">
        {todo.shortId}
      </span>

      {/* ステータスアイコン (クリックでメニュー) */}
      <div ref={statusRef} className="flex-shrink-0 relative">
        <button
          onClick={() => setShowStatusMenu((v) => !v)}
          className="flex items-center"
          title="ステータスを変更"
        >
          <StatusIcon status={todo.status} />
        </button>

        {showStatusMenu && (
          <div className="absolute left-0 top-6 z-50 bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg shadow-2xl py-1 w-40">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onUpdateStatus(todo.id, s);
                  setShowStatusMenu(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs hover:bg-[#252525] transition-colors ${
                  todo.status === s ? "text-white" : "text-[#9ca3af]"
                }`}
              >
                <StatusIcon status={s} size={12} />
                {STATUS_CONFIG[s].label}
                {todo.status === s && (
                  <span className="ml-auto text-[#4b5563]">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* タイトル */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") {
                setEditText(todo.text);
                setEditing(false);
              }
            }}
            className="w-full bg-transparent border-b border-[#4b5563] text-[#e2e2e2] outline-none text-sm py-0.5"
          />
        ) : (
          <span
            className={`block truncate cursor-default select-none ${
              todo.status === "done"
                ? "line-through text-[#3f3f46]"
                : "text-[#d1d5db]"
            }`}
            onDoubleClick={() => setEditing(true)}
            title="ダブルクリックで編集"
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* 優先度バッジ */}
      <button
        onClick={cyclePriority}
        className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium ${PRIORITY_BADGE[todo.priority]}`}
        title="クリックで優先度を変更"
      >
        {PRIORITY_LABEL[todo.priority]}
      </button>

      {/* 期限日 */}
      {todo.dueDate && (
        <div
          className={`flex-shrink-0 flex items-center gap-1 text-[11px] ${
            overdue ? "text-[#ef4444]" : "text-[#6b7280]"
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect
              x="1"
              y="2"
              width="10"
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M4 1v2M8 1v2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {formatDate(todo.dueDate)}
        </div>
      )}

      {/* 削除ボタン */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-[#4b5563] hover:text-[#ef4444] transition-all p-0.5 rounded"
        title="削除"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
