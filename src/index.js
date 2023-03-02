import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ManageEvents from './events/ManageEvents';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import ErrorManager from './ErrorManager';
import { store } from './store/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorManager>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/events" element={<ManageEvents />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ErrorManager>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
