import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { GlobalStateProvider } from './Contexts/GlobalStateContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateProvider>
        <App/>
    </GlobalStateProvider>

  </React.StrictMode>,
)
