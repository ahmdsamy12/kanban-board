import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { taskService } from '@/services/taskService'
import type { CreateTaskDto, UpdateTaskDto } from '@/types'

export const TASKS_KEY = ['tasks'] as const

export function useTasks() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: taskService.getAll,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  })
}

export function useCreateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTaskDto) => taskService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useUpdateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateTaskDto) => taskService.update(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
