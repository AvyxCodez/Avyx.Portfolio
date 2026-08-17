import React from 'react'
import ReactDOM from 'react-dom/client'
import { LazyMotion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './index.css'

const titles = [
  "AvyxCodez",
  "Developer"
];

let currentIndex = 0;
let isDeleting = false;
let currentText = "";
let timeout;

function typeTitle() {
  const fullText = titles[currentIndex];

  if (isDeleting) {
    currentText = fullText.substring(0, currentText.length - 1);
  } else {
    currentText = fullText.substring(0, currentText.length + 1);
  }

  document.title = currentText || ",";

  let typeSpeed = isDeleting ? 120 : 220;   // â† Slower typing & deleting

  if (!isDeleting && currentText === fullText) {
    typeSpeed = 2200; // Pause longer when fully typed
    isDeleting = true;
  } else if (isDeleting && currentText === "") {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % titles.length;
    typeSpeed = 800; // Pause before starting next text
  }

  timeout = setTimeout(typeTitle, typeSpeed);
}

// Start the typewriter effect
typeTitle();

// Motion's features load once here rather than being bundled into every `m`
// component, and asynchronously so they land in their own chunk instead of the
// entry bundle. `m` elements render their `initial` styles until the features
// resolve, so the first paint is correct and animation picks up from there.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LazyMotion features={() => import('./motion-features.js').then((m) => m.default)}>
      <App />
    </LazyMotion>
    <Analytics />
  </React.StrictMode>,
)