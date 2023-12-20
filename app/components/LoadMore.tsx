import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimeCard from './AnimeCard';
import { fetchAnime } from '../action';

let page = 2;

export type AnimeCard = JSX.Element;

function LoadMore({ handleAnimeClick }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log('ref', ref, 'inView', inView);

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      fetchAnime(page).then((res) => {
        setData((prevData) => [...prevData, ...res]);
        page++;
        setIsLoading(false);
      });
    }
  }, [inView]);

  return (
    <>
      <section className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1 justify-items-center gap-4 md:max-w-[1500px] mx-auto col-span-full">
        {data.map((anime, index) => (
          <AnimeCard
            key={`${anime.id}_${index}`}
            anime={anime}
            index={index}
            onClick={() => handleAnimeClick(anime)}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center items-center w-full py-8">
            <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        )}
      </section>
      {/* Invisible trigger element */}
      <div ref={ref} className="h-10"></div>
    </>
  );
}

export default LoadMore;
