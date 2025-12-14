import  { useState, useEffect, useMemo } from "react";
import TopBar from "./components/TopBar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import Filters from "./components/Filters";
import { loadTasks, saveTasks } from "./utils/storage";

function groupByStatus(tasks) {
  return tasks.reduce((acc, t) => {
    acc[t.status] = acc[t.status] || [];
    acc[t.status].push(t);
    return acc;
  }, {});
}
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    sort: "newest",
  });

  // initial load
  useEffect(() => {
    const fromStorage = loadTasks();
    if (fromStorage && fromStorage.length) {
      setTasks(fromStorage);
      return;
    }
    // fetch static tasks.json
    fetch("/tasks.json")
      .then((r) => r.json())
      .then((data) => {
        setTasks(data);
        saveTasks(data);
      })
      .catch((e) => console.error(e));
  }, []);

  // persist on change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function openCreate() {
    setActiveTask(null);
    setModalOpen(true);
  }

  function openEdit(task) {
    setActiveTask(task);
    setModalOpen(true);
  }

  function upsertTask(task) {
    setTasks((prev) => {
      // if id exists, update
      const found = prev.find((t) => t.id === task.id);
      if (found) {
        return prev.map((t) => (t.id === task.id ? { ...task } : t));
      }
      // handle duplicate titles in same board by numbering
      let title = task.title;
      const same = prev.filter(
        (t) => t.title === title && t.status === task.status
      );
      if (same.length) {
        title = `${title} (${same.length + 1})`;
      }
      return [{ ...task, title }, ...prev];
    });
  }

  function removeTask(id) {
    if (!confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const id = Number(draggableId);
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;
      const updated = { ...task, status: destination.droppableId };
      // remove old and insert at top of destination for simplicity
      const others = prev.filter((t) => t.id !== id);
      return [updated, ...others];
    });
  }

  const duplicates = useMemo(() => {
    const map = new Map();
    const seen = new Map();
    tasks.forEach((t) => {
      const key = `${t.status}::${t.title.toLowerCase()}`;
      seen.set(key, (seen.get(key) || 0) + 1);
    });
    tasks.forEach((t) => {
      const key = `${t.status}::${t.title.toLowerCase()}`;
      if (seen.get(key) > 1) map.set(t.id, true);
    });
    return map;
  }, [tasks]);

  // apply filters + sorting
  const filtered = useMemo(() => {
    let list = tasks.slice();
    if (filters.priority)
      list = list.filter((t) => t.priority === filters.priority);
    if (filters.status) list = list.filter((t) => t.status === filters.status);

    if (filters.sort === "newest")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (filters.sort === "oldest")
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (filters.sort === "due")
      list.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    return list;
  }, [tasks, filters]);

  const tasksByStatus = groupByStatus(filtered);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 ">
      <TopBar onAdd={openCreate} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <Board
          tasksByStatus={tasksByStatus}
          onDragEnd={onDragEnd}
          openTask={openEdit}
          duplicates={duplicates}
        />

        <div className="p-4">
          <h3 className="font-semibold text-teal-400 mb-3 text-sm tracking-wide">
            All Tasks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 border border-white/10 rounded-xl p-4
                   flex justify-between items-center
                   hover:border-teal-400/40 transition"
              >
                <div>
                  <div className="font-semibold text-white text-sm">
                    {t.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {t.status} · {t.priority}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="px-3 py-1 text-xs rounded-lg border border-white/20
                       text-gray-300 hover:bg-white/10 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeTask(t.id)}
                    className="px-3 py-1 text-xs rounded-lg
                       bg-red-500/90 text-white
                       hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(task) => {
          // ensure createdAt and id
          const t = { ...task };
          if (!t.id) t.id = Date.now();
          if (!t.createdAt) t.createdAt = new Date().toISOString();
          upsertTask(t);
        }}
        initial={activeTask}
      />
    </div>
  );
}
