import React from "react";
import Step4Card from "./Step4Card";

export default function Step4List({ posts, onFieldChange, validationErrors }) {
  if (!posts.length)
    return (
      <div className="text-center py-8 text-gray-400">
        No preview posts available.
      </div>
    );

  return (
    <div className="flex flex-col gap-4 max-h-[480px] pb-30px overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">
      {posts.map((post, index) => (
        <Step4Card
          key={post.id}
          post={post}
          index={index + 1}
          onFieldChange={onFieldChange}
          validationErrors={validationErrors}
        />
      ))}
    </div>
  );
}
