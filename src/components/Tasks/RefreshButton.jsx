import React from 'react';

export default function RefreshButton({ onRefresh }) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
                onClick={onRefresh}
                className="lc-next-btn"
            >
                Refresh
            </button>
        </div>
    );
}

