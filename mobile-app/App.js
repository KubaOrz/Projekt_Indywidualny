import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import React from 'react';
import Controller from './src/Controller';

export default function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <Controller />
      </AxiosProvider>
    </AuthProvider>
  );
};
