import { CartItem } from "../../../types";

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { quantity, product } = item;
  return product.discounts
    .filter((d) => quantity >= d.quantity)
    .reduce((max, d) => Math.max(max, d.rate), 0);
};

export const getAppliedDiscount = getMaxApplicableDiscount;
