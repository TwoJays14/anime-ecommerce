import Image from 'next/image';
import { Prop, AnimeProp } from './AnimeCard';
import { useShoppingCart } from '../context/ShoppingCartContext';

// interface AnimeModalProps {
//   anime: Prop; // Replace AnimeDetailType with the actual type you expect
// }

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  anime: Prop;
}

const AnimeModal = ({ anime, onClose }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(anime.id);

  return (
    <article className="fixed inset-0 bg-slate-900 bg-opacity-40 flex justify-center z-10 items-center">
      <div className="card card-compact">
        <div className="card-body modal-content text-white font-bold text-3xl flex flex-col justify-center items-center h-full ">
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
            {/* <button className="btn btn-primary" onClick={() => {}}>
              Add to Cart
            </button> */}
            {quantity === 0 ? (
              <button
                className="w-100 btn btn-primary"
                onClick={() => increaseCartQuantity(anime.id)}
              >
                + Add to Cart
              </button>
            ) : (
              <div
                className="flex items-center flex-col"
                style={{ gap: '.5rem' }}
              >
                <div
                  className="flex items-center justify-between"
                  style={{ gap: '.5rem' }}
                >
                  <button
                    className="btn btn-secondary"
                    onClick={() => decreaseCartQuantity(anime.id)}
                  >
                    -
                  </button>
                  <div>
                    <span className="btn-primary btn">{quantity}</span> in cart
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => increaseCartQuantity(anime.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-secondary w-full"
                  onClick={() => removeFromCart(anime.id)}
                >
                  Remove
                </button>
              </div>
            )}
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
