/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#f0f9ff',100:'#e0f2fe',400:'#38bdf8',500:'#0ea5e9',600:'#0284c7',700:'#0369a1' },
        accent: { 400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed' },
        dark: { 900:'#030712',800:'#0d1117',700:'#161b22',600:'#21262d',500:'#30363d',400:'#484f58' }
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': { '0%,100%':{'background-position':'0% 50%'},'50%':{'background-position':'100% 50%'} },
        'float': { '0%,100%':{transform:'translateY(0px)'},'50%':{transform:'translateY(-20px)'} }
      }
    },
  },
  plugins: [],
}
