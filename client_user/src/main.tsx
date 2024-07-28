import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/app',
    element: <App />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
