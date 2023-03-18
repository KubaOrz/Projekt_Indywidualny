import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import {useState, useContext, } from 'react';
import * as SecureStore from 'expo-secure-store';


export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    function login() {
        setLoginStatus('');
        publicAxios.post('/auth/login', {
            email: email,
            password: password
        }).then((response) => {
            const {accessToken} = response.data;
            authContext.setAuthState({
                accessToken,
                authenticated: true
            });

            // Keychain.setGenericPassword('token', JSON.stringify(accessToken));
            SecureStore.setItemAsync('token', JSON.stringify(accessToken));
        }).catch(error => {
            setLoginStatus('Niepoprawne dane!');
            console.error(error);
        })

    }

    return (
        <View>
            <Text>Zaloguj się!</Text>
            <TextInput placeholder='login' onChangeText={enteredEmail => setEmail(enteredEmail)} />
            <TextInput placeholder='hasło' onChangeText={enteredPassword => setPassword(enteredPassword)} secureTextEntry={true}/>
            <Button title = "zaloguj" onPress = {() => login()}/>
            <Text>{loginStatus}</Text>
        </View>
    )
}