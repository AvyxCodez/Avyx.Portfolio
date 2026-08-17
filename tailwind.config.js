/** @type {import('tailwindcss').Config} */
export default {
  // The CDN build used to scan the live DOM, so it picked up any class that
  // appeared at runtime. A build-time scan only sees literal text in these
  // files — every dynamic className here interpolates whole class strings
  // (`${on ? 'opacity-100' : 'opacity-0'}`), which the scanner still finds.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
