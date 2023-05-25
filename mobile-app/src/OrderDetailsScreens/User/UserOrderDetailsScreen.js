import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, Text } from 'react-native';
import { AxiosContext } from '../../AuthenticationScreens/AxiosContext';
import LoadingSpinner from '../../UniversalComponents/LoadingSpinner';
import Alert from '../../UniversalComponents/Alert';
import ShoppingList from '../ShoppingList';
import OrderDetailsStyles from '../../Styles/OrderDetailsStyles';
import UserOrderDetailsBody from './UserOrderDetailsBox';

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
                <UserOrderDetailsBody 
                    orderData = {orderData}
                    onPressShoppingList = {setShowShoppingList}
                />
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

            {showShoppingList &&
                    <ShoppingList 
                        shoppingList = {orderData.shoppingList}
                        shops = {shops}
                        onClose = {setShowShoppingList}
                    />
            }

            {status === 'error' &&
                <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

        </ScrollView>
    );
};
