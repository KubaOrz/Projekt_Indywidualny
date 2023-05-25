import {AuthProvider} from './src/AuthenticationScreens/AuthContext';
import {AxiosProvider} from './src/AuthenticationScreens/AxiosContext';
import React from 'react';
import StackController from './src/StackController';

export default function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <StackController />
      </AxiosProvider>
    </AuthProvider>
  );
};
