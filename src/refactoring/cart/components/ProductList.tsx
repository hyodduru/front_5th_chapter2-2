import { Product } from "../../../types";
import ProductItem from "./ProductItem";

interface CartProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  getRemainingStock: (product: Product) => number;
}

const ProductList = ({
  products,
  addToCart,
  getRemainingStock
}: CartProductListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          const remainingStock = getRemainingStock(product);
          return (
            <ProductItem
              key={product.id}
              product={product}
              remainingStock={remainingStock}
              addToCart={addToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
