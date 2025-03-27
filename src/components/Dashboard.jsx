import mockData from '../data/mockData.json';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import UserLeaderboard from './UserLeaderboard';
import { useState, useContext } from 'react';
import { HelloContext } from '../context/HelloContext';
import InfoTag from './InfoTag';

function Dashboard() {
  const { userName, setUserName } = useContext(HelloContext);

  const [userMusicStats, setUserMusicStats] = useState(mockData.users[8]);

  // Function to handle user selection from the dropdown
  const handleUserChange = (event) => {
    const selectedUserId = parseInt(event.target.value);
    const selectedUser = mockData.users.find(
      (user) => user.id === selectedUserId
    );
    setUserMusicStats(selectedUser);

    setUserName(selectedUser.name);
  };

  return (
    <main className='bg-background dark:bg-background-dark py-12 px-8 max-w-6xl mx-auto min-h-screen'>
      <div className='flex justify-center items-center gap-4 pb-16'>
        <h2 className='text-text dark:text-text-dark' id='user-selector'>
          Users:
        </h2>
        <div role='form' aria-labelledby='user-selector'>
          <label htmlFor='user-select' className='sr-only'>
            Choose a user from the list
          </label>
          <select
            id='user-select'
            className='cursor-pointer text-2xl outline-1 bg-background dark:bg-background-dark text-text dark:text-text-dark outline-gray-200 dark:outline-gray-800 p-2 px-4 rounded-2xl focus:ring-2 focus:ring-blue-500'
            onChange={handleUserChange}
            value={userMusicStats.id}
            aria-label='Choose a user from the list'
          >
            {mockData.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex justify-center gap-6 flex-wrap md:flex-nowrap'>
        {/* User info and Profile - vänster */}
        <div className='bg-background dark:bg-background-dark flex flex-col items-center justify-start gap-4 shadow-md p-6 rounded-2xl   w-1/3 min-w-[250px] text-center'>
          <h1 className='text-3xl font-bold text-primary dark:text-secondary underline'>
            <Link to={`/profiles/${userMusicStats.id}`}>
              {userMusicStats.name}
            </Link>
          </h1>
          <Link to={`/profiles/${userMusicStats.id}`}>
            <img
              src={userMusicStats.profilePicture}
              alt={userMusicStats.name}
              className='w-20 h-20 rounded-full border border-gray-200 dark:border-gray-800  shadow-sm'
            />
          </Link>

          <p className='text-text-muted dark:text-text-muted-dark text-sm'>
            <strong>Email:</strong> {userMusicStats.email}
          </p>
          <p className='text-text-muted dark:text-text-muted-dark text-sm'>
            <strong>Location:</strong> {userMusicStats.location}
          </p>
          <h3 className='text-text dark:text-text-dark font-semibold'>
            Favorite genres:
          </h3>
          <ul className='flex flex-wrap gap-4 justify-center'>
            {userMusicStats.favoriteGenre.map((genre, index) => (
              <li key={index}>
                <InfoTag name={genre} />
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly streams - höger */}
        <div className='bg-white dark:bg-background-dark p-6 rounded-2xl shadow-md w-2/3 min-w-[300px]'>
          <h2 className='flex justify-center text-text dark:text-text-dark text-2xl font-bold mb-4'>
            Monthly streams this year:
          </h2>
          <div className='h-96'>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <BarChart data={userMusicStats.monthlyStreams}>
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
      </div>

      <div className='flex justify-center gap-6 mt-6 flex-wrap md:flex-nowrap'>
        {/* UserLeaderboard - vänster */}
        <div className='bg-white dark:bg-background-dark p-6 rounded-2xl shadow-md w-2/3 min-w-[300px]'>
          <UserLeaderboard usersData={mockData} />
        </div>

        {/* Top Songs - höger */}
        <div className='bg-white dark:bg-background-dark p-6 rounded-2xl shadow-md w-1/3 min-w-[250px]'>
          <h2 className='text-2xl font-bold text-text dark:text-text-dark mb-6'>
            Top Songs
          </h2>
          <ul className='grid grid-cols-1 gap-4 '>
            {userMusicStats.topSongs.map((song, index) => (
              <li
                key={index}
                className='border-b last:border-b-0 py-3 border-gray-200 dark:border-gray-800'
              >
                <p className='text-text dark:text-text-dark font-medium'>
                  {song.song} -{' '}
                  <span className='text-primary dark:text-secondary underline'>
                    <Link to={`/artists/${song.artist}`}>{song.artist}</Link>
                  </span>
                </p>
                <p className='text-text-muted dark:text-text-muted-dark'>
                  Streams: {song.streams}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {console.log('User Data: ', userMusicStats)}
    </main>
  );
}

export default Dashboard;
