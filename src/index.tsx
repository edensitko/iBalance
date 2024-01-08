import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/MainLayout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ThemeProvider from './context/themeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode> 

    <AuthContextProvider>

     <BrowserRouter basename="/">
     <ThemeProvider>

    <Layout />
    
    </ThemeProvider>
    </BrowserRouter>

    </AuthContextProvider>

  </React.StrictMode>
);


reportWebVitals();
