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
import Market      from './components/Market/Market.jsx'
import Details     from './components/Market/Details.jsx'
import Deals       from './components/Deals/Deals.jsx'
import NotFound    from './components/NotFound/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Groups from './components/Groups,companise/Groups.jsx'
import Your_group from './components/Groups,companise/Your_group.jsx'
import Create_group from './components/Groups,companise/Create_group.jsx'

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
        path: 'market',                         
        element: <ProtectedRoute element={<Market />} allowedRoles={['investor', 'businessman']} /> 
      },
      { 
        path: 'details/:addId',                  
        element: <ProtectedRoute element={<Details />} allowedRoles={['investor', 'businessman']} /> 
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
      {path:'/create-group',element:<Create_group/>}
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