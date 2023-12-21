import { useShoppingCart } from '../context/ShoppingCartContext';

export const CartItem = () => {
  const { removeFromCart } = useShoppingCart();

  return <div className="stack"></div>;
};
