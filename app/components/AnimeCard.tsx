'use client';
import Image from 'next/image';
import { MotionDiv } from './Motion';
import { fetchAnimeById } from '../action';
import { useState } from 'react';
import AnimeModal from './AnimeModal';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}

export interface Prop {
  anime: AnimeProp;
  index: number;
}

const AnimeCard = ({ anime, index, onClick }: Prop) => {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // console.log(animeDetails);

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="w-full rounded relative cursor-pointer hover:scale-105 transition-all"
      onClick={onClick}
    >
      <div className="relative w-full h-[30vh] ">
        <Image
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          fill
          className="rounded-xl object-contain"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-center text-xl line-clamp-1 w-full">
            {anime.name}
          </h2>
        </div>
      </div>

      {openModal && <AnimeModal anime={anime} />}
    </MotionDiv>
  );
};
export default AnimeCard;
