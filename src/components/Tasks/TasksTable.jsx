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

  const statusClasses = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'queued') return 'bg-amber-100 text-amber-800';
    if (s === 'finished') return 'bg-emerald-100 text-emerald-700';
    if (s === 'running') return 'bg-blue-100 text-blue-800';
    if (s === 'canceled') return 'bg-gray-200 text-gray-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      <div className="rounded-xl bg-white shadow transition-shadow hover:shadow-lg overflow-hidden">
        <table className="w-full border-collapse text-[15px] text-gray-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 border-b">Title</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 border-b">Description</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 border-b">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 border-b whitespace-nowrap">Date</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 border-b whitespace-nowrap">Time</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const { datePart, timePart } = task.publishDate
                ? formatDate(task.publishDate)
                : { datePart: "—", timePart: "—" };

              return (
                <tr key={task.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 border-b">{task.title}</td>
                  <td className="px-5 py-4 border-b">{task.description || "—"}</td>
                  <td className="px-5 py-4 border-b">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-medium ${statusClasses(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b whitespace-nowrap">{datePart}</td>
                  <td className="px-5 py-4 border-b whitespace-nowrap">{timePart}</td>
                  <td className="px-5 py-4 border-b">
                    {task.status !== "FINISHED" && task.status !== "CANCELED" && (
                      <button
                        onClick={() => onCancel(task.id, task.userId)}
                        className="inline-flex items-center rounded-full border border-gray-900 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-red-500 hover:border-red-500 hover:text-white transition"
                      >
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
