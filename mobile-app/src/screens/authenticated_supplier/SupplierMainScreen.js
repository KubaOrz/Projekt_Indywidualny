import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState, useRef } from 'react';
import DefaultStyles from '../../styles/DefaultStyles';
import Tile from '../../universal-components/Tile';
import { AxiosContext } from '../../context/AxiosContext';
import Alert from '../../universal-components/Alert';


export default function SupplierMainScreen({navigation}) {

    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    var alertTitle = useRef('');
    var alertMessage = useRef('');

    function test() {
        console.log(authContext.getAccessToken());
    };

    function logout() {
        authAxios.post('/auth/logout')
        .then(() => {
            authContext.logout();
        }).catch((error) => {
            if (error.response.status === 404 || error.response.status === 403) { // tego 403 nie powinno tu być ale nie działa obsługa wyjątków w springu
                authContext.logout();
            } else {
                alertTitle.current = 'Błąd serwera!';
                alertMessage.current = 'Wystapił problem przy połączeniu z serwerem!';
                setShowSubmitAlert(true);
                console.error(error);
            }
        })
    };

    return (
        <View style = {styles.container}>
            <Text style = {DefaultStyles.header}>Witaj {authContext.getUserDetails().name}!</Text>
            
            <View style = {DefaultStyles.tileContainer}>
                <View style = {DefaultStyles.tileRow}>
                    <Tile
                    onPress = {() => navigation.navigate('UntakenOrders')} 
                    backgroundImage = {require('../../../assets/ecommerce.png')} 
                    label = {'Szukaj zamówień'} />
                    
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/checklist.png')} 
                    label = {'Moje zamówienia'} />
                </View>
                
                <View style = {DefaultStyles.tileRow}>
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/clock.png')} 
                    label = {'Historia zamówień'} />
                    
                    <Tile
                    onPress = {test} 
                    backgroundImage = {require('../../../assets/postman.png')} 
                    label = {'Profil'} />
                </View>
            </View>

            <TouchableOpacity onPress = {() => logout()} style = {DefaultStyles.defaultButton}>
                <Text style = {DefaultStyles.defaultText}>Wyloguj</Text>
            </TouchableOpacity>

            {showSubmitAlert && 
                <Alert title = {alertTitle.current} message = {alertMessage.current} onClose={() => setShowSubmitAlert(false)}/>
            }
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