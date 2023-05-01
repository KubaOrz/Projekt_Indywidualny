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
    baseURL: 'https://45ba-185-186-16-243.ngrok-free.app',
  });

  const publicAxios = axios.create({
    baseURL: 'https://45ba-185-186-16-243.ngrok-free.app',
  });

  async function getWithRefresh(url) {

    var data = null;
    var fetchError = null;

    console.log('zaczynam pobieranie');
        await authAxios.get(url) 
        .then((response) => {
            data = response.data;
            console.log('pobrane za 1 razem');

        }).catch(async (error) => {
            const [refreshStatus, token] = await refreshToken();
            console.log(refreshStatus);
            if (refreshStatus === 'ok') {
                await publicAxios.get(url, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                })
                .then((response) => {
                    data = response.data;
                    console.log('pobrane za drugim razem');

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
    console.log('refresh');
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
        console.log('udało się odświeżyć ' + authContext.getAccessToken());
        newToken = token;
        currentToken.current = token;
    }).catch((error) => {
        status = error;
        console.log('nie udało się odświeżyć');
    })

    return [status, newToken];
}

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${currentToken.current}`;
        console.log(authContext.getAccessToken());
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // authAxios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async (error) => {
  //     const originalRequest = error.config;
  
  //     if (error.response.status === 403 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       //console.log("Przechwycone");
  
  //       return publicAxios.post('/auth/refresh', { 
  //         refreshToken: authContext.getRefreshToken() 
  //       }).then(async (response) => {
  //           //console.log(response.data);
  //           const { token, refreshToken } = response.data;
  
  //           authContext.setAuthState(state => {
  //             return {
  //               ...state,
  //               accessToken: token,
  //               refreshToken: refreshToken
  //         }});

  //           await SecureStore.setItemAsync('token', JSON.stringify(token));
  //           await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));

  //           originalRequest.headers.Authorization = `Bearer ${token}`;
  //           //console.log(authContext.authState.authenticated);
  //           return axios(originalRequest);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <Provider value={{authAxios, publicAxios, getWithRefresh}}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};