import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import lastFMKey from '../data/keys';
import { useEffect, useState } from 'react';

function TopSongs() {
  const [musicImg, setMusicImg] = useState();

  const [fetchTopSongs, setFetchTopSongs] = useState([]);

  useEffect(() => {
    async function getMusicArtist(artist) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${lastFMKey}&artist=Cher&album=Believe&format=json`
        );

        const data = await response.json();
        console.log('YOOO:', data);

        setMusicImg(data.album.image[3]['#text']);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }

    async function getTopSongs(artist) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastFMKey}&format=json`
        );

        const data = await response.json();
        console.log('YOOO 222:', data.tracks.track);

        setFetchTopSongs(data.tracks.track);
        console.log('yes', fetchTopSongs);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
    getMusicArtist();
    getTopSongs();
  }, []);

  /* tracks.track[0] */

  return (
    <>
      <NavHeader />
      <div className='flex flex-col items-center py-12 px-8'>
        <h2 className='text-4xl text-primary font-bold mb-8'>
          Top Tracks Chart
        </h2>
        <div>
          <img src={musicImg} alt='' />
        </div>

        <ul className='list-decimal pl-5 text-text dark:text-text-dark'>
          {fetchTopSongs.map((songObj, index) => (
            <li
              key={index}
              className='py-2 border-b border-gray-200 dark:border-gray-800  '
            >
              <p className=''>
                <strong>{songObj.name}</strong> - {songObj.artist.name}
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
