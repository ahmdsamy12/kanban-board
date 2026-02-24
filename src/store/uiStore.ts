import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  searchQuery: string
  selectedTaskId: string | null
  isCreateModalOpen: boolean
  createModalColumn: string | null

  setSearchQuery: (query: string) => void
  setSelectedTaskId: (id: string | null) => void
  openCreateModal: (column?: string) => void
  closeCreateModal: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      searchQuery: '',
      selectedTaskId: null,
      isCreateModalOpen: false,
      createModalColumn: null,

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedTaskId: (id) => set({ selectedTaskId: id }),
      openCreateModal: (column) =>
        set({ isCreateModalOpen: true, createModalColumn: column ?? null }),
      closeCreateModal: () =>
        set({ isCreateModalOpen: false, createModalColumn: null }),
    }),
    { name: 'ui-store' }
  )
)
