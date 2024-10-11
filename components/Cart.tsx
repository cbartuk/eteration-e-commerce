"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  increment,
  decrement,
  removeItem,
  setItems,
} from "@/features/cart/cartSlice";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

const Cart = ({ isModalOpen = false }: { isModalOpen?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const parsedItems = JSON.parse(storedCartItems);
      if (Array.isArray(parsedItems) && parsedItems.length > 0) {
        dispatch(setItems(parsedItems));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  return (
    <aside className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-center border-b pb-2 ${
                isModalOpen ? "text-lg" : "text-xs lg:text-sm xl:text-md"
              }`}
            >
              <div className="flex-1">
                <h3 className="font-bold">
                  <span
                    className={`block ${
                      isSmallScreen && !isModalOpen
                        ? "truncate max-w-[100px] lg:max-w-[150px]"
                        : "max-w-full"
                    }`}
                    title={item.name}
                  >
                    {isSmallScreen && !isModalOpen && item.name.length > 7
                      ? `${item.name.substring(0, 7)}...`
                      : item.name}
                  </span>
                  <span className="text-gray-500">{item.model}</span>
                </h3>
                <p
                  className={`text-gray-700 ${
                    isModalOpen
                      ? "text-base"
                      : "text-xs lg:text-sm xl:text-base"
                  }`}
                >
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <button
                  onClick={() => dispatch(decrement(item.id))}
                  className={`bg-gray-300 hover:bg-gray-400 p-1 ${
                    isSmallScreen ? "p-1" : "lg:p-2 xl:p-3"
                  } rounded-full`}
                >
                  <FiMinus size={isSmallScreen ? 14 : 16} />
                </button>
                <span
                  className={`bg-blue-500 text-white px-2 lg:px-3 xl:px-4 py-1 rounded`}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increment(item.id))}
                  className={`bg-gray-300 hover:bg-gray-400 p-1 ${
                    isSmallScreen ? "p-1" : "lg:p-2 xl:p-3"
                  } rounded-full`}
                >
                  <FiPlus size={isSmallScreen ? 14 : 16} />
                </button>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className={`text-red-500 hover:text-red-700 p-1 ${
                    isSmallScreen ? "p-1" : "lg:p-2 xl:p-3"
                  } rounded-full`}
                >
                  <FiTrash2 size={isSmallScreen ? 14 : 16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">Your cart is empty.</p>
        )}
      </div>

      <div className="mt-4 lg:mt-6">
        <p className="text-lg lg:text-xl xl:text-2xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <button className="mt-2 lg:mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
          Checkout
        </button>
      </div>
    </aside>
  );
};

export default Cart;
