/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './demos/**/*.html',
    './journal/**/*.html',
    './prospects/**/*.html',
  ],
  // Safelist patterns Alpine.js may toggle dynamically (e.g., :class bindings)
  // that the static scan can miss. Keep this list tight; only add what's needed.
  safelist: [
    'opacity-0',
    'opacity-100',
    'translate-y-0',
    '-translate-y-2',
    'rotate-180',
  ],
  theme: {
    extend: {
      colors: {
        // ===== Main site (motley-tech.com) =====
        bg:     { 0: '#0A0A0C', 1: '#111114', 2: '#17171B', 3: '#1E1E23' },
        text:   { 0: '#FAFAF9', 1: '#D6D3D1', 2: '#A8A29E', 3: '#78716C' },
        line:   { DEFAULT: '#26262C', strong: '#36363E' },
        ember:  { DEFAULT: '#F97316', hot: '#FB923C', soft: 'rgba(249,115,22,0.14)' },
        lime:   { DEFAULT: '#A3E635', soft: 'rgba(163,230,53,0.14)' },
        mint:   { DEFAULT: '#10B981' },
        amber2: { DEFAULT: '#FACC15' },

        // ===== Restaurant demo (warm Southern) =====
        burgundy:  { DEFAULT: '#7c2d12', deep: '#431407', soft: '#9A3412' },
        cream:     '#FEF3C7',
        parchment: '#FFFBEB',
        gold:      '#C8A24B',
        goldLite:  '#EAB308',
        ink:       '#1C1917',

        // ===== Retail demo (minimal monochrome) =====
        paper: '#FFFFFF',
        off:   '#FAFAF9',
        taupe: '#78716C',
        moss:  '#3F5D3D',

        // ===== Salon demo (dark vintage) =====
        coal:     '#0a0908',
        ash:      '#1c1917',
        charcoal: '#292524',
        bone:     '#F5F0E5',
        brass:    '#B88A44',
        brassL:   '#D4A94A',

        // ===== Trades demo (utility industrial) =====
        navy:   { DEFAULT: '#0c4a6e', dark: '#082F49', deeper: '#041E33', light: '#0369A1' },
        safety: { DEFAULT: '#FACC15', dark: '#CA8A04' },
        steel:  { 50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 400: '#94A3B8', 600: '#475569', 900: '#0F172A' },
      },
      fontFamily: {
        // Main site + journal + trades
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
        // Demos override per-page via CSS in their <style> blocks; no per-demo
        // font keys needed here since they don't use Tailwind utility classes for fonts.
      },
      boxShadow: {
        'glow-ember': '0 0 0 1px rgba(249,115,22,0.25), 0 20px 60px -20px rgba(249,115,22,0.45)',
        'glow-lime':  '0 0 0 1px rgba(163,230,53,0.25), 0 20px 60px -20px rgba(163,230,53,0.35)',
        'card':       '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 16px 48px -20px rgba(0,0,0,0.6)',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
