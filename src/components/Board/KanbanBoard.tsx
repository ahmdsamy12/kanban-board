import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  closestCorners,
} from "@dnd-kit/core";
import { Alert } from "@mui/material";
import { useTasks, useUpdateTask } from "@/hooks/useTasks";
import { useUIStore } from "@/store/uiStore";
import { COLUMNS } from "@/utils/constants";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "@/components/Task/TaskCard";
import type { Task, ColumnId } from "@/types";

export function KanbanBoard() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const updateTask = useUpdateTask();
  const searchQuery = useUIStore((s) => s.searchQuery);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getColumnTasks = (colId: ColumnId) =>
    filtered.filter((t) => t.column === colId);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;

    const overId = over.id as string;
    const activeId = active.id as string;

    // Determine target column
    const targetColumnId =
      COLUMNS.find((c) => c.id === overId)?.id ??
      tasks.find((t) => t.id === overId)?.column;

    const task = tasks.find((t) => t.id === activeId);
    if (task && targetColumnId && task.column !== targetColumnId) {
      updateTask.mutate({ id: task.id, column: targetColumnId as ColumnId });
    }
  };

  if (error) {
    return (
      <Alert severity="error" className="m-6">
        Failed to load tasks. Make sure json-server is running on port 4000.
      </Alert>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 px-6 pb-6 overflow-x-auto min-h-full">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getColumnTasks(column.id)}
            isLoading={isLoading}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} isDragging />}
      </DragOverlay>
    </DndContext>
  );
}
