import { useTodos } from "./hooks/useTodos";
import { STATUS_ORDER } from "./types";
import TaskGroup from "./components/TaskGroup";

function App() {
  const { todos, addTodo, updateStatus, deleteTodo, updateTodo } = useTodos();

  return (
    <div className="flex h-screen bg-[#111111] text-[#e2e2e2] overflow-hidden">
      {/* サイドバー */}
      <aside className="w-11 flex-shrink-0 bg-[#0d0d0d] border-r border-[#1c1c1c] flex flex-col items-center py-3 gap-2">
        {/* ロゴ */}
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold select-none">
          T
        </div>
        <div className="mt-3 flex flex-col gap-1">
          {/* ホーム */}
          <button className="w-8 h-8 flex items-center justify-center text-[#e2e2e2] rounded-lg bg-[#1c1c1c]">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* リスト */}
          <button className="w-8 h-8 flex items-center justify-center text-[#4b5563] hover:text-[#9ca3af] rounded-lg hover:bg-[#1a1a1a] transition-colors">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 5h12M2 8h12M2 11h8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* 設定 */}
          <button className="w-8 h-8 flex items-center justify-center text-[#4b5563] hover:text-[#9ca3af] rounded-lg hover:bg-[#1a1a1a] transition-colors">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className="flex items-center justify-between px-5 py-2.5 border-b border-[#1c1c1c] flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#e2e2e2] font-semibold text-sm">My Tasks</span>
            <span className="text-[#3f3f46] text-xs">{todos.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 text-[#6b7280] hover:text-[#9ca3af] text-xs px-2.5 py-1.5 rounded hover:bg-[#1a1a1a] transition-colors">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 4h10M4 7h6M6 10h2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              Filter
            </button>
            <button className="flex items-center gap-1.5 text-[#6b7280] hover:text-[#9ca3af] text-xs px-2.5 py-1.5 rounded hover:bg-[#1a1a1a] transition-colors">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1.5"
                  y="1.5"
                  width="4"
                  height="4"
                  rx="0.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <rect
                  x="8.5"
                  y="1.5"
                  width="4"
                  height="4"
                  rx="0.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <rect
                  x="1.5"
                  y="8.5"
                  width="4"
                  height="4"
                  rx="0.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <rect
                  x="8.5"
                  y="8.5"
                  width="4"
                  height="4"
                  rx="0.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              Display
            </button>
          </div>
        </header>

        {/* タスクリスト */}
        <div className="flex-1 overflow-y-auto">
          {STATUS_ORDER.map((status) => (
            <TaskGroup
              key={status}
              status={status}
              todos={todos.filter((t) => t.status === status)}
              onAddTodo={addTodo}
              onUpdateStatus={updateStatus}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
