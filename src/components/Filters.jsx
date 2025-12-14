import React from "react";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex gap-3 mx-4 items-center flex-wrap">
      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters((f) => ({ ...f, priority: e.target.value }))
        }
        className="px-3 py-1  rounded-lg bg-slate-900 text-white border border-white/20 focus:ring-2 focus:ring-teal-400"
      >
        <option value="">All priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        className="px-3 py-1  rounded-lg bg-slate-900 text-white border border-white/20 focus:ring-2 focus:ring-teal-400"
      >
        <option value="">All status</option>
        <option>To-Do</option>
        <option>In-Progress</option>
        <option>Completed</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
        className="px-3 py-1  rounded-lg bg-slate-900 text-white border border-white/20 focus:ring-2 focus:ring-teal-400"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="due">Closest due date</option>
      </select>
    </div>
  );
}
