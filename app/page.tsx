"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiShoppingCart } from "react-icons/fi";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

export default function Home() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleFilters = () => setFiltersOpen(!isFiltersOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Mobil için ikon butonlar */}
      <div className="sticky top-0 z-50 flex lg:hidden justify-between px-4 py-2 bg-white shadow w-full">
        <button
          className="bg-blue-500 text-white p-2 rounded-full"
          onClick={toggleFilters}
        >
          <FiFilter size={24} />
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-full"
          onClick={toggleCart}
        >
          <FiShoppingCart size={24} />
        </button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Filtreler */}
        <aside
          className={`hidden lg:block lg:w-1/5 xl:w-1/6 p-4 bg-gray-100 rounded-lg shadow-md`}
        >
          <Filters />
        </aside>

        {/* Ürün Listesi */}
        <main className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <ProductList />
        </main>

        {/* Sepet */}
        <aside
          className={`hidden lg:block lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md`}
        >
          <Cart />
        </aside>
      </div>

      {/* Filtreler Kayan Modal */}
      {isFiltersOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-white h-full w-3/4 sm:w-2/3 p-6 rounded-r-lg shadow-lg">
            <button
              className="text-red-500 float-right"
              onClick={toggleFilters}
            >
              Close
            </button>
            <Filters />
          </div>
        </motion.div>
      )}

      {/* Sepet Kayan Modal */}
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-white h-full w-3/4 sm:w-2/3 p-6 rounded-l-lg shadow-lg">
            <button className="text-red-500 float-right" onClick={toggleCart}>
              Close
            </button>
            <Cart isModalOpen={true} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
