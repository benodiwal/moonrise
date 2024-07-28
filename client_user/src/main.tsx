import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AuthContext from './context/AuthContext'
import BaseLayout from './layouts/BaseLayout'
import { QueryClient, QueryClientProvider } from 'react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: (
      <AuthContext>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </AuthContext>
      ),
      children: [
        {
          path: '/app',
          element: <App />,
        }
      ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
