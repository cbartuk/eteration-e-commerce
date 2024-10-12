import productReducer, {
  ProductState,
  setFilter,
  fetchProducts,
} from "./productSlice";
import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "@reduxjs/toolkit";

// Mocked fetch response as an array
const mockFetchResponse = [
  {
    id: "1",
    name: "Product A",
    price: 100,
    image: "imageA.jpg",
    description: "Description A",
    brand: "BrandA",
    model: "ModelA",
  },
  {
    id: "2",
    name: "Product B",
    price: 200,
    image: "imageB.jpg",
    description: "Description B",
    brand: "BrandB",
    model: "ModelB",
  },
];

// Test initial state
test("should return the initial state", () => {
  const initialState: ProductState = {
    products: [],
    brands: [],
    models: [],
    filters: {
      sortBy: "",
      brands: [],
      models: [],
      search: "",
    },
    status: "idle",
    error: null,
  };
  expect(productReducer(undefined, { type: "unknown" })).toEqual(initialState);
});

// Test setFilter action
test("should handle setFilter action", () => {
  const previousState: ProductState = {
    products: [],
    brands: [],
    models: [],
    filters: {
      sortBy: "",
      brands: [],
      models: [],
      search: "",
    },
    status: "idle",
    error: null,
  };

  const updatedState = productReducer(
    previousState,
    setFilter({ filterType: "sortBy", value: "Price low to high" })
  );

  expect(updatedState.filters.sortBy).toEqual("Price low to high");
});

// Test fetchProducts thunk success scenario
test("should handle fetchProducts fulfilled", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockFetchResponse),
    })
  ) as jest.Mock;

  const store = configureStore({ reducer: { products: productReducer } });
  await store.dispatch(fetchProducts() as unknown as AnyAction);

  const state = store.getState().products;
  //console.log("State after fetchProducts:", state); // Debugging purpose

  expect(state.status).toBe("succeeded");
  expect(state.products).toEqual(mockFetchResponse);
  expect(state.brands).toEqual(["BrandA", "BrandB"]);
  expect(state.models).toEqual(["ModelA", "ModelB"]);
});

// Test fetchProducts thunk failure scenario
test("should handle fetchProducts rejected", async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error("Failed to fetch products"))
  );

  const store = configureStore({ reducer: { products: productReducer } });
  await store.dispatch(fetchProducts() as unknown as AnyAction);

  const state = store.getState().products;
  expect(state.status).toBe("failed");
  expect(state.error).toBe("Failed to fetch products");
});
