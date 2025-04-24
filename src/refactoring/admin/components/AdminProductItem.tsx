import { Discount, Product } from "../../../types";

interface AdminProductItemProps {
  product: Product;
  toggleProductAccordion: (productId: string) => void;
  openProductIds: Set<string>;
  editingProduct: Product | null;
  handleNewProductFieldChange: <
    K extends keyof Omit<Product, "id" | "discounts">
  >(
    field: K,
    value: Product[K]
  ) => void;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleAddDiscount: (productId: string) => void;
  handleEditComplete: () => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleEditProduct: (product: Product) => void;
  handleNewDiscountFieldChange: <K extends keyof Discount>(
    field: K,
    value: number
  ) => void;
  newDiscount: Discount;
  "data-testid": string;
}

const AdminProductItem = ({
  product,
  toggleProductAccordion,
  openProductIds,
  editingProduct,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleRemoveDiscount,
  handleAddDiscount,
  handleEditComplete,
  handleStockUpdate,
  handleEditProduct,
  handleNewDiscountFieldChange,
  newDiscount,
  "data-testid": testId
}: AdminProductItemProps) => {
  return (
    <div
      key={product.id}
      className="bg-white p-4 rounded shadow"
      data-testid={testId}
    >
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIds.has(product.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    handleProductNameUpdate(product.id, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">가격: </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    handlePriceUpdate(product.id, parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">재고: </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    handleStockUpdate(product.id, parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <button
                      onClick={() => handleRemoveDiscount(product.id, index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      handleNewDiscountFieldChange(
                        "quantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="할인율 (%)"
                    value={
                      isNaN(newDiscount.rate * 100) ? 0 : newDiscount.rate * 100
                    }
                    onChange={(e) =>
                      handleNewDiscountFieldChange(
                        "rate",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <button
                    onClick={() => handleAddDiscount(product.id)}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>
              <button
                onClick={handleEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProductItem;
