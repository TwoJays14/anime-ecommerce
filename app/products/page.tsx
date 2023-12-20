'use client';
import { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';
import AnimeModal from '../components/AnimeModal';
import { fetchAnime } from '../action';
import LoadMore from '../components/LoadMore';

const ProductsPage = () => {
  const [animes, setAnimes] = useState([]); // State for list of animes
  const [selectedAnime, setSelectedAnime] = useState(null); // State for the selected anime
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAnime(1);
      setAnimes(data);
    };
    fetchData();
  }, []);

  const handleAnimeClick = (anime) => {
    setSelectedAnime(anime);
    setModalOpen(true);
  };

  console.log('selectedAnime', selectedAnime);

  return (
    <>
      <main className="flex flex-col ">
        <section className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1 justify-items-center gap-4 pt-48 md:max-w-[1500px] mx-auto">
          {animes.map((anime, index) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              index={index}
              onClick={() => handleAnimeClick(anime)}
            />
          ))}
          {/* Include LoadMore in the grid and make it span all columns */}

          <LoadMore handleAnimeClick={handleAnimeClick} />
        </section>

        {modalOpen && selectedAnime && (
          <AnimeModal
            anime={selectedAnime}
            onClose={() => setModalOpen(false)}
          />
        )}
      </main>
    </>
  );
};
export default ProductsPage;
