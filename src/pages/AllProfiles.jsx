import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import { Link } from 'react-router-dom';

function AllProfiles() {
  return (
    <>
      <NavHeader />
      <div className='py-12 flex flex-col items-center justify-center'>
        <h2 className='text-4xl text-primary font-bold mb-8'>All profiles</h2>
        {mockData.users.map((user) => (
          <div
            key={user.id}
            className='flex items-start p-4 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 transition w-full max-w-4xl'
          >
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className='w-10 h-10 rounded-full mr-4'
            />
            <div className='flex-grow '>
              <p className='flex gap-2 text-lg font-medium text-text dark:text-text-dark'>
                <Link to={`/profiles/${user.id}`}>{user.name}</Link>
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
