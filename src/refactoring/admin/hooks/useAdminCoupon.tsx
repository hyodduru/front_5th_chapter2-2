import { useState } from "react";
import { Coupon } from "../../../types";

interface useAdminCouponProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export function useAdminCoupon({ onCouponAdd }: useAdminCouponProps) {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0
    });
  };

  const handleNewCouponFieldChange = <K extends keyof Coupon>(
    field: K,
    value: Coupon[K]
  ) => {
    setNewCoupon((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    newCoupon,
    handleNewCouponFieldChange,
    handleAddCoupon
  };
}
