import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Chip, IconButton, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import type { Task } from '@/types'
import { PRIORITY_COLORS } from '@/utils/constants'
import { useUIStore } from '@/store/uiStore'
import { useDeleteTask } from '@/hooks/useTasks'

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  const setSelectedTaskId = useUIStore((s) => s.setSelectedTaskId)
  const deleteTask = useDeleteTask()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const priorityStyle = PRIORITY_COLORS[task.priority]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-xl p-4 shadow-card group cursor-default select-none
        border border-transparent hover:border-gray-200 hover:shadow-card-hover
        transition-all duration-150
        ${isDragging ? 'rotate-1 shadow-xl' : ''}
      `}
    >
      {/* Drag handle + actions */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing mt-0.5"
        >
          <DragIndicatorIcon fontSize="small" />
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip title="Edit task">
            <IconButton
              size="small"
              onClick={() => setSelectedTaskId(task.id)}
              sx={{ color: '#94A3B8', '&:hover': { color: '#3B82F6' } }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete task">
            <IconButton
              size="small"
              onClick={() => deleteTask.mutate(task.id)}
              sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444' } }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Content */}
      <div className="px-1">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-1">
          {task.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {task.description}
        </p>

        <Chip
          label={task.priority.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: priorityStyle.bg,
            color: priorityStyle.text,
            fontWeight: 600,
          }}
        />
      </div>
    </div>
  )
}
