/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',      // slate-900, sidebar / headings
        ember: '#F59E0B',    // amber-500, primary accent
        ember2: '#FBBF24',   // amber-400, hover/glow
        canvas: '#F8FAFC',   // slate-50, page background
        line: '#E2E8F0',     // slate-200, borders
        mute: '#64748B',     // slate-500, secondary text
        glass: 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.03), 0 1px 12px rgba(15,23,42,0.03)',
        'card-hover': '0 12px 24px -10px rgba(15,23,42,0.08), 0 8px 16px -8px rgba(15,23,42,0.08)',
        'glow-amber': '0 0 16px rgba(245, 158, 11, 0.25)',
        'glow-emerald': '0 0 16px rgba(16, 185, 129, 0.2)',
        'glow-rose': '0 0 16px rgba(244, 63, 94, 0.2)',
      },
    },
  },
  plugins: [],
}
