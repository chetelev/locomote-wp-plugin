import React from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pencil, AlertCircle } from "lucide-react";

export default function Step4Card({ post, index, onFieldChange, validationErrors = {} }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFieldChange(post.id, name, value);
    };

    const errors = validationErrors[post.id] || [];
    const hasError = errors.length > 0;

    return (
        <div
            className={`flex flex-col gap-5 p-6 bg-white rounded-2xl border transition-all duration-300 ${hasError ? "border-red-300 shadow-sm" : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-blue-600">Post {index}</h3>
                {hasError && (
                    <AlertCircle className="text-red-500 animate-pulse" size={18} />
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-500">Title</label>
                <div className="relative flex items-center">
                    <input
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        placeholder="Enter post title..."
                        className={`w-full text-lg font-semibold bg-transparent pr-8 outline-none transition-all duration-200 border-b
              ${hasError && errors.some((e) => e.includes("Title"))
                                ? "border-red-400 focus:border-red-500"
                                : "border-transparent focus:border-blue-500 hover:border-gray-300"
                            }`}
                    />
                    <Pencil
                        size={16}
                        className="absolute right-1 text-gray-300 hover:text-blue-400 transition-all duration-200"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-500">Description</label>
                <div className="relative flex items-center">
                    <textarea
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Add a short description..."
                        className="w-full text-sm text-gray-700 bg-transparent border-b! border-transparent! focus:!border-blue-400! hover:!border-gray-300! outline-none! transition-all duration-200 pr-8 placeholder:text-gray-400"
                    />

                    <Pencil
                        size={15}
                        className="absolute right-1 top-2 text-gray-300 hover:text-blue-400 transition-all duration-200"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
                <label className="text-sm font-medium text-gray-500">Publish Date</label>
                <DatePicker
                    selected={dayjs(post.publishDate).toDate()}
                    onChange={(date) =>
                        onFieldChange(post.id, "publishDate", dayjs(date).toISOString())
                    }
                    showTimeSelect
                    dateFormat="MMM d, yyyy h:mm aa"
                    className={`text-sm text-gray-800 bg-transparent border-b outline-none px-1 transition-all duration-200 cursor-pointer
            ${hasError && errors.some((e) => e.includes("Date"))
                            ? "border-red-400 focus:border-red-500"
                            : "border-transparent focus:border-blue-500 hover:border-gray-300"
                        }`}
                />
            </div>

            {hasError && (
                <ul className="text-xs text-red-500 mt-1 space-y-1 animate-fadeIn">
                    {errors.map((err, i) => (
                        <li key={i} className="flex items-center gap-1">
                            <AlertCircle size={12} /> {err}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
