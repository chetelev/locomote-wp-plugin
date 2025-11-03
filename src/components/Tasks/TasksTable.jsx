import React from "react";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import RefreshButton from "./RefreshButton";

export default function TasksTable({ tasks, loading, error, onCancel, onRefresh }) {
  if (loading) return <LoadingState />;
  if (error) return <EmptyState message="Failed to load tasks. Please try again." />;

  if (!tasks || tasks.length === 0) {
    return (
      <>
        <EmptyState message="No scheduled posts found." />
        <RefreshButton onRefresh={onRefresh} />
      </>
    );
  }

  // Helper function for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { datePart, timePart };
  };

  return (
    <>
      <div className="wp-table-container">
        <table className="wp-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const { datePart, timePart } = task.publishDate
                ? formatDate(task.publishDate)
                : { datePart: "—", timePart: "—" };

              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description || "—"}</td>
                  <td>
                    <span
                      className={`status-badge status-${task.status?.toLowerCase()}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>{datePart}</td>
                  <td>{timePart}</td>
                  <td>
                    {task.status !== "FINISHED" && task.status !== "CANCELED" && (
                      <button onClick={() => onCancel(task.id, task.userId)}>
                        Cancel
                      </button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <RefreshButton onRefresh={onRefresh} />
    </>
  );
}
