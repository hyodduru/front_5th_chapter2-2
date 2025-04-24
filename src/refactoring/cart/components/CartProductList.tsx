import { CartItem } from "../../../types";
import CartProductItem from "./CartProductItem";

type CartProductListProps = {
  cart: CartItem[];
};

const CartProductList = ({ cart }: CartProductListProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => {
          return <CartProductItem item={item} />;
        })}
      </div>
    </>
  );
};

export default CartProductList;
