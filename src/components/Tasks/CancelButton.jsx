import React from 'react';

export default function CancelButton({ taskId, onCancel }) {
    const handleClick = () => {
        if (window.confirm('Are you sure you want to cancel this task?')) {
            onCancel(taskId);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="cancel-btn"
            style={{
                padding: '6px 12px',
                fontSize: '13px',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600'
            }}
        >
            Cancel
        </button>
    );
}

