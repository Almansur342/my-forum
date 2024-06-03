import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { router } from './Router/Router.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Pages/Provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
