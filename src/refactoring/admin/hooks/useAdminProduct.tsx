import { useState } from "react";
import { Discount, Product } from "../../../types";

type UseAdminProductProps = {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
};

export function useAdminProduct({
  products,
  onProductUpdate,
  onProductAdd
}: UseAdminProductProps) {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: []
  });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct?.id === productId) {
      setEditingProduct({ ...editingProduct, name: newName });
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct?.id === productId) {
      setEditingProduct({ ...editingProduct, price: newPrice });
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount]
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index)
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({ name: "", price: 0, stock: 0, discounts: [] });
    setShowNewProductForm(false);
  };

  const handleNewProductFieldChange = <
    K extends keyof Omit<Product, "id" | "discounts">
  >(
    field: K,
    value: Product[K]
  ) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewDiscountFieldChange = <K extends keyof Discount>(
    field: K,
    value: number
  ) => {
    const parsedValue = field === "rate" ? value / 100 : value;

    setNewDiscount((prev) => ({
      ...prev,
      [field]: parsedValue as Discount[K]
    }));
  };

  return {
    openProductIds,
    toggleProductAccordion,
    editingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleEditComplete,
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    handleAddNewProduct,
    handleNewProductFieldChange,
    handleNewDiscountFieldChange
  };
}
