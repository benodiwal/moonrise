import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AuthContext from './context/AuthContext'
import BaseLayout from './layouts/BaseLayout'
import { QueryClient, QueryClientProvider } from 'react-query'
import WalletsProvider from './providers/WalletProvider'
import AppLayout from './layouts/AppLayout'
import { Toaster } from './components/ui/toaster'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: (
      <WalletsProvider>
        <AuthContext>
          <BaseLayout>
           <Outlet />
          </BaseLayout>
        </AuthContext>
      </WalletsProvider>
      ),
      children: [
        {
          element: (
            <AppLayout>
              <Outlet />
            </AppLayout>
            ),
            children: [
              {
                path: '/app',
                element: <App />,
              },
              {
                path: '/dashboard',
                element: <Dashboard />
              }
            ]
        }
      ]
  }
]);

const queryClient = new QueryClient;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster />
  </React.StrictMode>,
)
