"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
} from "@/features/product/productSlice";
import { addItem } from "@/features/cart/cartSlice";
import { RootState, AppDispatch } from "@/store/store";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 12;

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const products = useSelector(selectFilteredProducts);
  const { status, error } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState(
    products.slice(0, ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-8 mb-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 flex-1">
              <p className="text-lg font-bold text-blue-600 mb-2">
                ${product.price}
              </p>
              <h3 className="text-md font-semibold mb-4">
                {product.name}{" "}
                <span className="text-gray-500">{product.model}</span>
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  addItem({
                    id: product.id,
                    name: product.name,
                    model: product.model,
                    price: Number(product.price),
                    quantity: 1,
                  })
                );
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 w-full rounded-b-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center mt-6 space-x-2"
          pageClassName="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          nextClassName="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          disabledClassName="opacity-50"
          previousLabel="<"
          nextLabel=">"
        />
      )}
    </div>
  );
}
