import { useState } from "react";
import { Coupon } from "../../../types.ts";

export const useCoupons = (initialCoupons: Coupon[] = []) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return {
    coupons,
    addCoupon
  };
};
