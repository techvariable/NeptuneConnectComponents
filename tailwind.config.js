module.exports = {
  content: ['./src/**/*.{html, tsx}', './src/**/*.tsx'],

  theme: {
    extend: {},
    theme: {
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./src/input.css -o ./global/global.css --watch
