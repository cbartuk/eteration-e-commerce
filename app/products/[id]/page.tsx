"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "@/features/cart/cartSlice";
import { Product } from "@/features/product/productSlice";
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://5fc9346b2af77700165ae514.mockapi.io/products/${params.id}`
      );
      const data = await response.json();
      setProduct({ ...data, price: Number(data.price) });
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FiArrowLeft className="mr-2" size={24} />
          Back to Products
        </button>
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto max-h-96 object-contain rounded-md shadow-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                {product.name}{" "}
                <span className="text-gray-500 text-xl lg:text-2xl">
                  {product.model}
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-blue-500 font-semibold mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-700 text-sm lg:text-base mb-4">
                {product.description}
              </p>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    id: product.id,
                    name: product.name,
                    model: product.model,
                    price: product.price,
                    quantity: 1,
                  })
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4 w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
