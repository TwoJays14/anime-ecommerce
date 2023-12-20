'use client';
import { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';
import AnimeModal from '../components/AnimeModal';
import { fetchAnime } from '../action';

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

  console.log('selectedAnime', selectedAnime)
  

  return (
    <section className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  justify-items-center gap-4 pt-48 md:max-w-[1500px] mx-auto">
      {animes.map((anime, index) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          index={index}
          onClick={() => handleAnimeClick(anime)}
        />
      ))}
      {modalOpen && selectedAnime && (
        <AnimeModal anime={selectedAnime} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
};
export default ProductsPage;
