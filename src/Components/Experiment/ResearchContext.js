import React, { createContext, useState } from 'react';

export const ResearchContext = createContext();

export const ResearchProvider = ({ children }) => {
    const [research, setResearch] = useState('');

    const setResearchData = (research) => {
        setResearch(research);
    }
    return (
        <ResearchContext.Provider value={{ setResearchData, research }}>
            {children}
        </ResearchContext.Provider>
    );
};
