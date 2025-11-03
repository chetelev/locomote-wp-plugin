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
        <div className="lc-step-content">
            {isConnected ? (
                <>
                    <div className="icon-circle">✓</div>
                    <h3>Connected Successfully</h3>
                    <p className="description">
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
                    <div className="icon-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '40px', height: '40px', color: '#2563eb' }}>
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <h3>Quick connect</h3>
                    <p className="description">
                        Establish a secure connection between your WordPress site and our content generation service to get started.
                    </p>
                    <button 
                        onClick={handleConnect} 
                        disabled={isConnecting} 
                        className="lc-connect-btn"
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