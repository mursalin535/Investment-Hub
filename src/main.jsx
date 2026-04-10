// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Investment from './components/Investment/Investment.jsx';
import Newsfeed from './components/NewsFeed/Newsfeed.jsx';
import NewsPage from './components/NewsFeed/NewsPage.jsx';
import GroupPage from './components/NewsFeed/GroupPage.jsx';
import CompanyPage from './components/NewsFeed/CompanyPage.jsx';
import Login from './components/Auth/Login.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import Profile from './components/Profile/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,  
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'investment',
        element: <Investment />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'group/:groupId',
        element: <GroupPage />
      },
      {
        path: 'company/:companyId',
        element: <CompanyPage />
      },
      {
        path: 'newsfeed',
        element: <Newsfeed />
      },
      {
        path: 'news',
        element: <NewsPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
