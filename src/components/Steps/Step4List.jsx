import React from "react";
import Step4Card from "./Step4Card";

export default function Step4List({ posts, onFieldChange }) {
  if (!posts.length)
    return (
      <div className="text-center py-8 text-gray-400">
        No preview posts available.
      </div>
    );

  return (
    <div className="flex flex-col gap-1">
      {posts.map((post) => (
        <Step4Card key={post.id} post={post} onFieldChange={onFieldChange} />
      ))}
      <div className="bg-red-500 text-white p-4">Tailwind Test</div>
    </div>
  );
}
