import * as React from 'react';
import { Pressable, View, Text, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import {useState, useContext, } from 'react';
import * as SecureStore from 'expo-secure-store';
import FormStyles from '../../styles/FormStyles';

export default function LoginForm({navigation}) {

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
        <View style = {FormStyles.container}>
            <TextInput placeholder='login' onChangeText={enteredEmail => setEmail(enteredEmail)} style = {FormStyles.textInput} />
            <TextInput placeholder='hasło' onChangeText={enteredPassword => setPassword(enteredPassword)} secureTextEntry={true} style = {FormStyles.textInput}/>
            {/* <Button title = "zaloguj" onPress = {() => login()}/> */}
            <Pressable onPress = {() => login()} style = {FormStyles.defaultButton}>
                <Text style = {FormStyles.defaultText}>Zaloguj</Text>
            </Pressable>
            <Text>{loginStatus}</Text>
        </View>
    )
}
