import React from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Step4Card({ post, onFieldChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFieldChange(post.id, name, value);
    };

    return (
        <div className="">
            <div className="">
                {/* Title */}
                <input
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    className=""
                    placeholder="Enter post title..."
                />

                {/* Description */}
                <input
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    className=""
                    placeholder="Add a short description..."
                />

                {/* Date Picker */}
                <div className="">
                    <label
                        htmlFor={`date-${post.id}`}
                        className="text-sm font-medium text-gray-600"
                    >
                        Publish Date:
                    </label>
                    <DatePicker
                        selected={dayjs(post.publishDate).toDate()}
                        onChange={(date) =>
                            onFieldChange(post.id, "publishDate", dayjs(date).toISOString())
                        }
                        showTimeSelect
                        dateFormat="MMM d, yyyy h:mm aa"
                        className="text-sm text-gray-800 bg-transparent border-b border-transparent focus:border-blue-500 hover:border-gray-300 outline-none transition-all duration-300 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
