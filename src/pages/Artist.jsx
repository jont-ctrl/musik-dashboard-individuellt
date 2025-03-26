import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import lastFMKey from '../data/keys';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <div className='py-12 px-8 flex flex-col items-center justify-center gap-8'>
        <h1 className='text-4xl text-primary dark:text-primary-dark font-bold mb-8'>
          {artistBio.artist.name}
        </h1>
        <img className='rounded-2xl' src='https://picsum.photos/400' alt='' />
        <p className='text-text dark:text-text-dark max-w-2xl'>
          {artistBio.artist.bio.summary}
        </p>
        <a
          className='underline text-primary dark:text-text-dark pb-16'
          href={artistBio.artist.url}
          target='_blank'
          rel='noreferrer'
        >
          {artistBio.artist.name} LastFM
        </a>
      </div>

      <Footer />
    </>
  );
}

export default Artist;
