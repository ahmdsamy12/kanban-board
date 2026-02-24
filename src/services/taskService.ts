import axios from 'axios'
import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types'
import { API_BASE_URL } from '@/utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks')
    return data
  },

  getById: async (id: string): Promise<Task> => {
    const { data } = await api.get<Task>(`/tasks/${id}`)
    return data
  },

  // MockAPI auto-generates the id — we just send the fields
  create: async (dto: CreateTaskDto): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', {
      ...dto,
      createdAt: new Date().toISOString(),
    })
    return data
  },

  // MockAPI uses PUT for updates
  update: async ({ id, ...dto }: UpdateTaskDto): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, dto)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },
}
