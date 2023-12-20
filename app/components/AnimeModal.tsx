import Image from 'next/image';
import { Prop, AnimeProp } from './AnimeCard';

interface AnimeModalProps {
  anime: Prop; // Replace AnimeDetailType with the actual type you expect
}

const AnimeModal = ({ anime, onClose }: AnimeModalProps) => {
  console.log('anime', anime);

  return (
    <article className="fixed inset-0 bg-slate-900 bg-opacity-40 flex justify-center items-center">
      <div className="card card-compact">
        <div className="card-body modal-content text-red-600 font-bold text-3xl flex flex-col justify-center items-center h-full ">
          <h2 className="card-title">{anime?.name || 'N/A'}</h2>
          <figure>
            <Image
              width={300}
              height={500}
              alt={anime?.name}
              src={`https://shikimori.one${anime?.image.original}`}
              className="rounded-xl object-contain"
            />
          </figure>
          <p>{anime?.description}</p>
          <div className="card-actions flex justify-end w-full">
            <button className="btn btn-primary" onClick={() => {}}>
              Add to Cart
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default AnimeModal;
