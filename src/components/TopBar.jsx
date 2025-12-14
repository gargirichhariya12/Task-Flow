import React from "react";


export default function TopBar({ onAdd }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-900 shadow">
      
      <h1 className="text-4xl font-semibold text-teal-400">TaskFlow</h1>
      <div className="flex gap-3">
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:opacity-95"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
