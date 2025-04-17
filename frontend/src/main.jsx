import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { CartProvider } from "./customer/context/CartContext";
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './customer/context/AuthContext';

// eslint-disable-next-line no-undef
const basename = import.meta.env.VITE_BASENAME || '/';


ReactDOM.createRoot(document.getElementById('root')).render(



  <React.StrictMode>
    <BrowserRouter basename={basename} >
      <Notifications />
      <MantineProvider withGlobalStyles >
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
