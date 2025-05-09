import AdminProductForm from "./AdminProductForm";
import AdminProductItem from "./AdminProductItem";
import { useAdminProduct } from "../hooks/useAdminProduct";
import { Product } from "../../../types.ts";

interface AdminProductPanelProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

const AdminProductPanel = ({
  products,
  onProductUpdate,
  onProductAdd
}: AdminProductPanelProps) => {
  const {
    openProductIds,
    editingProduct,
    newDiscount,
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    handleAddNewProduct,
    handleNewProductFieldChange,
    adminProductHandlers
  } = useAdminProduct({ products, onProductUpdate, onProductAdd });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <AdminProductForm
          newProduct={newProduct}
          handleNewProductFieldChange={handleNewProductFieldChange}
          handleAddNewProduct={handleAddNewProduct}
        />
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <AdminProductItem
            key={product.id}
            product={product}
            openProductIds={openProductIds}
            editingProduct={editingProduct}
            adminProductHandlers={adminProductHandlers}
            newDiscount={newDiscount}
            data-testid={`product-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProductPanel;
