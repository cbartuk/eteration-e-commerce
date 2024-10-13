import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { setFilter } from "@/features/product/productSlice";

// `useRouter`'ı mockla
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  test("clears all filters when search input is used", () => {
    render(
      <Provider store={store}>
        <Header showCartIcon={true} />
      </Provider>
    );

    // Filtreleri ayarla
    store.dispatch(setFilter({ filterType: "brands", value: ["BrandA"] }));
    store.dispatch(setFilter({ filterType: "models", value: ["ModelA"] }));
    store.dispatch(
      setFilter({ filterType: "sortBy", value: "Price low to high" })
    );

    // Arama yap
    fireEvent.change(screen.getByPlaceholderText(/Search products.../i), {
      target: { value: "Product A" },
    });

    // Store'daki filtrelerin sıfırlandığını kontrol et
    expect(store.getState().products.filters.brands).toEqual([]);
    expect(store.getState().products.filters.models).toEqual([]);
    expect(store.getState().products.filters.sortBy).toEqual("");
  });
});
