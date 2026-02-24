/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        kanban: {
          bg: '#F0F2F5',
          surface: '#FFFFFF',
          border: '#E4E8EF',
          'col-todo': '#3B82F6',
          'col-progress': '#F59E0B',
          'col-review': '#8B5CF6',
          'col-done': '#10B981',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.12)',
        column: '0 1px 4px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
