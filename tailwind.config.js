/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/**/*.{html,ts,scss}", // ✅ Include all Angular projects
    "./src/**/*.{html,ts,scss}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {},
  },
  plugins: [ require('flowbite/plugin')],
}

