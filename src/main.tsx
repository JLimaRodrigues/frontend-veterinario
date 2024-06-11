import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from '@/App';
import '@/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);