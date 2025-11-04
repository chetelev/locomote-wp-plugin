import React, { useEffect, useState } from "react";

export default function Tones({ onFieldChange, selectedTone }) {
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTones = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/preferences/get/tones");
        if (!res.ok) throw new Error("Failed to load tones");
        const data = await res.json();
        setTones(data);
      } catch (err) {
        console.error("Error fetching tones:", err);
        setError("Failed to load tones. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTones();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <p className="text-gray-500">Loading tones...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full mt-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Choose Your Writing Tone
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {tones.map((tone) => (
          <div
            key={tone.id}
            onClick={() =>
              onFieldChange({ target: { name: "toneId", value: tone.id } })
            }
            className={`flex flex-col items-center cursor-pointer transition-all duration-200 rounded-2xl p-3 border ${
              selectedTone === tone.id
                ? "border-blue-500 ring-4 ring-blue-200 bg-blue-50 scale-105"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border border-gray-200 shadow-sm">
              <img
                src={tone.imageUrl}
                alt={tone.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`text-sm font-medium ${
                selectedTone === tone.id ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {tone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
