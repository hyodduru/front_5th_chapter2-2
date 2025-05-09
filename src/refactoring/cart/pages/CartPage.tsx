import { Coupon, Product } from "../../../types.ts";
import { useCart } from "../hooks/useCart.ts";
import CartProductList from "../components/CartProductList.tsx";
import ProductList from "../components/ProductList.tsx";
import CartCoupon from "../components/CartCoupon.tsx";
import CartSummary from "../components/CartSummary.tsx";

interface CartPageProps {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const {
    cart,
    addToCart,
    getRemainingStock,
    calculateTotal,
    applyCoupon,
    selectedCoupon,
    removeFromCart,
    updateQuantity
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          addToCart={addToCart}
          getRemainingStock={getRemainingStock}
        />
        <div>
          <CartProductList
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          <CartCoupon
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />
          <CartSummary calculateTotal={calculateTotal} />
        </div>
      </div>
    </div>
  );
};
