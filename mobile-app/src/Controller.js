import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { useCallback, useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import DefaultRoot from './screens/default/DefaultRoot';
import MainScreen from './screens/authenticated/MainScreen'

const AuthenticatedStack = createNativeStackNavigator();
const DefaultStack = createNativeStackNavigator();


export default function Controller() {

  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadToken = useCallback(async () => {
    try {
    //   const credentials = await Keychain.getGenericPassword();
      const credentials = await SecureStore.getItemAsync('token');
      const token = JSON.parse(credentials.password);

      authContext.setAuthState({
        accessToken: token.accessToken || null,
        authenticated: token.accessToken !== null
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      authContext.setAuthState({
        accessToken: null,
        authenticated: false
      });
    }
  }, []);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  if (status === 'loading') {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } else if (authContext.authState.authenticated === false) {
    return (
      <NavigationContainer>
        <DefaultStack.Navigator screenOptions={{headerShown: false}}>
          <DefaultStack.Screen name = "DefaultRoot" component={DefaultRoot} />
        </DefaultStack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <AuthenticatedStack.Navigator screenOptions={{headerShown: false}}>
          <AuthenticatedStack.Screen name = "Main" component={MainScreen} />
        </AuthenticatedStack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
