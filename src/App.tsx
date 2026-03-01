import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import type { FilterType } from "./types";
import TodoInput from "./components/TodoInput";
import FilterBar from "./components/FilterBar";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-700 tracking-tight">
            TODO
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {activeCount > 0
              ? `${activeCount}件のタスクが残っています`
              : todos.length === 0
              ? "タスクを追加してください"
              : "すべて完了しました！"}
          </p>
        </div>

        {/* 入力フォーム */}
        <TodoInput onAdd={addTodo} />

        {/* リスト */}
        <div className="bg-white rounded-2xl shadow-lg mt-6 overflow-hidden">
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-sm">
                {filter === "all"
                  ? "タスクがありません"
                  : filter === "active"
                  ? "未完了のタスクはありません"
                  : "完了済みのタスクはありません"}
              </p>
            </div>
          ) : (
            <ul>
              {filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))}
            </ul>
          )}

          {/* フッター */}
          {completedCount > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {completedCount}件完了
              </span>
              <button
                onClick={clearCompleted}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                完了済みをすべて削除
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
