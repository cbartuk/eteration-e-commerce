"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { FiShoppingCart, FiUser, FiBriefcase, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { clearFilters, setFilter } from "@/features/product/productSlice";
import Cart from "@/components/Cart";

const Header = ({ showCartIcon = false }: { showCartIcon?: boolean }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [totalItems, setTotalItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Sepet verilerini localStorage'dan yükle
  useEffect(() => {
    const storedTotalItems = localStorage.getItem("totalItems");
    if (storedTotalItems) {
      setTotalItems(Number(storedTotalItems));
    }
  }, []);

  // Sepet öğeleri değiştiğinde totalItems'ı güncelle ve localStorage'a yaz.
  useEffect(() => {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalItems(totalQuantity);
    localStorage.setItem("totalItems", totalQuantity.toString());
  }, [cartItems]);

  // Sepet sayısının değiştiğinde animasyon başlat.
  useEffect(() => {
    if (totalItems > 0) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  // Arama input değiştiğinde filtreyi güncelle
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Searchbar tetiklendiğinde tüm filtreleri temizle
    dispatch(clearFilters());

    // Sadece search filtresini ekle
    dispatch(setFilter({ filterType: "search", value: e.target.value }));
  };

  return (
    <header className="bg-blue-500 text-white p-4 sticky top-0 z-50">
      <div className="container max-w-screen-lg mx-auto flex justify-between items-center gap-4">
        <h1
          onClick={() => router.push("/")}
          className="text-lg lg:text-2xl font-bold cursor-pointer"
        >
          Eteration
        </h1>

        {/* Search input */}
        <div className="relative flex-1 max-w-xs lg:max-w-md xl:max-w-lg mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full p-2 rounded-full pl-10 pr-4 text-black"
          />
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>

        {/* Right side icons and info */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2">
            <FiUser size={20} />
            <span>Bartu</span>
          </div>

          <div className="flex items-center space-x-2">
            <FiBriefcase size={20} />
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {showCartIcon && (
            <div className="relative">
              <button
                onClick={toggleCart}
                className="bg-white text-blue-500 p-2 rounded-full shadow-lg"
              >
                <FiShoppingCart size={24} />
              </button>
              {/* Sepetteki toplam ürün sayısını gösteren kırmızı yuvarlak */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: isBouncing ? 1.3 : 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Sepet Modal */}
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-white w-3/4 sm:w-1/2 lg:w-1/3 p-6 rounded-l-lg">
            <button className="text-red-500 float-right" onClick={toggleCart}>
              Close
            </button>
            <Cart isModalOpen={true} />
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
