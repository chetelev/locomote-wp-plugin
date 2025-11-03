export const buildTaskPayload = ({ connectData, taskData }) => {
    const payload = {
        wp_url: connectData.wp_url,
        wp_username: connectData.wp_username,
        keywords: taskData.keywords,
        theme: taskData.theme,
        publishStatus: taskData.publishStatus,
        scheduleType: taskData.scheduleType,
    };


    if (taskData.scheduleType === 'dates') payload.scheduledDates = (taskData.scheduledDates || []).filter(Boolean);
    else payload.frequency = taskData.frequency;


    return payload;
};