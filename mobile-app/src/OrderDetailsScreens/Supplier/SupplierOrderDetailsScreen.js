import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AxiosContext } from '../../AuthenticationScreens/AxiosContext';
import { AuthContext } from '../../AuthenticationScreens/AuthContext';
import LoadingSpinner from '../../UniversalComponents/LoadingSpinner';
import Alert from '../../UniversalComponents/Alert';
import OrderDetailsStyles from '../../Styles/OrderDetailsStyles';
import ShoppingList from '../ShoppingList';
import { StackActions } from '@react-navigation/native';
import SupplierOrderDetailsBody from './SupplierOrderDetailsBody';

export default function SupplierOrderDetailsScreen({navigation, route}) {

    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState('loading');
    const [shops, setShops] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const [showOrderFinishBox, setShowOrderFinishBox] = useState(false);
    const [showOrderStartBox, setShowOrderStartBox] = useState(false);
    const url = useRef('/supplier/orders/');
    const {id} = route.params;

    const {putWithRefresh, getWithRefresh} = useContext(AxiosContext);
    const {getUserDetails} = useContext(AuthContext);

    async function startOrder() {
        const [data, error] = await putWithRefresh('/supplier/orders', {
            orderId: id,
            supplierEmail: getUserDetails().email
        })
        if (!error) {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate('OrderDetails', {id: id});
        } else {
            console.log(error);
            setStatus('error');
        }
    }

    async function finishOrder() {
        const [data, error] = await putWithRefresh('/supplier/orders/' + id, null)
        if (!error) {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate('OrderDetails', {id: id});
        } else {
            console.log(error);
            setStatus('error');
        }
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
                <SupplierOrderDetailsBody 
                    orderData = {orderData}
                    onPressFinishOrder = {setShowOrderFinishBox}
                    onPressShoppingList = {setShowShoppingList}
                    onPressStartOrder = {setShowOrderStartBox}
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

            {status === 'error' &&
                <Alert title = {'Błąd!'} message = {'Wystapił błąd przy połączeniu z serwerem!'} onClose={() => navigation.goBack()}/>
            }

            {showShoppingList &&
                <ShoppingList 
                    shoppingList = {orderData.shoppingList}
                    shops = {shops}
                    onClose = {setShowShoppingList}
                />
            }

            {showOrderStartBox && 
                <Alert 
                    title = {'Czy na pewno?'} 
                    message = {"Czy na pewno chcesz przyjąć to zamówienie?"} 
                    onClose = {() => startOrder()} 
                    onDecline = {() => setShowOrderStartBox(false)}
                />
            }

            {showOrderFinishBox && 
                <Alert 
                    title = {'Czy na pewno?'} 
                    message = {"Czy na pewno chcesz potwierdzić dostarczenie zamówienia?"} 
                    onClose = {() => finishOrder()} 
                    onDecline = {() => setShowOrderFinishBox(false)}
                />
            }

        </ScrollView>
    );
};
