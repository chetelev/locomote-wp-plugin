import React from 'react';
import TaskStatusBadge from './TaskStatusBadge';
import CancelButton from './CancelButton';
import { formatDate } from '../../utils/dateUtils';

export default function TaskRow({ task, onCancel }) {
    const taskId = task.id || task.task_id;
    const topics = task.topics || task.keywords || 'N/A';
    const days = task.days?.length > 0 ? task.days.join(', ') : 'N/A';
    const created = formatDate(task.created_at || task.created);
    const nextRun = formatDate(task.next_run || task.nextRun);
    
    const canCancel = task.status?.toLowerCase() !== 'canceled' && 
                      task.status?.toLowerCase() !== 'completed';

    return (
        <tr>
            <td>#{taskId}</td>
            <td>{topics}</td>
            <td>{days}</td>
            <td><TaskStatusBadge status={task.status} /></td>
            <td>{created}</td>
            <td>{nextRun}</td>
            <td>
                {canCancel && (
                    <CancelButton 
                        taskId={taskId} 
                        onCancel={onCancel} 
                    />
                )}
            </td>
        </tr>
    );
}

