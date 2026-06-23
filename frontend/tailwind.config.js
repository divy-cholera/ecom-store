/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00283c',
          50:  '#f8f9fa',
          100: '#dbe1e5',
          200: '#c0cbd2',
          300: '#a6b5c0',
          400: '#8a9fac',
          500: '#738a9a',
          600: '#5a7587',
          700: '#426174',
          800: '#2a4d61',
          900: '#143a50',
          950: '#00283c',
          content: '#ffffff',
        },
        accent: {
          DEFAULT: '#68e353',
          50:  '#e9ffe5',
          200: '#68e353',
          400: '#41b22d',
          content: '#000000',
        },
        secondary: {
          DEFAULT: '#e3e2df',
          content: '#343331',
        },
        neutral: {
          50:  '#f7f8fa',
          100: '#f1f3f6',
          200: '#e9ecf0',
          300: '#dee2e9',
          400: '#b9c1cf',
          500: '#7e899e',
          600: '#5a6478',
          700: '#434d60',
          800: '#2a3445',
          900: '#192333',
          950: '#0e1626',
        },
        info:    '#2a6edc',
        success: '#00834f',
        warning: '#8d6e00',
        error:   '#e2161c',
        link:    '#2d637d',
      },
      backgroundColor: {
        page:     '#f4f3f0',
        card:     '#ffffff',
        tertiary: '#edece9',
        inverted: '#171614',
      },
      textColor: {
        'sn-primary':   '#000000',
        'sn-secondary': '#4d4c4a',
        'sn-tertiary':  '#656462',
        'sn-disabled':  '#c2c1be',
      },
      borderColor: {
        subtle:  '#e3e2df',
        default: '#8a8986',
        strong:  '#00283c',
      },
      borderRadius: {
        field: '12px',
        box:   '32px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
