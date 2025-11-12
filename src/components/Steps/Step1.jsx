import React from "react";
import ConnectIcon from "../../assets/icons/connect.svg";

const Step1 = ({ isConnected, isConnecting, handleConnect, connectData }) => {
  const userLabel =
    connectData.username || connectData.email
      ? `${connectData.username || connectData.email}${
          connectData.username && connectData.email
            ? ` (${connectData.email})`
            : ""
        }`
      : "";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div
        className={`flex flex-col items-center justify-center rounded-xl ${
          isConnected
            ? "bg-green-50 border border-green-200"
            : "bg-linear-to-r from-blue-50 to-indigo-50"
        } py-10 px-6 shadow-inner transition`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          {isConnected ? (
            <span className="text-3xl text-green-600">✓</span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="w-8 h-8 text-blue-600"
            >
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          )}
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mt-4">
          {isConnected ? "Connected Successfully" : "Quick Connect"}
        </h3>

        <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
          {isConnected
            ? `You're connected as ${userLabel}. You're all set to continue.`
            : "Establish a secure connection between your WordPress site and our content publishing system."}
        </p>

        {!isConnected && (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 active:scale-95 disabled:opacity-60 transition"
          >
            <ConnectIcon width={17} height={17} />
            {isConnecting ? "Connecting..." : "Connect Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step1;
