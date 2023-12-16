import Image from 'next/image';
import { Prop, AnimeProp } from './AnimeCard';

interface AnimeModalProps {
  anime: Prop[]; // Replace AnimeDetailType with the actual type you expect
}

const AnimeModal = ({ anime, onClose }: AnimeModalProps) => {
  console.log('anime', anime);

  return (
    <div className=" bg-slate-900 bg-opacity-40  top-0 left-1/2 z-30 transform -translate-x-1/2 h-screen w-screen fixed">
      <div className="modal-content text-red-600 font-bold text-3xl flex flex-col justify-center items-center h-full ">
        <h2>{anime?.name || 'N/A'}</h2>
        <Image
          width={300}
          height={500}
          alt={anime?.name}
          src={`https://shikimori.one${anime?.image.original}`}
          className="rounded-xl object-contain"
        />
        <p>{anime?.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default AnimeModal;
