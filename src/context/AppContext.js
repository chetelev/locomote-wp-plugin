
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({});

    const updateState = (key, value) => {
        setState((prevState) => ({ ...prevState, [key]: value }));
    };

    return (
        <AppContext.Provider value={{ state, updateState }}>
            {children}
        </AppContext.Provider>
    );
};
