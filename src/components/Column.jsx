import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ status, tasks, openTask, duplicates }) {
  return (
    <div className="flex-1    bg-white/10  backdrop-blur-xl  border border-white/30  p-4 rounded-xl shadow-lg
    shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]transition duration-300">
      <h2 className="font-semibold  text-teal-300 mb-3">
        {status} <span className="text-sm text-gray-3">({tasks.length})</span>
      </h2>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`board-column p-2 rounded min-h-[200px] ${
              snapshot.isDraggingOver ? "bg-purple-50" : ""
            }`}
          >
            {tasks.map((t, idx) => (
              <Draggable key={t.id} draggableId={`${t.id}`} index={idx}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                  >
                    <TaskCard
                      task={t}
                      onOpen={openTask}
                      duplicate={duplicates.has(t.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
