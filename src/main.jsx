import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { HeroUIProvider } from "@heroui/react";

import Home        from './components/Home/Home.jsx'
import About       from './components/About/About.jsx'
import Investment  from './components/Investment/Investment.jsx'
import Newsfeed    from './components/Newsfeed/Newsfeed.jsx'
import Login       from './components/Auth/Login.jsx'
import SignUp      from './components/Auth/SignUp.jsx'
import Profile     from './components/Profile/Profile.jsx'


import Deals       from './components/Deals/Deals.jsx'
import NotFound    from './components/NotFound/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Groups from './components/Groups,companise/Groups.jsx'
import Your_group from './components/Groups,companise/Your_group.jsx'
import Create_group from './components/Groups,companise/Create_group.jsx'
import Companies from './components/Groups,companise/Companies.jsx'
import Your_company from './components/Groups,companise/Your_company.jsx'
import Request_list from './components/Deals/Request_list.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,        element: <Home /> },
      { 
        path: 'about',      
        element:<About /> 
      },
      { path: 'login',      element: <Login /> },
      { path: 'signup',     element: <SignUp /> },

      // ── Protected Routes ────────────────────────────────────────────────
      { 
        path: 'profile',    
        element: <ProtectedRoute element={<Profile />} allowedRoles={['investor', 'businessman']} /> 
      },
      { 
        path: 'profile/:userId', 
        element: <ProtectedRoute element={<Profile />} allowedRoles={['investor', 'businessman']} /> 
      },

      { 
        path: 'investment', 
        element: <ProtectedRoute element={<Investment />} allowedRoles={['businessman']} /> 
      },

  

      { 
        path: 'deals',                            
        element: <ProtectedRoute element={<Deals />} allowedRoles={['investor', 'businessman']} /> 
      },

      {
        path: 'newsfeed',
        element: <Newsfeed />
      },

      // ── 404 Catch-all (must be last) ────────────────────────────────────
      { path: '*', element: <NotFound /> },
      {path:'/groups',element:<Groups/>},
      {path:'/your-groups',element:<Your_group/>},
      {path:'/create-group',element:<Create_group/>},

      {path:'/companies',element:<Companies/>},
      {path:'/your-company',element:<Your_company/>},
      {
        path:'/requestlist/:ad_id',element:<Request_list/>
      }
      
  
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </Provider>
  </StrictMode>
)