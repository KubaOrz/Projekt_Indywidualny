import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AxiosContext } from '../../../../context/AxiosContext';
import { AuthContext } from '../../../../context/AuthContext';
import LoadingSpinner from '../../../../universal-components/LoadingSpinner';
import Alert from '../../../../universal-components/Alert';
import DefaultStyles from '../../../../styles/DefaultStyles';
import OrderStatusBox from '../../../../universal-components/order-details/OrderStatusBox';
import ShoppingList from '../../../../universal-components/order-details/ShoppingList';
import SupplierOrderInfoBox from './SupplierOrderInfoBox';
import { StackActions } from '@react-navigation/native';
import OrderDetailsStyles from '../../../../styles/OrderDetailsStyles';

export default function SupplierOrderDetailsScreen({navigation, route}) {

    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState('loading');
    const [shops, setShops] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const url = useRef('/supplier/orders/');
    const {id} = route.params;

    const {authAxios, getWithRefresh} = useContext(AxiosContext);
    const {getUserDetails} = useContext(AuthContext);

    function startOrder() {
        authAxios.put('/supplier/orders', {
            orderId: id,
            supplierEmail: getUserDetails().email
        }).then(response => {
            setShowSuccessBox(true);
        }).catch(error => {
            console.log(error);
        })
    }

    function confirmSuccess() {
        setShowSuccessBox(false)
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('OrderDetails', {id: id});
    }

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

                    <SupplierOrderInfoBox orderData = {orderData}/>

                    <TouchableOpacity onPress = {() => setShowShoppingList(true)} style = {DefaultStyles.defaultButton}>
                        <Text style = {DefaultStyles.defaultText}>Pokaż listę zakupów</Text>
                    </TouchableOpacity>

                    {orderData.status === 'IN_PROGRESS' &&

                        <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {DefaultStyles.defaultButton}>
                            <Text style = {DefaultStyles.defaultText}>Pokaż trasę</Text>
                        </TouchableOpacity>
                    }

                    {orderData.status === 'ACTIVE' &&

                        <TouchableOpacity onPress = {() => startOrder()} style = {DefaultStyles.defaultButton}>
                            <Text style = {DefaultStyles.defaultText}>Podejmij zamówienie</Text>
                        </TouchableOpacity>
                    }

                    {showShoppingList &&
                        <ShoppingList 
                            shoppingList = {orderData.shoppingList}
                            shops = {shops}
                            onClose = {setShowShoppingList}
                        />
                    }

                    {showSuccessBox && 
                        <Alert title = {'Zamówienie dodane!'} message = {"Pomyślnie dodano zamówienie"} onClose={() => confirmSuccess()}/>
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
         <View style = {OrderDetailsStyles.container}>
            <Text style = {OrderDetailsStyles.title}>Zamówienie numer {id}</Text>
            
            <Body/>

            {status === 'error' &&
                <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

        </View>
    );
};
