import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';


export default function RegisterForm(props) {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);

  function registerUser() {
    publicAxios.post('/auth/register', {
      name: name,
      surname: surname,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      role: props.role
  }).then((response) => {
      const {accessToken} = response.data;
      authContext.setAuthState({
          accessToken,
          authenticated: true
      });

      // Keychain.setGenericPassword('token', JSON.stringify(accessToken));
      SecureStore.setItemAsync('token', JSON.stringify(accessToken));
  }).catch(error => {
      console.error(error);
  })
  }

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={name => setName()}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={surname => setSurname(surname)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        keyboardType="phone-pad"
      />
      <Button title="Zarejestruj" onPress={() => registerUser()} />
    </View>
  );
};

