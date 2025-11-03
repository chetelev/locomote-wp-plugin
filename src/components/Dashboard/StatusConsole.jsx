import React from 'react';


const StatusConsole = ({ statusLines = [] }) => (
    <section>
        <h3 className="mb-2">Status</h3>
        <div className="border rounded p-2 max-h-56 overflow-y-auto bg-gray-50">
            {statusLines.length === 0 ? (
                <div className="text-gray-600">No status yet.</div>
            ) : (
                <ul className="pl-4">
                    {statusLines.map((line, idx) => (
                        <li key={idx}>{line}</li>
                    ))}
                </ul>
            )}
        </div>
    </section>
);


export default StatusConsole;