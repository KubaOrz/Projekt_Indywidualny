import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function MainScreen({navigation}) {

    const authContext = useContext(AuthContext)

    function showCredentials() {
        console.log(authContext.getAccessToken());
    }

    return (
        <View>
            <Text>
                Main screen
            </Text>
            <Button title = "Wyloguj" onPress = {() => authContext.logout()} />
            <Button title = "Pokaż użytkownika" onPress = {() => showCredentials()} />
        </View>
    )
}