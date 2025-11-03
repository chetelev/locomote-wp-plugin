import { useCallback, useMemo, useState } from 'react';
const updateDateAt = useCallback((index, value) => {
    setTaskData((prev) => {
        const next = [...(prev.scheduledDates || [])];
        next[index] = value;
        return { ...prev, scheduledDates: next };
    });
}, []);


const addDateRow = useCallback(() => {
    setTaskData((prev) => ({ ...prev, scheduledDates: [...(prev.scheduledDates || []).filter(d => d !== undefined), ''] }));
}, []);


const removeDateRow = useCallback((index) => {
    setTaskData((prev) => ({ ...prev, scheduledDates: (prev.scheduledDates || []).filter((_, i) => i !== index) }));
}, []);


const canStart = useMemo(() => {
    const hasBasics = !!(taskData.theme && taskData.keywords);
    if (taskData.scheduleType === 'dates') {
        const dates = (taskData.scheduledDates || []).filter(Boolean);
        return hasBasics && dates.length > 0;
    }
    return hasBasics && Boolean(taskData.frequency);
}, [taskData]);


const startTask = useCallback(async () => {
    if (!canStart || isStarting) return;
    setIsStarting(true);
    addStatus('Starting generation task...');


    try {
        const payload = {
            keywords: taskData.keywords,
            publishStatus: taskData.publishStatus,
        };

        const res = await taskService.startTask(payload);
        if (!res?.ok) throw new Error(res?.message || 'Failed to start task');


        addStatus('Task started successfully.');
    } catch (err) {
        addStatus(`Start error: ${err.message}`);
    } finally {
        setIsStarting(false);
    }
}, [addStatus, canStart, isStarting, taskData]);


return {
    taskData,
    updateTask,
    updateDateAt,
    addDateRow,
    removeDateRow,
    canStart,
    isStarting,
    startTask,
};


export default useTaskForm;