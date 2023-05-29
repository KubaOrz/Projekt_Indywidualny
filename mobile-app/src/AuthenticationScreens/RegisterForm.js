import React, { useState, useContext, useRef } from 'react';
import { View, TextInput, Pressable, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { AxiosContext } from './AxiosContext';
import FormStyles from '../Styles/FormStyles';
import Alert from '../UniversalComponents/Alert';
import * as SecureStore from 'expo-secure-store';
import UserDataInputValidator from '../UniversalComponents/UserDataInputValidator';

export default function RegisterForm(props) {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailValidationError, setEmailValidationError] = useState('');
  const [phoneValidationError, setPhoneValidationError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [passwordsEqualError, setPasswordsEqualError] = useState('');

  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  var alertTitle = useRef('');
  var alertMessage = useRef('');

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
      const responseData = response.data;

      const user = {
        name: responseData.name,
        surname: responseData.surname,
        email: responseData.email,
        phoneNumber: responseData.phoneNumber,
        role: responseData.role
      }

      SecureStore.setItemAsync('token', JSON.stringify(responseData.token));
      SecureStore.setItemAsync('refreshToken', JSON.stringify(responseData.refreshToken));
      SecureStore.setItemAsync('userDetails', JSON.stringify(user));

      authContext.setAuthState({
          accessToken: responseData.token,
          refreshToken: responseData.refreshToken,
          authenticated: user.role,
          userDetails: user
      });

    }).catch(error => {
      console.error(error.response.status);
      console.log('coś się wywaliło');
      switch(error.response.status) {
        case 404:
          alertTitle.current = 'Nie znaleziono';
          alertMessage.current = 'Nie znaleziono zasobu!';
          setShowSubmitAlert(true);
        case 500:
          alertTitle.current = 'Błąd serwera';
          alertMessage.current = 'Nie udało się połączyć z serwerem!';
          setShowSubmitAlert(true);
        case 409:
          alertTitle.current = 'Konflikt';
          alertMessage.current = 'Istnieje już użytkownik o podanym adresie e-mail!';
          setShowSubmitAlert(true);
        default:
          alertTitle.current = 'Błąd';
          alertMessage.current = 'Wystąpił błąd, Spróbuj ponownie!';
          setShowSubmitAlert(true);
      }
    })
  }

  function handleEmailInput(email) {
    setEmail(email);
    setEmailValidationError(UserDataInputValidator.validateEmail(email));
  }

  function handlePasswordInput(password) {
    setPassword(password);
    setPasswordValidationError(UserDataInputValidator.validatePassword(password));
  }

  function handleConfirmPasswordInput(confirmPassword) {
    setConfirmPassword(confirmPassword);
    setPasswordsEqualError(UserDataInputValidator.checkPasswordEquality(confirmPassword, password));
  }

  function handlePhoneInput(phoneNumber) {
    setPhoneNumber(phoneNumber);
    setPhoneValidationError(UserDataInputValidator.validatePhoneNumber(phoneNumber));
  }

  function handleSubmit() {
    if (emailValidationError || passwordValidationError || passwordsEqualError || phoneValidationError) {
      alertTitle.current = 'Błędne dane!';
      alertMessage.current = 'Podane dane są niepoprawne!';
      setShowSubmitAlert(true);
    } else if (!(name && surname && email && password && confirmPassword && phoneNumber)) {
      alertTitle.current = 'Brak danych!';
      alertMessage.current = 'Nie wszystkie pola zostały wypełnione!'
      setShowSubmitAlert(true);
    } else {
      registerUser();
    }
  }

  return (
    <View style = {FormStyles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={name => setName(name)}
        style = {FormStyles.textInput}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={surname => setSurname(surname)}
        style = {FormStyles.textInput}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={email => handleEmailInput(email)}
        style = {FormStyles.textInput}
      />
      {emailValidationError && <Text style = {FormStyles.errorText}>{emailValidationError}</Text>}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={password => handlePasswordInput(password)}
        // secureTextEntry={true}
        style = {FormStyles.textInput}
      />
      {passwordValidationError && <Text style = {FormStyles.errorText}>{passwordValidationError}</Text>}
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={confirmPassword => handleConfirmPasswordInput(confirmPassword)}
        // secureTextEntry={true}
        style = {FormStyles.textInput}
      />
      {passwordsEqualError && <Text style = {FormStyles.errorText}>{passwordsEqualError}</Text>}
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={phoneNumber => handlePhoneInput(phoneNumber)}
        keyboardType="phone-pad"
        style = {FormStyles.textInput}
      />
      {phoneValidationError && <Text style = {FormStyles.errorText}>{phoneValidationError}</Text>}
      <TouchableOpacity onPress={() => handleSubmit()} style = {FormStyles.defaultButton}>
        <Text style = {FormStyles.defaultText}>Zarejestruj</Text>
      </TouchableOpacity>
      {showSubmitAlert && 
        <Alert title = {alertTitle.current} message = {alertMessage.current} onClose={() => setShowSubmitAlert(false)}/>
      }
    </View>
  );
};

