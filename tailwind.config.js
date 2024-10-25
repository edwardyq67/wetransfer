/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'primario': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#676767',//principall
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#262626',
        },
        'segundario': {
          '50': '#edfcff',
          '100': '#d6f7ff',//fondo
          '200': '#b5f3ff',
          '300': '#83eeff',
          '400': '#48e2ff',
          '500': '#1ec8ff',
          '600': '#06adff',
          '700': '#009aff',//boton
          '800': '#0875c5',
          '900': '#0d639b',
          '950': '#0e3b5d',
      },
      
      },
    },
  },
  plugins: [],
}
