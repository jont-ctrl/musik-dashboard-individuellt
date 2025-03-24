import { useState, useEffect } from 'react';

const UserLeaderboard = ({ usersData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Received usersData:', usersData); // Log the incoming prop

    if (usersData && usersData.users && Array.isArray(usersData.users)) {
      const sortedUsers = usersData.users
        .map((user) => {
          const totalStreams = user.monthlyStreams.reduce(
            (sum, { streams }) => sum + streams,
            0
          );
          return { ...user, totalStreams };
        })
        .sort((a, b) => b.totalStreams - a.totalStreams);

      console.log('Processed users:', sortedUsers); // Log the processed data
      setUsers(sortedUsers);
    } else {
      console.error('Invalid or missing users data:', usersData);
    }
  }, [usersData]);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-text dark:text-text-dark mb-6'>
        User Streams Leaderboard
      </h1>
      {users.length === 0 ? (
        <p className='text-text-muted dark:text-text-muted-dark'>
          No users to display. Check the console for errors.
        </p>
      ) : (
        <ul className='space-y-4'>
          {users.map((user, index) => (
            <li
              key={user.id}
              className='flex items-center p-4 bg-white dark:bg-background-dark border-b border-text-muted dark:border-text-muted-dark hover:bg-gray-50 transition'
            >
              <span className='text-lg font-semibold text-text dark:text-text-dark w-8'>
                {index + 1}
              </span>
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className='w-10 h-10 rounded-full mr-4'
              />
              <div className='flex-grow'>
                <p className='text-lg font-medium text-text dark:text-text-dark'>
                  {user.name}{' '}
                  <span className='text-text-muted dark:text-text-muted-dark'>
                    ({user.location})
                  </span>
                </p>
                <p className='text-sm text-text-muted dark:text-text-muted-dark'>
                  Total Streams: {user.totalStreams}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserLeaderboard;
