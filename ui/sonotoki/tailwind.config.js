module.exports = {
  content: ["./src/*.{html,js,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto"']
      }
    },
  },
  plugins: [require("daisyui")],
  extend: {
    spacing: {
      '8xl': '96rem',
      '9xl': '128rem',
    },
    borderRadius: {
      '4xl': '2rem',
    }
  },
  daisyui: {
    themes: [ "business"],
  },

}


