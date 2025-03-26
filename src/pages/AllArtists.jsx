import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import { useState, useEffect } from 'react';
import lastFMKey from '../data/keys';
import { Link } from 'react-router-dom';

function allArtists() {
  const [fetchTopSongs, setFetchTopSongs] = useState([]);

  useEffect(() => {
    async function getTopSongs() {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastFMKey}&format=json`
        );

        const data = await response.json();
        console.log('YOOO 222:', data.tracks.track);

        setFetchTopSongs(data.tracks.track);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }

    getTopSongs();
  }, []);

  return (
    <>
      <NavHeader />
      <div className='py-12 px-8 flex flex-col items-center justify-center'>
        <h1 className='text-4xl text-primary font-bold mb-8'>All Artists</h1>
        <ul>
          {fetchTopSongs.map((songObj, index) => (
            <li
              key={index}
              className=' text-lg  text-text dark:text-text-dark underline'
            >
              <Link to={`/artists/${songObj.artist.name}`}>
                {songObj.artist.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
export default allArtists;
