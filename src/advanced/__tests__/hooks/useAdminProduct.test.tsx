import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Product } from "../../../types";
import { useAdminProduct } from "../../../refactoring/admin/hooks/useAdminProduct";

// 샘플 상품 생성 함수
const sampleProduct = (overrides?: Partial<Product>): Product => ({
  id: "p1",
  name: "테스트 상품",
  price: 10000,
  stock: 10,
  discounts: [],
  ...overrides
});

// mock 콜백 함수
const mockOnProductUpdate = vi.fn();
const mockOnProductAdd = vi.fn();

describe("useAdminProduct 훅", () => {
  it("새 상품을 추가할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useAdminProduct({
        products: [],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    act(() => {
      result.current.handleAddNewProduct();
    });

    expect(mockOnProductAdd).toHaveBeenCalledOnce();
    expect(result.current.newProduct.name).toBe("");
    expect(result.current.showNewProductForm).toBe(false);
  });

  it("상품을 수정 모드로 설정할 수 있어야 한다", () => {
    const product = sampleProduct();

    const { result } = renderHook(() =>
      useAdminProduct({
        products: [product],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    act(() => {
      result.current.handleEditProduct(product);
    });

    expect(result.current.editingProduct?.id).toBe(product.id);
  });

  it("상품 이름을 수정할 수 있어야 한다", () => {
    const product = sampleProduct();

    const { result } = renderHook(() =>
      useAdminProduct({
        products: [product],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    act(() => {
      result.current.handleEditProduct(product);
    });

    act(() => {
      result.current.handleProductNameUpdate(product.id, "새 이름");
    });

    expect(result.current.editingProduct?.name).toBe("새 이름");
  });

  it("상품 가격을 수정할 수 있어야 한다", () => {
    const product = sampleProduct();

    const { result } = renderHook(() =>
      useAdminProduct({
        products: [product],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    // 1단계: 상품 수정 모드로 전환
    act(() => {
      result.current.handleEditProduct(product);
    });

    // 2단계: 가격 수정
    act(() => {
      result.current.handlePriceUpdate(product.id, 20000);
    });

    // 가격 수정 후, 수정된 가격 확인
    expect(result.current.editingProduct?.price).toBe(20000);
  });

  it("상품 가격을 수정할 수 있어야 한다", () => {
    const product = sampleProduct();

    const { result } = renderHook(() =>
      useAdminProduct({
        products: [product],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    // 먼저 수정할 상품 설정
    act(() => {
      result.current.handleEditProduct(product);
    });

    // 그 후 가격 업데이트
    act(() => {
      result.current.handlePriceUpdate(product.id, 20000);
    });

    // 상태가 반영되었는지 검증
    expect(result.current.editingProduct?.price).toBe(20000);
  });

  it("할인을 추가할 수 있어야 한다", () => {
    const product = sampleProduct();

    const { result } = renderHook(() =>
      useAdminProduct({
        products: [product],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    // 먼저 상품 수정 모드로 설정
    act(() => {
      result.current.handleEditProduct(product);
    });

    // 그다음 할인 추가
    act(() => {
      result.current.handleAddDiscount(product.id);
    });

    expect(mockOnProductUpdate).toHaveBeenCalled();
    expect(result.current.editingProduct?.discounts.length).toBeGreaterThan(0);
  });

  it("할인을 제거할 수 있어야 한다", () => {
    const productWithDiscount = sampleProduct({
      discounts: [{ quantity: 3, rate: 0.1 }]
    });

    const { result } = renderHook(() =>
      useAdminProduct({
        products: [productWithDiscount],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    act(() => {
      result.current.handleEditProduct(productWithDiscount);
      result.current.handleRemoveDiscount(productWithDiscount.id, 0);
    });

    expect(mockOnProductUpdate).toHaveBeenCalled();
    expect(result.current.editingProduct?.discounts).toHaveLength(0);
  });

  it("상품 추가 폼의 필드를 수정할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useAdminProduct({
        products: [],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    act(() => {
      result.current.handleNewProductFieldChange("name", "추가 상품");
      result.current.handleNewProductFieldChange("price", 5000);
      result.current.handleNewProductFieldChange("stock", 20);
    });

    expect(result.current.newProduct.name).toBe("추가 상품");
    expect(result.current.newProduct.price).toBe(5000);
    expect(result.current.newProduct.stock).toBe(20);
  });

  it("할인 입력 필드를 수정할 수 있어야 한다", () => {
    const { result } = renderHook(() =>
      useAdminProduct({
        products: [],
        onProductUpdate: mockOnProductUpdate,
        onProductAdd: mockOnProductAdd
      })
    );

    act(() => {
      result.current.handleNewDiscountFieldChange("quantity", 5);
      result.current.handleNewDiscountFieldChange("rate", 5); // % 입력 기준
    });

    expect(result.current.newDiscount.quantity).toBe(5);
    expect(result.current.newDiscount.rate).toBe(0.05); // 내부적으로 5%는 0.05로 저장
  });
});
