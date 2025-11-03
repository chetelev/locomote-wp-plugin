import { useCallback, useState } from 'react';


const useStatusLog = (initial = []) => {
    const [statusLines, setStatusLines] = useState(initial);


    const addStatus = useCallback((line) => {
        setStatusLines((prev) => [
            ...prev,
            `${new Date().toLocaleTimeString()} — ${line}`,
        ]);
    }, []);


    const clearStatus = useCallback(() => setStatusLines([]), []);


    return { statusLines, addStatus, clearStatus };
};


export default useStatusLog;