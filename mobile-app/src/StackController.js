import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { useCallback, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthenticationScreens/AuthContext';
import * as SecureStore from 'expo-secure-store';
import DefaultRoot from './AuthenticationScreens/DefaultRoot';
import UserMainScreen from './UserMainScreen';
import SupplierMainScreen from './SupplierMainScreen';
import { CartProvider } from './Cart/CartContext';
import ProductChoiceScreen from './ProductsScreens/ProductChoiceScreen';
import OrderForm from './OrderScreens/User/OrderForm';
import ActiveOrderScreen from './OrderScreens/User/ActiveOrdersScreen';
import UntakenOrdersScreen from './OrderScreens/Supplier/UntakenOrdersScreen';
import SupplierOrderDetailsScreen from './OrderDetailsScreens/Supplier/SupplierOrderDetailsScreen';
import UserOrderDetailsScreen from './OrderDetailsScreens/User/UserOrderDetailsScreen';
import OrdersInProgressScreen from './OrderScreens/Supplier/OrdersInProgressScreen';

const AuthenticatedUserStack = createNativeStackNavigator();
const AuthenticatedSupplierStack = createNativeStackNavigator();
const DefaultStack = createNativeStackNavigator();


export default function StackController() {

  const authContext = useContext(AuthContext);

  const loadToken = useCallback(async () => {
    try {
      const tokenData = await SecureStore.getItemAsync('token');
      const token = JSON.parse(tokenData);

      const refreshtokenData = await SecureStore.getItemAsync('refreshToken');
      const refreshToken = JSON.parse(refreshtokenData);

      const userDetails = await SecureStore.getItemAsync('userDetails');
      const user = JSON.parse(userDetails);

      authContext.setAuthState({
        accessToken: token || null,
        refreshToken: refreshToken || null,
        authenticated: user.role || null,
        userDetails: user || null
      });

    } catch (error) {
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
        userDetails: null
      });
    }
  }, []);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  if (authContext.authState.authenticated === 'ROLE_USER') {
    return (
      <NavigationContainer>
        <CartProvider>
          <AuthenticatedUserStack.Navigator 
            screenOptions = {{headerShown: false}}>
            <AuthenticatedUserStack.Screen name = "Main" component={UserMainScreen} />
            <AuthenticatedUserStack.Screen name = "Shop" component={ProductChoiceScreen} />
            <AuthenticatedUserStack.Screen name = "OrderForm" component={OrderForm} />
            <AuthenticatedUserStack.Screen name = "ActiveOrders" component={ActiveOrderScreen} />
            <AuthenticatedUserStack.Screen name = "OrderDetails" component={UserOrderDetailsScreen} />
          </AuthenticatedUserStack.Navigator>
        </CartProvider>
      </NavigationContainer>
    )
  } else if (authContext.authState.authenticated === 'ROLE_SUPPLIER') {
    return (
      <NavigationContainer>
        <AuthenticatedSupplierStack.Navigator screenOptions={{headerShown: false}}>
          <AuthenticatedSupplierStack.Screen name = "Main" component={SupplierMainScreen} />
          <AuthenticatedSupplierStack.Screen name = "UntakenOrders" component={UntakenOrdersScreen} />
          <AuthenticatedSupplierStack.Screen name = "OrderDetails" component={SupplierOrderDetailsScreen} />
          <AuthenticatedSupplierStack.Screen name = "OrdersInProgress" component={OrdersInProgressScreen} />
        </AuthenticatedSupplierStack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <DefaultStack.Navigator screenOptions={{headerShown: false}}>
          <DefaultStack.Screen name = "DefaultRoot" component={DefaultRoot} />
        </DefaultStack.Navigator>
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
