import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

export default function Board({
  tasksByStatus,
  onDragEnd,
  openTask,
  duplicates,
}) {
  const statuses = ["To-Do", "In-Progress", "Completed"];
  return (
    <div className="p-4 flex gap-4 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses.map((s) => (
          <Column
            key={s}
            status={s}
            tasks={tasksByStatus[s] || []}
            openTask={openTask}
            duplicates={duplicates}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
