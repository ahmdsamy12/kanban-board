export type ColumnId = 'backlog' | 'in_progress' | 'review' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  column: ColumnId
  priority: Priority
  createdAt: string
}

export interface Column {
  id: ColumnId
  label: string
  color: string
  dotColor: string
}

export interface CreateTaskDto {
  title: string
  description: string
  column: ColumnId
  priority: Priority
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  id: string
}
