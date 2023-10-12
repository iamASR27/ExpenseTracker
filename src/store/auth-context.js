import React, { useState } from 'react';
// import { authActions } from './auth';
import { useSelector } from 'react-redux';

const AuthContext = React.createContext({
    profileLink: false,
    setProfileLink: () => {},
    getProfileData: async () => {},
});

export const AuthContextProvider = ({ children }) => {
    const token = useSelector(state => state.auth.token);

    const [profileLink, setProfileLink] = useState(false);

    const profileLinkHandler = () => {
        setProfileLink(true);
    }

    const getUserProfileData = async () => {
        // console.log("fetching data")
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
                // console.log("data")
                // console.log(data);
                return data;
            }
        }catch (error) {
            console.error("Error getting profile data:", error.message);
        }
    };

    const contextValue = {
        profileLink: profileLink,
        setProfileLink: profileLinkHandler,
        getProfileData: getUserProfileData,
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};

export default AuthContext;