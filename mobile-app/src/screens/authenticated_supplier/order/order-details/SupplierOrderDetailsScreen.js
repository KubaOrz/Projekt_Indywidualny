import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AxiosContext } from '../../../../context/AxiosContext';
import { AuthContext } from '../../../../context/AuthContext';
import LoadingSpinner from '../../../../universal-components/LoadingSpinner';
import Alert from '../../../../universal-components/Alert';
import OrderDetailsStyles from '../../../../styles/OrderDetailsStyles';
import OrderStatusBox from '../../../../universal-components/order-details/OrderStatusBox';
import ShoppingList from '../../../../universal-components/order-details/ShoppingList';
import SupplierOrderInfoBox from './SupplierOrderInfoBox';
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SupplierOrderDetailsScreen({navigation, route}) {

    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState('loading');
    const [shops, setShops] = useState([]);
    const [showShoppingList, setShowShoppingList] = useState(false);
    const [showOrderFinishBox, setShowOrderFinishBox] = useState(false);
    const [showOrderStartBox, setShowOrderStartBox] = useState(false);
    const url = useRef('/supplier/orders/');
    const {id} = route.params;

    const {authAxios, getWithRefresh} = useContext(AxiosContext);
    const {getUserDetails} = useContext(AuthContext);

    function startOrder() {
        authAxios.put('/supplier/orders', {
            orderId: id,
            supplierEmail: getUserDetails().email
        }).then(() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate('OrderDetails', {id: id});
        }).catch(error => {
            console.log(error);
            setStatus('error');
        })
    }

    function finishOrder() {
        authAxios.put('/supplier/orders/' + id)
        .then(() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate('OrderDetails', {id: id});
        }).catch(error => {
            console.log(error);
            setStatus('error');
        })
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

                    <TouchableOpacity onPress = {() => setShowShoppingList(true)} style = {OrderDetailsStyles.button}>
                        <Icon name="format-list-checks" size={40} color="black" style = {{flex: 1}}/>
                        <Text style = {OrderDetailsStyles.buttonText}>Pokaż listę zakupów</Text>
                    </TouchableOpacity>

                    {orderData.status === 'IN_PROGRESS' &&
                        <>
                            <TouchableOpacity onPress = {() => console.log('Wyświetlam mapkę')} style = {OrderDetailsStyles.button}>
                                <Icon name="map" size={40} color="#ebc323" style = {{flex: 1}}/>
                                <Text style = {OrderDetailsStyles.buttonText}>Pokaż trasę</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {() => setShowOrderFinishBox(true)} style = {OrderDetailsStyles.button}>
                                <Icon name="checkbox-marked" size={40} color="green" style = {{flex: 1}}/>
                                <Text style = {OrderDetailsStyles.buttonText}>Potwierdź dostarczenie</Text>
                            </TouchableOpacity>
                        </>
                    }

                    {orderData.status === 'ACTIVE' &&

                        <TouchableOpacity onPress = {() => setShowOrderStartBox(true)} style = {OrderDetailsStyles.button}>
                            <Icon name="truck-delivery" size={40} color="red" style = {{flex: 1}}/>
                            <Text style = {OrderDetailsStyles.buttonText}>Podejmij zamówienie</Text>
                        </TouchableOpacity>
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
                />
            }

            {showOrderFinishBox && 
                <Alert 
                    title = {'Czy na pewno?'} 
                    message = {"Czy na pewno chcesz potwierdzić dostarczenie zamówienia?"} 
                    onClose = {() => finishOrder()} 
                />
            }

        </ScrollView>
    );
};
