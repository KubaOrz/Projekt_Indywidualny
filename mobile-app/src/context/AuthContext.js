import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

function AuthProvider({children}) {
    const [authState, setAuthState] = useState({
        accessToken: null,
        authenticated: null,
        userDetails: null
    }, []);

    async function logout() {
        SecureStore.deleteItemAsync('token');
        SecureStore.deleteItemAsync('userDetails');
        setAuthState({
            accessToken: null,
            authenticated: false,
            userDetails: null
        });
    };

    function getAccessToken() {
        return authState.accessToken;
    };

    function getUserDetails() {
        return authState.userDetails;
    }

    return (
        <Provider value={{
            authState,
            getAccessToken,
            setAuthState,
            getUserDetails,
            logout
        }}>
            {children}
        </Provider>
    )
}

export {AuthContext, AuthProvider}