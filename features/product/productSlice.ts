import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store"; // Eğer bu dosya içinde RootState kullanıyorsanız, import edin.

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand: string;
  model: string;
};

type Filters = {
  sortBy: string;
  brands: string[];
  models: string[];
  search: string;
};

type ProductState = {
  products: Product[];
  brands: string[];
  models: string[];
  filters: Filters;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

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

// Ürünleri API'den çeken async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://5fc9346b2af77700165ae514.mockapi.io/products"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    const brands: string[] = Array.from(
      new Set(data.map((product: Product) => product.brand))
    );
    const models: string[] = Array.from(
      new Set(data.map((product: Product) => product.model))
    );

    return { products: data, brands, models };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        filterType: keyof Filters;
        value: string | string[];
      }>
    ) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value as never;
    },
    clearFilters: (state) => {
      state.filters = {
        sortBy: "",
        brands: [],
        models: [],
        search: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.brands = action.payload.brands;
        state.models = action.payload.models;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { setFilter, clearFilters } = productSlice.actions;

// Ürünleri filtreleyen selector
export const selectFilteredProducts = (state: RootState) => {
  const { products, filters } = state.products;
  const { search, brands, models, sortBy } = filters;

  return products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      brands.length > 0 ? brands.includes(product.brand) : true
    )
    .filter((product) =>
      models.length > 0 ? models.includes(product.model) : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "Old to new":
          return a.id.localeCompare(b.id);
        case "New to old":
          return b.id.localeCompare(a.id);
        case "Price low to high":
          return a.price - b.price;
        case "Price high to low":
          return b.price - a.price;
        default:
          return 0;
      }
    });
};

export default productSlice.reducer;

export type { ProductState };
