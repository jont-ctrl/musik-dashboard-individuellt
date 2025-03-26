import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import lastFMKey from '../data/keys';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TopSongs() {
  const [musicImg, setMusicImg] = useState();

  const [fetchTopSongs, setFetchTopSongs] = useState([]);

  // Fetch data from the LastFM API
  useEffect(() => {
    async function getMusicArtist(artist) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastFMKey}&artist=cher&track=believe&format=json`
        );

        const data = await response.json();
        console.log('YOOO:', data);

        setMusicImg(data.track.album.image[3]['#text']);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }

    async function getTopSongs() {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastFMKey}&format=json`
        );

        const data = await response.json();
        console.log('YOOO 222:', data.tracks.track);

        // const top10 = data.tracks.track.slice(0, 10);
        // setFetchTopSongs(top10);

        setFetchTopSongs(data.tracks.track);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
    getMusicArtist();
    getTopSongs();
  }, []);

  return (
    <>
      <NavHeader />
      <div className='flex flex-col items-center justify-center py-12 px-8'>
        <h2 className='text-4xl text-primary font-bold mb-8'>
          Top Tracks Chart
        </h2>

        <ul className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center list-decimal pl-5 text-text dark:text-text-dark'>
          {fetchTopSongs.map((songObj, index) => (
            <li
              key={index}
              className=' flex flex-col  py-2 border-b border-gray-200 dark:border-gray-800   '
            >
              <img className='rounded-2xl pb-2' src={musicImg} alt='' />
              <p className=''>
                <strong>
                  {index + 1}. {songObj.name}
                </strong>{' '}
                -{' '}
                <Link
                  to={`/artists/${songObj.artist.name}`}
                  className='text-primary dark:text-secondary underline'
                >
                  {songObj.artist.name}
                </Link>
                {}
              </p>
              <p className='text-text-muted dark:text-text-muted-dark'>
                Streams: {songObj.listeners}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default TopSongs;
