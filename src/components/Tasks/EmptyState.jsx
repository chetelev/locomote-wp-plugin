import React from 'react';

export default function EmptyState({ message }) {
    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#6b7280' }}>{message}</p>
        </div>
    );
}

