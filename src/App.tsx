import { Navbar } from '@/components/UI/Navbar'
import { KanbanBoard } from '@/components/Board/KanbanBoard'
import { TaskModal } from '@/components/Task/TaskModal'

function App() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-5">
        <KanbanBoard />
      </main>
      <TaskModal />
    </div>
  )
}

export default App
