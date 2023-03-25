import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function MainScreen({navigation}) {

    const authContext = useContext(AuthContext);

    return (
        <View style = {styles.container}>
            <Text style = {styles.defaultText}>Witaj {authContext.getUserDetails().name}</Text>
            <TouchableOpacity onPress = {() => authContext.logout()} style = {styles.defaultButton}>
                <Text style = {styles.defaultText}>Wyloguj</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#8232B9',
        justifyContent: 'center',
        alignItems: 'center'
    },

    defaultButton: {
        backgroundColor: '#C10D49',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50,
        borderColor: 'white',
        borderWidth: 2,
    },

    defaultText: {
        marginTop: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});