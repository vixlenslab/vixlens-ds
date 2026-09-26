// Vixlens DS — Tailwind 3 preset. GERADO por scripts/build-tokens.mjs (fonte: vixlens-tokens.json).
// uso: presets: [require('./vixlens-tailwind-preset.cjs')]
// Tailwind 4? use assets/tokens/vixlens-theme-v4.css.
module.exports = {
  theme: {
    extend: {
      colors: {
        'vix-preto': '#1D1D1F',
        'vix-branco': '#FFFFFF',
        'vix-cinza-card': '#F5F5F7',
        'vix-amarelo': '#FAC617',
        'vix-amarelo-hover': '#E5A800',
        'vix-azul': '#0439D9',
        'vix-azul-10': '#EAF0FF',
        'vix-azul-20': '#C0CDFA',
        'vix-amarelo-light': '#FEF3C7',
        'vix-cinza-borda': '#606F7F',
        'vix-gray': {
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151'
        },
        'reflecta': {
          'guard': '#00782D',
          'express': '#92BB36',
          'blue-protect-sh': '#134B97'
        },
        'vix-chart': {
          '1': '#FAC617',
          '2': '#0439D9',
          '3': '#615FFF',
          '4': '#30D389',
          '5': '#606F7F'
        },
        'border': 'hsl(var(--border) / <alpha-value>)',
        'input': 'hsl(var(--input) / <alpha-value>)',
        'ring': 'hsl(var(--ring) / <alpha-value>)',
        'background': 'hsl(var(--background) / <alpha-value>)',
        'foreground': 'hsl(var(--foreground) / <alpha-value>)',
        'primary': {
          'DEFAULT': 'hsl(var(--primary) / <alpha-value>)',
          'foreground': 'hsl(var(--primary-foreground) / <alpha-value>)'
        },
        'secondary': {
          'DEFAULT': 'hsl(var(--secondary) / <alpha-value>)',
          'foreground': 'hsl(var(--secondary-foreground) / <alpha-value>)'
        },
        'muted': {
          'DEFAULT': 'hsl(var(--muted) / <alpha-value>)',
          'foreground': 'hsl(var(--muted-foreground) / <alpha-value>)'
        },
        'accent': {
          'DEFAULT': 'hsl(var(--accent) / <alpha-value>)',
          'foreground': 'hsl(var(--accent-foreground) / <alpha-value>)'
        },
        'destructive': {
          'DEFAULT': 'hsl(var(--destructive) / <alpha-value>)',
          'foreground': 'hsl(var(--destructive-foreground) / <alpha-value>)'
        },
        'popover': {
          'DEFAULT': 'hsl(var(--popover) / <alpha-value>)',
          'foreground': 'hsl(var(--popover-foreground) / <alpha-value>)'
        },
        'card': {
          'DEFAULT': 'hsl(var(--card) / <alpha-value>)',
          'foreground': 'hsl(var(--card-foreground) / <alpha-value>)'
        }
      },
      borderColor: { DEFAULT: 'hsl(var(--border))' },
      borderRadius: {
        'vix-card': '32px',
        'vix-button': '32px',
        'vix-input': '24px',
        'vix-chip': '12px',
        'xl': 'calc(var(--radius) + 4px)',
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)'
      },
      spacing: {
        'vix-1': '4px',
        'vix-2': '8px',
        'vix-3': '12px',
        'vix-4': '16px',
        'vix-5': '20px',
        'vix-6': '24px',
        'vix-7': '30px',
        'vix-8': '40px',
        'vix-9': '48px',
        'vix-10': '60px',
        'vix-11': '64px',
        'vix-12': '80px'
      },
      maxWidth: {
        'vix-produto': '1422px',
        'vix-site': '1100px'
      },
      fontFamily: {
        'vix': [
          'Host Grotesk',
          'sans-serif'
        ],
        'vix-print': [
          'Montserrat',
          'Mont',
          'sans-serif'
        ]
      },
      fontSize: {
        'vix-h1': [
          '64px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h1-t': [
          '40px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h1-m': [
          '32px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h2': [
          '48px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h2-t': [
          '40px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h2-m': [
          '28px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h3': [
          '40px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h3-t': [
          '32px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h3-m': [
          '24px',
          {
            'lineHeight': '1',
            'fontWeight': '700',
            'letterSpacing': '-0.02em'
          }
        ],
        'vix-h4': [
          '32px',
          {
            'lineHeight': '1.2',
            'fontWeight': '600',
            'letterSpacing': '-0.01em'
          }
        ],
        'vix-h4-t': [
          '28px',
          {
            'lineHeight': '1.2',
            'fontWeight': '600',
            'letterSpacing': '-0.01em'
          }
        ],
        'vix-h4-m': [
          '20px',
          {
            'lineHeight': '1.2',
            'fontWeight': '600',
            'letterSpacing': '-0.01em'
          }
        ],
        'vix-h5': [
          '24px',
          {
            'lineHeight': '1.2',
            'fontWeight': '500',
            'letterSpacing': '-0.01em'
          }
        ],
        'vix-h5-t': [
          '22px',
          {
            'lineHeight': '1.2',
            'fontWeight': '500',
            'letterSpacing': '-0.01em'
          }
        ],
        'vix-h5-m': [
          '18px',
          {
            'lineHeight': '1.2',
            'fontWeight': '500',
            'letterSpacing': '-0.01em'
          }
        ],
        'vix-h6': [
          '20px',
          {
            'lineHeight': '1.2',
            'fontWeight': '500',
            'letterSpacing': '0em'
          }
        ],
        'vix-h6-t': [
          '18px',
          {
            'lineHeight': '1.2',
            'fontWeight': '500',
            'letterSpacing': '0em'
          }
        ],
        'vix-h6-m': [
          '16px',
          {
            'lineHeight': '1.2',
            'fontWeight': '500',
            'letterSpacing': '0em'
          }
        ],
        'vix-paragraph': [
          '16px',
          {
            'lineHeight': '1.5',
            'fontWeight': '400',
            'letterSpacing': '0em'
          }
        ],
        'vix-paragraph-t': [
          '16px',
          {
            'lineHeight': '1.5',
            'fontWeight': '400',
            'letterSpacing': '0em'
          }
        ],
        'vix-paragraph-m': [
          '16px',
          {
            'lineHeight': '1.5',
            'fontWeight': '400',
            'letterSpacing': '0em'
          }
        ],
        'vix-bold': [
          '16px',
          {
            'lineHeight': '1.5',
            'fontWeight': '600',
            'letterSpacing': '0em'
          }
        ],
        'vix-bold-t': [
          '16px',
          {
            'lineHeight': '1.5',
            'fontWeight': '600',
            'letterSpacing': '0em'
          }
        ],
        'vix-bold-m': [
          '16px',
          {
            'lineHeight': '1.5',
            'fontWeight': '600',
            'letterSpacing': '0em'
          }
        ],
        'vix-label': [
          '14px',
          {
            'lineHeight': '1.4',
            'fontWeight': '500',
            'letterSpacing': '0.02em'
          }
        ],
        'vix-label-t': [
          '14px',
          {
            'lineHeight': '1.4',
            'fontWeight': '500',
            'letterSpacing': '0.02em'
          }
        ],
        'vix-label-m': [
          '14px',
          {
            'lineHeight': '1.4',
            'fontWeight': '500',
            'letterSpacing': '0.02em'
          }
        ],
        'vix-caption': [
          '12px',
          {
            'lineHeight': '1.4',
            'fontWeight': '400',
            'letterSpacing': '0em'
          }
        ],
        'vix-caption-t': [
          '12px',
          {
            'lineHeight': '1.4',
            'fontWeight': '400',
            'letterSpacing': '0em'
          }
        ],
        'vix-caption-m': [
          '12px',
          {
            'lineHeight': '1.4',
            'fontWeight': '400',
            'letterSpacing': '0em'
          }
        ],
        'vix-overline': [
          '11px',
          {
            'lineHeight': '1.4',
            'fontWeight': '500',
            'letterSpacing': '0.08em'
          }
        ],
        'vix-overline-t': [
          '11px',
          {
            'lineHeight': '1.4',
            'fontWeight': '500',
            'letterSpacing': '0.08em'
          }
        ],
        'vix-overline-m': [
          '11px',
          {
            'lineHeight': '1.4',
            'fontWeight': '500',
            'letterSpacing': '0.08em'
          }
        ],
        'xs': [
          '12px',
          {
            'lineHeight': '1rem'
          }
        ],
        'sm': [
          '14px',
          {
            'lineHeight': '1.25rem'
          }
        ],
        'base': [
          '16px',
          {
            'lineHeight': '1.5rem'
          }
        ]
      },
    },
  },
}
