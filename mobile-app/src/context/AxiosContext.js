import React, {createContext, useContext, useRef} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import * as SecureStore from 'expo-secure-store';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const currentToken = useRef(authContext.getAccessToken());

  const authAxios = axios.create({
    baseURL: 'https://7c8d-185-186-16-243.ngrok-free.app',
  });

  const publicAxios = axios.create({
    baseURL: 'https://7c8d-185-186-16-243.ngrok-free.app',
  });

  async function getWithRefresh(url) {

    var data = null;
    var fetchError = null;

        await authAxios.get(url) 
        .then((response) => {
            data = response.data;

        }).catch(async (error) => {
            const [refreshStatus, token] = await refreshToken();
            if (refreshStatus === 'ok') {
                await publicAxios.get(url, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                })
                .then((response) => {
                    data = response.data;

                }).catch((error => {
                    fetchError = error;
                    console.log(error);

                }))
            } else {
                error = refreshStatus;
            }
        });

        return [data, fetchError];
  }

  async function refreshToken() {
    var status = 'loading';
    var newToken = null;
    await publicAxios.post('/auth/refresh', { 
        refreshToken: authContext.getRefreshToken() 

    }).then(async(response) => {
        const { token, refreshToken } = response.data;

        await authContext.setAuthState(state => {
           return {
            ...state,
            accessToken: token,
            refreshToken: refreshToken
        }});

        await SecureStore.setItemAsync('token', JSON.stringify(token));
        await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));
        status = 'ok';
        newToken = token;
        currentToken.current = token;
    }).catch((error) => {
        status = error;
    })

    return [status, newToken];
}

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${currentToken.current}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return (
    <Provider value={{authAxios, publicAxios, getWithRefresh}}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};