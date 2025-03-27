import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import UserLeaderboard from './components/UserLeaderboard';
import mockData from './data/mockData.json';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Profiles from './pages/Profiles';
import AllProfiles from './pages/AllProfiles';
import AllArtists from './pages/AllArtists';
import Artist from './pages/Artist';
import TopSongs from './pages/TopSongs';
import { MyProvider } from './context/HelloContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profiles/:id',
    element: <Profiles />,
  },
  {
    path: '/profiles',
    element: <AllProfiles />,
  },
  {
    path: '/top-songs',
    element: <TopSongs />,
  },
  {
    path: '/artists',
    element: <AllArtists />,
  },
  {
    path: '/artists/:artistId',
    element: <Artist />,
  },
]);

function App() {
  return (
    <MyProvider>
      <RouterProvider router={router} />
    </MyProvider>
  );
}
export default App;
