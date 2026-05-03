/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ink scale — now maps to warm off-white surfaces (light theme)
        ink: {
          950: '#FAFAF7',  // page background
          900: '#FFFFFF',  // card / panel surface
          800: '#F4F3EE',  // raised surface, inputs
          700: '#E2DFD6',  // borders, dividers
          600: '#9C9CA3',  // hover borders, faint elements
        },
        // Paper scale — now maps to dark ink for text on light bg
        paper: {
          DEFAULT: '#0B0B0E',  // primary text
          dim: '#6B6B72',       // secondary text
          faint: '#9C9CA3',     // tertiary / placeholder text
        },
        // Ember — warm orange accent (kept from brand, slightly adjusted)
        ember: {
          DEFAULT: '#F5612B',
          soft: '#FF8A57',
          muted: 'rgba(245,97,43,0.08)',
        },
        // Moss — emerald green for success
        moss: {
          DEFAULT: '#15A874',
          muted: 'rgba(21,168,116,0.10)',
        },
        // Crimson — rose red for errors
        crimson: {
          DEFAULT: '#E8556B',
          muted: 'rgba(232,85,107,0.12)',
        },
      },
      fontFamily: {
        display: ['"Inter Tight"', '"Inter"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card:       '0 1px 2px rgba(11,11,14,0.04), 0 8px 24px -12px rgba(11,11,14,0.10)',
        'card-hover':'0 2px 4px rgba(11,11,14,0.06), 0 18px 40px -16px rgba(11,11,14,0.18)',
        ember:      '0 0 32px -4px rgba(245,97,43,0.30)',
        'ember-sm': '0 0 12px -2px rgba(245,97,43,0.18)',
        subtle:     'inset 0 0 0 1px rgba(11,11,14,0.06)',
        pop:        '0 1px 0 rgba(255,255,255,0.5) inset, 0 4px 14px -2px rgba(11,11,14,0.10)',
      },
      keyframes: {
        'pulse-ember': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.5', transform: 'scale(0.85)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'transcript-in': {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'live-pulse': {
          '0%':   { boxShadow: '0 0 0 0 rgba(245,97,43,0.4)' },
          '70%':  { boxShadow: '0 0 0 10px rgba(245,97,43,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(245,97,43,0)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'blink': {
          '50%': { opacity: '0' },
        },
        'msg-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-ember':   'pulse-ember 1.6s ease-in-out infinite',
        'fade-up':       'fade-up 0.5s ease-out both',
        'transcript-in': 'transcript-in 0.3s ease-out both',
        'live-pulse':    'live-pulse 1.6s ease-out infinite',
        'marquee':       'marquee 30s linear infinite',
        'blink':         'blink 1s steps(2) infinite',
        'msg-in':        'msg-in 0.36s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
}
