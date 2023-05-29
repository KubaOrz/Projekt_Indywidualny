import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

function AuthProvider({children}) {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: null,
        userDetails: null,
    }, []);

    async function logout() {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('userDetails');
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
            userDetails: null
        });
    };

    async function updateAuthState(newAuthState) {
        let accessToken;
        let refreshToken;

        if (newAuthState.token !== null) {
            accessToken = newAuthState.token;
            await SecureStore.setItemAsync('token', accessToken);
        } else {
            accessToken = authState.accessToken;
        }

        if (newAuthState.refreshToken !== null) {
            refreshToken = newAuthState.refreshToken;
            await SecureStore.setItemAsync('refreshToken', refreshToken);
        } else {
            refreshToken = authState.refreshToken;
        }

        const userDetails = {
            name: newAuthState.name,
            surname: newAuthState.surname,
            email: newAuthState.email,
            phoneNumber: newAuthState.phoneNumber
        }

        setAuthState(() => ({
            accessToken: accessToken,
            refreshToken: refreshToken,
            authenticated: newAuthState.role,
            userDetails: userDetails
          }));
    }

    function getAccessToken() {
        return authState.accessToken;
    };

    function getUserDetails() {
        return authState.userDetails;
    };

    function getRefreshToken() {
        return authState.refreshToken;
    }

    return (
        <Provider value={{
            authState,
            getAccessToken,
            setAuthState,
            getUserDetails,
            getRefreshToken,
            updateAuthState,
            logout
        }}>
            {children}
        </Provider>
    )
}

export {AuthContext, AuthProvider}