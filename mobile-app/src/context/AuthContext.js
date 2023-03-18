import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

function AuthProvider({children}) {
    const [authState, setAuthState] = useState({
        accessToken: null,
        authenticated: null
    }, []);

    async function logout() {
        // await Keychain.resetGenericPassword();
        SecureStore.deleteItemAsync('token');
        setAuthState({
            accessToken: null,
            authenticated: false,
        });
    };

    function getAccessToken() {
        return authState.accessToken;
    };

    return (
        <Provider value={{
            authState,
            getAccessToken,
            setAuthState,
            logout
        }}>
            {children}
        </Provider>
    )
}

export {AuthContext, AuthProvider}