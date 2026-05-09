import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Home        from './components/Home/Home.jsx'
import About       from './components/About/About.jsx'
import Investment  from './components/Investment/Investment.jsx'
import Newsfeed    from './components/NewsFeed/Newsfeed.jsx'
import FeedTab     from './components/NewsFeed/FeedTab.jsx'
import NewsPage    from './components/NewsFeed/NewsPage.jsx'
import GroupPage   from './components/NewsFeed/GroupPage.jsx'
import CompanyPage from './components/NewsFeed/CompanyPage.jsx'
import Login       from './components/Auth/Login.jsx'
import SignUp      from './components/Auth/SignUp.jsx'
import Profile     from './components/Profile/Profile.jsx'
import Market      from './components/Market/Market.jsx'
import Details      from './components/Market/Details.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,        element: <Home /> },
      { path: 'about',      element: <About /> },
      { path: 'investment', element: <Investment /> },
      { path: 'login',      element: <Login /> },
      { path: 'signup',     element: <SignUp /> },
      { path: 'profile',    element: <Profile /> },
      { path: 'profile/:userId', element: <Profile /> },

      // ── Newsfeed layout shell (renders top nav + <Outlet>) ────────────────
      {
        path: 'newsfeed',
        element: <Newsfeed />,
        children: [
          // /newsfeed  →  redirect to feed
          { index: true,                        element: <Navigate to="feed" replace /> },

          // /newsfeed/feed
          { path: 'feed',                       element: <FeedTab /> },

          // /newsfeed/groups          (list)
          // /newsfeed/groups/:groupName  (detail)
          { path: 'groups',                     element: <GroupPage /> },
          { path: 'groups/:groupName',          element: <GroupPage /> },

          // /newsfeed/companies       (list)
          // /newsfeed/companies/:companyName (detail)
          { path: 'companies',                  element: <CompanyPage /> },
          { path: 'companies/:companyName',     element: <CompanyPage /> },

          // /newsfeed/news
          { path: 'news',                       element: <NewsPage /> },
        ]
      },{
        path:"/market",                         element:<Market/>
      },
      {
        path:"/details/:addId",                  element:<Details/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)