'use server';
import AnimeCard, { AnimeProp } from './components/AnimeCard';

export const fetchAnime = async (page: number) => {
  const res = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=16&order=popularity`
  );
  const data = await res.json();

  return data;
};

export const fetchAnimeById = async (id: string) => {
  const res = await fetch(`https://shikimori.one/api/animes/${id}`);
  const data = await res.json();

  return data;
};
