import React, { useState, useEffect } from 'react';
import taskService from '../../services/taskService';
import useConnection from '../../hooks/useConnection';
import useStatusLog from '../../hooks/useStatusLog';
import TasksTable from '../../components/Tasks/TasksTable';
import TasksHeader from '../../components/Tasks/TasksHeader';

export default function Tasks() {
  const { addStatus } = useStatusLog();
  const { connectData, checkStatus } = useConnection({ addStatus });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (connectData?.username && connectData?.webUrl) {
      loadTasks();
    }
  }, [connectData]);

  useEffect(() => {
    const init = async () => {
      await checkStatus();
    };
    init();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);

    try {

      const response = await taskService.getTasks(connectData);

      if (response.ok && response.data) {
        const tasksArray = Array.isArray(response.data)
          ? response.data
          : response.data.tasks || [];

        setTasks(tasksArray);
      } else {
        setError('Failed to load tasks');
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (taskId, userId) => {
    try {
      const response = await taskService.cancelTask(
        taskId,
        userId,                   
        connectData?.username,    
        connectData?.webUrl       
      );

      if (response.ok) {
        loadTasks(); 
      } else {
        addStatus(response.message || 'Failed to cancel task');
      }
    } catch (error) {
      console.error('Error canceling task:', error);
      addStatus('Error canceling task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">
      <TasksHeader />

      <div className="mx-auto max-w-[1500px] px-5 py-8">
        <TasksTable
          tasks={tasks}
          loading={loading}
          error={error}
          onCancel={handleCancel}
          onRefresh={loadTasks}
        />
      </div>
    </div>
  );
}
