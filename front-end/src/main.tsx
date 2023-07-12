import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Error from './utils/error.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Register } from './pages/Register.tsx'
import { Login } from './pages/Login.tsx'
import { Create } from './pages/character/Create.tsx'

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
    errorElement:<Error />,
    element:<Register />
  },
  {
    path:'/login',
    errorElement:<Error />,
    element:<Login />
  },
  {
    path:'/character/create',
    element:<Create />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
