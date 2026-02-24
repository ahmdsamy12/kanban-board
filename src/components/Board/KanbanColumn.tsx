import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button, Skeleton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { Task, Column } from '@/types'
import { TaskCard } from '@/components/Task/TaskCard'
import { useUIStore } from '@/store/uiStore'
import { PAGE_SIZE } from '@/utils/constants'

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
  isLoading?: boolean
}

export function KanbanColumn({ column, tasks, isLoading }: KanbanColumnProps) {
  const [page, setPage] = useState(1)
  const openCreateModal = useUIStore((s) => s.openCreateModal)

  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  const paginatedTasks = tasks.slice(0, page * PAGE_SIZE)
  const hasMore = paginatedTasks.length < tasks.length

  return (
    <div
      className={`
        flex flex-col bg-[#F8F9FB] rounded-2xl min-w-[280px] max-w-[300px] w-full
        border-2 transition-colors duration-150
        ${isOver ? 'border-blue-300 bg-blue-50/40' : 'border-transparent'}
      `}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: column.color }}
        />
        <span
          className="text-xs font-mono font-semibold tracking-widest uppercase"
          style={{ color: column.color }}
        >
          {column.label}
        </span>
        <span className="ml-auto text-xs font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task List */}
      <div
        ref={setNodeRef}
        className="flex flex-col gap-2.5 px-3 pb-3 flex-1 overflow-y-auto max-h-[calc(100vh-200px)] min-h-[120px]"
      >
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={100} sx={{ borderRadius: 2 }} />
          ))
        ) : (
          <SortableContext
            items={paginatedTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {paginatedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        )}

        {/* Load More */}
        {hasMore && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="text-xs text-slate-400 hover:text-slate-600 py-2 transition-colors"
          >
            Load {Math.min(PAGE_SIZE, tasks.length - paginatedTasks.length)} more…
          </button>
        )}
      </div>

      {/* Add Task */}
      <div className="px-3 pb-3">
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => openCreateModal(column.id)}
          sx={{
            color: '#94A3B8',
            borderRadius: '10px',
            py: 1,
            fontSize: '0.8rem',
            border: '1.5px dashed #E2E8F0',
            '&:hover': {
              borderColor: column.color,
              color: column.color,
              background: 'transparent',
            },
          }}
        >
          Add task
        </Button>
      </div>
    </div>
  )
}
