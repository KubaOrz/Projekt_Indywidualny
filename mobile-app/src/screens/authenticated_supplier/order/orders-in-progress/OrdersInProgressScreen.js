import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AxiosContext } from '../../../../context/AxiosContext';
import LoadingSpinner from '../../../../universal-components/LoadingSpinner';
import EmptyListInfo from '../../../../universal-components/EmptyListInfo';
import Alert from '../../../../universal-components/Alert';
import OrdersList from '../../../../universal-components/orders-list/OrdersList';
import { AuthContext } from '../../../../context/AuthContext';

export default function OrdersInProgressScreen({navigation}) {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('loading');
    const {getWithRefresh} = useContext(AxiosContext);
    const {getUserDetails} = useContext(AuthContext);

    async function loadOrders(url) {
        const [data, error] = await getWithRefresh(url);
        if (!error) {
            setOrders(data);
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    useEffect(() => {
        loadOrders('/supplier/' + getUserDetails().email +  '/orders');
    }, []);

    function Body() {
        if (status === 'ok') {
            if (orders.length > 0) {
                return (
                    <OrdersList
                        orders = {orders}
                        navigation = {navigation}
                        displayType = {'SUPPLIER'}
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
            <Text style = {styles.title}>Twoje zamówienia</Text>
            
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
