import { CartItem } from "../../../types";
import CartProductItem from "./CartProductItem";

interface CartProductListProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

const CartProductList = ({
  cart,
  removeFromCart,
  updateQuantity
}: CartProductListProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item, index) => {
          return (
            <CartProductItem
              item={item}
              key={index}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          );
        })}
      </div>
    </>
  );
};

export default CartProductList;
