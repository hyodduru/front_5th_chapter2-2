import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { useAdminCoupon } from "../../../refactoring/admin/hooks/useAdminCoupon";

// mock 함수
const mockOnCouponAdd = vi.fn();

describe("useAdminCoupon 훅", () => {
  it("새 쿠폰을 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useAdminCoupon({
        onCouponAdd: mockOnCouponAdd
      })
    );

    act(() => {
      result.current.handleAddCoupon();
    });

    expect(mockOnCouponAdd).toHaveBeenCalledOnce();
    expect(result.current.newCoupon.name).toBe("");
    expect(result.current.newCoupon.code).toBe("");
    expect(result.current.newCoupon.discountType).toBe("percentage");
    expect(result.current.newCoupon.discountValue).toBe(0);
  });

  it("쿠폰 필드를 변경할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useAdminCoupon({
        onCouponAdd: mockOnCouponAdd
      })
    );

    act(() => {
      result.current.handleNewCouponFieldChange("name", "10% 할인 쿠폰");
      result.current.handleNewCouponFieldChange("code", "TEN10");
      result.current.handleNewCouponFieldChange("discountType", "amount");
      result.current.handleNewCouponFieldChange("discountValue", 5000);
    });

    expect(result.current.newCoupon).toEqual({
      name: "10% 할인 쿠폰",
      code: "TEN10",
      discountType: "amount",
      discountValue: 5000
    });
  });
});
