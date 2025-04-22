import { CartItem, Coupon, Product } from "../../types";

// 1. 최대 할인율 구하기
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity, product } = item;
  const applicable = product.discounts
    .filter((d) => quantity >= d.quantity)
    .map((d) => d.rate);
  return applicable.length > 0 ? Math.max(...applicable) : 0;
};

// 2. 상품 1개에 대한 최종 금액 계산
export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  const discountedPrice = item.product.price * (1 - discountRate);
  return discountedPrice * item.quantity;
};

// 3. 장바구니 전체 금액 계산
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountedTotal = cart.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      couponDiscount = selectedCoupon.discountValue;
    } else if (selectedCoupon.discountType === "percentage") {
      couponDiscount = discountedTotal * (selectedCoupon.discountValue / 100);
    }
  }

  const totalDiscount = totalBeforeDiscount - discountedTotal + couponDiscount;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount: Math.floor(totalBeforeDiscount),
    totalDiscount: Math.floor(totalDiscount),
    totalAfterDiscount: Math.max(0, Math.floor(totalAfterDiscount))
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  product: Product,
  newQuantity: number
): CartItem[] => {
  const existing = cart.find((item) => item.product.id === product.id);

  if (!existing && newQuantity > 0) {
    return [
      ...cart,
      { product, quantity: Math.min(newQuantity, product.stock) }
    ];
  }

  return cart
    .map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: Math.min(Math.max(newQuantity, 0), item.product.stock)
          }
        : item
    )
    .filter((item) => item.quantity > 0);
};
