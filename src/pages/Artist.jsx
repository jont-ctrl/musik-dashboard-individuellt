import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import lastFMKey from '../data/keys';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackIcon from '../components/BackIcon';
import InfoTag from '../components/InfoTag';

function Artist() {
  const { artistId } = useParams();

  const [artistBio, setArtistBio] = useState(null);

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

  const uniqueImageUrl = `https://picsum.photos/400?random=${new Date().getTime()}`;

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
      <main className='py-6  sm:p-6 min-h-screen'>
        <div className='py-12 px-8 flex flex-col items-center justify-center gap-8 rounded-lg shadow-md bg-background dark:bg-background-dark max-w-4xl mx-auto'>
          {/* Header Section */}
          <div className='flex flex-wrap gap-4 items-center justify-center'>
            <button className='flex justify-center items-center text-4xl'>
              <Link to='/artists'>
                <BackIcon />
              </Link>
            </button>
            <h1 className='text-4xl text-text dark:text-text-dark font-bold text-center'>
              {artistBio.artist.name}
            </h1>
          </div>

          {/* Artist Image */}
          <img
            className='rounded-2xl w-full max-w-md object-cover'
            src={uniqueImageUrl}
            alt={`${artistBio.artist.name} image`}
          />

          {/* Stats Section */}
          <div className='flex flex-col items-center gap-4'>
            <h2 className='text-text-muted dark:text-text-muted-dark text-lg'>
              <strong>Listeners:</strong>{' '}
              {Number(artistBio.artist.stats.listeners).toLocaleString()}
            </h2>
            <h2 className='text-text-muted dark:text-text-muted-dark text-lg'>
              <strong>Play count:</strong>{' '}
              {Number(artistBio.artist.stats.playcount).toLocaleString()}
            </h2>
          </div>

          {/* Bio Section */}
          <p className='text-text dark:text-text-dark w-full max-w-2xl px-4 text-center leading-relaxed break-words'>
            {artistBio.artist.bio.summary}
          </p>

          {/* Similar Artists Section */}
          <div className='w-full'>
            <h4 className='font-semibold text-lg text-center mb-4 text-text dark:text-text-dark'>
              Similar Artists:
            </h4>
            <ul className='flex flex-wrap gap-4 justify-center'>
              {artistBio.artist.similar.artist.map((artist) => (
                <li key={artist.name}>
                  <InfoTag name={artist.name} />
                </li>
              ))}
            </ul>
          </div>

          {/* External Link */}
          <a
            className='underline text-primary dark:text-secondary text-lg'
            href={artistBio.artist.url}
            target='_blank'
            rel='noreferrer'
          >
            {artistBio.artist.name} on LastFM
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Artist;
