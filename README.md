# 🗂 Kanban Board

A production-grade Kanban-style task management application built with **React 19**, **Zustand**, **Material UI**, **Tailwind CSS**, and **TanStack Query**.

![Preview](https://placehold.co/1200x600/F0F2F5/3B82F6?text=Kanban+Board+Preview)

---

## ✨ Features

| Feature | Details |
|---|---|
| **4-Column Board** | Backlog → In Progress → In Review → Done |
| **Drag & Drop** | Powered by `@dnd-kit` — smooth, accessible DnD between columns |
| **CRUD Tasks** | Create, edit, and delete tasks via polished modal dialogs |
| **Search / Filter** | Real-time search across task title and description |
| **Pagination** | Each column shows 5 tasks by default with "Load more" |
| **React Query Cache** | 2-minute stale time with auto-invalidation on mutations |
| **Zustand UI Store** | Lightweight global UI state (search, modals, selected task) |
| **Material UI + Tailwind** | MUI components styled with Tailwind utility classes |
| **TypeScript** | Strict types across the entire codebase |
| **Priority Badges** | Visual HIGH / MEDIUM / LOW priority indicators |

---

## 🛠 Tech Stack

```
React 19           — UI library
Zustand 5          — Global UI state management
TanStack Query 5   — Server state, caching, mutations
Material UI 6      — Component library (Dialogs, Inputs, Chips…)
Tailwind CSS 3     — Utility-first layout and spacing
@dnd-kit           — Accessible drag-and-drop
React Hook Form    — Form state management
Axios              — HTTP client
json-server        — Local mock REST API
TypeScript 5       — Type safety
Vite 5             — Build tool and dev server
```

---

## 📁 Folder Structure

```
kanban-board/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   ├── KanbanBoard.tsx      # DnD context + board layout
│   │   │   └── KanbanColumn.tsx     # Column with sortable task list
│   │   ├── Task/
│   │   │   ├── TaskCard.tsx         # Draggable task card
│   │   │   └── TaskModal.tsx        # Create / Edit modal form
│   │   ├── UI/
│   │   │   └── Navbar.tsx           # Top header with search + add button
│   │   └── index.ts                 # Barrel exports
│   ├── hooks/
│   │   └── useTasks.ts              # React Query hooks (get, create, update, delete)
│   ├── services/
│   │   └── taskService.ts           # Axios API calls
│   ├── store/
│   │   └── uiStore.ts               # Zustand store (search, modals)
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces & types
│   ├── utils/
│   │   ├── constants.ts             # COLUMNS, PRIORITY_COLORS, PAGE_SIZE
│   │   └── theme.ts                 # MUI theme config
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── db.json                          # Mock database for json-server
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── tsconfig.node.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. The app connects to MockAPI.io automatically — no local backend needed.

---

## 📡 API Endpoints

The app uses **MockAPI.io** as a hosted REST API — no backend required.

**Base URL:** `https://699d592883e60a406a45e6f6.mockapi.io/kanbanBoard/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Fetch all tasks |
| `GET` | `/tasks/:id` | Fetch single task |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update task fields |
| `DELETE` | `/tasks/:id` | Delete a task |

### Task Schema

```json
{
  "id": "uuid-string",
  "title": "Design homepage",
  "description": "Include hero section and CTA",
  "column": "backlog",
  "priority": "high",
  "createdAt": "2026-02-24T10:00:00.000Z"
}
```

**Column values:** `backlog` | `in_progress` | `review` | `done`

**Priority values:** `low` | `medium` | `high`

---

## 🏗 Architecture Overview

### State Management Strategy

```
┌────────────────────────────────────────────────────┐
│                    State Layers                     │
├─────────────────────┬──────────────────────────────┤
│  Server State       │  TanStack Query               │
│  (tasks data)       │  - Caching & background sync  │
│                     │  - Optimistic mutations        │
├─────────────────────┼──────────────────────────────┤
│  UI State           │  Zustand                      │
│  (modals, search)   │  - searchQuery                │
│                     │  - isCreateModalOpen          │
│                     │  - selectedTaskId             │
└─────────────────────┴──────────────────────────────┘
```

### Component Tree

```
App
├── Navbar               ← search bar, new task button
├── KanbanBoard          ← DndContext wrapper
│   ├── KanbanColumn × 4 ← DroppableContext per column
│   │   ├── TaskCard × N ← SortableContext items
│   │   └── Load More
│   └── DragOverlay      ← floating card while dragging
└── TaskModal            ← create / edit dialog
```

### Data Flow

```
User Action
    │
    ▼
Zustand (UI state update)
    │
    ▼
React Query mutation
    │
    ▼
taskService (Axios → json-server)
    │
    ▼
Query invalidation → re-fetch → UI update
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run db` | Start json-server mock API on port 4000 |

---

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `kanban.bg` | `#F0F2F5` | Page background |
| `kanban.surface` | `#FFFFFF` | Cards, columns |
| `kanban.col-todo` | `#3B82F6` | Backlog column |
| `kanban.col-progress` | `#F59E0B` | In Progress column |
| `kanban.col-review` | `#8B5CF6` | In Review column |
| `kanban.col-done` | `#10B981` | Done column |

### Typography

- **Display / UI:** DM Sans (weight 400–700)
- **Monospace / Badges:** JetBrains Mono (weight 400–500)

---

## 🔧 Customization

### Change page size (tasks per column)

Edit `src/utils/constants.ts`:

```ts
export const PAGE_SIZE = 5 // change this
```

### Add a new column

In `src/utils/constants.ts`:

```ts
export const COLUMNS: Column[] = [
  // ... existing
  { id: 'archived', label: 'Archived', color: '#94A3B8', dotColor: '#94A3B8' },
]
```

Also update the `ColumnId` union in `src/types/index.ts`:

```ts
export type ColumnId = 'backlog' | 'in_progress' | 'review' | 'done' | 'archived'
```

### Connect a real backend

Replace the axios base URL in `src/services/taskService.ts`:

```ts
const api = axios.create({
  baseURL: 'https://your-api.com/api/v1',
})
```

---

## 🚢 Deployment on Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option B — Vercel Dashboard (recommended)

1. Push your code to GitHub
2. Go to **https://vercel.com** → **New Project** → Import your repo
3. Vercel auto-detects Vite — no extra config needed
4. Click **Deploy** ✅

> The `vercel.json` already handles SPA routing so direct URL access works correctly.

---

## 🐛 Troubleshooting

**Tasks not loading?**
→ Make sure `json-server` is running: `npm run db`
→ Check http://localhost:4000/tasks returns data

**Port conflict?**
→ Change dev port in `vite.config.ts` → `server.port`
→ Change API port in `db.json` script and `src/utils/constants.ts`

**TypeScript errors?**
→ Run `npm install` to ensure all types are installed
→ Check `tsconfig.json` paths alias matches your setup

---

## 📄 License

MIT © 2026

---

## 🌐 Live API — MockAPI.io

This project uses **MockAPI.io** as the hosted REST backend (no local server needed).

**Base URL:**
```
https://699d592883e60a406a45e6f6.mockapi.io/kanbanBoard/api/v1
```

All CRUD endpoints (`/tasks`, `/tasks/:id`) are live and ready.

---

## ⚡ Deploy to Vercel (Step by Step)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial kanban board"
git remote add origin https://github.com/your-username/kanban-board.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to **https://vercel.com/new**
2. Click **Import Git Repository** → select your repo
3. In **Environment Variables**, add:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://699d592883e60a406a45e6f6.mockapi.io/kanbanBoard/api/v1`
4. Click **Deploy** 🚀

That's it — your app will be live at `https://your-project.vercel.app`

> The `vercel.json` file in the root handles SPA routing automatically.
