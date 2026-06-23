/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          content: '#ffffff',
        },
        accent: {
          DEFAULT: '#f97316',
          50:  '#fff7ed',
          200: '#fdba74',
          400: '#f97316',
          content: '#ffffff',
        },
        secondary: {
          DEFAULT: '#e5e7eb',
          content: '#374151',
        },
        neutral: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        info:    '#3b82f6',
        success: '#22c55e',
        warning: '#eab308',
        error:   '#ef4444',
        link:    '#6366f1',
        action: {
          DEFAULT: '#4f46e5',
          hover:   '#4338ca',
        },
      },
      backgroundColor: {
        page:     '#f9fafb',
        card:     '#ffffff',
        tertiary: '#f3f4f6',
        inverted: '#111827',
      },
      textColor: {
        'sn-primary':   '#111827',
        'sn-secondary': '#4b5563',
        'sn-tertiary':  '#6b7280',
        'sn-disabled':  '#d1d5db',
      },
      borderColor: {
        subtle:  '#e5e7eb',
        default: '#9ca3af',
        strong:  '#1f2937',
      },
      borderRadius: {
        field: '6px',
        box:   '8px',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
