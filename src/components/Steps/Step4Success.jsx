import React from "react";

export default function Step4Success() {
  const handleGoToTasks = () => {
    window.location.href = `${window.location.origin}/wp-admin/admin.php?page=dro-wp-plugin-tasks`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-100 mb-6">
        <span className="text-4xl font-bold text-emerald-600">✓</span>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Schedule Started Successfully!
      </h3>

      <p className="text-gray-500 max-w-md mb-8">
        Your content schedule has been activated and the first posts will begin
        publishing automatically.
      </p>

      <button
        onClick={handleGoToTasks}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 active:scale-95 transition"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        Go to Tasks
      </button>
    </div>
  );
}
