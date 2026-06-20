import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const titles = [
  "@A V Y X",
  "D E V"
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

  let typeSpeed = isDeleting ? 120 : 220;   // ← Slower typing & deleting

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)