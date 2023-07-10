import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Error from './utils/error404.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Register } from './pages/Register.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />, 
    errorElement:<Error />,
    children:[
      {
        
      }
    ]
  },
  {
    path:'/register',
    element:<Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
