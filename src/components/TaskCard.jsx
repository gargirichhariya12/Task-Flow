import React from "react";
import { format } from "date-fns";

export default function TaskCard({ task, onOpen, duplicate }) {
  return (
<div
  onClick={() => onOpen(task)}
  className="bg-slate-900/80 border border-white/10 p-4 rounded-xl
             shadow-lg mb-3 cursor-pointer transition-all
             hover:shadow-teal-400/20 hover:border-teal-400/40"
>
  <div className="flex justify-between items-start gap-2">
    
    <h3 className="font-semibold text-white leading-tight">
      {task.title}
      {duplicate && (
        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full
                         bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
          Duplicate
        </span>
      )}
    </h3>

    <span
      className="text-[11px] px-2 py-1 rounded-full font-medium text-slate-900"
      style={{
        background:
          task.priority === "High"
            ? "#f87171"
            : task.priority === "Medium"
            ? "#fbbf24"
            : "#34d399",
      }}
    >
      {task.priority}
    </span>
  </div>

  {task.description && (
    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
      {task.description}
    </p>
  )}

  <div className="text-[11px] text-gray-500 mt-3 flex justify-between">
    <span>
      Due: {task.dueDate ? format(new Date(task.dueDate), "PPP") : "—"}
    </span>
    <span>
      Created: {format(new Date(task.createdAt), "PPP")}
    </span>
  </div>
</div>


  );
}
