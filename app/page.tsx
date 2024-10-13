"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiFilter, FiShoppingCart, FiX } from "react-icons/fi";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Home() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  // Redux'tan cart item count alınıyor
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleFilters = () => setFiltersOpen(!isFiltersOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow"></div>

      {/* Mobil için ikonlar (Sticky + Header'dan sonra hizalanır) */}
      <div className="sticky top-[70px] z-40 flex lg:hidden justify-between px-4 py-2 bg-white shadow w-full">
        <button
          className="bg-blue-500 text-white p-2 rounded-full"
          onClick={toggleFilters}
        >
          <FiFilter size={24} />
        </button>
        <div className="relative">
          <button
            className="bg-blue-500 text-white p-2 rounded-full"
            onClick={toggleCart}
          >
            <FiShoppingCart size={24} />
          </button>
          {/* Sepetteki toplam ürün sayısını gösteren kırmızı yuvarlak */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
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
      <AnimatePresence>
        {isFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="bg-white h-full w-3/4 sm:w-2/3 p-6 rounded-r-lg shadow-lg relative">
                <button
                  className="text-red-500 absolute top-[0.25rem] right-[0.5rem]"
                  onClick={toggleFilters}
                >
                  <FiX size={24} />
                </button>
                <Filters />
              </div>
            </motion.div>
            <style jsx global>{`
              body {
                overflow: hidden;
              }
            `}</style>
          </>
        )}
      </AnimatePresence>

      {/* Sepet Kayan Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="bg-white h-full w-3/4 sm:w-2/3 p-6 rounded-l-lg shadow-lg relative">
                <button
                  className="text-red-500 absolute top-[0.25rem] right-4"
                  onClick={toggleCart}
                >
                  <FiX size={24} />
                </button>
                <Cart isModalOpen={true} />
              </div>
            </motion.div>
            <style jsx global>{`
              body {
                overflow: hidden;
              }
            `}</style>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
