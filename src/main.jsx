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

import {
  QueryClient, QueryClientProvider,
} from '@tanstack/react-query'
import { SearchProvider } from './Hooks/useSearch.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <SearchProvider>
      <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </SearchProvider>
        
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
