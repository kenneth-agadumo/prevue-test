import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@radix-ui/themes/styles.css'; 
import { Theme } from '@radix-ui/themes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Dashboard} from './pages/Dashboard.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { ForgotPassword } from './pages/ForgotPassword.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme>
      <App/>
    </Theme>

  </React.StrictMode>,
)
