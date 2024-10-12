import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store/store";

// `useRouter`'ı mockla
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders E-Commerce title", () => {
    render(
      <Provider store={store}>
        <Header showCartIcon={true} />
      </Provider>
    );
    expect(screen.getByText(/Eteration/i)).toBeInTheDocument();
  });

  test("renders user info", () => {
    render(
      <Provider store={store}>
        <Header showCartIcon={true} />
      </Provider>
    );
    expect(screen.getByText(/Bartu/i)).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(
      <Provider store={store}>
        <Header showCartIcon={true} />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText(/Search products.../i)
    ).toBeInTheDocument();
  });
});
