import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Error from './utils/error.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Register } from './pages/Register.tsx'
import { Login } from './pages/Login.tsx'
import { Create } from './pages/character/Create.tsx'
import { List } from './pages/character/List.tsx'
import { Edit } from './pages/character/Edit.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />, 
    errorElement:<Error />,
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
  },
  {
    path:'/character/list',
    element:<List />
  },
  {
    path:'/character/:id',
    element:<Edit />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
