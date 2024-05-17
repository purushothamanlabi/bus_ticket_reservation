import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx'
import './index.css'; 
import {ToastContainer } from 'react-toastify';
import { GlobalDataProvider } from './store/globledata.js';

ReactDOM.render(
  <React.StrictMode>
    <GlobalDataProvider>
    <ToastContainer theme="colored" />
    <App />
    </GlobalDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
