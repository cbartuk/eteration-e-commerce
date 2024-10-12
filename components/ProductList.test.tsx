import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productReducer, { ProductState } from "../features/product/productSlice";

// `next/navigation` modülünü mockluyoruz
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockProducts = [
  {
    id: "1",
    name: "Product A",
    price: 100,
    image: "/imageA.jpg",
    description: "Description A",
    brand: "BrandA",
    model: "ModelA",
  },
  {
    id: "2",
    name: "Product B",
    price: 200,
    image: "/imageB.jpg",
    description: "Description B",
    brand: "BrandB",
    model: "ModelB",
  },
];

describe("ProductList", () => {
  test("renders ProductList component", () => {
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
    const productA = screen.getByText("Product A");
    expect(productA).toBeInTheDocument();

    const productB = screen.getByText("Product B");
    expect(productB).toBeInTheDocument();
  });
});
