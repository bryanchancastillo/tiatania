import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);

    async function populateCurrentUser() {
        const response = await fetch('API/Authentications/AuthenticatedUser');
        const data = await response.json();
        setCurrentUser(data);
    }

    useEffect(() => {
        populateCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={currentUser} >
            {children}
        </AuthContext.Provider>
    );
}
