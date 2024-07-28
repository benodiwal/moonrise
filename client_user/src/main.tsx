import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AuthContext from './context/AuthContext'
import BaseLayout from './layouts/BaseLayout'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
