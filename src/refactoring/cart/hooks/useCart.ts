import { useState } from "react";
import { CartItem, Coupon, Product } from "../../../types";
import {
  calculateCartTotal,
  getRemainingStock as _getRemainingStock,
  updateCartItemQuantity
} from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      const currentQty = existingItem?.quantity ?? 0;

      if (!existingItem && product.stock > 0) {
        return [...prevCart, { product, quantity: 1 }];
      }

      if (currentQty >= product.stock) return prevCart;

      return updateCartItemQuantity(prevCart, product.id, currentQty + 1);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const product = prevCart.find(
        (item) => item.product.id === productId
      )?.product;
      if (!product) return prevCart;

      const updatedCart = updateCartItemQuantity(
        prevCart,
        productId,
        newQuantity
      );
      return updatedCart;
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  const getRemainingStock = (product: Product) => {
    return _getRemainingStock(product, cart);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    getRemainingStock
  };
};
