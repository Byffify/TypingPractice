import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ต้องมี @tailwind base/components/utilities

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);