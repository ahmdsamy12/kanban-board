import type { Column } from '@/types'

export const COLUMNS: Column[] = [
  { id: 'backlog', label: 'Backlog', color: '#3B82F6', dotColor: '#3B82F6' },
  { id: 'in_progress', label: 'In Progress', color: '#F59E0B', dotColor: '#F59E0B' },
  { id: 'review', label: 'In Review', color: '#8B5CF6', dotColor: '#8B5CF6' },
  { id: 'done', label: 'Done', color: '#10B981', dotColor: '#10B981' },
]

export const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  high: { bg: '#FEF2F2', text: '#EF4444' },
  medium: { bg: '#FFF7ED', text: '#F59E0B' },
  low: { bg: '#F0FDF4', text: '#10B981' },
}

export const PAGE_SIZE = 5
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://699d592883e60a406a45e6f6.mockapi.io/kanbanBoard/api/v1'
