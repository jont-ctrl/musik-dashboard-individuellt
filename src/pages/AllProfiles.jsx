import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import { Link } from 'react-router-dom';

function AllProfiles() {
  return (
    <>
      <NavHeader />
      <div className='py-12 px-8 flex flex-col items-center justify-center'>
        <h1 className='text-4xl text-primary font-bold mb-8'>All profiles</h1>
        {mockData.users.map((user) => (
          <div
            key={user.id}
            className='flex items-center justify-center p-4 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 transition w-full max-w-2xl'
          >
            <Link to={`/profiles/${user.id}`}>
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className='w-10 h-10 rounded-full mr-4 '
              />
            </Link>
            <div className='flex-grow '>
              <p className='flex gap-2 text-lg font-medium text-text dark:text-text-dark'>
                <Link
                  to={`/profiles/${user.id}`}
                  className='text-primary dark:text-secondary'
                >
                  {user.name}
                </Link>
                <span className='text-text-muted dark:text-text-muted-dark'>
                  ({user.location})
                </span>
              </p>
              <p className='text-sm text-text-muted dark:text-text-muted-dark'>
                Total Streams: {user.totalStreams}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
export default AllProfiles;
