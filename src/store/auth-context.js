import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
});

export const AuthContextProvider = ({ children }) => {
    const initialState = localStorage.getItem("token");
    const [token, setToken] = useState(initialState);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const userIsLoggedIn = !!token;
    
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};

export default AuthContext;