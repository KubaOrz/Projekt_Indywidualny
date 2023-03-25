import React, { useState, useContext, useRef } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import FormStyles from '../../styles/FormStyles';
import FailureAlert from '../../alerts/FailureAlert'

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

  function handleEmailInput(email) {
    setEmail(email);
    validateEmail(email);
  }

  function validateEmail(email) {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validEmailRegex.test(email)) {
      setEmailValidationError('Niepoprawny adres e-mail!');
    } else {
      setEmailValidationError('');
    }
  }

  function handlePasswordInput(password) {
    setPassword(password);
    validatePassword(password);
  }

  function validatePassword(password) {
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!validPasswordRegex.test(password)) {
      setPasswordValidationError('Hasło musi zawierać co najmniej 8 znaków, cyfrę i znak specjalny!');
    } else {
      setPasswordValidationError('');
    }
  }

  function handleConfirmPasswordInput(confirmPassword) {
    setConfirmPassword(confirmPassword);
    checkPasswordEquality(confirmPassword);
  }

  function checkPasswordEquality(confirmPassword) {
    if (!(confirmPassword === password)) {
      setPasswordsEqualError('Podane hasła nie są takie same!');
    } else {
      setPasswordsEqualError('');
    }
  }

  function handlePhoneInput(phoneNumber) {
    setPhoneNumber(phoneNumber);
    validatePhoneNumber(phoneNumber);
  }

  function validatePhoneNumber(phoneNumber) {
    const validPhoneRegex = /^[0-9]{9}$/;
    if (!validPhoneRegex.test(phoneNumber)) {
      setPhoneValidationError('Niepoprawny numer telefonu!');
    } else {
      setPhoneValidationError('');
    }
  };

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
      <Pressable onPress={() => handleSubmit()} style = {FormStyles.defaultButton}>
        <Text style = {FormStyles.defaultText}>Zarejestruj</Text>
      </Pressable>
      {showSubmitAlert && 
        <FailureAlert title = {alertTitle.current} message = {alertMessage.current} onClose={() => setShowSubmitAlert(false)}/>
      }
    </View>
  );
};

