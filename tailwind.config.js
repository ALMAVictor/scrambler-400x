/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Luxe Palette
        'carbon-black': '#0C0F12',        // Preto Carbônico - Fundo do site
        'graphite-deep': '#1A1F24',      // Grafite Profundo - Componentes
        'khaki-green': '#2F4A3A',        // Verde Matt Khaki Green - Destaques e hover
        'gold-smoke': '#C6A86D',         // Ouro Fumê - Detalhes
        'titanium-gray': '#B8BDC3',       // Cinza Titanium - Texto secundário
        'warm-white': '#F3F4F2',         // Branco Quente - Tipografia
        // Aliases para compatibilidade
        'scrambler-green': '#2F4A3A',
        'bg-deep': '#0C0F12',
        'black-contrast': '#0C0F12',
        'gold-accent': '#C6A86D',
        'gray-text': '#B8BDC3',
        'glass': 'rgba(255,255,255,0.04)',
        'glass-border': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        'display': ['Oswald', 'Bebas Neue', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['24px', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': '120px',
        'section-mobile': '48px',
      },
      boxShadow: {
        'button': '0 8px 24px rgba(14,12,11,0.25)',
        'card-hover': '0 12px 32px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

