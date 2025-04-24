import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLocalStorage } from "../../../refactoring/cart/hooks";

describe("useLocalStorage 훅", () => {
  const key = "test-key";

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks(); // 모의함수 초기화
  });

  it("로컬스토리지에 값이 없으면 초기값을 반환해야 한다", () => {
    const { result } = renderHook(() => useLocalStorage(key, "초기값"));

    expect(result.current[0]).toBe("초기값");
  });

  it("로컬스토리지에 저장된 값을 불러올 수 있어야 한다", () => {
    localStorage.setItem(key, JSON.stringify("저장된값"));

    const { result } = renderHook(() => useLocalStorage(key, "초기값"));

    expect(result.current[0]).toBe("저장된값");
  });

  it("값을 변경하면 로컬스토리지에 저장되어야 한다", () => {
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, "setItem");

    const { result } = renderHook(() => useLocalStorage("test-key", "초기값"));

    act(() => {
      result.current[1]("변경된값");
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      "test-key",
      JSON.stringify("변경된값")
    );
  });

  it("로컬스토리지에 JSON 파싱 오류가 발생하면 초기값을 사용해야 한다", () => {
    localStorage.setItem(key, "잘못된JSON"); // JSON.parse 오류 유도

    const { result } = renderHook(() => useLocalStorage(key, "기본값"));

    expect(result.current[0]).toBe("기본값");
  });
});
