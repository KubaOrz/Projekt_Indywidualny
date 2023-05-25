import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AxiosContext } from '../../AuthenticationScreens/AxiosContext';
import LoadingSpinner from '../../UniversalComponents/LoadingSpinner';
import EmptyListInfo from '../../UniversalComponents/EmptyListInfo';
import Alert from '../../UniversalComponents/Alert';
import OrdersList from '../OrdersList';

export default function UntakenOrdersScreen({navigation}) {

    const [untakenOrders, setUntakenOrders] = useState([]);
    const [status, setStatus] = useState('loading');
    const url = useRef('/supplier/orders');
    var page = useRef(null);
    var isLast = useRef(false);

    const {getWithRefresh} = useContext(AxiosContext);

    async function loadOrders(url) {
        const [data, error] = await getWithRefresh(url);
        if (!error) {
            const newUntakenOrders = untakenOrders.concat(data.content);
            setUntakenOrders(newUntakenOrders);
            page.current = data.number;
            isLast.current = data.last;
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    useEffect(() => {
        loadOrders(url.current);
    }, []);

    function loadMoreOrders() {
        if (!isLast.current) {
            loadOrders(url.current + '?page=' + (page.current + 1));
        }
    }

    function Body() {
        if (status === 'ok') {
            if (untakenOrders.length > 0) {
                return (
                    <OrdersList
                        orders = {untakenOrders}
                        navigation = {navigation}
                        onEndReached = {loadMoreOrders}
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
            <Text style = {styles.title}>Podejmij zamówienie!</Text>
            
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
