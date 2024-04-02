/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html",
  "./static/**/*.{js, css}",
  ],
  theme: {
    colors: {
      'cs-brown': '#AD8B73',
      'cs-light-brown': '#CEAB93',
      'cs-sp-light-brown': '#E3CAA5',
      'cs-cream': '#FFFBE9',
      'cs-black': '#222222',
      'cs-white': '#F5F5F5',
      'cs-brown-black': '#261202',
      'cs-brown-whites': '#784F31',
      'cs-red-white': '#B31312',
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    extend: {
      // colors: {
      //     'cs-brown': '#AD8B73',
      //     'cs-light-brown': '#CEAB93',
      //     'cs-sp-light-brown': '#E3CAA5',
      //     'cs-cream': '#FFFBE9',
      // },
    },
  },
  plugins: [],
}

