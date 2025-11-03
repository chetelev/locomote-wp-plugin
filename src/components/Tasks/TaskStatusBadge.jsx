import React from 'react';

export default function TaskStatusBadge({ status }) {
    const statusConfig = {
        'scheduled': { bg: '#2563eb', color: 'white', label: 'Scheduled' },
        'running': { bg: '#f59e0b', color: 'white', label: 'Running' },
        'completed': { bg: '#059669', color: 'white', label: 'Completed' },
        'canceled': { bg: '#dc2626', color: 'white', label: 'Canceled' },
        'failed': { bg: '#dc2626', color: 'white', label: 'Failed' }
    };

    const config = statusConfig[status?.toLowerCase()] || { 
        bg: '#6b7280', 
        color: 'white', 
        label: status || 'unknown' 
    };

    return (
        <span className="status-badge" style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            background: config.bg,
            color: config.color
        }}>
            {config.label}
        </span>
    );
}

