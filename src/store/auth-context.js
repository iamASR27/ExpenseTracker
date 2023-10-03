import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    profileLink: false,
    setProfileLink: () => {},
    login: (token) => {},
    logout: () => {},
    getProfileData: async () => {},
});

export const AuthContextProvider = ({ children }) => {
    const initialState = localStorage.getItem("token");
    const [token, setToken] = useState(initialState);

    const [profileLink, setProfileLink] = useState(false);

    const profileLinkHandler = () => {
        setProfileLink(true);
    }


    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const userIsLoggedIn = !!token;

    const getUserProfileData = async () => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q", {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                }),
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            if(response.ok) {
                const data = await response.json();
                // console.log(data);
                return data;
            }
        }catch (error) {
            console.error("Error getting profile data:", error.message);
        }
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        profileLink: profileLink,
        setProfileLink: profileLinkHandler,
        login: loginHandler,
        logout: logoutHandler,
        getProfileData: getUserProfileData,
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};

export default AuthContext;