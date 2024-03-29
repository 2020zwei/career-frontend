/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
      screens: {
        'sm': {'min':'320px','max':'480px'},
        // => @media (min-width: 640px) { ... }
  
        'md': {'min':'481px','max':'768px'},
        // => @media (min-width: 1024px) { ... }
  
        'lg': {'min':'769px','max':'1024px'},
        // => @media (min-width: 1280px) { ... }

        'xl': {'min':'1025px','max':'1200px'},
        // => @media (min-width: 1280px) { ... }
        'xxl': {'min':'1200px','max':'1500px'},
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
      },
  },
  plugins: [],
}
