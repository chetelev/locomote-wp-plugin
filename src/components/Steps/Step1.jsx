import React from "react";
import ConnectIcon from "../../assets/icons/connect.svg";

const Step1 = ({ isConnected, isConnecting, handleConnect, connectData }) => {
    const userLabel =
        connectData.username || connectData.email
            ? `${connectData.username || connectData.email}${connectData.username && connectData.email
                ? ` (${connectData.email})`
                : ""
            }`
            : "";

    return (
        <div className="flex flex-col items-center text-center py-25">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                {isConnected ? (
                    <span className="text-3xl text-blue-600">✓</span>
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="w-10 h-10 text-blue-600"
                    >
                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                )}
            </div>

            <h3 className="m-0! pb-2 text-xl font-semibold text-gray-900">
                {isConnected ? "Connected Successfully" : "Quick Connect"}
            </h3>

            <p className="m-0! pb-4 max-w-sm text-sm text-gray-500 leading-6">
                {isConnected
                    ? `Connected as ${userLabel}`
                    : "Establish a secure connection between your WordPress site and our content publishing system."}
            </p>

            {!isConnected && (
                <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="flex mt-10 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 active:scale-95 disabled:opacity-60"
                >
                    <ConnectIcon width={17} height={17} />
                    {isConnecting ? "Connecting..." : "Connect Now"}
                </button>
            )}
        </div>
    );
};

export default Step1;
