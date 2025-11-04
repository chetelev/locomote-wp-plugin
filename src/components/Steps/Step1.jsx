import React from 'react';
import Connect from '../../assets/icons/connect.svg'

const Step1 = ({ 
    addStatus, 
    connectData, 
    isConnected, 
    isConnecting, 
    handleConnect, 
    updateConnect 
}) => {


    return (
        <div className="w-full flex flex-col">
            {isConnected ? (
                <>
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">✓</div>
                    <h3 className="mb-3 text-center text-xl font-semibold text-gray-900">Connected Successfully</h3>
                    <p className="mx-auto mb-8 max-w-[450px] text-center text-sm leading-6 text-gray-500">
                        {(connectData.wp_username || connectData.wp_email) && (
                            <>
                                Connected as {connectData.wp_username || connectData.wp_email}
                                {connectData.wp_email && connectData.wp_username && (
                                    <> ({connectData.wp_email})</>
                                )}
                            </>
                        )}
                    </p>
                </>
            ) : (
                <>
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-blue-600">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <h3 className="mb-3 text-center text-xl font-semibold text-gray-900">Quick connect</h3>
                    <p className="mx-auto mb-8 max-w-[450px] text-center text-sm leading-6 text-gray-500">
                        Establish a secure connection between your WordPress site and our content generation service to get started.
                    </p>
                    <button 
                        onClick={handleConnect} 
                        disabled={isConnecting} 
                        className="mx-auto flex w-auto justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 active:scale-95 disabled:opacity-60"
                    >
                        <Connect width={17} height={17}/>
                        {isConnecting ? 'Connecting...' : 'Connect Now'}
                    </button>
                </>
            )}
        </div>
    );
};


export default Step1;