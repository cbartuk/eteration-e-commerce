import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productReducer, { ProductState } from "../features/product/productSlice";
import { generateMockProductData } from "../test-utils/mockData";

// `next/navigation` modülünü mockluyoruz
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("ProductList", () => {
  test("renders ProductList component with mock products", () => {
    const mockProducts = generateMockProductData(10);

    const initialState: ProductState = {
      products: mockProducts,
      brands: [],
      models: [],
      filters: {
        search: "",
        brands: [],
        models: [],
        sortBy: "",
      },
      status: "succeeded",
      error: null,
    };

    const store = configureStore({
      reducer: { products: productReducer },
      preloadedState: {
        products: initialState,
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // Ürünlerin render edildiğini kontrol ediyoruz
    mockProducts.forEach((product) => {
      const productName = screen.getByText(product.name);
      expect(productName).toBeInTheDocument();
    });
  });
});
