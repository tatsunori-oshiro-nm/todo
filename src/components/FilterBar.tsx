import type { FilterType } from "../types";

interface Props {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  activeCount: number;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "active", label: "未完了" },
  { key: "completed", label: "完了済み" },
];

export default function FilterBar({ filter, onFilterChange, activeCount }: Props) {
  return (
    <div className="flex border-b border-gray-100">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            filter === f.key
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {f.label}
          {f.key === "active" && activeCount > 0 && (
            <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
              {activeCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
