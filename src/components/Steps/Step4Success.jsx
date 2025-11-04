import React from "react";

export default function Step4Success() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-100 mb-6">
        <span className="text-4xl font-bold text-emerald-600">✓</span>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Schedule Started Successfully!
      </h3>

      <p className="text-gray-500 max-w-md">
        Your content schedule has been activated and the first posts will begin
        publishing automatically.
      </p>
    </div>
  );
}
