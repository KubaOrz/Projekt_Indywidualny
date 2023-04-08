import * as React from 'react';
import { Pressable, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import DefaultStyles from '../../styles/DefaultStyles';
import Tile from '../../universal-components/Tile';
import { AxiosContext } from '../../context/AxiosContext';


export default function UserMainScreen({navigation}) {

    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);

    function test() {
        console.log(authContext.getAccessToken());
    };

    function logout() {
        authAxios.post('/auth/logout')
        .then(() => {
            authContext.logout();
        }).catch((error) => {
            console.error("Brak połączenia z serwerem!");
        })
    };

    return (
        <View style = {styles.container}>
            <Text style = {DefaultStyles.header}>Witaj {authContext.getUserDetails().name}!</Text>
            
            <View style = {DefaultStyles.tileContainer}>
                <View style = {DefaultStyles.tileRow}>
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/shopping-bag.png')} 
                    label = {'Zakupy'} />
                    
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/shopping-online.png')} 
                    label = {'Moje zamówienia'} />
                </View>
                
                <View style = {DefaultStyles.tileRow}>
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/clock.png')} 
                    label = {'Historia zamówień'} />
                    
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/user.png')} 
                    label = {'Profil'} />
                </View>
            </View>

            <TouchableOpacity onPress = {() => logout()} style = {DefaultStyles.defaultButton}>
                <Text style = {DefaultStyles.defaultText}>Wyloguj</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#8232B9',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});