import  { useState, useEffect } from "react";

function blank() {
  return {
    title: "",
    description: "",
    priority: "Medium",
    status: "To-Do",
    dueDate: "",
    createdAt: new Date().toISOString(),
    id: Date.now(),
  };
}

export default function TaskModal({ open, onClose, onSave, initial }) {
  const [task, setTask] = useState(blank());

  useEffect(() => {
    if (initial) setTask(initial);
    else setTask(blank());
  }, [initial]);

  if (!open) return null;

  function save() {
    if (!task.title.trim()) return alert("Title required");
    onSave(task);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-slate-900 w-full max-w-lg p-6 rounded-xl border border-white/10 shadow-2xl">
    
    <h3 className="text-lg font-semibold mb-4 text-white">
      {initial ? "Edit Task" : "New Task"}
    </h3>

    <div className="flex flex-col gap-3">
      
      <input
        className="bg-slate-800 text-white border border-white/10 px-3 py-2 rounded-lg
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        className="bg-slate-800 text-white border border-white/10 px-3 py-2 rounded-lg
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <div className="flex gap-2">
        
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="bg-slate-800 text-white border border-white/10 px-3 py-2 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="bg-slate-800 text-white border border-white/10 px-3 py-2 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option>To-Do</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="datetime-local"
          value={task.dueDate ? task.dueDate.slice(0, 16) : ""}
          onChange={(e) =>
            setTask({
              ...task,
              dueDate: e.target.value
                ? new Date(e.target.value).toISOString()
                : "",
            })
          }
          className="bg-slate-800 text-white border border-white/10 px-3 py-2 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-white/20 text-gray-300
                     hover:bg-white/10 transition"
        >
          Cancel
        </button>

        <button
          onClick={save}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium
                     hover:bg-purple-500 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div>

  );
}
