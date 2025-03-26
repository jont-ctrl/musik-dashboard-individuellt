import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import lastFMKey from '../data/keys';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Artist() {
  const { artistId } = useParams();

  const [artistBio, setArtistBio] = useState(null);
  const [artistTopSongs, setArtistTopSongs] = useState('');
  const [artistImg, setArtistImg] = useState(null);

  useEffect(() => {
    async function getBio(artist) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${lastFMKey}&format=json`
        );

        const data = await response.json();
        console.log('YOOO 222:', data);

        setArtistBio(data);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
    getBio(artistId);
  }, []);

  if (!artistBio) {
    // Render a loading message while the data is being fetched
    return (
      <>
        <NavHeader />
        <div className='py-12 px-8 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl text-primary font-bold mb-8'>Loading...</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavHeader />
      <main className='p-6'>
        <div className='py-12 px-8 flex flex-col items-center justify-center gap-8 rounded-lg shadow-md max-w-4xl mx-auto'>
          <div className='flex gap-4 items-center justify-center'>
            <button className=' flex justify-center items-center text-4xl '>
              <Link to='/artists'>⬅️</Link>
            </button>
            <h1 className='text-4xl text-text dark:text-text-dark font-bold '>
              {artistBio.artist.name}
            </h1>
          </div>
          <img className='rounded-2xl' src='https://picsum.photos/400' alt='' />
          <h2 className='text-text-muted dark:text-text-muted-dark'>
            <strong>Listeners:</strong> {artistBio.artist.stats.listeners}
          </h2>
          <h2 className='text-text-muted dark:text-text-muted-dark'>
            <strong>Play count:</strong> {artistBio.artist.stats.playcount}
          </h2>
          <p className='text-text dark:text-text-dark max-w-1xl'>
            {artistBio.artist.bio.summary}
          </p>
          <h4 className='font-semibold'>Similar artists:</h4>
          <ul className='flex gap-4'>
            {artistBio.artist.similar.artist.map((artist) => (
              <li className='' key={artist.name}>
                {artist.name}
              </li>
            ))}
          </ul>
          <a
            className='underline text-text dark:text-dark '
            href={artistBio.artist.url}
            target='_blank'
            rel='noreferrer'
          >
            {artistBio.artist.name} LastFM
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Artist;
