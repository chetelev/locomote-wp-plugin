import React from 'react';

export default function RefreshButton({ onRefresh }) {
    return (
        <div className="mt-5 text-center">
            <button 
                onClick={onRefresh}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-800 active:scale-95"
            >
                Refresh
            </button>
        </div>
    );
}

