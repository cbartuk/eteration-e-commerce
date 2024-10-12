"use client";

import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col items-center space-y-4">
      <div className="bg-gray-300 rounded-md h-48 w-full"></div>
      <div className="bg-gray-300 rounded-md h-6 w-3/4"></div>
      <div className="bg-gray-300 rounded-md h-6 w-1/2"></div>
      <div className="bg-blue-300 rounded-md h-10 w-full"></div>
    </div>
  );
};

export default SkeletonLoader;
