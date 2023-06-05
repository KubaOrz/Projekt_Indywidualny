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
    baseURL: 'http://10.0.2.2:8080',
  });

  const publicAxios = axios.create({
    baseURL: 'http://10.0.2.2:8080',
  });

  async function getWithRefresh(url) {

    var data = null;
    var fetchError = null;

        await authAxios.get(url) 
        .then((response) => {
            data = response.data;
        }).catch(async (error) => {
            const [refreshStatus] = await refreshToken();
            if (refreshStatus === 'ok') {
                await authAxios.get(url)
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

  async function postWithRefresh(url, request) {

    var data = null;
    var fetchError = null;

        await authAxios.post(url, request) 
        .then((response) => {
            data = response.data;
        }).catch(async (error) => {
            const [refreshStatus] = await refreshToken();
            if (refreshStatus === 'ok') {
                await authAxios.post(url, request)
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

  async function putWithRefresh(url, request) {

    var data = null;
    var fetchError = null;

        await authAxios.put(url, request) 
        .then((response) => {
            data = response.data;
        }).catch(async (error) => {
            const [refreshStatus] = await refreshToken();
            if (refreshStatus === 'ok') {
                await authAxios.put(url, request)
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
    await publicAxios.post('/auth/refresh', { 
        refreshToken: authContext.getRefreshToken() 

    }).then(async(response) => {
        const { token, refreshToken } = response.data;

        currentToken.current = token;
        await authContext.setAuthState(state => {
           return {
            ...state,
            accessToken: token,
            refreshToken: refreshToken
        }});

        await SecureStore.setItemAsync('token', JSON.stringify(token));
        await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));
        status = 'ok';
    }).catch((error) => {
        status = error;
    })

    return [status];
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
    <Provider value={{
      authAxios, 
      publicAxios, 
      getWithRefresh,
      postWithRefresh,
      putWithRefresh
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};