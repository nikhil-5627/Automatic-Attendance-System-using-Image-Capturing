// src/entry.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // or App.jsx if you renamed it
import './index.css'; // optional for global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
