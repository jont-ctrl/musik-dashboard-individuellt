import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import InfoTag from '../components/InfoTag';
import mockData from '../data/mockData.json';
import BackIcon from '../components/BackIcon';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

function Profiles() {
  // Step 1: Extract the `id` parameter from the URL
  const { id } = useParams();

  // Step 2: Find the user with the matching ID
  const user = mockData.users.find((user) => user.id === parseInt(id));

  // Step 3: Handle the case where the user is not found
  if (!user) {
    return <div className='p-6 text-red-500'>User not found</div>;
  }

  return (
    <>
      <NavHeader />
      <main className='py-6  sm:p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex flex-wrap gap-4 items-center justify-center'>
            <button className=' flex  justify-center items-center text-4xl '>
              <Link to='/'>
                <BackIcon />
              </Link>
            </button>
            <h1 className=' text-text dark:text-text-dark text-4xl font-bold text-center '>
              {user.name}
            </h1>
          </div>
          <div className='bg-background dark:bg-background-dark p-6 rounded-lg shadow-md'>
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <p className='text-text-muted dark:text-text-muted-dark text-center mb-2'>
              <strong>Email:</strong> {user.email}
            </p>
            <p className='text-text-muted dark:text-text-muted-dark text-center mb-4'>
              <strong>Location:</strong> {user.location}
            </p>

            <div className='flex flex-col gap-4'>
              <h3 className='flex justify-center text-text dark:text-text-dark font-semibold'>
                Favorite genres:
              </h3>
              <ul className='flex flex-wrap gap-4 justify-center'>
                {user.favoriteGenre.map((genre, index) => (
                  <li key={index}>
                    <InfoTag name={genre} />
                  </li>
                ))}
              </ul>
            </div>

            <h2 className=' flex justify-center text-text dark:text-text-dark text-2xl font-bold pt-16'>
              Total streams: {user.totalStreams}
            </h2>

            <div className='mt-6'>
              <h2 className='flex justify-center text-text dark:text-text-dark text-2xl font-semibold mb-4'>
                Monthly Streams
              </h2>
              <div className='h-96'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={user.monthlyStreams}>
                    <XAxis dataKey='month' className='text-sm' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey='streams'
                      fill='var(--color-primary)'
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className='mt-6 text-text dark:text-text-dark'>
              <h2 className='text-2xl font-bold mb-4'>Top Songs</h2>
              <ul className='space-y-3'>
                {user.topSongs.map((song) => (
                  <li
                    key={song.song}
                    className='bg-background dark:bg-background-dark p-4 rounded-lg shadow-sm'
                  >
                    <p className='text-lg font-medium '>
                      {song.song} -{' '}
                      <Link
                        to={`/artists/${song.artist}`}
                        className='text-primary dark:text-secondary underline'
                      >
                        {song.artist}
                      </Link>
                    </p>
                    <p className='text-sm text-text-muted dark:text-text-muted-dark'>
                      Streams: {song.streams}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profiles;
