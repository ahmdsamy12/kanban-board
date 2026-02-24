import { InputAdornment, TextField, Button, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import { useTasks } from '@/hooks/useTasks'
import { useUIStore } from '@/store/uiStore'

export function Navbar() {
  const { data: tasks = [] } = useTasks()
  const { searchQuery, setSearchQuery, openCreateModal } = useUIStore()

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mr-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
            <GridViewRoundedIcon sx={{ color: 'white', fontSize: 18 }} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 leading-none">KANBAN BOARD</div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">{tasks.length} tasks</div>
          </div>
        </div>

        {/* Search */}
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks…"
          size="small"
          sx={{
            ml: 'auto',
            width: 280,
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: '#F8F9FB',
              '& fieldset': { borderColor: '#E2E8F0' },
              '&:hover fieldset': { borderColor: '#CBD5E1' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94A3B8', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Add Task */}
        <Tooltip title="Create a new task">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openCreateModal()}
            sx={{ borderRadius: '10px', px: 2.5, boxShadow: 'none' }}
          >
            New Task
          </Button>
        </Tooltip>
      </div>
    </header>
  )
}
