"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setFilter } from "@/features/product/productSlice";
import { FiSearch } from "react-icons/fi";

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state: RootState) => state.products.brands);
  const models = useSelector((state: RootState) => state.products.models);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [modelSearch, setModelSearch] = useState<string>("");

  // Sort By seçimini yönetme
  const handleSortChange = (value: string) => {
    if (selectedSort === value) {
      setSelectedSort(null); // Seçimi kaldır
      dispatch(setFilter({ filterType: "sortBy", value: "" }));
    } else {
      setSelectedSort(value);
      dispatch(setFilter({ filterType: "sortBy", value }));
    }
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
    dispatch(setFilter({ filterType: "brands", value: updatedBrands }));
  };

  const handleModelChange = (model: string) => {
    const updatedModels = selectedModels.includes(model)
      ? selectedModels.filter((m) => m !== model)
      : [...selectedModels, model];
    setSelectedModels(updatedModels);
    dispatch(setFilter({ filterType: "models", value: updatedModels }));
  };

  return (
    <div className="space-y-8 mt-2">
      {" "}
      {/* Filtreler arasındaki boşluk artırıldı */}
      {/* Sort By Filter */}
      <div className="relative">
        <h3 className="text-xs text-gray-500 absolute -top-4 left-2">
          Sort By
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-xl h-36 lg:h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {[
            "Old to new",
            "New to old",
            "Price high to low",
            "Price low to high",
          ].map((sortOption) => (
            <label
              key={sortOption}
              className="flex items-center mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name="sort"
                value={sortOption}
                checked={selectedSort === sortOption}
                onChange={() => handleSortChange(sortOption)}
                className="mr-2 w-4 h-4 border-2 border-blue-500 rounded-full appearance-none checked:bg-blue-500 checked:border-transparent focus:outline-none"
              />
              <span className="text-gray-700 text-sm xl:text-base">{sortOption}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Brand Filter */}
      <div className="relative">
        <h3 className="text-xs text-gray-500 absolute -top-4 left-2">Brand</h3>
        <div className="bg-white p-4 rounded-lg shadow-xl h-40 lg:h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          <div className="relative mb-2">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
            />
          </div>
          {brands
            .filter((brand) =>
              brand.toLowerCase().includes(brandSearch.toLowerCase())
            )
            .map((brand) => (
              <label
                key={brand}
                className="flex items-center mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2 w-4 h-4 border-2 border-blue-500 rounded appearance-none checked:bg-blue-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 text-sm xl:text-base">{brand}</span>
              </label>
            ))}
        </div>
      </div>
      {/* Model Filter */}
      <div className="relative">
        <h3 className="text-xs text-gray-500 absolute -top-4 left-2">Model</h3>
        <div className="bg-white p-4 rounded-lg shadow-xl h-40 lg:h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          <div className="relative mb-2">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search models..."
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
            />
          </div>
          {models
            .filter((model) =>
              model.toLowerCase().includes(modelSearch.toLowerCase())
            )
            .map((model) => (
              <label
                key={model}
                className="flex items-center mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={model}
                  checked={selectedModels.includes(model)}
                  onChange={() => handleModelChange(model)}
                  className="mr-2 w-4 h-4 border-2 border-blue-500 rounded appearance-none checked:bg-blue-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 text-sm xl:text-base">{model}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
