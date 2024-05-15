import React from 'react';
import ReactDOM from 'react-dom/client';
import "grapesjs/dist/css/grapes.min.css";
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home/>
    
  </React.StrictMode>
);


reportWebVitals();
