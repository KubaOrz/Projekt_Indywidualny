import * as React from 'react';
import { Pressable, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import {useState, useContext, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import FormStyles from '../../styles/FormStyles';
import FailureAlert from '../../alerts/FailureAlert';

export default function LoginForm(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    var alertTitle = useRef('');
    var alertMessage = useRef('');

    function login() {
        publicAxios.post('/auth/login', {
            email: email,
            password: password,
            role: props.role
        }).then((response) => {
            const responseData = response.data;
            const user = {
                name: responseData.name,
                surname: responseData.surname,
                email: responseData.email,
                phoneNumber: responseData.phoneNumber
            }

            authContext.setAuthState({
                accessToken: responseData.token,
                authenticated: true,
                userDetails: user
            });

            SecureStore.setItemAsync('token', JSON.stringify(responseData.token));
            SecureStore.setItemAsync('userDetails', JSON.stringify(user));
        }).catch(error => {
            switch(error.response.status) {
                case 403:
                  alertTitle.current = 'Niepoprawne dane!';
                  alertMessage.current = 'Adres e-mail lub hasło jest niepoprawne!';
                  setShowSubmitAlert(true);
                case 404:
                  alertTitle.current = 'Nie znaleziono zasobu!';
                  alertMessage.current = 'Nie udało sie znaleźć zasobu!';
                  setShowSubmitAlert(true);
                case 500:
                  alertTitle.current = 'Błąd serwera';
                  alertMessage.current = 'Nie udało się połączyć z serwerem!';
                  setShowSubmitAlert(true);
                default:
                  alertTitle.current = 'Błąd';
                  alertMessage.current = 'Wystąpił błąd, Spróbuj ponownie!';
                  setShowSubmitAlert(true);
              }
        })
    }

    function validateLoginData() {
        if (!(email && password)) {
            alertTitle.current = 'brak danych';
            alertMessage.current = 'Nie podano danych do logowania!';
            setShowSubmitAlert(true);
        } else {
            login();
        }
    }

    return (
        <View style = {FormStyles.container}>
            <TextInput placeholder='login' onChangeText={enteredEmail => setEmail(enteredEmail)} style = {FormStyles.textInput} />
            <TextInput placeholder='hasło' onChangeText={enteredPassword => setPassword(enteredPassword)} secureTextEntry={true} style = {FormStyles.textInput}/>
            {/* <Button title = "zaloguj" onPress = {() => login()}/> */}
            <TouchableOpacity onPress = {() => validateLoginData()} style = {FormStyles.defaultButton}>
                <Text style = {FormStyles.defaultText}>Zaloguj</Text>
            </TouchableOpacity>
            {showSubmitAlert && 
                <FailureAlert title = {alertTitle.current} message = {alertMessage.current} onClose={() => setShowSubmitAlert(false)}/>
            }
        </View>
    )
}
