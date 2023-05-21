import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AxiosContext } from '../../../../context/AxiosContext';
import LoadingSpinner from '../../../../universal-components/LoadingSpinner';
import Alert from '../../../../universal-components/Alert';
import OrderStatusBox from '../../../../universal-components/order-details/OrderStatusBox';
import ShoppingList from '../../../../universal-components/order-details/ShoppingList';
import UserOrderInfoBox from './UserOrderInfoBox';

import DefaultStyles from '../../../../styles/DefaultStyles';
import OrderDetailsStyles from '../../../../styles/OrderDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OrderDetailsScreen({navigation, route}) {

    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState('loading');
    const [shops, setShops] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const url = useRef('/purchaser/orders/');
    const {id} = route.params;

    const {getWithRefresh} = useContext(AxiosContext);

    async function loadShops() {
        const [data, error] = await getWithRefresh('/products/shop');
        if (!error) {
            setShops(data);
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    async function loadOrderData(url) {
        const [data, error] = await getWithRefresh(url + id);
        if (data) {
            setOrderData(data);
            setStatus('ok');
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    useEffect(() => {
        async function loadData() {
            await loadShops();
            await loadOrderData(url.current);
        }

        loadData();
    }, [])

    function Body() {
        if (status === 'ok') {
            return (
                <View style = {OrderDetailsStyles.body}>
                    <OrderStatusBox status = {orderData.status}/>

                    <UserOrderInfoBox orderData = {orderData}/>

                    <TouchableOpacity onPress = {() => setShowShoppingList(true)} style = {OrderDetailsStyles.button}>
                        <Icon name="format-list-checks" size={40} color="black" style = {{flex: 1}}/>
                        <Text style = {OrderDetailsStyles.buttonText}>Pokaż listę zakupów</Text>
                    </TouchableOpacity>

                    {orderData.status === 'IN_PROGRESS' && 

                    <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {OrderDetailsStyles.button}>
                        <Icon name="map-marker" size={40} color="red" style = {{flex: 1}}/>
                        <Text style = {OrderDetailsStyles.buttonText}>Pokaż lokalizację dostawcy</Text>
                    </TouchableOpacity>               
                    }

                    {showShoppingList &&
                    <ShoppingList 
                        shoppingList = {orderData.shoppingList}
                        shops = {shops}
                        onClose = {setShowShoppingList}
                    />
                    }

                </View>
            )   
        } else {
            return (
                <LoadingSpinner/>
            )
        }
    }

    return (
         <ScrollView contentContainerStyle = {OrderDetailsStyles.container}>
            <Text style = {OrderDetailsStyles.title}>Zamówienie numer {id}</Text>
            
            <Body/>

            {status === 'error' &&
                <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

        </ScrollView>
    );
};
