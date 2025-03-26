import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';

function TopSongs() {
  // Samla alla låtar från alla användare i en enda array
  const allSongs = mockData.users.flatMap((user) => user.topSongs);

  // Sortera låtarna från mest till minst streams
  const sortedSongs = allSongs.sort((a, b) => b.streams - a.streams);

  return (
    <>
      <NavHeader />
      <div className='flex flex-col items-center py-12 px-8'>
        <h2 className='text-4xl text-primary font-bold mb-8'>Top songs</h2>
        <ul className='list-decimal pl-5 text-text dark:text-text-dark'>
          {sortedSongs.map((songObj, index) => (
            <li
              key={index}
              className='py-2 border-b border-gray-200 dark:border-gray-800  '
            >
              <span className='font-semibold'>{songObj.song}</span> -{' '}
              {songObj.artist} ({songObj.streams} streams)
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default TopSongs;
