import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AxiosContext } from '../../../../context/AxiosContext';
import { AuthContext } from '../../../../context/AuthContext';
import LoadingSpinner from '../../../../universal-components/LoadingSpinner';
import EmptyListInfo from '../../../../universal-components/EmptyListInfo';
import Alert from '../../../../universal-components/Alert';
import OrdersList from '../../../../universal-components/orders-list/OrdersList';

export default function ActiveOrderScreen({navigation}) {

    const [activeOrders, setActiveOrders] = useState([]);
    const [status, setStatus] = useState('loading');

    const {getWithRefresh} = useContext(AxiosContext);
    const {getUserDetails} = useContext(AuthContext);

    async function loadOrders() {
        const {email} = getUserDetails();
        const [data, error] = await getWithRefresh('/purchaser/orders/user-orders/' + email);
        if (data) {
            setActiveOrders(data);
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    useEffect(() => {
        loadOrders();
    }, [])

    function Body() {
        if (status === 'ok') {
            if (activeOrders.length > 0) {
                return (
                    <OrdersList
                        orders = {activeOrders}
                        navigation = {navigation}
                        displayType = {'USER'}
                    />
                )
            } else {
                return (
                    <EmptyListInfo text = {'Brak aktywnych zamówień'}/>
                )
            }
            
        } else {
            return (
                <LoadingSpinner/>
            )
        }
    }

    return (
         <View style = {styles.container}>
            <Text style = {styles.title}>Twoje aktywne zamówienia</Text>
            
            <Body/>

            {status === 'error' &&
                <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#8232B9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    }
});
