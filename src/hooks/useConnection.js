import { useCallback, useState } from 'react';
import connectionService from '../services/connectionService';

const useConnection = ({ addStatus }) => {
    const [connectData, setConnectData] = useState({
        webUrl: '',
        username: '',
        appPassword: '',
        email: '',
    });

    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const checkStatus = useCallback(async () => {
        addStatus('Checking connection status...');
        try {
            const wpConfig = window.wpPluginReactConfig || {};
            const currentLogin = wpConfig.currentUser?.login || '';
            const siteUrl = wpConfig.siteUrl || '';

            const data = await connectionService.checkStatus({
                username: currentLogin,
                webUrl: siteUrl
            });

            if (!data?.connected) {
                addStatus('No active connection detected.');
                return;
            }

            setIsConnected(true);
            setConnectData({
                webUrl: data.webUrl || siteUrl,
                username: data.username || currentLogin,
                email: data.email || wpConfig.currentUser?.email || '',
            });
            addStatus('Connection active.');
        } catch (err) {
            addStatus('Unable to check connection status (backend offline?).');
        }
    }, [addStatus]);

    const handleConnect = useCallback(async () => {
        if (isConnecting) return;
        setIsConnecting(true);
        addStatus("Requesting WP application password...");

        try {
            const creds = await connectionService.generateAppPassword();
            if (!creds) throw new Error("Failed to generate app password");

            setConnectData({
                webUrl: creds.webUrl,
                username: creds.username,
                appPassword: creds.appPassword,
                email: creds.email,
            });

            addStatus("WP app password generated. Connecting to backend...");

            const response = await connectionService.registerConnection(creds);
            console.log("🧠 Backend response:", response);

            if (!response?.connected && !response?.message?.includes("Connection successful")) {
                throw new Error(response?.message || "Backend refused connection");
            }

            addStatus("Connected successfully.");
            setIsConnected(true);

        } catch (err) {
            console.error("❌ handleConnect error:", err);
            addStatus(`Connect error: ${err.message}`);
        } finally {
            setIsConnecting(false);
        }
    }, [addStatus, isConnecting]);


    return { connectData, isConnected, isConnecting, checkStatus, handleConnect };
};

export default useConnection;
